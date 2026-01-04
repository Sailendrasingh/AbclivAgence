/**
 * Utilitaire pour extraire l'adresse IP réelle du client
 * Gère les proxies, load balancers et les chaînes d'IPs
 */

import { NextRequest } from "next/server"

/**
 * Extrait l'adresse IP réelle du client depuis les headers de la requête
 * 
 * Ordre de priorité :
 * 1. x-forwarded-for (peut contenir plusieurs IPs séparées par des virgules)
 * 2. x-real-ip
 * 3. cf-connecting-ip (Cloudflare)
 * 4. true-client-ip (Akamai)
 * 5. x-client-ip
 * 6. request.ip (si disponible)
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

  // x-forwarded-for peut contenir plusieurs IPs séparées par des virgules
  // Format: "client-ip, proxy1-ip, proxy2-ip"
  // On prend la première IP (celle du client réel)
  const xForwardedFor = getHeader("x-forwarded-for")
  if (xForwardedFor) {
    // Nettoyer et prendre la première IP
    const ips = xForwardedFor.split(",").map(ip => ip.trim()).filter(ip => ip.length > 0)
    if (ips.length > 0) {
      // Prendre la première IP (client réel)
      // Note: Si vous êtes derrière un proxy de confiance, vous pourriez vouloir prendre la dernière
      return ips[0]
    }
  }

  // x-real-ip (souvent utilisé par Nginx)
  const xRealIP = getHeader("x-real-ip")
  if (xRealIP) {
    return xRealIP.trim()
  }

  // cf-connecting-ip (Cloudflare)
  const cfConnectingIP = getHeader("cf-connecting-ip")
  if (cfConnectingIP) {
    return cfConnectingIP.trim()
  }

  // true-client-ip (Akamai)
  const trueClientIP = getHeader("true-client-ip")
  if (trueClientIP) {
    return trueClientIP.trim()
  }

  // x-client-ip
  const xClientIP = getHeader("x-client-ip")
  if (xClientIP) {
    return xClientIP.trim()
  }

  // request.ip (si disponible, NextRequest ne l'expose pas directement)
  // On retourne null si aucune IP n'est trouvée
  return null
}

