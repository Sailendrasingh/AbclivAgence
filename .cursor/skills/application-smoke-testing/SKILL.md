---
name: application-smoke-testing
description: Exécute un smoke test rapide (10-15 min) d'ABCLIV Agency pour valider les fonctions critiques après un changement, un reset DB, ou avant une démo. Utiliser quand l'utilisateur veut une vérification rapide et priorisée plutôt qu'une recette complète.
---

# Smoke Test Rapide — ABCLIV Agency

## Objectif

Valider rapidement que l'application est utilisable sur les flux critiques:

- stack disponible
- login/admin fonctionnel
- endpoints API critiques répondent
- aucune régression bloquante évidente

## Durée cible

- 10 à 15 minutes

## Pré-requis

1. `docker compose up -d --build`
2. `docker compose exec -T web npx prisma migrate deploy`
3. `docker compose exec -T web npm run restore:admin`

## Checklist smoke test

Copier cette checklist:

```md
Smoke test ABCLIV:
- [ ] 1. Services Docker UP et DB healthy
- [ ] 2. Login Admin / Password OK (mot de passe)
- [ ] 3. Vérif API auth (/api/auth/me ou test auth script)
- [ ] 4. Vérif API métier clé (agencies + dashboard summary)
- [ ] 5. Upload image valide + rejet invalide
- [ ] 6. Non-régression minimale (test + build)
- [ ] 7. Rapport GO / NO-GO
```

## Commandes recommandées

### 1) Santé des services

- `docker compose ps`
- `docker compose logs --tail=60 db`
- `docker compose logs --tail=60 web`

### 2) Authentification critique

- `docker compose exec -T web npm run reset:admin`
- `docker compose exec -T web npm run test:auth`

Si `needsTwoFactor=true`, considérer l'auth mot de passe comme validée.

### 3) API critiques

Tester rapidement:

- `GET /api/dashboard/summary`
- `GET /api/agencies`
- `GET /api/auth/me`

Attendus:

- pas d'erreur 500
- erreurs 401/403 seulement quand le contexte le justifie

### 4) Upload minimal

- 1 image valide (JPEG/PNG) -> succès
- 1 fichier invalide -> rejet

### 5) Non-régression minimale

1. `npm run test`
2. `npm run build`

`npm run lint` et `npm run test:e2e` restent recommandés mais hors périmètre smoke par défaut.

## Critères GO / NO-GO

- **GO** si:
  - DB healthy
  - login Admin mot de passe OK
  - APIs critiques répondent sans 500
  - test + build passent

- **NO-GO** si:
  - login impossible
  - endpoint critique en 500
  - test ou build en échec
  - upload critique cassé

## Format de sortie

```md
# Rapport Smoke Test

- Statut: GO | NO-GO
- Durée: [x min]

## Vérifications OK
- ...

## Échecs
- [description] / [impact] / [repro court]

## Décision
- GO avec réserves | GO | NO-GO
```
