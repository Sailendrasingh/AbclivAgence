#!/usr/bin/env node

/**
 * Script de nettoyage périodique de la quarantaine
 * À exécuter via cron ou task scheduler
 * 
 * Note: Ce script nécessite que les modules TypeScript soient compilés
 * ou utilisez ts-node pour l'exécuter directement
 */

// Import dynamique pour supporter les modules ES
async function main() {
  const { cleanOldQuarantineFiles } = await import("../lib/quarantine")
  
  console.log("[CLEAN-QUARANTINE] Démarrage du nettoyage...")
  
  try {
    // Nettoyer les fichiers plus anciens que 24h
    await cleanOldQuarantineFiles(24 * 60 * 60 * 1000)
    console.log("[CLEAN-QUARANTINE] Nettoyage terminé avec succès")
  } catch (error) {
    console.error("[CLEAN-QUARANTINE] Erreur lors du nettoyage:", error)
    process.exit(1)
  }
}

main()

async function main() {
  console.log("[CLEAN-QUARANTINE] Démarrage du nettoyage...")
  
  try {
    // Nettoyer les fichiers plus anciens que 24h
    await cleanOldQuarantineFiles(24 * 60 * 60 * 1000)
    console.log("[CLEAN-QUARANTINE] Nettoyage terminé avec succès")
  } catch (error) {
    console.error("[CLEAN-QUARANTINE] Erreur lors du nettoyage:", error)
    process.exit(1)
  }
}

main()

