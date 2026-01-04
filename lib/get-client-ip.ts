/**
 * Utilitaire pour extraire l'adresse IP réelle du client
 * Gère les proxies, load balancers et les chaînes d'IPs
 */

import { NextRequest } from "next/server"

/**
 * Vérifie si une IP est valide et n'est pas une IP suspecte
 */
function isValidIP(ip: string): boolean {
  if (!ip || ip.trim().length === 0) {
    return false
  }

  // IPs localhost valides
  if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost" || ip.startsWith("127.") || ip.startsWith("::")) {
    return true
  }

  // Vérifier le format IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (ipv4Regex.test(ip)) {
    const parts = ip.split(".")
    // Vérifier que chaque partie est entre 0 et 255
    for (const part of parts) {
      const num = parseInt(part, 10)
      if (isNaN(num) || num < 0 || num > 255) {
        return false
      }
    }
    // Filtrer les IPs privées suspectes qui ne devraient pas être dans x-forwarded-for
    // (sauf si on est vraiment en localhost)
    const firstOctet = parseInt(parts[0], 10)
    if (firstOctet === 10 || firstOctet === 172 || firstOctet === 192) {
      // IP privée - OK si c'est vraiment localhost
      return true
    }
    return true
  }

  // IPv6 (format simplifié)
  if (ip.includes(":") && ip.length > 0) {
    return true
  }

  return false
}

/**
 * Extrait l'adresse IP réelle du client depuis les headers de la requête
 * 
 * Ordre de priorité :
 * 1. Détection localhost (si URL contient localhost ou 127.0.0.1)
 * 2. x-forwarded-for (peut contenir plusieurs IPs séparées par des virgules) - filtré
 * 3. x-real-ip
 * 4. cf-connecting-ip (Cloudflare)
 * 5. true-client-ip (Akamai)
 * 6. x-client-ip
 * 
 * @param request - La requête Next.js
 * @returns L'adresse IP du client ou null si non disponible
 */
export function getClientIP(request: NextRequest | Request | null | undefined): string | null {
  if (!request) {
    return null
  }

  // Fonction helper pour obtenir un header
  const getHeader = (name: string): string | null => {
    if (request instanceof NextRequest) {
      return request.headers.get(name)
    }
    if (request instanceof Request) {
      return request.headers.get(name)
    }
    return null
  }

  // Fonction helper pour obtenir l'URL
  const getUrl = (): string | null => {
    if (request instanceof NextRequest) {
      return request.url
    }
    if (request instanceof Request) {
      return request.url
    }
    return null
  }

  // Détecter si on est en localhost
  const url = getUrl()
  if (url) {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.toLowerCase()
      
      // Si l'URL contient localhost ou 127.0.0.1, retourner localhost
      if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname.startsWith("127.")) {
        return "127.0.0.1"
      }
    } catch {
      // Ignorer les erreurs de parsing d'URL
    }
  }

  // x-forwarded-for peut contenir plusieurs IPs séparées par des virgules
  // Format: "client-ip, proxy1-ip, proxy2-ip"
  // On prend la première IP valide (celle du client réel)
  const xForwardedFor = getHeader("x-forwarded-for")
  if (xForwardedFor) {
    // Nettoyer et prendre la première IP valide
    const ips = xForwardedFor.split(",").map(ip => ip.trim()).filter(ip => ip.length > 0)
    for (const ip of ips) {
      // Filtrer les IPs invalides ou suspectes
      if (isValidIP(ip)) {
        // En localhost, ignorer les IPs publiques suspectes dans x-forwarded-for
        if (url && (url.includes("localhost") || url.includes("127.0.0.1"))) {
          // Si on est en localhost et que l'IP est publique, c'est suspect
          // Retourner localhost à la place
          const firstOctet = parseInt(ip.split(".")[0] || "0", 10)
          if (firstOctet > 0 && firstOctet !== 127 && firstOctet !== 10 && firstOctet !== 172 && firstOctet !== 192) {
            // IP publique en localhost = suspect, retourner localhost
            return "127.0.0.1"
          }
        }
        return ip
      }
    }
  }

  // x-real-ip (souvent utilisé par Nginx)
  const xRealIP = getHeader("x-real-ip")
  if (xRealIP && isValidIP(xRealIP.trim())) {
    const ip = xRealIP.trim()
    // Vérifier si on est en localhost
    if (url && (url.includes("localhost") || url.includes("127.0.0.1"))) {
      const firstOctet = parseInt(ip.split(".")[0] || "0", 10)
      if (firstOctet > 0 && firstOctet !== 127 && firstOctet !== 10 && firstOctet !== 172 && firstOctet !== 192) {
        return "127.0.0.1"
      }
    }
    return ip
  }

  // cf-connecting-ip (Cloudflare)
  const cfConnectingIP = getHeader("cf-connecting-ip")
  if (cfConnectingIP && isValidIP(cfConnectingIP.trim())) {
    return cfConnectingIP.trim()
  }

  // true-client-ip (Akamai)
  const trueClientIP = getHeader("true-client-ip")
  if (trueClientIP && isValidIP(trueClientIP.trim())) {
    return trueClientIP.trim()
  }

  // x-client-ip
  const xClientIP = getHeader("x-client-ip")
  if (xClientIP && isValidIP(xClientIP.trim())) {
    return xClientIP.trim()
  }

  // Si on est en localhost et qu'aucune IP valide n'est trouvée, retourner localhost
  if (url && (url.includes("localhost") || url.includes("127.0.0.1"))) {
    return "127.0.0.1"
  }

  // On retourne null si aucune IP n'est trouvée
  return null
}

