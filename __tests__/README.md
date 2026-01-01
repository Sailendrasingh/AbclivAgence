# Tests de Non-Régression

Ce dossier contient les tests de non-régression de l'application.

## Structure

- `lib/__tests__/` : Tests unitaires des utilitaires
- `app/api/**/__tests__/` : Tests des routes API
- `e2e/` : Tests end-to-end avec Playwright

## Commandes

```bash
# Tests unitaires
npm run test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage

# Tests E2E
npm run test:e2e

# Tests E2E avec interface UI
npm run test:e2e:ui

# Tous les tests
npm run test:all
```

## Configuration

- **Jest** : Configuration dans `jest.config.js`
- **Playwright** : Configuration dans `playwright.config.ts`
- **Base de test** : `prisma/test.db` (créée automatiquement)

## Notes

- La base de données de test est nettoyée automatiquement après chaque test
- Les variables d'environnement de test sont définies dans `jest.setup.js`
- Les mocks sont configurés pour les dépendances externes

