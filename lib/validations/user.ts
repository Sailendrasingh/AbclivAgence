/**
 * Schémas de validation Zod pour les utilisateurs
 * Conforme ASVS Niveau 3
 */

import { z } from "zod"

/**
 * Schéma pour la création d'un utilisateur
 */
export const createUserSchema = z.object({
  login: z
    .string()
    .min(3, "Le login doit contenir au moins 3 caractères")
    .max(50, "Le login ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-Z0-9._-]+$/, "Le login ne peut contenir que des lettres, chiffres, points, tirets et underscores"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  role: z.enum(["User", "Admin", "Super Admin"]).optional().default("User"),
})

/**
 * Schéma pour la mise à jour d'un utilisateur
 */
export const updateUserSchema = z.object({
  login: z
    .string()
    .min(3, "Le login doit contenir au moins 3 caractères")
    .max(50, "Le login ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-Z0-9._-]+$/, "Le login ne peut contenir que des lettres, chiffres, points, tirets et underscores")
    .optional(),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial")
    .optional(),
  role: z.enum(["User", "Admin", "Super Admin"]).optional(),
  active: z.boolean().optional(),
})

/**
 * Schéma pour la mise à jour du profil utilisateur
 */
export const updateProfileSchema = z.object({
  login: z
    .string()
    .min(3, "Le login doit contenir au moins 3 caractères")
    .max(50, "Le login ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-Z0-9._-]+$/, "Le login ne peut contenir que des lettres, chiffres, points, tirets et underscores")
    .optional(),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial")
    .optional(),
})

