# Guide de Scan de Vulnérabilités

Ce document décrit les outils et procédures pour scanner les vulnérabilités dans les dépendances du projet.

## 🔒 Outils Configurés

### 1. Dependabot (GitHub)

**Configuration** : `.github/dependabot.yml`

Dependabot scanne automatiquement les dépendances et crée des pull requests pour les mises à jour de sécurité.

**Fonctionnalités** :
- ✅ Scan automatique hebdomadaire (tous les lundis à 9h00 UTC)
- ✅ Alertes de sécurité automatiques
- ✅ Pull requests automatiques pour les corrections de sécurité
- ✅ Groupement des mises à jour par type (production/dev)
- ✅ Limite de 10 PRs ouvertes simultanément

**Activation** :
1. Aller sur GitHub : `https://github.com/Sailendrasingh/AbclivAgence/settings/security`
2. Activer "Dependabot alerts" dans la section "Code security"
3. Dependabot commencera automatiquement à scanner le projet

**Alertes** :
- Les alertes apparaissent dans l'onglet "Security" du repository
- Des notifications sont envoyées pour les vulnérabilités critiques et élevées
- Des PRs automatiques sont créées pour les corrections disponibles

### 2. GitHub Actions - Security Audit

**Configuration** : `.github/workflows/security-audit.yml`

Workflow automatisé qui exécute `npm audit` sur chaque PR et chaque semaine.

**Déclencheurs** :
- ✅ Chaque lundi à 9h00 UTC (scan hebdomadaire)
- ✅ Sur chaque pull request vers `main`
- ✅ Sur chaque push vers `main`
- ✅ Exécution manuelle via "Actions" > "Security Audit" > "Run workflow"

**Résultats** :
- Rapport JSON téléchargeable dans les artifacts
- Commentaire automatique sur les PRs avec le résumé des vulnérabilités
- Échec du workflow si des vulnérabilités modérées ou supérieures sont détectées

### 3. npm audit (Local)

**Scripts disponibles** :

```bash
# Audit complet (toutes les dépendances)
npm run audit

# Audit des dépendances de production uniquement
npm run audit:production

# Corriger automatiquement les vulnérabilités
npm run audit:fix

# Générer un rapport JSON
npm run audit:json
```

**Niveaux de sévérité** :
- `info` : Informations (généralement non critiques)
- `low` : Faible (à corriger si possible)
- `moderate` : Modéré (à corriger)
- `high` : Élevé (à corriger rapidement)
- `critical` : Critique (à corriger immédiatement)

## 📋 Procédure de Scan Manuel

### Scan Local

```bash
# 1. Scanner les vulnérabilités
npm run audit

# 2. Si des vulnérabilités sont détectées, essayer de les corriger automatiquement
npm run audit:fix

# 3. Vérifier que les corrections n'ont pas cassé l'application
npm run build
npm run test

# 4. Si des vulnérabilités persistent, consulter le rapport détaillé
npm run audit:json
cat audit-report.json
```

### Scan via GitHub

1. **Dependabot** :
   - Aller sur `https://github.com/Sailendrasingh/AbclivAgence/security/dependabot`
   - Consulter les alertes actives
   - Examiner les PRs créées automatiquement

2. **Actions** :
   - Aller sur `https://github.com/Sailendrasingh/AbclivAgence/actions`
   - Sélectionner "Security Audit"
   - Consulter les résultats et télécharger les artifacts

## 🔧 Configuration Dependabot

### Groupes de Mises à Jour

Les mises à jour sont groupées pour réduire le nombre de PRs :
- **Production dependencies** : Toutes les dépendances de production dans une PR
- **Development dependencies** : Toutes les dépendances de développement dans une PR

### Dépendances Ignorées

Certaines mises à jour majeures sont ignorées automatiquement car elles nécessitent des tests approfondis :
- `next` : Framework principal (tests complets requis)
- `react` / `react-dom` : Bibliothèque principale (tests complets requis)
- `@prisma/client` / `prisma` : ORM (migrations requises)

Pour forcer une mise à jour majeure, modifier `.github/dependabot.yml` et retirer l'entrée correspondante.

## 🚨 Gestion des Vulnérabilités

### Vulnérabilités Critiques/Élevées

1. **Évaluer l'impact** :
   - Consulter l'alerte Dependabot ou le rapport npm audit
   - Vérifier si la vulnérabilité affecte réellement le projet
   - Consulter les CVE pour comprendre la menace

2. **Corriger rapidement** :
   ```bash
   npm run audit:fix
   npm run build
   npm run test
   git add package.json package-lock.json
   git commit -m "fix: corriger vulnérabilité [CVE-XXXX-XXXX]"
   git push
   ```

3. **Si la correction automatique échoue** :
   - Mettre à jour manuellement la dépendance dans `package.json`
   - Exécuter `npm install`
   - Tester l'application
   - Créer une PR avec la correction

### Vulnérabilités Modérées/Faibles

1. **Planifier la correction** :
   - Ajouter à la backlog
   - Corriger lors de la prochaine mise à jour de dépendances
   - Utiliser `npm run audit:fix` pour corriger automatiquement

## 📊 Rapports et Monitoring

### Rapports Automatiques

- **Dependabot** : Alertes dans l'onglet Security de GitHub
- **GitHub Actions** : Rapports JSON dans les artifacts
- **npm audit** : Rapport dans la console

### Fréquence Recommandée

- **Quotidien** : Vérifier les alertes Dependabot critiques/élevées
- **Hebdomadaire** : Consulter le rapport GitHub Actions
- **Mensuel** : Exécuter `npm run audit` localement et corriger les vulnérabilités

## 🔐 Bonnes Pratiques

1. **Ne jamais ignorer les vulnérabilités critiques** sans justification
2. **Tester après chaque correction** de vulnérabilité
3. **Documenter les corrections** dans les commits
4. **Surveiller les alertes Dependabot** régulièrement
5. **Mettre à jour les dépendances** régulièrement (pas seulement pour la sécurité)

## 📝 Notes Importantes

- Les scans Dependabot nécessitent que le repository soit public ou que vous ayez GitHub Advanced Security activé
- Les workflows GitHub Actions nécessitent que les Actions soient activées dans les paramètres du repository
- `npm audit fix` peut parfois introduire des breaking changes, toujours tester après correction

---

**Dernière mise à jour** : 2026-01-30

