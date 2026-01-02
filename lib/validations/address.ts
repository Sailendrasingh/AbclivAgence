/**
 * Schémas de validation Zod pour les adresses
 * Conforme ASVS Niveau 3
 */

import { z } from "zod"

/**
 * Schéma pour la création d'une adresse
 */
export const createAddressSchema = z.object({
  agencyId: z.string().min(1, "L'ID de l'agence est requis"),
  banId: z
    .string()
    .max(100, "Le BAN ID ne peut pas dépasser 100 caractères")
    .optional()
    .nullable(),
  label: z
    .string()
    .min(1, "Le libellé est obligatoire")
    .max(200, "Le libellé ne peut pas dépasser 200 caractères"),
  street: z
    .string()
    .min(1, "La rue est obligatoire")
    .max(200, "La rue ne peut pas dépasser 200 caractères"),
  city: z
    .string()
    .min(1, "La ville est obligatoire")
    .max(100, "La ville ne peut pas dépasser 100 caractères"),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, "Le code postal doit contenir exactement 5 chiffres"),
  country: z
    .string()
    .max(100, "Le pays ne peut pas dépasser 100 caractères")
    .default("France"),
  latitude: z
    .number()
    .min(-90, "La latitude doit être entre -90 et 90")
    .max(90, "La latitude doit être entre -90 et 90")
    .optional()
    .nullable(),
  longitude: z
    .number()
    .min(-180, "La longitude doit être entre -180 et 180")
    .max(180, "La longitude doit être entre -180 et 180")
    .optional()
    .nullable(),
})

/**
 * Schéma pour la mise à jour d'une adresse
 */
export const updateAddressSchema = z.object({
  banId: z
    .string()
    .max(100, "Le BAN ID ne peut pas dépasser 100 caractères")
    .optional()
    .nullable(),
  label: z
    .string()
    .min(1, "Le libellé est obligatoire")
    .max(200, "Le libellé ne peut pas dépasser 200 caractères")
    .optional(),
  street: z
    .string()
    .min(1, "La rue est obligatoire")
    .max(200, "La rue ne peut pas dépasser 200 caractères")
    .optional(),
  city: z
    .string()
    .min(1, "La ville est obligatoire")
    .max(100, "La ville ne peut pas dépasser 100 caractères")
    .optional(),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, "Le code postal doit contenir exactement 5 chiffres")
    .optional(),
  country: z
    .string()
    .max(100, "Le pays ne peut pas dépasser 100 caractères")
    .optional(),
  latitude: z
    .number()
    .min(-90, "La latitude doit être entre -90 et 90")
    .max(90, "La latitude doit être entre -90 et 90")
    .optional()
    .nullable(),
  longitude: z
    .number()
    .min(-180, "La longitude doit être entre -180 et 180")
    .max(180, "La longitude doit être entre -180 et 180")
    .optional()
    .nullable(),
})

