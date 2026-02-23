---
name: non-regression-preservation
description: Vérifie l'absence de régression lors de l'implémentation d'une nouvelle fonctionnalité ou la correction d'un bug. Utiliser avant et après toute modification de code. Référence STRATEGIE_TESTS_NON_REGRESSION.md, TESTS_IMPLEMENTES.md, SCENARIOS_TESTS.md.
---

# Préservation de la non-régression — ABCLIV Agency

## Quand appliquer

- **Nouvelle fonctionnalité** : implémentation d'une feature du PRD
- **Correction de bug** : fix d'un comportement incorrect
- **Refactoring** : modification de structure sans changement fonctionnel
- **Mise à jour de dépendance**
- **Modification de logique métier** (auth, CRUD, validation)

---

## Workflow en 3 étapes

### Étape 1 — Avant modification

1. **Identifier le périmètre** : quelles routes, composants, lib sont impactés ?
2. **Lister les tests existants** concernés (voir structure ci-dessous)
3. **Exécuter la suite** pour établir une baseline : `npm run test`
4. **Optionnel** : `npm run test:e2e` si changement UI/parcours critiques

### Étape 2 — Pendant l'implémentation

1. **Ne pas casser les tests existants** — lancer `npm run test` régulièrement
2. **Écrire les tests en parallèle** (TDD) ou immédiatement après le code
3. **Couverture minimale** : au moins un test par nouveau chemin/branche critique

### Étape 3 — Après modification

1. **Exécuter tous les tests** : `npm run test`
2. **Vérifier les E2E** si changement impacte parcours : `npm run test:e2e`
3. **Vérifier le build** : `npm run build`
4. **Vérifier le lint** : `npm run lint`

---

## Structure des tests

```
app/api/**/__tests__/route.test.ts   # Routes API (Jest)
lib/__tests__/*.test.ts              # Utilitaires (auth, rate-limit)
e2e/*.spec.ts                        # E2E Playwright (auth, agencies)
```

### Tests API existants (Jest)

| Zone | Fichier | Couverture |
|------|---------|------------|
| Login | `app/api/auth/login/__tests__/route.test.ts` | Mot de passe, 2FA, verrouillage, rate limit |
| Agences | `app/api/agencies/__tests__/route.test.ts` | GET, POST, filtres, recherche |
| Agences [id] | `app/api/agencies/[id]/__tests__/route.test.ts` | GET, PUT, DELETE, RBAC, historique |
| Upload | `app/api/upload/__tests__/route.test.ts` | Magic bytes, taille, path traversal |
| Contacts | `app/api/contacts/__tests__/route.test.ts` | POST, validation |
| Contacts [id] | `app/api/contacts/[id]/__tests__/route.test.ts` | PUT, DELETE |
| Adresses | `app/api/addresses/__tests__/route.test.ts` | CRUD, validation |
| Auth | `lib/__tests__/auth.test.ts` | argon2, 2FA |
| Rate limit | `lib/__tests__/rate-limit.test.ts` | Limitation IP |

### Tests E2E (Playwright)

| Fichier | Parcours |
|---------|----------|
| `e2e/auth.spec.ts` | Login, erreurs, champs requis |
| `e2e/agencies.spec.ts` | Parcours agences |

---

## Checklist par type de modification

### Nouvelle route API

- [ ] Ajouter `__tests__/route.test.ts` à côté de la route
- [ ] Tester : 401 sans auth, 403 si RBAC, validation des entrées, cas nominal
- [ ] Mocker : `getSession`, `requireCSRF`, `rate-limit` si besoin

### Modification de logique existante

- [ ] Identifier les tests qui couvrent la zone modifiée
- [ ] Mettre à jour les tests si le comportement attendu change
- [ ] S'assurer qu'aucun test existant ne passe au rouge

### Bug fix

- [ ] Ajouter un test qui reproduit le bug (regression test)
- [ ] Le test doit échouer avant le fix, passer après

### Refactoring

- [ ] Aucun changement de comportement
- [ ] Tous les tests existants restent verts
- [ ] Pas besoin de modifier les tests (sauf renommage)

---

## Commandes

| Commande | Usage |
|----------|-------|
| `npm run test` | Tests Jest (API, lib) — **à exécuter systématiquement** |
| `npm run test:watch` | Mode watch pour développement |
| `npm run test:coverage` | Rapport de couverture |
| `npm run test:e2e` | Tests Playwright E2E |
| `npm run test:all` | Jest + E2E |
| `npm run build` | Vérifier la compilation |
| `npm run lint` | Vérifier le lint |

---

## Règles strictes

1. **Ne pas commiter si `npm run test` échoue**
2. **Nouvelle route API** → nouveau fichier `route.test.ts`
3. **Bug fix** → test de régression obligatoire
4. **Base de test** : `DATABASE_URL` pointe vers `prisma/test.db` ou mémoire
5. **Isolation** : chaque test nettoie ses données (`beforeEach` / `afterEach`)

---

## Références

- Stratégie : `STRATEGIE_TESTS_NON_REGRESSION.md`
- Tests implémentés : `TESTS_IMPLEMENTES.md`
- Scénarios détaillés : `SCENARIOS_TESTS.md`
