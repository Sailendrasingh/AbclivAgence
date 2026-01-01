import { checkRateLimit, resetRateLimit } from '../rate-limit'

describe('Rate limiting', () => {
  beforeEach(() => {
    // Réinitialiser le rate limiting avant chaque test
    resetRateLimit('test-identifier')
  })

  describe('checkRateLimit', () => {
    it('should allow first request', () => {
      const result = checkRateLimit('test-identifier')
      
      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(4) // 5 - 1
      expect(result.resetAt).toBeGreaterThan(Date.now())
    })

    it('should allow multiple requests within limit', () => {
      for (let i = 0; i < 4; i++) {
        const result = checkRateLimit('test-identifier')
        expect(result.allowed).toBe(true)
      }
      
      const finalResult = checkRateLimit('test-identifier')
      expect(finalResult.allowed).toBe(true)
      expect(finalResult.remaining).toBe(0)
    })

    it('should block after max attempts', () => {
      // Faire 5 tentatives (la limite)
      for (let i = 0; i < 5; i++) {
        checkRateLimit('test-identifier')
      }
      
      // La 6ème devrait être bloquée
      const result = checkRateLimit('test-identifier')
      expect(result.allowed).toBe(false)
      expect(result.remaining).toBe(0)
    })

    it('should track different identifiers separately', () => {
      const result1 = checkRateLimit('identifier-1')
      const result2 = checkRateLimit('identifier-2')
      
      expect(result1.allowed).toBe(true)
      expect(result2.allowed).toBe(true)
      expect(result1.remaining).toBe(4)
      expect(result2.remaining).toBe(4)
    })
  })

  describe('resetRateLimit', () => {
    it('should reset the rate limit for an identifier', () => {
      // Faire quelques tentatives
      checkRateLimit('test-reset')
      checkRateLimit('test-reset')
      
      // Réinitialiser
      resetRateLimit('test-reset')
      
      // Vérifier que c'est réinitialisé
      const result = checkRateLimit('test-reset')
      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(4)
    })
  })
})
