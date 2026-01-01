// Rate limiting simple en mémoire (pour production, utiliser Redis)
const attempts = new Map<string, { count: number; resetAt: number }>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const CLEANUP_INTERVAL = 60 * 1000 // Nettoyer toutes les minutes

// Nettoyer les entrées expirées
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of attempts.entries()) {
    if (value.resetAt < now) {
      attempts.delete(key)
    }
  }
}, CLEANUP_INTERVAL)

export function checkRateLimit(identifier: string): {
  allowed: boolean
  remaining: number
  resetAt: number
} {
  const now = Date.now()
  const entry = attempts.get(identifier)

  if (!entry || entry.resetAt < now) {
    // Nouvelle fenêtre ou fenêtre expirée
    attempts.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    })
    return {
      allowed: true,
      remaining: MAX_ATTEMPTS - 1,
      resetAt: now + WINDOW_MS,
    }
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  entry.count++
  attempts.set(identifier, entry)

  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - entry.count,
    resetAt: entry.resetAt,
  }
}

export function resetRateLimit(identifier: string): void {
  attempts.delete(identifier)
}

