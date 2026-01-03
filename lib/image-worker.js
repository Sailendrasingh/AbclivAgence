const { parentPort, workerData } = require("worker_threads")
const sharp = require("sharp")

/**
 * Worker thread pour traiter les images de manière isolée
 * Ce worker s'exécute dans un contexte isolé pour limiter les risques de sécurité
 */

async function processImage() {
  try {
    const { buffer, options } = workerData

    if (!Buffer.isBuffer(buffer)) {
      throw new Error("Buffer invalide")
    }

    // Valider les options
    if (!options.width || !options.height || options.width < 1 || options.height < 1) {
      throw new Error("Dimensions invalides")
    }

    // Limiter la taille maximale pour éviter les attaques DoS
    if (buffer.length > 10 * 1024 * 1024) {
      throw new Error("Fichier trop volumineux (maximum 10 MB)")
    }

    // Traiter l'image avec sharp
    const processedBuffer = await sharp(buffer)
      .resize(options.width, options.height, {
        fit: options.fit || "cover",
        position: options.position || "center",
      })
      .toBuffer()

    // Envoyer le résultat au thread principal
    parentPort.postMessage({
      success: true,
      buffer: processedBuffer,
    })
  } catch (error) {
    // Envoyer l'erreur au thread principal
    parentPort.postMessage({
      success: false,
      error: error.message || "Erreur lors du traitement de l'image",
    })
  }
}

// Démarrer le traitement
processImage()

