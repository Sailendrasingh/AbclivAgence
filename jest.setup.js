import '@testing-library/jest-dom'

// ⚠️ IMPORTANT: Définir DATABASE_URL AVANT tout import de Prisma
// PostgreSQL : utiliser une base de test (ex: postgresql://user:pass@localhost:5432/abcliv_test)
// Si DATABASE_URL ne pointe pas déjà vers une base de test, on force une DB de test dédiée.
const currentDbUrl = process.env.DATABASE_URL || ''
let derivedTestDbUrl = 'postgresql://postgres:postgres@localhost:5432/abcliv_test'
if (currentDbUrl.startsWith('postgresql://') || currentDbUrl.startsWith('postgres://')) {
  try {
    const parsed = new URL(currentDbUrl)
    parsed.pathname = '/abcliv_test'
    derivedTestDbUrl = parsed.toString()
  } catch {
    // Fallback conservateur: URL de test locale par défaut
  }
}
const defaultTestDbUrl = process.env.DATABASE_URL_TEST || derivedTestDbUrl
if (!currentDbUrl.startsWith('postgresql') || (!currentDbUrl.includes('test') && !currentDbUrl.includes('_test'))) {
  process.env.DATABASE_URL = defaultTestDbUrl
}
process.env.NODE_ENV = 'test'
process.env.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'test-encryption-key-32-chars-long!!'

// Polyfill pour Next.js Request/Response
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock de Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock de next/headers pour les cookies
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}))

// Nettoyer la base de données après chaque test
// IMPORTANT: S'assurer que DATABASE_URL pointe vers une base de test avant le nettoyage
afterEach(async () => {
  try {
    // Vérifier que nous utilisons bien la base de test
    const dbUrl = process.env.DATABASE_URL || ''
    if (!dbUrl.includes('test') && !dbUrl.includes('_test')) {
      console.warn('ATTENTION: DATABASE_URL ne semble pas pointer vers une base de test:', dbUrl)
      console.warn('Le nettoyage a été ignoré pour éviter de supprimer les données de production')
      return
    }

    const { prisma } = require('@/lib/prisma')
    // Nettoyer toutes les tables (ordre important pour les contraintes)
    await prisma.session.deleteMany()
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
    await prisma.task.deleteMany()
    await prisma.agency.deleteMany()
    await prisma.alert.deleteMany()
    await prisma.user.deleteMany()
    await prisma.appSettings.deleteMany()
  } catch (error) {
    // Ignorer les erreurs si la base n'existe pas encore
    console.warn('Erreur lors du nettoyage de la base de test:', error.message)
  }
})
