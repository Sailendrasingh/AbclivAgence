# Stratégie de Tests de Non-Régression

## 📋 Vue d'ensemble

Ce document présente une stratégie complète pour implémenter des tests de non-régression dans l'application de gestion des agences.

---

## 🎯 Objectifs

1. **Détecter les régressions** avant la mise en production
2. **Valider les fonctionnalités critiques** (authentification, CRUD, sécurité)
3. **Assurer la stabilité** lors des refactorings
4. **Documenter le comportement** attendu de l'application

---

## 🛠️ Stack de Tests Recommandée

### 1. Tests Unitaires & Intégration (Composants & Utilitaires)

**Outils :**
- **Jest** : Framework de test JavaScript
- **React Testing Library** : Tests de composants React
- **@testing-library/jest-dom** : Matchers DOM personnalisés
- **@testing-library/user-event** : Simulation d'interactions utilisateur

**Pourquoi :**
- ✅ Standard de l'industrie pour React
- ✅ Intégration native avec Next.js
- ✅ Tests rapides et isolés
- ✅ Focus sur le comportement utilisateur

### 2. Tests d'API (Routes API)

**Outils :**
- **Jest** : Framework de test
- **NextRequest/NextResponse** : Tests directs des handlers Next.js App Router
- **Prisma** : Base de données de test PostgreSQL dédiée

**Pourquoi :**
- ✅ Tests isolés des routes API
- ✅ Validation des réponses HTTP
- ✅ Tests de sécurité (authentification, autorisation)
- ✅ Tests de validation des données
- ✅ Compatible avec Next.js App Router (pas besoin de Supertest)

### 3. Tests E2E (End-to-End)

**Outils :**
- **Playwright** : Framework E2E moderne
- **Alternative : Cypress** (si préférence)

**Pourquoi Playwright :**
- ✅ Excellent support Next.js
- ✅ Multi-navigateurs (Chrome, Firefox, Safari)
- ✅ Tests rapides et fiables
- ✅ Support natif TypeScript
- ✅ Screenshots et vidéos automatiques

### 4. Tests de Base de Données

**Outils :**
- **Prisma** : ORM avec base de test
- **PostgreSQL local** : Base dédiée pour les tests (`abcliv_test`)
- **Isolation** : Base séparée de la production/dev
- **Scripts de seed** : Données de test

**Pourquoi :**
- ✅ Tests isolés de la logique métier
- ✅ Validation des migrations
- ✅ Tests de contraintes et relations
- ✅ Nettoyage facile entre tests

---

## 📁 Structure de Tests Recommandée

```
project-root/
├── __tests__/                    # Tests globaux
│   ├── setup.ts                  # Configuration Jest
│   └── teardown.ts               # Nettoyage après tests
├── app/
│   ├── api/
│   │   └── **/__tests__/         # Tests des routes API
│   │       └── route.test.ts
│   └── dashboard/
│       └── **/__tests__/         # Tests des pages
│           └── page.test.tsx
├── components/
│   └── **/__tests__/             # Tests des composants
│       └── component.test.tsx
├── lib/
│   └── **/__tests__/            # Tests des utilitaires
│       └── util.test.ts
├── e2e/                          # Tests E2E Playwright
│   ├── auth.spec.ts
│   ├── agencies.spec.ts
│   ├── photos.spec.ts
│   └── playwright.config.ts
└── prisma/
    └── test-seed.ts              # Données de test
```

---

## 🎯 Priorités de Tests

### Phase 1 - Tests Critiques (Priorité HAUTE)

#### 1.1 Authentification & Sécurité
- ✅ Connexion avec mot de passe
- ✅ Connexion avec 2FA
- ✅ Verrouillage de compte après 5 tentatives
- ✅ Rate limiting sur login
- ✅ Déconnexion
- ✅ Protection des routes (middleware)
- ✅ Vérification des rôles (RBAC)

#### 1.2 CRUD Agences
- ✅ Création d'agence
- ✅ Modification d'agence
- ✅ Suppression d'agence (Super Admin uniquement)
- ✅ Recherche et filtrage
- ✅ Validation des champs obligatoires

#### 1.3 Upload & Sécurité Fichiers
- ✅ Upload de photos (validation type MIME)
- ✅ Validation magic bytes
- ✅ Protection path traversal
- ✅ Limite de taille (5 MB)
- ✅ Suppression de fichiers

### Phase 2 - Tests Fonctionnels (Priorité MOYENNE)

#### 2.1 Gestion des Contacts
- ✅ Création/modification/suppression
- ✅ Validation des formats (email, téléphone)
- ✅ Réorganisation (ordre)

#### 2.2 Gestion des Photos
- ✅ Création de groupes de photos
- ✅ Upload multiple
- ✅ Affichage par onglets (types)
- ✅ Lightbox (zoom, drag)
- ✅ Édition titre/date

#### 2.3 Données Techniques
- ✅ CRUD PC, Imprimantes, WiFi, Caméras
- ✅ Chiffrement/déchiffrement mots de passe WiFi
- ✅ Historisation

### Phase 3 - Tests UI/UX (Priorité BASSE)

#### 3.1 Interface Utilisateur
- ✅ Thème clair/sombre
- ✅ Responsive design
- ✅ Navigation entre onglets
- ✅ Dialogs et modales

---

## 📝 Exemples de Tests

### Exemple 1 : Test Unitaire - Fonction de hachage

```typescript
// lib/__tests__/auth.test.ts
import { hashPassword, verifyPassword } from '../auth'

describe('Auth utilities', () => {
  it('should hash password correctly', async () => {
    const password = 'testPassword123'
    const hash = await hashPassword(password)
    
    expect(hash).toBeDefined()
    expect(hash).not.toBe(password)
    expect(hash).toMatch(/^\$argon2/)
  })

  it('should verify correct password', async () => {
    const password = 'testPassword123'
    const hash = await hashPassword(password)
    const isValid = await verifyPassword(hash, password)
    
    expect(isValid).toBe(true)
  })

  it('should reject incorrect password', async () => {
    const password = 'testPassword123'
    const wrongPassword = 'wrongPassword'
    const hash = await hashPassword(password)
    const isValid = await verifyPassword(hash, wrongPassword)
    
    expect(isValid).toBe(false)
  })
})
```

### Exemple 2 : Test d'API - Route de login

```typescript
// app/api/auth/login/__tests__/route.test.ts
import { POST } from '../route'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// Mock du rate limiting pour les tests
jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: jest.fn(() => ({ allowed: true, remaining: 5, resetAt: Date.now() + 900000 })),
  resetRateLimit: jest.fn(),
}))

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    // Nettoyer la base de test
    await prisma.user.deleteMany()
    // Réinitialiser les mocks
    jest.clearAllMocks()
  })

  it('should login with correct credentials', async () => {
    // Créer un utilisateur de test
    const passwordHash = await hashPassword('password123')
    await prisma.user.create({
      data: {
        login: 'testuser',
        passwordHash,
        role: 'User',
        active: true,
      },
    })

    const request = new NextRequest('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        login: 'testuser',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('should reject incorrect password', async () => {
    const passwordHash = await hashPassword('password123')
    await prisma.user.create({
      data: {
        login: 'testuser',
        passwordHash,
        role: 'User',
        active: true,
      },
    })

    const request = new NextRequest('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        login: 'testuser',
        password: 'wrongpassword',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBeDefined()
  })

  it('should lock account after 5 failed attempts', async () => {
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: 'testuser',
        passwordHash,
        role: 'User',
        active: true,
        failedLoginAttempts: 0,
      },
    })

    // 5 tentatives échouées
    for (let i = 0; i < 5; i++) {
      const request = new NextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          login: 'testuser',
          password: 'wrongpassword',
        }),
      })
      await POST(request)
    }

    // Vérifier que le compte est verrouillé
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    expect(updatedUser?.lockedUntil).toBeDefined()
    expect(updatedUser?.failedLoginAttempts).toBe(5)
  })
})
```

### Exemple 3 : Test E2E - Création d'agence

```typescript
// e2e/agencies.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Gestion des agences', () => {
  test.beforeEach(async ({ page }) => {
    // Se connecter
    await page.goto('/login')
    await page.fill('input[name="login"]', 'Admin')
    await page.fill('input[name="password"]', 'Password')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard/agences')
  })

  test('should create a new agency', async ({ page }) => {
    // Cliquer sur "Ajouter"
    await page.click('button:has-text("Ajouter")')
    
    // Remplir le formulaire
    await page.fill('input[name="name"]', 'Agence Test')
    await page.selectOption('select[name="state"]', 'OK')
    
    // Sauvegarder
    await page.click('button:has-text("Enregistrer")')
    
    // Vérifier que l'agence apparaît dans la liste
    await expect(page.locator('text=Agence Test')).toBeVisible()
  })

  test('should edit an agency', async ({ page }) => {
    // Sélectionner une agence
    await page.click('text=Agence Test')
    
    // Cliquer sur "Modifier"
    await page.click('button:has-text("Modifier")')
    
    // Modifier le nom
    await page.fill('input[name="name"]', 'Agence Test Modifiée')
    
    // Sauvegarder
    await page.click('button:has-text("Enregistrer")')
    
    // Vérifier la modification
    await expect(page.locator('text=Agence Test Modifiée')).toBeVisible()
  })
})
```

---

## ⚙️ Configuration

### 1. Installation des dépendances

```bash
npm install --save-dev \
  jest \
  jest-environment-jsdom \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  @playwright/test \
  @types/jest \
  @types/node
```

**Note importante :** Pour Next.js 14 avec App Router, utilisez `next/jest` qui est déjà inclus dans Next.js. Pas besoin d'installer Jest séparément, mais les dépendances de test sont nécessaires.

### 2. Configuration Jest (`jest.config.js`)

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  // Variables d'environnement pour les tests
  testEnvironment: 'node', // Pour les tests API
  // Utiliser jsdom pour les tests React
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
}

module.exports = createJestConfig(customJestConfig)
```

### 2.1 Fichier de setup Jest (`jest.setup.js`)

```javascript
import '@testing-library/jest-dom'

// Mock des variables d'environnement
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/abcliv_test'
process.env.NODE_ENV = 'test'
process.env.ENCRYPTION_KEY = 'test-encryption-key-32-chars-long!!'

// Mock de Next.js
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Nettoyer la base de données après chaque test
afterEach(async () => {
  const { prisma } = require('@/lib/prisma')
  // Nettoyer toutes les tables (ordre important pour les contraintes)
  await prisma.log.deleteMany()
  await prisma.technicalHistory.deleteMany()
  await prisma.agencyHistory.deleteMany()
  await prisma.dynamicField.deleteMany()
  await prisma.camera.deleteMany()
  await prisma.wifiAccessPoint.deleteMany()
  await prisma.printer.deleteMany()
  await prisma.pC.deleteMany()
  await prisma.technical.deleteMany()
  await prisma.photoGroup.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.address.deleteMany()
  await prisma.agency.deleteMany()
  await prisma.user.deleteMany()
  await prisma.appSettings.deleteMany()
})
```

### 3. Configuration Playwright (`playwright.config.ts`)

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### 4. Scripts package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

---

## 🚀 Plan d'Implémentation Progressif

### Semaine 1 : Setup & Tests Critiques
1. ✅ Installer et configurer Jest
2. ✅ Tests d'authentification (login, 2FA, verrouillage)
3. ✅ Tests de sécurité (rate limiting, RBAC)

### Semaine 2 : Tests API
1. ✅ Tests CRUD agences
2. ✅ Tests upload fichiers
3. ✅ Tests validation données

### Semaine 3 : Tests E2E
1. ✅ Installer et configurer Playwright
2. ✅ Tests E2E authentification
3. ✅ Tests E2E gestion agences

### Semaine 4 : Tests UI & Finalisation
1. ✅ Tests composants React
2. ✅ Tests responsive
3. ✅ Intégration CI/CD

---

## 📊 Métriques & Coverage

**Objectifs de couverture :**
- **Tests unitaires** : 80%+ de couverture
- **Tests API** : 100% des routes critiques
- **Tests E2E** : 100% des parcours utilisateur critiques

**Outils de mesure :**
- Jest coverage reports
- Playwright test reports
- CI/CD integration (GitHub Actions, GitLab CI, etc.)

---

## 🔄 Intégration CI/CD

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
      - uses: codecov/codecov-action@v3
```

---

## 🔧 Configuration Avancée

### Base de Données de Test

Pour isoler les tests de la base de données de développement, créez un fichier `.env.test` :

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/abcliv_test"
NODE_ENV="test"
ENCRYPTION_KEY="test-encryption-key-32-chars-long!!"
```

Et modifiez `lib/prisma.ts` pour utiliser la bonne base selon l'environnement :

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Mock des Dépendances Externes

Pour les tests, mockez les appels API externes (ex: API BAN) :

```typescript
// __mocks__/fetch.ts
export default jest.fn((url: string) => {
  if (url.includes('api-adresse.data.gouv.fr')) {
    return Promise.resolve({
      ok: true,
      json: async () => ({
        features: [
          {
            properties: { label: '10 Rue de la Paix, 75001 Paris' },
            geometry: { coordinates: [2.3319, 48.8606] },
          },
        ],
      }),
    })
  }
  return Promise.reject(new Error('Unknown URL'))
})
```

### Tests avec Fichiers

Pour tester l'upload de fichiers, utilisez des fichiers de test :

```typescript
import { readFile } from 'fs/promises'
import { join } from 'path'

const testImagePath = join(process.cwd(), '__tests__', 'fixtures', 'test-image.jpg')
const testImage = await readFile(testImagePath)

// Créer un File mock
const testFile = new File([testImage], 'test.jpg', { type: 'image/jpeg' })
```

---

## 📚 Ressources & Documentation

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Next.js Testing](https://nextjs.org/docs/testing)

---

## ✅ Checklist de Démarrage

- [ ] Installer les dépendances de test
- [ ] Créer le fichier `.env.test` avec la base de test
- [ ] Configurer Jest (`jest.config.js` et `jest.setup.js`)
- [ ] Configurer Playwright (`playwright.config.ts`)
- [ ] Créer la structure de dossiers (`__tests__`, `e2e/`)
- [ ] Créer les mocks nécessaires (rate limiting, API externes)
- [ ] Écrire les premiers tests critiques (auth, sécurité)
- [ ] Configurer CI/CD (GitHub Actions, etc.)
- [ ] Documenter les tests dans le README
- [ ] Ajouter les scripts de test au `package.json`

---

**Recommandation finale :** Commencer par les tests critiques (authentification, sécurité) puis étendre progressivement aux autres fonctionnalités.

