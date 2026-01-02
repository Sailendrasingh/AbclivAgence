# Instructions pour créer la table Session

## Problème

La table `Session` n'existe pas dans la base de données, ce qui cause des erreurs Prisma (code P2021). Le fallback fonctionne, mais génère beaucoup de messages d'erreur dans les logs.

## Solution

### Option 1 : Créer la table manuellement (Recommandé)

1. **Arrêtez le serveur de développement** (Ctrl+C)

2. **Ouvrez la base de données SQLite** :
   ```bash
   sqlite3 prisma/dev.db
   ```

3. **Exécutez les commandes SQL suivantes** :
   ```sql
   CREATE TABLE IF NOT EXISTS "Session" (
     "id" TEXT NOT NULL PRIMARY KEY,
     "token" TEXT NOT NULL,
     "userId" TEXT NOT NULL,
     "expiresAt" DATETIME NOT NULL,
     "lastUsedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
   );

   CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");
   ```

4. **Quittez SQLite** : `.quit`

5. **Régénérez le client Prisma** :
   ```bash
   npx prisma generate
   ```

6. **Redémarrez le serveur** :
   ```bash
   npm run dev
   ```

### Option 2 : Utiliser Prisma Studio

1. **Arrêtez le serveur de développement**

2. **Ouvrez Prisma Studio** :
   ```bash
   npx prisma studio
   ```

3. **Dans Prisma Studio**, la table Session devrait apparaître. Si elle n'apparaît pas, utilisez l'Option 1.

### Option 3 : Réappliquer la migration

1. **Arrêtez le serveur de développement**

2. **Réinitialisez la base de données** (⚠️ **ATTENTION** : Cela supprimera toutes les données) :
   ```bash
   npx prisma migrate reset
   ```

3. **Ou réappliquez les migrations** :
   ```bash
   npx prisma migrate deploy
   ```

4. **Régénérez le client Prisma** :
   ```bash
   npx prisma generate
   ```

5. **Redémarrez le serveur**

## Vérification

Après avoir créé la table, vérifiez qu'elle existe :

```bash
sqlite3 prisma/dev.db "SELECT name FROM sqlite_master WHERE type='table' AND name='Session';"
```

Vous devriez voir :
```
Session
```

## Note

Le système de fallback fonctionne actuellement, mais utilise l'ancien système de session (userId comme sessionId) qui est moins sécurisé. Une fois la table Session créée et le client Prisma régénéré, le système utilisera automatiquement les sessions sécurisées avec tokens aléatoires.

