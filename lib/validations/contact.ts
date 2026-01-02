/**
 * Schémas de validation Zod pour les contacts
 * Conforme ASVS Niveau 3
 */

import { z } from "zod"

/**
 * Schéma pour la création d'un contact
 */
export const createContactSchema = z.object({
  agencyId: z.string().min(1, "L'ID de l'agence est requis"),
  postNumber: z
    .union([
      z.string().regex(/^\d{6}$/, "Le numéro de poste doit contenir exactement 6 chiffres"),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((val) => val || ""),
  agentNumber: z
    .union([
      z.string().regex(/^\d{4}$/, "Le numéro d'agent doit contenir exactement 4 chiffres"),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((val) => val || ""),
  directLine: z
    .union([
      z.string().regex(/^(\d{2}\s?){5}$|^\d{10}$/, "La ligne directe doit contenir 10 chiffres (format: 00 00 00 00 00 ou 0000000000)"),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((val) => val || ""),
  emails: z
    .preprocess(
      (val) => {
        // Normaliser la valeur avant validation
        if (val === null || val === undefined) return []
        if (Array.isArray(val)) return val
        return []
      },
      z.array(z.string().email("Email invalide")).default([])
    )
    .optional()
    .default([]),
  managerName: z
    .string()
    .min(1, "Le nom du manager est obligatoire")
    .max(100, "Le nom du manager ne peut pas dépasser 100 caractères"),
  note: z
    .string()
    .max(1000, "La note ne peut pas dépasser 1000 caractères")
    .optional()
    .nullable(),
})

/**
 * Schéma pour la mise à jour d'un contact
 */
export const updateContactSchema = z.object({
  postNumber: z
    .union([
      z.string().regex(/^\d{6}$/, "Le numéro de poste doit contenir exactement 6 chiffres"),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((val) => val || ""),
  agentNumber: z
    .union([
      z.string().regex(/^\d{4}$/, "Le numéro d'agent doit contenir exactement 4 chiffres"),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((val) => val || ""),
  directLine: z
    .union([
      z.string().regex(/^(\d{2}\s?){5}$|^\d{10}$/, "La ligne directe doit contenir 10 chiffres (format: 00 00 00 00 00 ou 0000000000)"),
      z.literal(""),
      z.null(),
    ])
    .optional()
    .transform((val) => val || ""),
  emails: z
    .preprocess(
      (val) => {
        // Normaliser la valeur avant validation
        if (val === null || val === undefined) return []
        if (Array.isArray(val)) return val
        return []
      },
      z.array(z.string().email("Email invalide")).optional()
    )
    .optional(),
  managerName: z
    .string()
    .min(1, "Le nom du manager est obligatoire")
    .max(100, "Le nom du manager ne peut pas dépasser 100 caractères")
    .optional(),
  note: z
    .string()
    .max(1000, "La note ne peut pas dépasser 1000 caractères")
    .optional()
    .nullable(),
  order: z.number().int().min(0).optional(),
})
