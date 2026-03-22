---
name: full-application-testing
description: Exécute une stratégie de test complète de l'application ABCLIV Agency (smoke, auth/2FA, RBAC, API CRUD, uploads, sauvegardes, logs, non-régression). Utiliser quand l'utilisateur demande de tester toutes les fonctionnalités, valider une livraison, vérifier après reset de base, ou faire une campagne de recette.
---

# Test Complet Application — ABCLIV Agency

## Quand appliquer

- Demande explicite: "teste toute l'application", "fais une recette complète", "valide avant prod".
- Après migration base de données, reset Docker, seed, ou refactoring majeur.
- Avant release, déploiement, ou démonstration client.

## Pré-requis

1. Stack démarrée: `docker compose up -d --build`
2. Base prête: `docker compose exec -T web npx prisma migrate deploy`
3. Données minimales: `docker compose exec -T web npm run restore:admin`
4. Optionnel (recommandé): `docker compose exec -T web npx tsx scripts/init-settings.ts`

## Workflow standard

Copier cette checklist et suivre dans l'ordre:

```md
Progression tests complets:
- [ ] 1. Sanity check infrastructure (containers, ports, health)
- [ ] 2. Authentification (login, logout, 2FA, reset admin)
- [ ] 3. Sécurité d'accès (401/403, CSRF sur routes d'écriture)
- [ ] 4. Fonctions métier API (CRUD agences/contacts/adresses/tâches)
- [ ] 5. Fichiers sensibles (upload, fichiers, sauvegardes)
- [ ] 6. Contrôles non-régression (test, build, lint, e2e ciblés)
- [ ] 7. Rapport final (bloquants, majeurs, mineurs, next steps)
```

## Étape 1 — Sanity check infrastructure

- Vérifier services: `docker compose ps`
- Vérifier logs récents:
  - `docker compose logs --tail=100 db`
  - `docker compose logs --tail=100 web`
- Vérifier points d'entrée:
  - Front: `http://localhost:3000`
  - API login: `http://localhost:3000/api/auth/login`

## Étape 2 — Authentification

- Vérifier reset admin: `docker compose exec -T web npm run reset:admin`
- Vérifier auth mot de passe: `docker compose exec -T web npm run test:auth`
- Confirmer comportement 2FA:
  - Si `needsTwoFactor=true`, considérer mot de passe OK et 2FA active.
- Vérifier logout/session:
  - Appeler `/api/auth/logout` puis `/api/auth/me` (doit retourner non authentifié).

## Étape 3 — Sécurité d'accès

- Routes protégées sans session -> attendu `401`.
- Routes réservées rôle insuffisant -> attendu `403`.
- Routes `POST/PUT/PATCH/DELETE` -> CSRF requis (attendu rejet sans token valide).
- Vérifier absence de fuite évidente dans logs (tokens/sessions/cookies).

## Étape 4 — Fonctions métier API (priorité)

Tester au minimum un cas nominal + un cas invalide pour chaque zone:

- `agencies` (création, lecture, modification, suppression logique si applicable)
- `contacts`
- `addresses`
- `tasks`
- `users` (lecture/profil/gestion selon droits)
- `dashboard` (endpoints de synthèse)

Utiliser en priorité:

- `npm run test` pour les tests API/Jest déjà présents
- Tests manuels ciblés seulement sur les zones changées ou non couvertes

## Étape 5 — Fichiers sensibles

- Upload image valide (JPEG/PNG) -> succès
- Upload type invalide -> rejet
- Accès fichier avec chemin suspect (`..`, slashs non attendus) -> rejet
- Sauvegardes:
  - endpoint liste backups
  - création/restore si demandé dans la recette

## Étape 6 — Non-régression

Exécuter cet ordre:

1. `npm run test`
2. `npm run build`
3. `npm run lint`
4. Si impact UI/parcours critiques: `npm run test:e2e`

Si `npm run test` bloque en fin de run (open handles), noter comme dette technique mais ne pas ignorer un échec réel des tests.

## Format de rapport final

Toujours produire un rapport synthétique:

```md
# Rapport de test complet

## Résultat global
- Statut: OK | KO | KO partiel
- Périmètre: [zones testées]

## Anomalies
- 🔴 Bloquantes:
  - [description] / [impact] / [repro]
- 🟠 Majeures:
  - ...
- 🟡 Mineures:
  - ...

## Vérifications passées
- [check réussie 1]
- [check réussie 2]

## Commandes exécutées
- [commande + résultat court]

## Recommandations
1. [action immédiate]
2. [action court terme]
```

## Références projet

- `SCENARIOS_TESTS.md`
- `STRATEGIE_TESTS_NON_REGRESSION.md`
- `TESTS_IMPLEMENTES.md`
- `scripts/test-auth-admin.ts`
- `scripts/reset-admin-password.ts`
