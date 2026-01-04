# Système de Logging Centralisé

## 📋 Vue d'ensemble

Le système de logging centralisé utilise **Winston** pour structurer et centraliser tous les logs de l'application. Les logs sont enregistrés dans plusieurs destinations (console, fichiers, service externe optionnel) avec des formats structurés.

## 🔧 Architecture

### Destinations des Logs

1. **Console** : Logs formatés et colorisés pour le développement
2. **Fichiers** :
   - `logs/combined.log` : Tous les logs
   - `logs/error.log` : Uniquement les erreurs
   - `logs/security.log` : Logs de sécurité
3. **Service externe** (optionnel) : Configuration via variables d'environnement

### Niveaux de Log

- **error** : Erreurs critiques nécessitant une attention immédiate
- **warn** : Avertissements (tentatives d'accès non autorisées, etc.)
- **info** : Informations générales (actions utilisateur, etc.)
- **debug** : Informations de débogage (seulement en développement)

## 📝 Utilisation

### Logger une Action Métier

```typescript
import { createLog } from '@/lib/logs'

// Enregistre dans la base de données ET dans les fichiers de log
await createLog(userId, 'AGENCY_CREATED', { agencyId: '123' }, request)
```

### Logger une Erreur

```typescript
import { logError } from '@/lib/logger'

try {
  // Code qui peut échouer
} catch (error) {
  logError('Erreur lors de la création de l\'agence', error, { userId, agencyId })
}
```

### Logger un Avertissement

```typescript
import { logWarning } from '@/lib/logger'

logWarning('Tentative d\'accès non autorisé', { userId, resource: '/api/admin' })
```

### Logger une Information

```typescript
import { logInfo } from '@/lib/logger'

logInfo('Utilisateur connecté', { userId, ip: '192.168.1.1' })
```

### Logger un Événement de Sécurité

```typescript
import { logSecurity } from '@/lib/logger'

logSecurity('Tentative de connexion échouée', {
  login: 'admin',
  ip: '192.168.1.1',
  reason: 'Mot de passe incorrect'
}, 'warn')
```

### Logger en Mode Debug

```typescript
import { logDebug } from '@/lib/logger'

logDebug('Valeur de la variable', { variable: value })
```

## 🔒 Logs de Sécurité

Les événements de sécurité sont automatiquement enregistrés dans `logs/security.log` :

- Tentatives de connexion (réussies et échouées)
- Accès non autorisés
- Actions sensibles (suppression, restauration, etc.)
- Modifications de permissions
- Changements de mots de passe

## 📊 Format des Logs

### Format JSON (Fichiers)

```json
{
  "timestamp": "2026-01-30 15:30:45",
  "level": "info",
  "message": "Action métier",
  "service": "abcliv-agency",
  "environment": "production",
  "userId": "user-123",
  "action": "AGENCY_CREATED",
  "details": { "agencyId": "123" },
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```

### Format Console (Développement)

```
2026-01-30 15:30:45 [info]: Action métier {"userId":"user-123","action":"AGENCY_CREATED"}
```

## ⚙️ Configuration

### Variables d'Environnement

```env
# Niveau de log (error, warn, info, debug)
LOG_LEVEL=info

# Service externe (optionnel)
LOG_SERVICE_URL=http://localhost:3000
LOG_SERVICE_HOST=localhost
LOG_SERVICE_PORT=3000
LOG_SERVICE_PATH=/logs
```

### Rotation des Fichiers

Les fichiers de log sont automatiquement rotatés :
- **Taille maximale** : 10 MB par fichier
- **Nombre de fichiers** : 5 fichiers (combined.log, error.log) ou 10 fichiers (security.log)
- **Format** : `combined.log`, `combined.log.1`, `combined.log.2`, etc.

## 🔄 Migration depuis console.log

### Avant

```typescript
console.log('User logged in:', userId)
console.error('Error:', error)
```

### Après

```typescript
import { logInfo, logError } from '@/lib/logger'

logInfo('User logged in', { userId })
logError('Error', error, { context: 'login' })
```

## 📁 Structure des Fichiers de Log

```
logs/
├── .gitkeep
├── combined.log      # Tous les logs
├── error.log         # Uniquement les erreurs
└── security.log      # Logs de sécurité
```

## 🔍 Recherche dans les Logs

### Recherche Simple

```bash
# Rechercher toutes les erreurs
grep "level\":\"error" logs/combined.log

# Rechercher un utilisateur spécifique
grep "userId\":\"user-123" logs/combined.log

# Rechercher une action spécifique
grep "AGENCY_CREATED" logs/combined.log
```

### Recherche Avancée avec jq

```bash
# Installer jq (outil de parsing JSON)
# Windows: choco install jq
# Linux: apt-get install jq
# macOS: brew install jq

# Filtrer les erreurs
cat logs/combined.log | jq 'select(.level == "error")'

# Filtrer par utilisateur
cat logs/combined.log | jq 'select(.userId == "user-123")'

# Filtrer par date
cat logs/combined.log | jq 'select(.timestamp | startswith("2026-01-30"))'
```

## 🚀 Intégration avec Services Externes

### CloudWatch (AWS)

```typescript
// Ajouter un transport CloudWatch dans lib/logger.ts
import { CloudWatchLogs } from 'winston-cloudwatch'

transports.push(
  new CloudWatchLogs({
    logGroupName: 'abcliv-agency',
    logStreamName: process.env.NODE_ENV,
    awsRegion: 'eu-west-1',
  })
)
```

### ELK Stack

```typescript
// Ajouter un transport HTTP vers Logstash
transports.push(
  new winston.transports.Http({
    host: 'logstash.example.com',
    port: 5000,
    path: '/logs',
  })
)
```

### Splunk

```typescript
// Utiliser winston-splunk-httplogger
import SplunkStreamEvent from 'winston-splunk-httplogger'

transports.push(
  new SplunkStreamEvent({
    splunk: {
      token: process.env.SPLUNK_TOKEN,
      host: 'splunk.example.com',
      port: 8088,
    },
  })
)
```

## 📋 Bonnes Pratiques

1. **Utiliser les bons niveaux** :
   - `error` : Erreurs critiques
   - `warn` : Avertissements (sécurité, accès non autorisés)
   - `info` : Actions normales
   - `debug` : Informations de débogage

2. **Ajouter du contexte** :
   ```typescript
   // ❌ Mauvais
   logError('Error occurred')
   
   // ✅ Bon
   logError('Error creating agency', error, { userId, agencyId, requestId })
   ```

3. **Ne pas logger de données sensibles** :
   ```typescript
   // ❌ Mauvais
   logInfo('User password', { password: userPassword })
   
   // ✅ Bon
   logInfo('User password changed', { userId })
   ```

4. **Utiliser logSecurity pour les événements de sécurité** :
   ```typescript
   logSecurity('Failed login attempt', { login, ip, reason }, 'warn')
   ```

## 🔧 Maintenance

### Nettoyage Automatique

Les logs de plus de 30 jours sont automatiquement supprimés de la base de données via `cleanupOldLogs()`.

### Rotation des Fichiers

La rotation est automatique via Winston. Les anciens fichiers sont conservés avec un suffixe numérique.

### Monitoring

Surveiller la taille du dossier `logs/` et configurer des alertes si nécessaire.

---

**Dernière mise à jour** : 2026-01-30

