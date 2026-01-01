import { PrismaClient } from '@prisma/client'
import { stat, readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import exifr from 'exifr'

const prisma = new PrismaClient()

async function migratePhotosCreatedAt() {
  try {
    console.log('Début de la migration des dates de création des photos...\n')

    // Récupérer tous les groupes de photos
    const photoGroups = await prisma.photoGroup.findMany({
      select: {
        id: true,
        photos: true,
      },
    })

    console.log(`Nombre de groupes de photos à traiter: ${photoGroups.length}\n`)

    let totalPhotos = 0
    let updatedPhotos = 0
    let errors = 0

    for (const photoGroup of photoGroups) {
      try {
        const photos = JSON.parse(photoGroup.photos || '[]')
        
        if (!Array.isArray(photos) || photos.length === 0) {
          continue
        }

        const updatedPhotosArray = await Promise.all(
          photos.map(async (photo: string | { path: string; createdAt?: string }) => {
            totalPhotos++

            // Extraire le path (toujours forcer la mise à jour depuis le fichier système)
            const photoPath = typeof photo === 'string' ? photo : photo.path

            // Retirer le préfixe /uploads/ pour obtenir le nom du fichier
            const filename = photoPath.replace(/^\/uploads\//, '')
            const filepath = join(process.cwd(), 'uploads', filename)

            // Vérifier si le fichier existe
            if (!existsSync(filepath)) {
              console.warn(`⚠️  Fichier non trouvé: ${filepath}`)
              // Si le fichier n'existe pas, on garde le format actuel avec la date existante ou une date par défaut
              return typeof photo === 'string' 
                ? { path: photo, createdAt: new Date().toISOString() }
                : { path: photo.path, createdAt: photo.createdAt || new Date().toISOString() }
            }

            try {
              // Essayer d'abord de lire la date depuis les métadonnées EXIF de l'image
              let createdAt: Date | null = null
              
              try {
                const fileBuffer = await readFile(filepath)
                const exifData = await exifr.parse(fileBuffer, {
                  pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate', 'FileModifyDate']
                })
                
                // Priorité : DateTimeOriginal > CreateDate > ModifyDate
                if (exifData?.DateTimeOriginal) {
                  createdAt = new Date(exifData.DateTimeOriginal)
                } else if (exifData?.CreateDate) {
                  createdAt = new Date(exifData.CreateDate)
                } else if (exifData?.ModifyDate) {
                  createdAt = new Date(exifData.ModifyDate)
                }
              } catch (exifError) {
                // Si la lecture EXIF échoue, on continue avec les métadonnées du système de fichiers
              }
              
              // Si pas de date EXIF, utiliser la date de création du fichier système
              if (!createdAt || isNaN(createdAt.getTime())) {
                const fileStats = await stat(filepath)
                
                // Sur Windows, birthtime est la date de création du fichier
                // Vérifier si birthtime est valide (pas une date invalide)
                if (fileStats.birthtime && fileStats.birthtime.getTime() > 0) {
                  createdAt = fileStats.birthtime
                } else if (fileStats.birthtimeMs && fileStats.birthtimeMs > 0) {
                  createdAt = new Date(fileStats.birthtimeMs)
                } else {
                  // Fallback sur mtime si birthtime n'est pas disponible
                  createdAt = fileStats.mtime
                }
              }

              updatedPhotos++
              console.log(`  → ${filename}: ${createdAt.toLocaleDateString('fr-FR')} ${createdAt.toLocaleTimeString('fr-FR')}`)
              
              return {
                path: photoPath,
                createdAt: createdAt.toISOString(),
              }
            } catch (statError) {
              console.warn(`⚠️  Erreur lors de la lecture de ${filepath}:`, statError)
              // En cas d'erreur, on garde le format actuel avec la date existante ou une date par défaut
              return typeof photo === 'string'
                ? { path: photo, createdAt: new Date().toISOString() }
                : { path: photo.path, createdAt: photo.createdAt || new Date().toISOString() }
            }
          })
        )

        // Mettre à jour le groupe de photos dans la base de données
        await prisma.photoGroup.update({
          where: { id: photoGroup.id },
          data: {
            photos: JSON.stringify(updatedPhotosArray),
          },
        })

        console.log(`✓ Groupe ${photoGroup.id} mis à jour (${updatedPhotosArray.length} photo(s))`)
      } catch (error) {
        errors++
        console.error(`✗ Erreur lors du traitement du groupe ${photoGroup.id}:`, error)
      }
    }

    console.log('\n=== Résumé de la migration ===')
    console.log(`Total de photos traitées: ${totalPhotos}`)
    console.log(`Photos mises à jour avec date de création: ${updatedPhotos}`)
    console.log(`Erreurs: ${errors}`)
    console.log('\nMigration terminée!')
  } catch (error) {
    console.error('Erreur lors de la migration:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

migratePhotosCreatedAt()

