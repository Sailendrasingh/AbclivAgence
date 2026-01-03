import { Worker } from "worker_threads"
import { join } from "path"
import { promisify } from "util"

/**
 * Interface pour les options de redimensionnement
 */
export interface ResizeOptions {
  width: number
  height: number
  fit?: "cover" | "contain" | "fill" | "inside" | "outside"
  position?: "center" | "top" | "right" | "bottom" | "left"
}

/**
 * Interface pour le résultat du traitement
 */
export interface ProcessResult {
  success: boolean
  buffer?: Buffer
  error?: string
}

/**
 * Traite une image dans un worker thread isolé (sandbox)
 * @param inputBuffer Buffer de l'image à traiter
 * @param options Options de redimensionnement
 * @returns Buffer de l'image traitée
 */
export async function processImageInSandbox(
  inputBuffer: Buffer,
  options: ResizeOptions
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // Créer un worker thread pour isoler le traitement
    const workerPath = join(process.cwd(), "lib", "image-worker.js")
    
    let worker: Worker
    try {
      // Vérifier que le fichier worker existe
      const fs = require("fs")
      if (!fs.existsSync(workerPath)) {
        reject(new Error("Worker thread non disponible"))
        return
      }

      worker = new Worker(workerPath, {
        workerData: {
          buffer: inputBuffer,
          options,
        },
      })
    } catch (error: any) {
      // Si le worker ne peut pas être créé, rejeter pour utiliser le fallback
      reject(new Error(`Worker thread non disponible: ${error.message}`))
      return
    }

    const timeout = setTimeout(() => {
      worker.terminate()
      reject(new Error("Timeout lors du traitement de l'image (sandbox)"))
    }, 30000) // 30 secondes de timeout

    worker.on("message", (result: ProcessResult) => {
      clearTimeout(timeout)
      worker.terminate()

      if (result.success && result.buffer) {
        resolve(Buffer.from(result.buffer))
      } else {
        reject(new Error(result.error || "Erreur lors du traitement de l'image"))
      }
    })

    worker.on("error", (error) => {
      clearTimeout(timeout)
      worker.terminate()
      reject(error)
    })

    worker.on("exit", (code) => {
      clearTimeout(timeout)
      if (code !== 0) {
        reject(new Error(`Worker arrêté avec le code ${code}`))
      }
    })
  })
}

/**
 * Traite une image directement (fallback si worker indisponible)
 * Utilise un timeout pour limiter le temps d'exécution
 * @param inputBuffer Buffer de l'image à traiter
 * @param options Options de redimensionnement
 * @returns Buffer de l'image traitée
 */
export async function processImageDirect(
  inputBuffer: Buffer,
  options: ResizeOptions
): Promise<Buffer> {
  // Importer sharp dynamiquement
  const sharp = (await import("sharp")).default

  // Créer une promesse avec timeout
  const processPromise = sharp(inputBuffer)
    .resize(options.width, options.height, {
      fit: options.fit || "cover",
      position: options.position || "center",
    })
    .toBuffer()

  // Timeout de 10 secondes
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Timeout lors du traitement de l'image")), 10000)
  })

  try {
    return await Promise.race([processPromise, timeoutPromise])
  } catch (error: any) {
    throw new Error(`Erreur lors du traitement de l'image: ${error.message}`)
  }
}

/**
 * Traite une image de manière sécurisée (sandbox si disponible, sinon direct avec timeout)
 * @param inputBuffer Buffer de l'image à traiter
 * @param options Options de redimensionnement
 * @returns Buffer de l'image traitée
 */
export async function processImageSecurely(
  inputBuffer: Buffer,
  options: ResizeOptions
): Promise<Buffer> {
  try {
    // Essayer d'abord avec le sandbox (worker thread)
    return await processImageInSandbox(inputBuffer, options)
  } catch (error: any) {
    // Si le worker n'est pas disponible, utiliser le traitement direct avec timeout
    console.warn("[IMAGE-SANDBOX] Worker indisponible, utilisation du mode direct:", error.message)
    return await processImageDirect(inputBuffer, options)
  }
}

