# Guide de Déploiement en Production - Ubuntu Server LTS

Ce guide détaille les étapes nécessaires pour déployer l'application de gestion des agences en production sur **Ubuntu Server LTS** (20.04, 22.04 ou 24.04).

## 📋 Prérequis

### 1. Serveur Ubuntu Server LTS
- **OS** : Ubuntu Server 20.04 LTS, 22.04 LTS ou 24.04 LTS
- **RAM** : Minimum 2 GB (4 GB recommandé)
- **CPU** : 2 cœurs minimum
- **Espace disque** : 10 GB minimum (plus selon le volume de données)
- **Accès** : Accès SSH avec privilèges sudo

### 2. Logiciels requis
- **Node.js** : Version 18.x ou 20.x LTS
- **npm** : Version 9.x ou supérieure
- **Git** : Pour cloner le repository
- **ClamAV** (recommandé) : Pour le scan antivirus des fichiers uploadés

### 3. Services requis
- **Reverse Proxy** : Nginx (recommandé)
- **Process Manager** : PM2 (recommandé pour Node.js)
- **SSL/TLS** : Certificat SSL (Let's Encrypt recommandé)

---

## 🚀 Étapes de Déploiement

### Étape 1 : Préparation du Serveur

#### 1.1 Mise à jour du système Ubuntu
```bash
# Mettre à jour la liste des paquets
sudo apt update

# Mettre à jour le système
sudo apt upgrade -y

# Installer les outils de base
sudo apt install -y curl wget git build-essential
```

#### 1.2 Installation de Node.js
```bash
# Installation de Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Vérification
node --version  # Doit afficher v20.x.x
npm --version   # Doit afficher 9.x.x ou supérieur
```

#### 1.3 Installation de ClamAV (recommandé)
```bash
# Installation de ClamAV sur Ubuntu
sudo apt install -y clamav clamav-daemon

# Arrêter le service pour la première configuration
sudo systemctl stop clamav-daemon

# Mettre à jour les définitions de virus (peut prendre plusieurs minutes)
sudo freshclam

# Démarrer le service ClamAV
sudo systemctl start clamav-daemon
sudo systemctl enable clamav-daemon

# Vérification
clamdscan --version
```

#### 1.4 Installation de PM2 (recommandé)
```bash
sudo npm install -g pm2
```

---

### Étape 2 : Clonage et Configuration du Projet

#### 2.1 Cloner le repository
```bash
# Créer un répertoire pour l'application
sudo mkdir -p /var/www/abcliv-agency
sudo chown $USER:$USER /var/www/abcliv-agency

# Cloner le repository
cd /var/www/abcliv-agency
git clone https://github.com/Sailendrasingh/AbclivAgence.git .

# Ou si vous avez déjà le code, copiez-le dans ce répertoire
```

#### 2.2 Installation des dépendances
```bash
cd /var/www/abcliv-agency
npm install --production
```

#### 2.3 Configuration des variables d'environnement

Créer un fichier `.env` à la racine du projet :

```bash
nano .env
```

Contenu du fichier `.env` :

```env
# Base de données SQLite
DATABASE_URL="file:/var/www/abcliv-agency/prisma/production.db"

# Clé de chiffrement (OBLIGATOIRE - Générer une nouvelle clé pour la production)
ENCRYPTION_KEY="votre-cle-de-chiffrement-64-caracteres-hexadecimaux"

# Environnement
NODE_ENV="production"

# URL de l'application (optionnel, pour les redirections)
NEXT_PUBLIC_APP_URL="https://votre-domaine.com"
```

**⚠️ IMPORTANT : Générer une clé de chiffrement sécurisée :**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copier la clé générée dans `ENCRYPTION_KEY`.

**Sécurité :**
- Ne jamais commiter le fichier `.env` dans Git
- Utiliser des permissions restrictives : `chmod 600 .env`
- Ne jamais partager la clé de chiffrement

#### 2.4 Initialisation de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les migrations
npx prisma migrate deploy

# Vérifier la base de données
npx prisma db push
```

#### 2.5 Créer l'utilisateur administrateur

```bash
# Restaurer l'utilisateur Admin par défaut
npm run restore:admin
```

**Identifiants par défaut :**
- **Login** : `Admin`
- **Mot de passe** : `Password`

**⚠️ CRITIQUE :** Changer immédiatement le mot de passe après la première connexion !

---

### Étape 3 : Build de l'Application

```bash
cd /var/www/abcliv-agency

# Build de l'application Next.js
npm run build
```

Le build peut prendre plusieurs minutes. Vérifier qu'il n'y a pas d'erreurs.

---

### Étape 4 : Configuration PM2 (Recommandé)

#### 4.1 Créer un fichier de configuration PM2

```bash
nano ecosystem.config.js
```

Contenu :

```javascript
module.exports = {
  apps: [{
    name: 'abcliv-agency',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/abcliv-agency',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/abcliv-agency/error.log',
    out_file: '/var/log/abcliv-agency/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
```

#### 4.2 Créer le répertoire de logs

```bash
sudo mkdir -p /var/log/abcliv-agency
sudo chown $USER:$USER /var/log/abcliv-agency
```

#### 4.3 Démarrer l'application avec PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

La dernière commande affichera une commande à exécuter avec `sudo` pour démarrer PM2 au boot.

---

### Étape 5 : Configuration Nginx (Reverse Proxy)

#### 5.1 Installation de Nginx

```bash
sudo apt install -y nginx
```

#### 5.2 Configuration du site

```bash
sudo nano /etc/nginx/sites-available/abcliv-agency
```

Contenu :

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    # Redirection HTTPS (une fois le certificat SSL configuré)
    # return 301 https://$server_name$request_uri;

    # Configuration pour HTTP (temporaire, avant SSL)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Taille maximale des uploads (5 MB)
    client_max_body_size 5M;
}
```

#### 5.3 Activer le site

```bash
sudo ln -s /etc/nginx/sites-available/abcliv-agency /etc/nginx/sites-enabled/
sudo nginx -t  # Vérifier la configuration
sudo systemctl restart nginx
```

---

### Étape 6 : Configuration SSL/TLS (Let's Encrypt)

#### 6.1 Installation de Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

#### 6.2 Obtenir un certificat SSL

```bash
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

Suivre les instructions. Certbot configurera automatiquement Nginx pour HTTPS.

#### 6.3 Renouvellement automatique

Le renouvellement est automatique avec Certbot. Tester avec :

```bash
sudo certbot renew --dry-run
```

---

### Étape 7 : Configuration des Tâches Automatiques

#### 7.1 Nettoyage de la quarantaine

Créer un cron job pour nettoyer automatiquement les fichiers en quarantaine :

```bash
sudo crontab -e
```

Ajouter :

```cron
# Nettoyer la quarantaine toutes les heures
0 * * * * cd /var/www/abcliv-agency && npm run clean:quarantine
```

#### 7.2 Sauvegardes automatiques (optionnel)

Créer un script de sauvegarde :

```bash
nano /var/www/abcliv-agency/scripts/backup.sh
```

Contenu :

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/abcliv-agency"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/var/www/abcliv-agency"

mkdir -p $BACKUP_DIR

# Sauvegarder la base de données
cp $APP_DIR/prisma/production.db $BACKUP_DIR/db_$DATE.db

# Sauvegarder les uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz $APP_DIR/uploads

# Garder seulement les 30 derniers backups
find $BACKUP_DIR -name "db_*.db" -mtime +30 -delete
find $BACKUP_DIR -name "uploads_*.tar.gz" -mtime +30 -delete
```

Rendre exécutable :

```bash
chmod +x /var/www/abcliv-agency/scripts/backup.sh
```

Ajouter au cron (tous les jours à 2h du matin) :

```cron
0 2 * * * /var/www/abcliv-agency/scripts/backup.sh
```

---

### Étape 8 : Configuration du Pare-feu

#### 8.1 Configuration UFW (Pare-feu Ubuntu)

```bash
# Vérifier le statut de UFW
sudo ufw status

# Autoriser SSH (important avant d'activer le pare-feu !)
sudo ufw allow 22/tcp

# Autoriser HTTP et HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Activer le pare-feu
sudo ufw enable

# Vérifier la configuration
sudo ufw status verbose
```

---

### Étape 9 : Vérifications Finales

#### 9.1 Vérifier que l'application fonctionne

```bash
# Vérifier PM2
pm2 status
pm2 logs abcliv-agency

# Vérifier Nginx
sudo systemctl status nginx

# Vérifier ClamAV (si installé)
sudo systemctl status clamav-daemon
```

#### 9.2 Tester l'application

1. Accéder à `https://votre-domaine.com`
2. Se connecter avec les identifiants Admin
3. **Changer immédiatement le mot de passe**
4. Tester l'upload d'une photo de profil
5. Vérifier les logs pour détecter d'éventuelles erreurs

---

## 🔧 Maintenance

## 📦 Mises à Jour en Production

Cette section détaille le processus complet pour pousser les mises à jour de l'application en production de manière sécurisée.

### Processus de Mise à Jour Standard

#### Étape 1 : Préparation (sur votre machine de développement)

```bash
# 1. Vérifier que tout fonctionne en local
npm run build
npm run test

# 2. Commiter et pousser les changements
git add .
git commit -m "Description des changements"
git push origin main
```

#### Étape 2 : Connexion au serveur de production

```bash
# Se connecter au serveur via SSH
ssh utilisateur@votre-serveur.com
```

#### Étape 3 : Sauvegarde avant mise à jour

**⚠️ CRITIQUE : Toujours créer une sauvegarde avant toute mise à jour !**

```bash
cd /var/www/abcliv-agency

# Option 1 : Utiliser le script de sauvegarde (si configuré)
./scripts/backup.sh

# Option 2 : Sauvegarde manuelle
BACKUP_DIR="/var/backups/abcliv-agency/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# Sauvegarder la base de données
cp prisma/production.db $BACKUP_DIR/production.db.backup

# Sauvegarder les uploads
tar -czf $BACKUP_DIR/uploads.tar.gz uploads/

# Sauvegarder le fichier .env (important !)
cp .env $BACKUP_DIR/.env.backup

echo "✅ Sauvegarde créée dans : $BACKUP_DIR"
```

#### Étape 4 : Mise à jour du code

```bash
cd /var/www/abcliv-agency

# Vérifier l'état actuel
git status

# Récupérer les dernières modifications depuis le repository
git fetch origin

# Voir les changements qui seront appliqués
git log HEAD..origin/main --oneline

# Récupérer les modifications
git pull origin main
```

#### Étape 5 : Mise à jour des dépendances

```bash
# Installer les nouvelles dépendances (production uniquement)
npm install --production

# Vérifier les vulnérabilités
npm audit

# Corriger les vulnérabilités si nécessaire (avec précaution)
npm audit fix
```

#### Étape 6 : Mise à jour de la base de données

```bash
# Générer le client Prisma (si le schéma a changé)
npx prisma generate

# Appliquer les migrations de base de données
npx prisma migrate deploy

# Vérifier l'état des migrations
npx prisma migrate status
```

#### Étape 7 : Rebuild de l'application

```bash
# Nettoyer le cache Next.js (optionnel mais recommandé)
rm -rf .next

# Build de l'application
npm run build

# Vérifier que le build a réussi
if [ ! -d ".next" ]; then
    echo "❌ Erreur : Le build a échoué !"
    exit 1
fi
```

#### Étape 8 : Redémarrage de l'application

```bash
# Redémarrer l'application avec PM2
pm2 restart abcliv-agency

# Vérifier le statut
pm2 status

# Surveiller les logs en temps réel
pm2 logs abcliv-agency --lines 50
```

#### Étape 9 : Vérification post-déploiement

```bash
# 1. Vérifier que l'application répond
curl -I http://localhost:3000

# 2. Vérifier les logs pour détecter d'éventuelles erreurs
pm2 logs abcliv-agency --err --lines 100

# 3. Tester l'application manuellement via le navigateur
# - Se connecter
# - Tester les fonctionnalités principales
# - Vérifier qu'il n'y a pas d'erreurs dans la console
```

### Script de Mise à Jour Automatisé

Pour simplifier le processus, vous pouvez utiliser le script de déploiement :

```bash
cd /var/www/abcliv-agency

# Exécuter le script de déploiement (fait tout automatiquement)
./scripts/deploy.sh
```

Le script effectue automatiquement :
- ✅ Vérification des prérequis
- ✅ Sauvegarde (si le script backup.sh existe)
- ✅ Récupération du code (`git pull`)
- ✅ Installation des dépendances
- ✅ Génération Prisma
- ✅ Application des migrations
- ✅ Build de l'application
- ✅ Redémarrage PM2

### Mise à Jour avec Maintenance (Downtime)

Pour les mises à jour majeures nécessitant un arrêt temporaire :

```bash
cd /var/www/abcliv-agency

# 1. Sauvegarder
./scripts/backup.sh

# 2. Mettre l'application en mode maintenance (optionnel)
# Créer une page de maintenance dans public/maintenance.html

# 3. Arrêter l'application
pm2 stop abcliv-agency

# 4. Effectuer la mise à jour
git pull origin main
npm install --production
npx prisma generate
npx prisma migrate deploy
npm run build

# 5. Redémarrer l'application
pm2 start ecosystem.config.js

# 6. Vérifier que tout fonctionne
pm2 logs abcliv-agency
```

### Rollback en Cas de Problème

Si une mise à jour cause des problèmes, voici comment revenir en arrière :

```bash
cd /var/www/abcliv-agency

# 1. Arrêter l'application
pm2 stop abcliv-agency

# 2. Restaurer le code depuis un commit précédent
git log --oneline -10  # Voir les derniers commits
git reset --hard <commit-hash>  # Remplacer par le hash du commit précédent

# 3. Restaurer la base de données depuis la sauvegarde
BACKUP_DIR="/var/backups/abcliv-agency/YYYYMMDD_HHMMSS"  # Remplacer par le répertoire de sauvegarde
cp $BACKUP_DIR/production.db.backup prisma/production.db

# 4. Restaurer les dépendances (si nécessaire)
npm install --production

# 5. Rebuild
npm run build

# 6. Redémarrer
pm2 start ecosystem.config.js

# 7. Vérifier
pm2 logs abcliv-agency
```

### Mise à Jour des Dépendances Système

#### Mise à jour de Node.js (si nécessaire)

```bash
# Vérifier la version actuelle
node --version

# Si mise à jour nécessaire, installer Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier
node --version
npm --version
```

#### Mise à jour de ClamAV

```bash
# Mettre à jour les définitions de virus
sudo freshclam

# Redémarrer le service
sudo systemctl restart clamav-daemon
```

#### Mise à jour du système Ubuntu

```bash
# Mettre à jour les paquets système
sudo apt update
sudo apt upgrade -y

# Redémarrer si nécessaire (après les mises à jour du noyau)
sudo reboot
```

### Checklist de Mise à Jour

Avant chaque mise à jour, vérifier :

- [ ] ✅ Sauvegarde de la base de données créée
- [ ] ✅ Sauvegarde du dossier `uploads/` créée
- [ ] ✅ Sauvegarde du fichier `.env` créée
- [ ] ✅ Tests passent en local
- [ ] ✅ Build réussi en local
- [ ] ✅ Migrations de base de données testées
- [ ] ✅ Plan de rollback préparé
- [ ] ✅ Fenêtre de maintenance planifiée (si nécessaire)
- [ ] ✅ Équipe informée de la mise à jour

### Bonnes Pratiques

1. **Toujours tester en local** avant de déployer en production
2. **Créer une sauvegarde** avant chaque mise à jour
3. **Déployer en heures creuses** pour minimiser l'impact
4. **Surveiller les logs** après chaque déploiement
5. **Tester les fonctionnalités critiques** après déploiement
6. **Documenter les changements** dans les commits Git
7. **Utiliser des tags Git** pour marquer les versions en production
8. **Avoir un plan de rollback** prêt avant chaque déploiement

### Automatisation avec Git Hooks (Optionnel)

Pour automatiser les déploiements, vous pouvez configurer un hook Git sur le serveur :

```bash
# Créer un hook post-receive sur le serveur
cd /var/www/abcliv-agency
git config receive.denyCurrentBranch ignore

# Créer le hook
cat > .git/hooks/post-receive << 'EOF'
#!/bin/bash
cd /var/www/abcliv-agency
./scripts/deploy.sh
EOF

chmod +x .git/hooks/post-receive
```

Ensuite, sur votre machine de développement :

```bash
git remote add production utilisateur@votre-serveur.com:/var/www/abcliv-agency
git push production main
```

### Logs

```bash
# Logs PM2 (application)
pm2 logs abcliv-agency                    # Tous les logs
pm2 logs abcliv-agency --lines 100        # 100 dernières lignes
pm2 logs abcliv-agency --err              # Erreurs uniquement
pm2 logs abcliv-agency --out              # Sortie standard uniquement

# Logs Nginx
sudo tail -f /var/log/nginx/access.log    # Logs d'accès
sudo tail -f /var/log/nginx/error.log     # Logs d'erreur

# Logs système Ubuntu
sudo journalctl -u nginx -f               # Logs Nginx via systemd
sudo journalctl -u clamav-daemon -f      # Logs ClamAV via systemd
```

### Monitoring

```bash
# Statut PM2
pm2 status
pm2 monit

# Utilisation des ressources
pm2 list
```

---

## 🔒 Sécurité

### Checklist de Sécurité

- [ ] Clé de chiffrement unique et sécurisée générée
- [ ] Fichier `.env` avec permissions `600`
- [ ] Mot de passe Admin changé après première connexion
- [ ] SSL/TLS configuré et fonctionnel
- [ ] Pare-feu configuré (ports 80, 443 uniquement)
- [ ] ClamAV installé et mis à jour
- [ ] Sauvegardes automatiques configurées
- [ ] Logs surveillés régulièrement
- [ ] Mises à jour système régulières
- [ ] 2FA activé pour les utilisateurs administrateurs

### Recommandations Supplémentaires

1. **Mises à jour régulières** :
   ```bash
   sudo apt update && sudo apt upgrade -y
   npm audit fix
   ```

2. **Surveillance** : Configurer des alertes pour :
   - Erreurs critiques dans les logs
   - Utilisation CPU/RAM élevée
   - Espace disque faible
   - Échecs de sauvegarde

3. **Backup** : Sauvegarder régulièrement :
   - Base de données (`prisma/production.db`)
   - Dossier `uploads/`
   - Fichier `.env` (de manière sécurisée)

---

## 🐛 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs PM2
pm2 logs abcliv-agency --lines 50

# Vérifier les variables d'environnement
pm2 env 0

# Vérifier que le port 3000 est libre
sudo netstat -tulpn | grep 3000
```

### Erreurs de base de données

```bash
# Vérifier la base de données
npx prisma db push

# Vérifier les migrations
npx prisma migrate status
```

### ClamAV ne fonctionne pas

```bash
# Vérifier le service
sudo systemctl status clamav-daemon

# Redémarrer ClamAV
sudo systemctl restart clamav-daemon

# Mettre à jour les définitions
sudo freshclam
```

### Problèmes de permissions

```bash
# Vérifier les permissions du dossier uploads
sudo chown -R $USER:$USER /var/www/abcliv-agency/uploads
sudo chmod -R 755 /var/www/abcliv-agency/uploads

# Vérifier les permissions de la base de données
sudo chown $USER:$USER /var/www/abcliv-agency/prisma/production.db
sudo chmod 644 /var/www/abcliv-agency/prisma/production.db
```

---

## 📞 Support

En cas de problème :

1. Consulter les logs (`pm2 logs`, `nginx error.log`)
2. Vérifier la configuration (`.env`, `ecosystem.config.js`, `nginx`)
3. Vérifier les ressources système (`htop`, `df -h`)
4. Consulter la documentation Next.js et Prisma

---

## 📝 Notes Importantes

- **Ubuntu Server LTS** : Ce guide est spécifiquement conçu pour Ubuntu Server LTS. Les commandes peuvent différer sur d'autres distributions Linux.
- **SQLite en production** : SQLite convient pour des applications avec un volume modéré de requêtes simultanées. Pour un trafic élevé, considérer PostgreSQL ou MySQL.
- **ClamAV** : Optionnel mais fortement recommandé pour la sécurité. L'application fonctionne avec un scan heuristique en fallback.
- **Sauvegardes** : Configurer des sauvegardes automatiques régulières de la base de données et des fichiers uploadés.
- **Monitoring** : Surveiller régulièrement les logs et les performances de l'application.
- **Mises à jour** : Toujours créer une sauvegarde avant toute mise à jour et tester en local avant de déployer en production.

---

**Dernière mise à jour** : 2026-01-30

