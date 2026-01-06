/**
 * Schémas de validation Zod pour les paramètres
 * Conforme ASVS Niveau 3
 */

import { z } from "zod"

/**
 * Schéma pour la mise à jour des paramètres
 */
export const updateSettingsSchema = z.object({
  sessionTimeout: z
    .number()
    .int("La durée de session doit être un nombre entier")
    .min(1, "La durée de session doit être d'au moins 1 minute")
    .max(1440, "La durée de session ne peut pas dépasser 1440 minutes (24 heures)"),
  maxImageSizeMB: z
    .number()
    .int("La taille maximale doit être un nombre entier")
    .min(1, "La taille maximale doit être d'au moins 1 Mo")
    .max(100, "La taille maximale ne peut pas dépasser 100 Mo")
    .optional(),
})

