# Guide des Tests

Ce document explique comment exécuter et écrire des tests pour l'application.

## 🚀 Démarrage Rapide

### Installation

Les dépendances de test sont déjà installées. Pour installer les navigateurs Playwright :

```bash
npx playwright install chromium
```

### Exécution des Tests

```bash
# Tests unitaires et d'intégration
npm run test

# Tests en mode watch (redémarre automatiquement)
npm run test:watch

# Tests avec couverture de code
npm run test:coverage

# Tests E2E (End-to-End)
npm run test:e2e

# Tests E2E avec interface graphique
npm run test:e2e:ui

# Tous les tests
npm run test:all
```

## 📁 Structure des Tests

```
project-root/
├── lib/__tests__/              # Tests des utilitaires
│   └── auth.test.ts
├── app/
│   └── api/
│       └── **/__tests__/       # Tests des routes API
│           └── route.test.ts
├── e2e/                        # Tests E2E Playwright
│   ├── auth.spec.ts
│   └── agencies.spec.ts
└── __tests__/                  # Tests globaux
    └── fixtures/                # Fichiers de test
```

## 🧪 Types de Tests

### Tests Unitaires

Testent les fonctions et utilitaires isolément.

**Exemple :** `lib/__tests__/auth.test.ts`

```typescript
import { hashPassword, verifyPassword } from '../auth'

describe('Auth utilities', () => {
  it('should hash password correctly', async () => {
    const hash = await hashPassword('password123')
    expect(hash).toMatch(/^\$argon2/)
  })
})
```

### Tests d'API

Testent les routes API Next.js.

**Exemple :** `app/api/auth/login/__tests__/route.test.ts`

```typescript
import { POST } from '../route'
import { NextRequest } from 'next/server'

describe('POST /api/auth/login', () => {
  it('should login with correct credentials', async () => {
    const request = new NextRequest('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login: 'user', password: 'pass' }),
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
```

### Tests E2E

Testent l'application complète du point de vue utilisateur.

**Exemple :** `e2e/auth.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test('should login', async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[name="login"]', 'Admin')
  await page.fill('input[type="password"]', 'Password')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/dashboard')
})
```

## ⚙️ Configuration

### Base de Données de Test

Les tests utilisent une base de données PostgreSQL dédiée (ex: `abcliv_test`).

**Fichier `.env.test` :**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/abcliv_test"
NODE_ENV="test"
ENCRYPTION_KEY="test-encryption-key-32-chars-long!!"
```

La base de données est automatiquement nettoyée après chaque test.

### Mocks

Les dépendances externes sont mockées dans `jest.setup.js` :
- `next/navigation` (useRouter, usePathname, etc.)
- `next/headers` (cookies)
- Rate limiting (pour les tests API)

## 📝 Écrire de Nouveaux Tests

### Test Unitaire

1. Créer un fichier `*.test.ts` dans le dossier `__tests__` correspondant
2. Importer les fonctions à tester
3. Écrire les cas de test avec `describe` et `it`

### Test d'API

1. Créer un dossier `__tests__` dans le dossier de la route API
2. Importer le handler (POST, GET, etc.)
3. Créer des `NextRequest` mockées
4. Vérifier les réponses

### Test E2E

1. Créer un fichier `*.spec.ts` dans `e2e/`
2. Utiliser les helpers Playwright (`page.goto`, `page.fill`, etc.)
3. Vérifier les résultats avec `expect`

## 🎯 Priorités de Tests

### Phase 1 - Critiques ✅
- [x] Authentification (login, 2FA)
- [x] Sécurité (rate limiting, RBAC)
- [ ] Upload fichiers (validation MIME, path traversal)

### Phase 2 - Fonctionnels
- [ ] CRUD agences
- [ ] Gestion contacts
- [ ] Gestion photos

### Phase 3 - UI/UX
- [ ] Thèmes
- [ ] Responsive
- [ ] Navigation

## 📊 Couverture de Code

Générer un rapport de couverture :

```bash
npm run test:coverage
```

Le rapport est généré dans `coverage/`.

## 🔧 Dépannage

### Erreur "Cannot find module"

Vérifier que les alias `@/*` sont correctement configurés dans `jest.config.js`.

### Erreur de base de données

S'assurer que `.env.test` existe et que `DATABASE_URL` pointe vers une base PostgreSQL de test dédiée.

### Tests E2E échouent

Vérifier que le serveur de développement est démarré (`npm run dev`) ou que `playwright.config.ts` configure `webServer`.

## 📚 Ressources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Next.js Testing](https://nextjs.org/docs/testing)
