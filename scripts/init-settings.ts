import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function initSettings() {
  try {
    console.log("Initialisation des paramètres de l'application...")

    const settings = await prisma.appSettings.upsert({
      where: { id: "settings" },
      update: {
        // Ne pas modifier si les paramètres existent déjà
      },
      create: {
        id: "settings",
        sessionTimeout: 1, // 1 minute par défaut
      },
    })

    console.log("Paramètres initialisés avec succès:", settings)
  } catch (error) {
    console.error("Erreur lors de l'initialisation des paramètres:", error)
  } finally {
    await prisma.$disconnect()
  }
}

initSettings()

