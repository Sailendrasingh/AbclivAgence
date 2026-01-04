/**
 * Middleware de validation Zod pour les routes API
 * Conforme ASVS Niveau 3
 */

import { NextRequest, NextResponse } from "next/server"
import { ZodSchema, ZodError } from "zod"

/**
 * Valide les données de la requête avec un schéma Zod
 * 
 * @param request - La requête Next.js
 * @param schema - Le schéma Zod à utiliser pour la validation
 * @returns Les données validées ou une erreur 400
 */
export async function validateRequest<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: NextResponse }> {
  try {
    const body = await request.json()
    
    // Utiliser safeParse pour avoir plus de contrôle sur les erreurs
    const result = schema.safeParse(body)
    
    if (result.success) {
      return { success: true, data: result.data }
    }
    
    // Formater les erreurs Zod de manière lisible
    const errors = result.error.issues?.map((err) => ({
      path: err.path?.join(".") || "unknown",
      message: err.message || "Erreur de validation",
    })) || []
    
    console.error("[VALIDATION] Erreurs de validation:", errors)
    console.error("[VALIDATION] Données reçues:", JSON.stringify(body, null, 2))
    
    // Créer un message d'erreur principal plus descriptif
    // Si c'est une erreur de mot de passe, combiner tous les messages
    const passwordErrors = errors.filter(err => err.path === "password")
    let mainErrorMessage = "Erreur de validation"
    
    if (passwordErrors.length > 0) {
      // Pour les erreurs de mot de passe, combiner tous les messages
      mainErrorMessage = passwordErrors.map(err => err.message).join(". ")
    } else if (errors.length === 1) {
      // Si une seule erreur, utiliser son message directement
      mainErrorMessage = errors[0].message
    } else if (errors.length > 1) {
      // Si plusieurs erreurs, créer un message combiné
      const errorMessages = errors.map(err => {
        const fieldName = err.path === "unknown" ? "Champ" : err.path
        return `${fieldName}: ${err.message}`
      })
      mainErrorMessage = errorMessages.join("; ")
    }
    
    return {
      success: false,
      error: NextResponse.json(
        {
          error: mainErrorMessage,
          details: errors,
        },
        { status: 400 }
      ),
    }
  } catch (error) {
    // Erreur de parsing JSON ou autre erreur
    console.error("[VALIDATION] Erreur inattendue:", error)
    return {
      success: false,
      error: NextResponse.json(
        { 
          error: "Format JSON invalide",
          details: error instanceof Error ? [{ path: "unknown", message: error.message }] : [{ path: "unknown", message: "Erreur inconnue" }]
        },
        { status: 400 }
      ),
    }
  }
}

/**
 * Valide les données avec un schéma Zod (pour les données déjà parsées)
 * 
 * @param data - Les données à valider
 * @param schema - Le schéma Zod à utiliser
 * @returns Les données validées ou une erreur
 */
export function validateData<T>(
  data: unknown,
  schema: ZodSchema<T>
): { success: true; data: T } | { success: false; error: string; details: any[] } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues?.map((err) => ({
        path: err.path?.join(".") || "unknown",
        message: err.message || "Erreur de validation",
      })) || []
      
      return {
        success: false,
        error: "Erreur de validation",
        details: errors,
      }
    }
    
    console.error("[VALIDATION] Erreur inattendue:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur de validation inconnue",
      details: [],
    }
  }
}

