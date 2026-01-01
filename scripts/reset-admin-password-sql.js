/**
 * Script de réinitialisation du mot de passe Admin (version SQL directe)
 * Usage: node scripts/reset-admin-password-sql.js
 * 
 * Ce script réinitialise le mot de passe de l'utilisateur Admin à "Password"
 */

const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const argon2 = require('argon2')

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db')

async function resetAdminPassword() {
  console.log('🔧 Réinitialisation du mot de passe Admin...\n')

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Erreur de connexion à la base de données:', err.message)
        reject(err)
        return
      }
    })

    // Vérifier si l'admin existe
    db.get("SELECT id, login, active, role FROM User WHERE login = ?", ['Admin'], async (err, row) => {
      if (err) {
        console.error('❌ Erreur lors de la recherche:', err.message)
        db.close()
        reject(err)
        return
      }

      if (!row) {
        console.log('❌ L\'utilisateur Admin n\'existe pas')
        console.log('💡 Utilisez "npm run restore:admin" pour créer l\'utilisateur Admin')
        db.close()
        resolve()
        return
      }

      console.log('📝 Réinitialisation du mot de passe...')
      const passwordHash = await argon2.hash('Password')
      
      // Mettre à jour le mot de passe
      db.run(
        "UPDATE User SET passwordHash = ?, active = 1, lockedUntil = NULL, failedLoginAttempts = 0 WHERE login = ?",
        [passwordHash, 'Admin'],
        function(updateErr) {
          if (updateErr) {
            console.error('❌ Erreur lors de la mise à jour:', updateErr.message)
            db.close()
            reject(updateErr)
            return
          }

          console.log('✅ Mot de passe réinitialisé avec succès !')
          console.log(`   ID: ${row.id}`)
          console.log(`   Login: ${row.login}`)
          console.log(`   Rôle: ${row.role}`)
          console.log(`   Actif: Oui`)
          console.log(`   Nouveau mot de passe: Password`)
          console.log(`\n⚠️  IMPORTANT: Changez le mot de passe après la première connexion !`)
          
          db.close()
          resolve()
        }
      )
    })
  })
}

resetAdminPassword().catch((error) => {
  console.error('❌ Erreur:', error)
  process.exit(1)
})


