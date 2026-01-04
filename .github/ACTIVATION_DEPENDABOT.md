# Guide d'Activation de Dependabot

Ce guide explique comment activer Dependabot sur votre repository GitHub.

## 📋 Prérequis

- Repository GitHub (public ou avec GitHub Advanced Security)
- Accès administrateur au repository

## 🚀 Activation

### Étape 1 : Activer Dependabot Alerts

1. Aller sur votre repository : `https://github.com/Sailendrasingh/AbclivAgence`
2. Cliquer sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquer sur **Security** (Sécurité)
4. Dans la section **Code security and analysis**, trouver **Dependabot alerts**
5. Cliquer sur **Enable** (Activer)

### Étape 2 : Activer Dependabot Security Updates (Optionnel mais recommandé)

1. Toujours dans **Settings** > **Security**
2. Trouver **Dependabot security updates**
3. Cliquer sur **Enable** (Activer)

Cette fonctionnalité crée automatiquement des pull requests pour corriger les vulnérabilités.

### Étape 3 : Vérifier la Configuration

1. Le fichier `.github/dependabot.yml` est déjà présent dans le repository
2. Dependabot devrait commencer à scanner automatiquement
3. Les alertes apparaîtront dans l'onglet **Security** du repository

## 🔍 Vérification

### Vérifier les Alertes

1. Aller sur : `https://github.com/Sailendrasingh/AbclivAgence/security/dependabot`
2. Vous devriez voir les alertes de sécurité (s'il y en a)

### Vérifier les Pull Requests

1. Aller sur : `https://github.com/Sailendrasingh/AbclivAgence/pulls`
2. Filtrer par auteur : `dependabot[bot]`
3. Vous devriez voir les PRs créées automatiquement

## ⚙️ Configuration

La configuration se trouve dans `.github/dependabot.yml` :

- **Fréquence** : Scan hebdomadaire (tous les lundis à 9h00 UTC)
- **Limite de PRs** : Maximum 10 PRs ouvertes simultanément
- **Groupement** : Les mises à jour sont groupées par type (production/dev)
- **Ignorées** : Les mises à jour majeures de Next.js, React et Prisma sont ignorées (nécessitent des tests approfondis)

Pour modifier la configuration, éditer `.github/dependabot.yml` et pousser les changements.

## 📊 Notifications

### Configurer les Notifications

1. Aller sur : `https://github.com/settings/notifications`
2. Dans **Security alerts**, configurer :
   - ✅ Email pour les alertes critiques
   - ✅ Email pour les alertes élevées
   - ✅ Web pour toutes les alertes

### Notifications par Email

Vous recevrez des emails pour :
- Nouvelles vulnérabilités critiques/élevées
- Nouvelles PRs créées par Dependabot
- Résolution d'alertes

## 🔧 Dépannage

### Dependabot ne crée pas de PRs

1. Vérifier que Dependabot alerts est activé
2. Vérifier que le fichier `.github/dependabot.yml` est présent
3. Vérifier la syntaxe YAML du fichier
4. Attendre quelques heures (le scan peut prendre du temps)

### Erreurs de Configuration

Si Dependabot signale des erreurs :
1. Aller sur : `https://github.com/Sailendrasingh/AbclivAgence/security/dependabot`
2. Consulter les logs d'erreur
3. Vérifier la syntaxe YAML avec un validateur en ligne

### Désactiver Temporairement

Pour désactiver Dependabot temporairement :
1. Aller dans **Settings** > **Security**
2. Désactiver **Dependabot alerts** et **Dependabot security updates**

## 📝 Notes

- Dependabot nécessite que le repository soit public OU que GitHub Advanced Security soit activé
- Les scans peuvent prendre quelques heures pour s'initialiser
- Les PRs sont créées automatiquement mais nécessitent une revue manuelle
- Les mises à jour majeures sont ignorées par défaut (voir `.github/dependabot.yml`)

---

**Dernière mise à jour** : 2026-01-30

