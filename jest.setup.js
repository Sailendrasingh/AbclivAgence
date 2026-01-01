import '@testing-library/jest-dom'

// ⚠️ IMPORTANT: Définir DATABASE_URL AVANT tout import de Prisma
// FORCER l'utilisation de la base de test pour éviter de supprimer les données de production
process.env.DATABASE_URL = 'file:./prisma/test.db'
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
// IMPORTANT: S'assurer que DATABASE_URL pointe vers test.db avant le nettoyage
afterEach(async () => {
  try {
    // Vérifier que nous utilisons bien la base de test
    const dbUrl = process.env.DATABASE_URL || ''
    if (!dbUrl.includes('test.db')) {
      console.warn('ATTENTION: Les tests utilisent une base de données non-test:', dbUrl)
      console.warn('Le nettoyage a été ignoré pour éviter de supprimer les données de production')
      return
    }

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
  } catch (error) {
    // Ignorer les erreurs si la base n'existe pas encore
    console.warn('Erreur lors du nettoyage de la base de test:', error.message)
  }
})
