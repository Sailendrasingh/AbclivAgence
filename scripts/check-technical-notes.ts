import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkTechnicalNotes() {
  try {
    const technicals = await prisma.technical.findMany({
      select: {
        id: true,
        agencyId: true,
        technicalNotes: true,
        updatedAt: true,
      },
      where: {
        technicalNotes: {
          not: null,
        },
      },
    })

    console.log(`Nombre d'entrées techniques avec des notes: ${technicals.length}`)
    
    if (technicals.length > 0) {
      console.log('\nDétails:')
      technicals.forEach((t) => {
        console.log(`- ID: ${t.id}`)
        console.log(`  Agency ID: ${t.agencyId}`)
        console.log(`  Notes: ${t.technicalNotes?.substring(0, 100)}${t.technicalNotes && t.technicalNotes.length > 100 ? '...' : ''}`)
        console.log(`  Updated: ${t.updatedAt}`)
        console.log('')
      })
    } else {
      console.log('Aucune note technique trouvée dans la base de données.')
    }

    // Vérifier aussi l'historique
    const history = await prisma.technicalHistory.findMany({
      select: {
        id: true,
        technicalId: true,
        notes: true,
        version: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    console.log(`\nNombre d'entrées dans l'historique: ${history.length}`)
    if (history.length > 0) {
      console.log('\nDernières entrées de l\'historique:')
      history.forEach((h) => {
        console.log(`- Version ${h.version} (Technical ID: ${h.technicalId})`)
        console.log(`  Notes: ${h.notes?.substring(0, 100)}${h.notes && h.notes.length > 100 ? '...' : ''}`)
        console.log(`  Created: ${h.createdAt}`)
        console.log('')
      })
    }
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkTechnicalNotes()

