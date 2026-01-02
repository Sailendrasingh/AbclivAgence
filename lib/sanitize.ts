/**
 * Utilitaires de sanitization et encodage pour prévenir les attaques XSS
 * Conforme ASVS Niveau 3
 * 
 * Note: Utilise une sanitization manuelle pour éviter les dépendances externes
 * Pour une protection maximale, considérer l'utilisation de DOMPurify
 */

/**
 * Liste des tags HTML autorisés pour le contenu riche
 */
const ALLOWED_TAGS_RICH = ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"]

/**
 * Regex pour supprimer tous les tags HTML
 */
const HTML_TAG_REGEX = /<[^>]*>/g

/**
 * Regex pour détecter les attributs dangereux dans les tags
 */
const DANGEROUS_ATTR_REGEX = /(on\w+\s*=|javascript:|data:text\/html|vbscript:)/gi

/**
 * Sanitize une chaîne de caractères pour prévenir XSS
 * Supprime tous les tags HTML et encode les caractères spéciaux
 * 
 * @param input - La chaîne à sanitizer
 * @param allowRichContent - Si true, permet certains tags HTML de base (défaut: false)
 * @returns La chaîne sanitizée
 */
export function sanitize(input: string | null | undefined, allowRichContent: boolean = false): string {
  if (!input || typeof input !== "string") {
    return ""
  }

  // Détecter et supprimer les attributs dangereux
  let sanitized = input.replace(DANGEROUS_ATTR_REGEX, "")

  if (allowRichContent) {
    // Pour le contenu riche, supprimer tous les tags sauf ceux autorisés
    // Extraire le contenu des tags autorisés
    const allowedTagsPattern = ALLOWED_TAGS_RICH.join("|")
    const allowedTagRegex = new RegExp(`<(/?)(${allowedTagsPattern})([^>]*)>`, "gi")
    
    // Remplacer les tags autorisés par leur version sécurisée (sans attributs dangereux)
    sanitized = sanitized.replace(allowedTagRegex, (match, closing, tag, attrs) => {
      if (closing) {
        return `</${tag}>`
      }
      // Pour les liens, extraire seulement href si présent et valide
      if (tag === "a" && attrs) {
        const hrefMatch = attrs.match(/href\s*=\s*["']([^"']+)["']/i)
        if (hrefMatch) {
          const href = sanitizeUrl(hrefMatch[1])
          return href ? `<a href="${encodeHtmlAttribute(href)}">` : `<${tag}>`
        }
      }
      return `<${tag}>`
    })
    
    // Supprimer tous les autres tags HTML
    sanitized = sanitized.replace(HTML_TAG_REGEX, "")
  } else {
    // Supprimer tous les tags HTML
    sanitized = sanitized.replace(HTML_TAG_REGEX, "")
  }

  // Encoder les caractères spéciaux restants
  return encodeHtml(sanitized)
}

/**
 * Sanitize un objet récursivement
 * 
 * @param obj - L'objet à sanitizer
 * @param allowRichContent - Si true, permet certains tags HTML de base
 * @returns L'objet sanitizé
 */
export function sanitizeObject<T>(obj: T, allowRichContent: boolean = false): T {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj === "string") {
    return sanitize(obj, allowRichContent) as T
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item, allowRichContent)) as T
  }

  if (typeof obj === "object") {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value, allowRichContent)
    }
    return sanitized as T
  }

  return obj
}

/**
 * Encode une chaîne pour l'affichage HTML (échappe les caractères spéciaux)
 * Alternative à sanitize() pour un encodage simple
 * 
 * @param input - La chaîne à encoder
 * @returns La chaîne encodée
 */
export function encodeHtml(input: string | null | undefined): string {
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

/**
 * Encode une chaîne pour l'utilisation dans les attributs HTML
 * 
 * @param input - La chaîne à encoder
 * @returns La chaîne encodée
 */
export function encodeHtmlAttribute(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return ""
  }

  return encodeHtml(input).replace(/"/g, "&quot;")
}

/**
 * Encode une chaîne pour l'utilisation dans les URLs
 * 
 * @param input - La chaîne à encoder
 * @returns La chaîne encodée
 */
export function encodeUrl(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return ""
  }

  return encodeURIComponent(input)
}

/**
 * Valide et sanitize une URL
 * 
 * @param url - L'URL à valider et sanitizer
 * @returns L'URL sanitizée ou une chaîne vide si invalide
 */
export function sanitizeUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") {
    return ""
  }

  try {
    const parsed = new URL(url)
    // Autoriser seulement http, https, mailto, tel
    const allowedProtocols = ["http:", "https:", "mailto:", "tel:"]
    if (!allowedProtocols.includes(parsed.protocol)) {
      return ""
    }
    return parsed.toString()
  } catch {
    return ""
  }
}

