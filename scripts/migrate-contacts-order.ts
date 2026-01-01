import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function migrateContactsOrder() {
  try {
    // Récupérer toutes les agences
    const agencies = await prisma.agency.findMany({
      include: {
        contacts: {
          orderBy: { createdAt: "asc" },
        },
      },
    })

    for (const agency of agencies) {
      // Initialiser l'ordre pour chaque contact de l'agence
      for (let i = 0; i < agency.contacts.length; i++) {
        await prisma.contact.update({
          where: { id: agency.contacts[i].id },
          data: { order: i },
        })
      }
    }

    console.log("Migration de l'ordre des contacts terminée avec succès")
  } catch (error) {
    console.error("Erreur lors de la migration:", error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateContactsOrder()

