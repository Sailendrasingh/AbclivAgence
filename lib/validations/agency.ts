/**
 * Schémas de validation Zod pour les agences
 * Conforme ASVS Niveau 3
 */

import { z } from "zod"

/**
 * Schéma pour la création d'une agence
 */
export const createAgencySchema = z.object({
  name: z
    .string()
    .min(1, "Le nom de l'agence est obligatoire")
    .max(200, "Le nom de l'agence ne peut pas dépasser 200 caractères"),
  photo: z.string().url("L'URL de la photo doit être valide").optional().nullable(),
  state: z.enum(["OK", "INFO", "ALERTE", "FERMÉE"]).optional().default("ALERTE"),
  codeAgence: z
    .string()
    .max(50, "Le code agence ne peut pas dépasser 50 caractères")
    .optional()
    .nullable(),
  codeRayon: z
    .string()
    .max(50, "Le code rayon ne peut pas dépasser 50 caractères")
    .optional()
    .nullable(),
  dateOuverture: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
  dateFermeture: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
  validatedAt: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
})

/**
 * Schéma pour la mise à jour d'une agence
 */
export const updateAgencySchema = z.object({
  name: z
    .string()
    .min(1, "Le nom de l'agence est obligatoire")
    .max(200, "Le nom de l'agence ne peut pas dépasser 200 caractères")
    .optional(),
  photo: z.string().url("L'URL de la photo doit être valide").optional().nullable(),
  state: z.enum(["OK", "INFO", "ALERTE", "FERMÉE"]).optional(),
  codeAgence: z
    .string()
    .max(50, "Le code agence ne peut pas dépasser 50 caractères")
    .optional()
    .nullable(),
  codeRayon: z
    .string()
    .max(50, "Le code rayon ne peut pas dépasser 50 caractères")
    .optional()
    .nullable(),
  dateOuverture: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
  dateFermeture: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
  validatedAt: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
})
