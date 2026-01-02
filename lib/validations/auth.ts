/**
 * Schémas de validation Zod pour l'authentification
 * Conforme ASVS Niveau 3
 */

import { z } from "zod"

/**
 * Schéma pour la connexion
 */
export const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Le login est requis")
    .max(50, "Le login ne peut pas dépasser 50 caractères"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .max(128, "Le mot de passe ne peut pas dépasser 128 caractères"),
  twoFactorToken: z
    .string()
    .length(6, "Le code 2FA doit contenir 6 chiffres")
    .regex(/^\d{6}$/, "Le code 2FA doit contenir uniquement des chiffres")
    .optional(),
})

/**
 * Schéma pour la configuration 2FA
 */
export const setup2FASchema = z.object({
  userId: z.string().min(1, "L'ID utilisateur est requis"),
})

/**
 * Schéma pour l'activation/désactivation 2FA
 */
export const toggle2FASchema = z.object({
  userId: z.string().min(1, "L'ID utilisateur est requis"),
  token: z
    .string()
    .length(6, "Le code 2FA doit contenir 6 chiffres")
    .regex(/^\d{6}$/, "Le code 2FA doit contenir uniquement des chiffres"),
})

