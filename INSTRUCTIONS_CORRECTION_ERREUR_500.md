# Instructions pour corriger l'erreur 500 lors de la connexion

## Problème

L'erreur 500 lors de la connexion est causée par le fait que le client Prisma n'a pas été régénéré après l'ajout du modèle `Session` dans le schéma Prisma.

## Solution

### Étape 1 : Arrêter le serveur de développement

Arrêtez le serveur Next.js en cours d'exécution (Ctrl+C dans le terminal où il tourne).

### Étape 2 : Régénérer le client Prisma

Exécutez la commande suivante :

```bash
npx prisma generate
```

Cette commande va régénérer le client Prisma avec le nouveau modèle `Session`.

### Étape 3 : Redémarrer le serveur

Redémarrez le serveur de développement :

```bash
npm run dev
```

## Vérification

Après avoir redémarré le serveur, essayez de vous connecter à nouveau. L'erreur 500 devrait être résolue.

## Note

Un mécanisme de fallback temporaire a été ajouté pour permettre la connexion même si le client Prisma n'est pas régénéré, mais il utilise l'ancien système de session (moins sécurisé). Pour bénéficier de la gestion sécurisée des sessions avec tokens aléatoires, il est **essentiel** de régénérer le client Prisma.

## En cas de problème persistant

Si l'erreur persiste après avoir régénéré le client Prisma :

1. Vérifiez que la migration a bien été appliquée :
   ```bash
   npx prisma migrate status
   ```

2. Si la migration n'est pas appliquée, appliquez-la :
   ```bash
   npx prisma migrate deploy
   ```

3. Vérifiez les logs du serveur pour identifier l'erreur exacte.

