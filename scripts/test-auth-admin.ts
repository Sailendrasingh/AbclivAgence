/**
 * Test d'authentification Admin / Password
 * Usage: npx tsx scripts/test-auth-admin.ts
 * Prérequis: npm run dev doit être lancé (port 3000 ou 3001)
 */

const PORTS = [3000, 3001]

async function testAuth() {
  console.log("🔐 Test d'authentification Admin / Password\n")

  for (const port of PORTS) {
    try {
      const url = `http://localhost:${port}/api/auth/login`
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: "Admin", password: "Password" }),
      })

      const data = (await res.json()) as Record<string, unknown>

      if (res.ok) {
        if (data.needsTwoFactor) {
          console.log(`✅ Authentification mot de passe : OK (port ${port})`)
          console.log("   → 2FA activé : code requis pour finaliser la connexion")
        } else if (data.success) {
          console.log(`✅ Connexion réussie (port ${port})`)
        } else {
          console.log(`✅ Réponse OK (port ${port}):`, JSON.stringify(data))
        }
        return
      }

      console.log(`❌ Port ${port} (${res.status}):`, data.error || data.details || JSON.stringify(data))
    } catch (err) {
      console.log(`   Port ${port}: serveur non accessible`)
    }
  }

  console.log("\n💡 Lancez d'abord: npm run dev")
  process.exit(1)
}

testAuth()
