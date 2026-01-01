import { prisma } from "./prisma"

export async function createAgencyHistory(
  agencyId: string,
  userId: string,
  data: string
) {
  try {
    // Compter les versions existantes
    const count = await prisma.agencyHistory.count({
      where: { agencyId },
    })

    // Si on dépasse 100 versions, supprimer les plus anciennes
    if (count >= 100) {
      const oldest = await prisma.agencyHistory.findFirst({
        where: { agencyId },
        orderBy: { createdAt: "asc" },
      })

      if (oldest) {
        await prisma.agencyHistory.delete({
          where: { id: oldest.id },
        })
      }
    }

    // Trouver le numéro de version suivant
    const lastVersion = await prisma.agencyHistory.findFirst({
      where: { agencyId },
      orderBy: { version: "desc" },
    })

    const nextVersion = lastVersion ? lastVersion.version + 1 : 1

    await prisma.agencyHistory.create({
      data: {
        agencyId,
        userId,
        data,
        version: nextVersion,
      },
    })
  } catch (error) {
    console.error("Error creating agency history:", error)
  }
}

export async function createTechnicalHistory(
  technicalId: string,
  userId: string,
  notes: string
) {
  try {
    // Compter les versions existantes
    const count = await prisma.technicalHistory.count({
      where: { technicalId },
    })

    // Si on dépasse 100 versions, supprimer les plus anciennes
    if (count >= 100) {
      const oldest = await prisma.technicalHistory.findFirst({
        where: { technicalId },
        orderBy: { createdAt: "asc" },
      })

      if (oldest) {
        await prisma.technicalHistory.delete({
          where: { id: oldest.id },
        })
      }
    }

    // Trouver le numéro de version suivant
    const lastVersion = await prisma.technicalHistory.findFirst({
      where: { technicalId },
      orderBy: { version: "desc" },
    })

    const nextVersion = lastVersion ? lastVersion.version + 1 : 1

    await prisma.technicalHistory.create({
      data: {
        technicalId,
        userId,
        notes,
        version: nextVersion,
      },
    })
  } catch (error) {
    console.error("Error creating technical history:", error)
  }
}

export async function getAgencyHistory(agencyId: string) {
  return await prisma.agencyHistory.findMany({
    where: { agencyId },
    orderBy: { version: "desc" },
    include: {
      user: {
        select: {
          login: true,
        },
      },
    },
  })
}

export async function getTechnicalHistory(technicalId: string) {
  return await prisma.technicalHistory.findMany({
    where: { technicalId },
    orderBy: { version: "desc" },
    include: {
      user: {
        select: {
          login: true,
        },
      },
    },
  })
}

export async function restoreAgencyVersion(
  agencyId: string,
  version: number,
  userId: string
) {
  try {
    const historyEntry = await prisma.agencyHistory.findFirst({
      where: {
        agencyId,
        version,
      },
    })

    if (!historyEntry) {
      throw new Error("Version non trouvée")
    }

    const data = JSON.parse(historyEntry.data)

    // Restaurer l'agence
    await prisma.agency.update({
      where: { id: agencyId },
      data: {
        name: data.name,
        photo: data.photo,
        state: data.state,
      },
    })

    // Créer une nouvelle entrée d'historique pour la restauration
    await createAgencyHistory(agencyId, userId, JSON.stringify(data))

    return true
  } catch (error) {
    console.error("Error restoring agency version:", error)
    throw error
  }
}

export async function restoreTechnicalNotes(
  technicalId: string,
  version: number,
  userId: string
) {
  try {
    const historyEntry = await prisma.technicalHistory.findFirst({
      where: {
        technicalId,
        version,
      },
    })

    if (!historyEntry) {
      throw new Error("Version non trouvée")
    }

    // Restaurer les notes techniques
    await prisma.technical.update({
      where: { id: technicalId },
      data: {
        technicalNotes: historyEntry.notes,
      },
    })

    // Créer une nouvelle entrée d'historique pour la restauration
    await createTechnicalHistory(technicalId, userId, historyEntry.notes || "")

    return true
  } catch (error) {
    console.error("Error restoring technical notes:", error)
    throw error
  }
}
