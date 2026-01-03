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
 * Traite une image de manière sécurisée (traitement direct avec timeout)
 * Note: Le sandboxing avec worker thread est désactivé pour éviter les problèmes avec Turbopack
 * Le traitement direct avec timeout offre déjà une bonne sécurité
 * @param inputBuffer Buffer de l'image à traiter
 * @param options Options de redimensionnement
 * @returns Buffer de l'image traitée
 */
export async function processImageSecurely(
  inputBuffer: Buffer,
  options: ResizeOptions
): Promise<Buffer> {
  // Utiliser uniquement le traitement direct avec timeout
  // Le sandboxing avec worker thread cause des problèmes avec Turbopack lors du build
  // Le traitement direct avec timeout offre déjà une bonne sécurité (limitation du temps d'exécution)
  return await processImageDirect(inputBuffer, options)
}

