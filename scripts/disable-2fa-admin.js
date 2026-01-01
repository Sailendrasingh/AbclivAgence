/**
 * Script pour désactiver le 2FA pour le compte Admin
 * Usage: node scripts/disable-2fa-admin.js
 */

const path = require('path')
const { PrismaClient } = require('@prisma/client')

// Forcer l'utilisation de la base de production
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db')
process.env.DATABASE_URL = `file:${dbPath}`

const prisma = new PrismaClient()

async function disable2FA() {
  console.log('🔧 Désactivation du 2FA pour le compte Admin...\n')

  try {
    const admin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    })

    if (!admin) {
      console.log('❌ L\'utilisateur Admin n\'existe pas')
      return
    }

    console.log(`📝 État actuel:`)
    console.log(`   Login: ${admin.login}`)
    console.log(`   2FA activé: ${admin.twoFactorEnabled ? 'Oui' : 'Non'}`)
    console.log(`   Secret présent: ${admin.twoFactorSecret ? 'Oui' : 'Non'}\n`)

    if (!admin.twoFactorEnabled) {
      console.log('✅ Le 2FA est déjà désactivé pour le compte Admin')
      return
    }

    const updated = await prisma.user.update({
      where: { login: 'Admin' },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
      },
    })

    console.log('✅ 2FA désactivé avec succès !')
    console.log(`   Login: ${updated.login}`)
    console.log(`   2FA activé: ${updated.twoFactorEnabled ? 'Oui' : 'Non'}`)
    console.log(`   Secret présent: ${updated.twoFactorSecret ? 'Oui' : 'Non'}`)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

disable2FA()

