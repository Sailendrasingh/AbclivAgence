/**
 * Script de vérification de l'état de la base de données
 * Usage: node scripts/check-database.js
 */

const { PrismaClient } = require('@prisma/client')

// Forcer l'utilisation de la base de production (dev.db)
// Si DATABASE_URL n'est pas défini, utiliser dev.db par défaut
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('test.db')) {
  process.env.DATABASE_URL = 'file:./prisma/dev.db'
  console.log('⚠️  Utilisation de la base de production (dev.db)')
}

const prisma = new PrismaClient()

async function checkDatabase() {
  console.log('🔍 Vérification de l\'état de la base de données...\n')

  try {
    // Vérifier les utilisateurs
    const users = await prisma.user.findMany({
      select: {
        id: true,
        login: true,
        role: true,
        active: true,
        twoFactorEnabled: true,
      },
    })
    console.log(`👥 Utilisateurs: ${users.length}`)
    users.forEach((user) => {
      console.log(`   - ${user.login} (${user.role}) ${user.active ? '✓' : '✗'} ${user.twoFactorEnabled ? '[2FA]' : ''}`)
    })

    // Vérifier les agences
    const agencies = await prisma.agency.findMany({
      select: {
        id: true,
        name: true,
        state: true,
      },
    })
    console.log(`\n🏢 Agences: ${agencies.length}`)
    const states = { OK: 0, INFO: 0, ALERTE: 0, FERMÉE: 0 }
    agencies.forEach((agency) => {
      states[agency.state] = (states[agency.state] || 0) + 1
      console.log(`   - ${agency.name} [${agency.state}]`)
    })
    console.log(`\n   Répartition par état:`)
    Object.entries(states).forEach(([state, count]) => {
      console.log(`     ${state}: ${count}`)
    })

    // Vérifier les contacts
    const contacts = await prisma.contact.findMany({
      select: {
        id: true,
        managerName: true,
        agencyId: true,
      },
    })
    console.log(`\n📞 Contacts: ${contacts.length}`)

    // Vérifier les adresses
    const addresses = await prisma.address.findMany({
      select: {
        id: true,
        label: true,
        city: true,
        agencyId: true,
      },
    })
    console.log(`\n📍 Adresses: ${addresses.length}`)

    // Vérifier les groupes de photos
    const photoGroups = await prisma.photoGroup.findMany({
      select: {
        id: true,
        type: true,
        title: true,
        agencyId: true,
      },
    })
    console.log(`\n📷 Groupes de photos: ${photoGroups.length}`)

    // Vérifier les données techniques
    const technical = await prisma.technical.findMany({
      select: {
        id: true,
        agencyId: true,
      },
    })
    console.log(`\n⚙️ Données techniques: ${technical.length}`)

    // Vérifier les logs
    const logs = await prisma.log.findMany({
      select: {
        id: true,
      },
      take: 1,
    })
    const totalLogs = await prisma.log.count()
    console.log(`\n📋 Logs: ${totalLogs} (derniers enregistrements)`)

    // Vérifier l'historique
    const agencyHistory = await prisma.agencyHistory.count()
    const technicalHistory = await prisma.technicalHistory.count()
    console.log(`\n📚 Historique:`)
    console.log(`   - Agences: ${agencyHistory}`)
    console.log(`   - Technique: ${technicalHistory}`)

    // Vérifier l'utilisateur Admin
    const admin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    })

    if (!admin) {
      console.log(`\n⚠️  ATTENTION: L'utilisateur Admin n'existe pas !`)
      console.log(`   Vous pouvez le recréer en lançant l'application (createInitialAdmin sera appelé)`)
    } else {
      console.log(`\n✅ Utilisateur Admin présent`)
    }

    console.log(`\n✅ Vérification terminée`)
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()

