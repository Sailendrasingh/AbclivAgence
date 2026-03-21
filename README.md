# Application de Gestion des Agences

Application web de gestion des agences développée avec Next.js, React, TypeScript, Prisma et PostgreSQL.

## Source de vérité documentaire

Pour éviter les ambiguïtés entre anciens rapports et documentation active, les documents de référence à suivre en priorité sont :

- `prd_application_web_gestion_des_agences.md`
- `README.md` (ce fichier)
- `SECURITY.md`
- `MIGRATION_POSTGRESQL.md`

Les fichiers de type `RAPPORT_*`, `VERIFICATION_*`, `AUDIT_*` et certains guides ponctuels peuvent être des snapshots historiques.

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
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
   ENCRYPTION_KEY="votre-cle-de-chiffrement-32-caracteres"
   NODE_ENV="development"
   ```
   
   ⚠️ **Important** : Pour générer une clé de chiffrement sécurisée (64 caractères hexadécimaux) :
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   
   La variable `ENCRYPTION_KEY` est **obligatoire** et utilisée pour chiffrer les sauvegardes de la base de données et des fichiers uploadés.

4. **Initialiser la base de données** (PostgreSQL doit être démarré)
   ```bash
   npx prisma migrate deploy
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
- `npm run audit` - Scanner les vulnérabilités des dépendances
- `npm run audit:fix` - Corriger automatiquement les vulnérabilités
- `npm run audit:production` - Scanner uniquement les dépendances de production

## 🗄️ Base de données

L'application utilise **PostgreSQL** avec Prisma ORM. Voir `MIGRATION_POSTGRESQL.md` pour la configuration détaillée.

⚠️ **Note** : PostgreSQL doit tourner (Docker ou serveur). Les sauvegardes utilisent `pg_dump`/`psql`.

## 🔒 Chiffrement des sauvegardes

Toutes les sauvegardes sont automatiquement chiffrées avec **AES-256-GCM** avant stockage :
- **Algorithme** : AES-256-GCM (chiffrement authentifié)
- **Clé** : Dérivée depuis `ENCRYPTION_KEY` avec `scrypt`
- **Format** : Les backups sont stockés avec l'extension `.encrypted.zip`
- **Rétrocompatibilité** : Les anciennes sauvegardes non chiffrées peuvent toujours être restaurées (détection automatique)

## 🧪 Tests

Les tests utilisent une base PostgreSQL de test. Définir `DATABASE_URL` vers une base dédiée (ex: `abcliv_test`).

## 🚀 Déploiement en Production

Pour déployer l'application en production, consultez le guide complet :

**📖 [GUIDE_DEPLOIEMENT_PRODUCTION.md](./GUIDE_DEPLOIEMENT_PRODUCTION.md)**

Ce guide détaille :
- Les prérequis système (Node.js, ClamAV, etc.)
- La configuration des variables d'environnement
- L'installation et la configuration de PM2
- La configuration de Nginx comme reverse proxy
- L'installation de SSL/TLS avec Let's Encrypt
- Les tâches automatiques (sauvegardes, nettoyage)
- La sécurité et la maintenance

**Déploiement rapide :**
```bash
# 1. Configurer .env avec les variables de production
# 2. Exécuter le script de déploiement
./scripts/deploy.sh

# 3. Démarrer avec PM2 (si installé)
pm2 start ecosystem.config.js
```

## 🔒 Sécurité et Scan de Vulnérabilités

L'application utilise plusieurs outils pour scanner et corriger les vulnérabilités :

- **Dependabot** : Scan automatique hebdomadaire et alertes de sécurité sur GitHub
- **GitHub Actions** : Workflow automatisé pour `npm audit` sur chaque PR
- **npm audit** : Scan local des vulnérabilités des dépendances

**📖 [SECURITY_SCAN.md](./SECURITY_SCAN.md)** - Guide complet sur les scans de sécurité

**Scan rapide** :
```bash
# Scanner les vulnérabilités
npm run audit

# Corriger automatiquement
npm run audit:fix
```

## 📚 Documentation

- `prd_application_web_gestion_des_agences.md` - Cahier des charges complet
- `GUIDE_DEPLOIEMENT_PRODUCTION.md` - Guide de déploiement en production
- `SECURITY_SCAN.md` - Guide des scans de sécurité et vulnérabilités
- `LOGGING_CENTRALISE.md` - Guide du système de logging centralisé
- `VAULT_WIFI.md` - Guide du vault sécurisé pour mots de passe WiFi
- `TESTS_IMPLEMENTES.md` - Documentation des tests
- `SCENARIOS_TESTS.md` - Scénarios de tests

## 🔧 Technologies utilisées

- **Framework** : Next.js 14
- **Langage** : TypeScript
- **Base de données** : PostgreSQL avec Prisma ORM
- **UI** : React, Tailwind CSS, shadcn/ui
- **Tests** : Jest, Playwright
- **Authentification** : Session-based avec 2FA (TOTP)

## 📝 Licence

Propriétaire - ABCLIV

