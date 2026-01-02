/**
 * Schémas de validation Zod pour les PCs
 * Conforme ASVS Niveau 3
 */

import { z } from "zod"

/**
 * Schéma pour un fichier PC
 */
const pcFileSchema = z.object({
  path: z.string().min(1, "Le chemin du fichier est requis"),
  createdAt: z.union([z.string().datetime(), z.date()]).optional(),
})

/**
 * Schéma pour une photo PC
 */
const pcPhotoSchema = z.object({
  path: z.string().min(1, "Le chemin de la photo est requis"),
  createdAt: z.union([z.string().datetime(), z.date()]).optional(),
})

/**
 * Schéma pour la création d'un PC
 */
export const createPCSchema = z.object({
  technicalId: z.string().min(1, "L'ID technique est requis"),
  name: z
    .string()
    .min(1, "Le nom est obligatoire")
    .max(200, "Le nom ne peut pas dépasser 200 caractères"),
  ip: z
    .string()
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, "L'adresse IP doit être valide (format: xxx.xxx.xxx.xxx)")
    .optional()
    .nullable(),
  mac: z
    .string()
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, "L'adresse MAC doit être valide (format: XX:XX:XX:XX:XX:XX)")
    .optional()
    .nullable(),
  serialNumber: z
    .string()
    .max(100, "Le numéro de série ne peut pas dépasser 100 caractères")
    .optional()
    .nullable(),
  brand: z
    .string()
    .max(100, "La marque ne peut pas dépasser 100 caractères")
    .optional()
    .nullable(),
  model: z
    .string()
    .max(100, "Le modèle ne peut pas dépasser 100 caractères")
    .optional()
    .nullable(),
  purchaseDate: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
  warrantyDate: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
  files: z
    .array(pcFileSchema)
    .optional()
    .nullable(),
  photos: z
    .array(pcPhotoSchema)
    .optional()
    .nullable(),
})

/**
 * Schéma pour la mise à jour d'un PC
 */
export const updatePCSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est obligatoire")
    .max(200, "Le nom ne peut pas dépasser 200 caractères")
    .optional(),
  ip: z
    .string()
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, "L'adresse IP doit être valide (format: xxx.xxx.xxx.xxx)")
    .optional()
    .nullable(),
  mac: z
    .string()
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, "L'adresse MAC doit être valide (format: XX:XX:XX:XX:XX:XX)")
    .optional()
    .nullable(),
  serialNumber: z
    .string()
    .max(100, "Le numéro de série ne peut pas dépasser 100 caractères")
    .optional()
    .nullable(),
  brand: z
    .string()
    .max(100, "La marque ne peut pas dépasser 100 caractères")
    .optional()
    .nullable(),
  model: z
    .string()
    .max(100, "Le modèle ne peut pas dépasser 100 caractères")
    .optional()
    .nullable(),
  purchaseDate: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
  warrantyDate: z
    .union([z.string().datetime(), z.date()])
    .optional()
    .nullable()
    .transform((val) => val ? (typeof val === "string" ? new Date(val) : val) : null),
  files: z
    .array(pcFileSchema)
    .optional()
    .nullable(),
  photos: z
    .array(pcPhotoSchema)
    .optional()
    .nullable(),
  order: z.number().int().min(0).optional(),
})
