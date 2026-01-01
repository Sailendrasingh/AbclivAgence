/**
 * Script pour vérifier l'état complet du compte Admin
 * Usage: node scripts/check-admin-status.js
 */

const path = require('path')
const { PrismaClient } = require('@prisma/client')
const argon2 = require('argon2')

// Forcer l'utilisation de la base de production
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db')
process.env.DATABASE_URL = `file:${dbPath}`

const prisma = new PrismaClient()

async function checkAdminStatus() {
  console.log('🔍 Vérification de l\'état du compte Admin...\n')

  try {
    const admin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    })

    if (!admin) {
      console.log('❌ L\'utilisateur Admin n\'existe pas')
      return
    }

    console.log('✅ Utilisateur Admin trouvé')
    console.log(`   ID: ${admin.id}`)
    console.log(`   Login: ${admin.login}`)
    console.log(`   Rôle: ${admin.role}`)
    console.log(`   Actif: ${admin.active ? '✅ Oui' : '❌ Non'}`)
    console.log(`   Tentatives échouées: ${admin.failedLoginAttempts || 0}`)
    
    if (admin.lockedUntil) {
      const now = new Date()
      const lockedUntil = new Date(admin.lockedUntil)
      if (lockedUntil > now) {
        const minutesLeft = Math.ceil((lockedUntil.getTime() - now.getTime()) / 60000)
        console.log(`   🔒 Verrouillé jusqu'à: ${lockedUntil.toISOString()}`)
        console.log(`   ⏰ Temps restant: ${minutesLeft} minute(s)`)
      } else {
        console.log(`   ✅ Verrouillage expiré (était verrouillé jusqu'à: ${lockedUntil.toISOString()})`)
      }
    } else {
      console.log(`   ✅ Non verrouillé`)
    }

    console.log(`\n🔐 Test de vérification du mot de passe "Password"...`)
    const isValid = await argon2.verify(admin.passwordHash, 'Password')
    console.log(`   Résultat: ${isValid ? '✅ VALIDE' : '❌ INVALIDE'}`)

    if (!isValid) {
      console.log('\n⚠️  Le mot de passe ne correspond pas !')
      console.log('💡 Exécutez: npm run reset:admin')
    }

    if (!admin.active) {
      console.log('\n⚠️  Le compte est désactivé !')
      console.log('💡 Réactivez-le avec: npm run reset:admin')
    }

    if (admin.lockedUntil && new Date(admin.lockedUntil) > new Date()) {
      console.log('\n⚠️  Le compte est verrouillé !')
      console.log('💡 Déverrouillez-le avec: npm run reset:admin')
    }

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdminStatus()

