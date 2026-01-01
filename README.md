# Application de Gestion des Agences

Application web de gestion des agences développée avec Next.js, React, TypeScript, Prisma et SQLite.

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Sailendrasingh/AbclivAgence.git
   cd AbclivAgence
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   
   Créer un fichier `.env` à la racine du projet :
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ENCRYPTION_KEY="votre-cle-de-chiffrement-32-caracteres"
   NODE_ENV="development"
   ```

4. **Initialiser la base de données**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Créer l'utilisateur Admin**
   ```bash
   npm run restore:admin
   ```

6. **Lancer l'application**
   ```bash
   npm run dev
   ```

L'application sera accessible sur `http://localhost:3000`

## 🔐 Identifiants par défaut

- **Login** : `Admin`
- **Mot de passe** : `Password`

⚠️ **Important** : Changez le mot de passe après la première connexion !

## 📋 Scripts disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Construire l'application pour la production
- `npm run start` - Lancer l'application en mode production
- `npm run test` - Lancer les tests unitaires
- `npm run test:e2e` - Lancer les tests end-to-end
- `npm run restore:admin` - Restaurer l'utilisateur Admin
- `npm run reset:admin` - Réinitialiser le mot de passe Admin
- `npm run disable:2fa:admin` - Désactiver le 2FA pour Admin
- `npm run check:data` - Vérifier l'état de la base de données

## 🗄️ Base de données

L'application utilise SQLite avec Prisma ORM. La base de données de développement est `prisma/dev.db`.

⚠️ **Note** : La base de données n'est pas versionnée dans Git. Chaque développeur doit créer sa propre base de données locale.

## 🧪 Tests

Les tests utilisent une base de données séparée (`prisma/test.db`) pour éviter d'affecter les données de développement.

## 📚 Documentation

- `prd_application_web_gestion_des_agences.md` - Cahier des charges complet
- `TESTS_IMPLEMENTES.md` - Documentation des tests
- `SCENARIOS_TESTS.md` - Scénarios de tests

## 🔧 Technologies utilisées

- **Framework** : Next.js 14
- **Langage** : TypeScript
- **Base de données** : SQLite avec Prisma ORM
- **UI** : React, Tailwind CSS, shadcn/ui
- **Tests** : Jest, Playwright
- **Authentification** : Session-based avec 2FA (TOTP)

## 📝 Licence

Propriétaire - ABCLIV

