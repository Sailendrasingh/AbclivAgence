/**
 * Client API avec support CSRF automatique
 */

import { getCSRFToken, fetchCSRFToken, resetCSRFToken } from "./csrf-client"

/**
 * Options pour les requêtes API
 */
interface ApiRequestOptions extends RequestInit {
  skipCSRF?: boolean // Pour les routes qui n'ont pas besoin de CSRF (ex: login)
}

/**
 * Effectue une requête fetch avec le token CSRF automatiquement ajouté
 */
export async function apiFetch(
  url: string,
  options: ApiRequestOptions = {}
): Promise<Response> {
  const { skipCSRF = false, headers = {}, ...restOptions } = options

  // Préparer les headers
  const isFormData = restOptions.body instanceof FormData
  const requestHeaders: Record<string, string> = {
    ...(headers as Record<string, string>),
  }
  
  // Ajouter Content-Type seulement si ce n'est pas FormData
  if (!isFormData) {
    requestHeaders["Content-Type"] = "application/json"
  }

  // Ajouter le token CSRF pour les méthodes modifiantes (sauf si skipCSRF est true)
  if (!skipCSRF && restOptions.method && ["POST", "PUT", "PATCH", "DELETE"].includes(restOptions.method)) {
    let csrfToken = await getCSRFToken()
    
    // Si pas de token, essayer de le récupérer depuis l'API (avec retry)
    if (!csrfToken) {
      // Essayer plusieurs fois avec un délai court
      for (let attempt = 0; attempt < 3 && !csrfToken; attempt++) {
        csrfToken = await fetchCSRFToken()
        if (!csrfToken && attempt < 2) {
          // Attendre 100ms avant de réessayer
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
    }
    
    if (csrfToken) {
      // Pour FormData, ajouter le token dans le FormData ET dans le header
      if (isFormData) {
        const formData = restOptions.body as FormData
        // S'assurer que le token n'est pas déjà présent
        if (!formData.has("_csrf")) {
          formData.append("_csrf", csrfToken)
        }
      }
      requestHeaders["x-csrf-token"] = csrfToken
    }
  }

  // Effectuer la requête
  const response = await fetch(url, {
    ...restOptions,
    headers: requestHeaders,
    credentials: "include", // Important pour les cookies
  })

  // Si erreur 403 avec message CSRF, réessayer avec un nouveau token
  if (response.status === 403 && !skipCSRF) {
    // Cloner la réponse pour pouvoir lire le body sans le consommer
    const clonedResponse = response.clone()
    const errorData = await clonedResponse.json().catch(() => ({}))
    if (errorData.error?.includes("CSRF") || errorData.error?.includes("csrf")) {
      // Réessayer avec un nouveau token
      const newToken = await fetchCSRFToken()
      if (newToken) {
        const retryHeaders: Record<string, string> = {
          ...(headers as Record<string, string>),
          "x-csrf-token": newToken,
        }
        
        // Pour FormData, ne pas ajouter Content-Type (le navigateur le fait automatiquement)
        if (!isFormData) {
          retryHeaders["Content-Type"] = "application/json"
        }
        
        // Pour FormData, recréer le FormData avec le nouveau token
        let retryBody = restOptions.body
        if (isFormData && restOptions.body instanceof FormData) {
          const originalFormData = restOptions.body as FormData
          const newFormData = new FormData()
          // Copier tous les champs sauf _csrf
          for (const [key, value] of originalFormData.entries()) {
            if (key !== "_csrf") {
              newFormData.append(key, value)
            }
          }
          // Ajouter le nouveau token
          newFormData.append("_csrf", newToken)
          retryBody = newFormData
        }
        
        return fetch(url, {
          ...restOptions,
          body: retryBody,
          headers: retryHeaders,
          credentials: "include",
        })
      }
    }
  }

  return response
}

/**
 * Réinitialise le token CSRF (utile après logout)
 */
export function resetCSRF(): void {
  resetCSRFToken()
}

