#!/usr/bin/env node

/**
 * Script de nettoyage périodique de la quarantaine
 * À exécuter via cron ou task scheduler
 * 
 * Usage: npx tsx scripts/clean-quarantine.ts
 */

import { cleanOldQuarantineFiles } from "../lib/quarantine";

async function main() {
  console.log("[CLEAN-QUARANTINE] Démarrage du nettoyage...");
  
  try {
    // Nettoyer les fichiers plus anciens que 24h
    await cleanOldQuarantineFiles(24 * 60 * 60 * 1000);
    console.log("[CLEAN-QUARANTINE] Nettoyage terminé avec succès");
  } catch (error) {
    console.error("[CLEAN-QUARANTINE] Erreur lors du nettoyage:", error);
    process.exit(1);
  }
}

main();
