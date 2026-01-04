#!/bin/bash

# Script de déploiement automatisé pour la production
# Usage: ./scripts/deploy.sh [--no-pull] [--no-backup]
#   --no-pull   : Ne pas récupérer le code depuis Git (utile si déjà à jour)
#   --no-backup : Ne pas créer de sauvegarde avant déploiement

set -e  # Arrêter en cas d'erreur

echo "🚀 Déploiement de l'application ABCLIV Agency..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
info() {
    echo -e "${GREEN}✓${NC} $1"
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    error "Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

# Vérifier que .env existe
if [ ! -f ".env" ]; then
    error "Le fichier .env n'existe pas. Veuillez le créer avant de déployer."
    exit 1
fi

# Vérifier que ENCRYPTION_KEY est définie
if ! grep -q "ENCRYPTION_KEY=" .env || grep -q "ENCRYPTION_KEY=\"\"" .env; then
    error "ENCRYPTION_KEY n'est pas définie dans .env. C'est obligatoire pour la production."
    exit 1
fi

info "Vérification des prérequis..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    error "Node.js n'est pas installé"
    exit 1
fi
info "Node.js $(node --version) détecté"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    error "npm n'est pas installé"
    exit 1
fi
info "npm $(npm --version) détecté"

# Vérifier PM2 (optionnel mais recommandé)
if command -v pm2 &> /dev/null; then
    info "PM2 $(pm2 --version) détecté"
    USE_PM2=true
else
    warn "PM2 n'est pas installé. L'application sera lancée directement."
    warn "Pour installer PM2: npm install -g pm2"
    USE_PM2=false
fi

# Analyser les arguments
NO_PULL=false
NO_BACKUP=false

for arg in "$@"; do
    case $arg in
        --no-pull)
            NO_PULL=true
            shift
            ;;
        --no-backup)
            NO_BACKUP=true
            shift
            ;;
        *)
            # Argument inconnu, ignorer
            ;;
    esac
done

# Créer le répertoire de logs
mkdir -p logs
info "Répertoire de logs créé"

# Récupérer le code depuis Git (sauf si --no-pull)
if [ "$NO_PULL" = false ]; then
    if [ -d ".git" ]; then
        info "Récupération du code depuis Git..."
        
        # Vérifier l'état du repository
        if ! git diff-index --quiet HEAD --; then
            warn "Des modifications locales non commitées ont été détectées"
            read -p "Voulez-vous continuer ? (y/N) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                error "Déploiement annulé"
                exit 1
            fi
        fi
        
        # Récupérer les dernières modifications
        git fetch origin
        
        # Afficher les commits qui seront déployés
        if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
            info "Nouveaux commits à déployer :"
            git log HEAD..origin/main --oneline | head -5
        else
            info "Le code est déjà à jour"
        fi
        
        # Récupérer les modifications
        git pull origin main || error "Échec du git pull"
        info "Code mis à jour"
    else
        warn "Répertoire .git non trouvé, saut de la mise à jour Git"
    fi
else
    info "Mise à jour Git ignorée (--no-pull)"
fi

# Sauvegarder avant mise à jour (sauf si --no-backup)
if [ "$NO_BACKUP" = false ]; then
    if [ -f "scripts/backup.sh" ]; then
        info "Création d'une sauvegarde..."
        bash scripts/backup.sh || warn "La sauvegarde a échoué, mais on continue..."
    else
        warn "Script de sauvegarde non trouvé (scripts/backup.sh)"
        warn "Il est recommandé de créer une sauvegarde manuelle avant de continuer"
        read -p "Voulez-vous continuer sans sauvegarde ? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            error "Déploiement annulé"
            exit 1
        fi
    fi
else
    warn "Sauvegarde ignorée (--no-backup)"
fi

# Installer les dépendances
info "Installation des dépendances..."
npm install --production

# Générer le client Prisma
info "Génération du client Prisma..."
npx prisma generate

# Appliquer les migrations
info "Application des migrations de base de données..."
npx prisma migrate deploy || warn "Aucune migration à appliquer"

# Build de l'application
info "Build de l'application Next.js..."
npm run build

# Vérifier que le build a réussi
if [ ! -d ".next" ]; then
    error "Le build a échoué. Le répertoire .next n'existe pas."
    exit 1
fi
info "Build réussi"

# Redémarrer l'application
if [ "$USE_PM2" = true ]; then
    info "Redémarrage de l'application avec PM2..."
    
    # Arrêter l'application si elle tourne déjà
    pm2 stop abcliv-agency 2>/dev/null || true
    
    # Démarrer l'application
    pm2 start ecosystem.config.js
    
    # Sauvegarder la configuration PM2
    pm2 save
    
    info "Application démarrée avec PM2"
    echo ""
    echo "Commandes utiles:"
    echo "  - pm2 status : Voir le statut"
    echo "  - pm2 logs abcliv-agency : Voir les logs"
    echo "  - pm2 restart abcliv-agency : Redémarrer"
else
    warn "Pour démarrer l'application manuellement:"
    warn "  npm start"
fi

echo ""
info "✅ Déploiement terminé avec succès!"
echo ""
echo "Vérifications post-déploiement:"
echo "  1. Vérifier les logs : pm2 logs abcliv-agency"
echo "  2. Tester l'application : https://votre-domaine.com"
echo "  3. Vérifier qu'il n'y a pas d'erreurs dans les logs"
echo ""
echo "En cas de problème, consultez la section 'Rollback' dans GUIDE_DEPLOIEMENT_PRODUCTION.md"

