/**
 * Script de réinitialisation du mot de passe Admin
 * Usage: node scripts/reset-admin-password.js
 * 
 * Ce script réinitialise le mot de passe de l'utilisateur Admin à "Password"
 */

const path = require('path')
const { PrismaClient } = require('@prisma/client')
const argon2 = require('argon2')

// Forcer l'utilisation de la base de production
// Utiliser un chemin absolu pour éviter les problèmes
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db')
process.env.DATABASE_URL = `file:${dbPath}`

const prisma = new PrismaClient()

async function resetAdminPassword() {
  console.log('🔧 Réinitialisation du mot de passe Admin...\n')

  try {
    // Vérifier si l'admin existe
    const existingAdmin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    })

    if (!existingAdmin) {
      console.log('❌ L\'utilisateur Admin n\'existe pas')
      console.log('💡 Utilisez "npm run restore:admin" pour créer l\'utilisateur Admin')
      return
    }

    console.log('📝 Réinitialisation du mot de passe...')
    const passwordHash = await argon2.hash('Password')
    
    const admin = await prisma.user.update({
      where: { login: 'Admin' },
      data: {
        passwordHash,
        active: true,
        lockedUntil: null,
        failedLoginAttempts: 0,
      },
    })

    console.log('✅ Mot de passe réinitialisé avec succès !')
    console.log(`   ID: ${admin.id}`)
    console.log(`   Login: ${admin.login}`)
    console.log(`   Rôle: ${admin.role}`)
    console.log(`   Actif: ${admin.active ? 'Oui' : 'Non'}`)
    console.log(`   Nouveau mot de passe: Password`)
    console.log(`\n⚠️  IMPORTANT: Changez le mot de passe après la première connexion !`)
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

resetAdminPassword()

