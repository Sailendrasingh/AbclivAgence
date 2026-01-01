# Restauration des Données - Guide d'Urgence

## ⚠️ Problème Identifié

Les tests ont peut-être utilisé la base de données de production (`dev.db`) au lieu de la base de test (`test.db`), ce qui a pu supprimer les données de production.

## 🔍 Vérification

Pour vérifier si vos données ont été supprimées :

```bash
# Vérifier le nombre d'utilisateurs
npx prisma studio
# Ouvrir http://localhost:5555 et vérifier les tables

# Ou via SQL
sqlite3 prisma/dev.db "SELECT COUNT(*) FROM User;"
sqlite3 prisma/dev.db "SELECT COUNT(*) FROM Agency;"
```

## 🔧 Solution Immédiate

### Option 1: Restauration depuis une Sauvegarde

Si vous avez une sauvegarde récente :

1. Arrêter l'application
2. Remplacer `prisma/dev.db` par votre sauvegarde
3. Redémarrer l'application

### Option 2: Recréer l'Utilisateur Admin

Si vous n'avez pas de sauvegarde, vous pouvez recréer l'utilisateur admin :

```bash
# Lancer Prisma Studio
npx prisma studio

# Ou créer directement via SQL
sqlite3 prisma/dev.db "INSERT INTO User (id, login, passwordHash, role, active) VALUES ('admin-id', 'Admin', '<hash-argon2>', 'Super Admin', 1);"
```

**Note**: Vous devrez générer un nouveau hash de mot de passe avec argon2.

### Option 3: Utiliser le Script d'Initialisation

Le script `createInitialAdmin()` dans `lib/auth.ts` devrait recréer l'admin s'il n'existe pas :

```bash
# Lancer l'application - l'admin sera créé automatiquement
npm run dev
```

## 🛡️ Prévention

### Corrections Appliquées

1. **`jest.setup.js`** : Force maintenant l'utilisation de `test.db` pour tous les tests
2. **Protection ajoutée** : Le nettoyage vérifie que la base utilisée est bien `test.db` avant de supprimer

### Vérifications à Faire

1. Vérifier que `.env` contient bien `DATABASE_URL=file:./prisma/dev.db` (et non `test.db`)
2. Vérifier que `jest.setup.js` force `DATABASE_URL=file:./prisma/test.db` pour les tests
3. Ne jamais exécuter les tests avec `NODE_ENV=production`

## 📝 Commandes Utiles

```bash
# Voir la taille des bases de données
ls -lh prisma/*.db

# Vérifier le contenu de dev.db
sqlite3 prisma/dev.db ".tables"
sqlite3 prisma/dev.db "SELECT * FROM User;"

# Vérifier le contenu de test.db (si elle existe)
sqlite3 prisma/test.db ".tables"
```

## ⚡ Action Immédiate Recommandée

1. **Vérifier vos données** : Ouvrir Prisma Studio et vérifier si vos données sont toujours là
2. **Si les données sont perdues** : Utiliser une sauvegarde ou recréer l'admin
3. **Tester la correction** : Exécuter `npm run test` et vérifier qu'il utilise bien `test.db`

---

**Important** : Les tests utilisent maintenant une base de données séparée (`test.db`) et ne devraient plus affecter vos données de production.

