/**
 * Utilitaires de sanitization côté client pour prévenir les attaques XSS
 * Conforme ASVS Niveau 3
 * 
 * Note: Utilise la même logique que lib/sanitize.ts pour la cohérence
 */

"use client"

import { sanitize as sanitizeServer, encodeHtml as encodeHtmlServer } from "@/lib/sanitize"

/**
 * Sanitize une chaîne de caractères côté client
 * 
 * @param input - La chaîne à sanitizer
 * @param allowRichContent - Si true, permet certains tags HTML de base
 * @returns La chaîne sanitizée
 */
export function sanitizeClient(input: string | null | undefined, allowRichContent: boolean = false): string {
  // Utiliser la même logique que côté serveur
  return sanitizeServer(input, allowRichContent)
}

/**
 * Encode une chaîne pour l'affichage HTML côté client
 * 
 * @param input - La chaîne à encoder
 * @returns La chaîne encodée
 */
export function encodeHtmlClient(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return ""
  }

  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  }

  return input.replace(/[&<>"'/]/g, (char) => map[char] || char)
}

