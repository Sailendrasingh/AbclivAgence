# Vault Sécurisé pour Mots de Passe WiFi

## 📋 Vue d'ensemble

Le vault sécurisé pour les mots de passe WiFi utilise un **chiffrement par entrée** avec AES-256-GCM, garantissant que chaque mot de passe a sa propre clé dérivée. Cela signifie que si une clé est compromise, les autres mots de passe restent sécurisés.

## 🔐 Architecture de Sécurité

### Avant (Ancien Système)

- **Algorithme** : AES-256-CBC
- **Clé** : Même clé pour tous les mots de passe (ENCRYPTION_KEY)
- **Problème** : Si la clé est compromise, tous les mots de passe sont déchiffrables

### Après (Nouveau Vault)

- **Algorithme** : AES-256-GCM (chiffrement authentifié)
- **Clé** : Clé unique dérivée pour chaque mot de passe
- **Salt** : Salt unique de 32 bytes par mot de passe
- **Contexte** : ID du WiFi AP utilisé dans la dérivation de clé
- **Avantage** : Si une clé est compromise, les autres restent sécurisées

## 🔧 Implémentation

### Module de Vault

**Fichier** : `lib/wifi-vault.ts`

**Fonctions principales** :
- `encryptWifiPassword(password, wifiAPId)` : Chiffre un mot de passe avec le vault
- `decryptWifiPassword(encryptedPassword, wifiAPId)` : Déchiffre un mot de passe
- `isVaultFormat(encryptedPassword)` : Vérifie si c'est le nouveau format
- `migrateOldPassword(oldEncryptedPassword, wifiAPId)` : Migre un ancien mot de passe

### Format de Chiffrement

Le nouveau format stocke les données au format :
```
salt:iv:tag:encrypted
```

Où :
- `salt` : 32 bytes (64 caractères hex) - Salt unique pour ce mot de passe
- `iv` : 16 bytes (32 caractères hex) - Initialization Vector
- `tag` : 16 bytes (32 caractères hex) - Tag d'authentification GCM
- `encrypted` : Données chiffrées (hex)

### Dérivation de Clé

Chaque mot de passe utilise une clé unique dérivée avec :
- **Algorithme** : scrypt (même paramètres que les sauvegardes)
- **Entrées** : Clé maître + contexte (ID du WiFi AP)
- **Salt** : Salt unique par mot de passe
- **Résultat** : Clé de 32 bytes (256 bits)

## 🔄 Migration Automatique

### Migration à la Volée

Lors de la lecture d'un mot de passe :
1. Le système détecte automatiquement le format (ancien ou nouveau)
2. Si c'est l'ancien format, il déchiffre avec l'ancien système
3. Il migre automatiquement vers le nouveau format
4. Le mot de passe migré est sauvegardé en base de données

**Fichier** : `app/api/wifi-access-points/[id]/password/route.ts`

### Migration en Masse

Un script permet de migrer tous les mots de passe en une seule fois :

```bash
# Simulation (dry-run)
npm run migrate:wifi-passwords -- --dry-run

# Migration réelle
npm run migrate:wifi-passwords

# Forcer la migration même si déjà au nouveau format
npm run migrate:wifi-passwords -- --force
```

**Fichier** : `scripts/migrate-wifi-passwords.ts`

## 📊 Routes API Mises à Jour

### POST `/api/wifi-access-points`

- Crée un nouveau point d'accès WiFi
- Chiffre le mot de passe avec le vault si fourni
- **Ne retourne pas** le mot de passe chiffré dans la réponse

### PUT `/api/wifi-access-points/[id]`

- Met à jour un point d'accès WiFi
- Chiffre le mot de passe avec le vault si fourni
- **Ne retourne pas** le mot de passe chiffré dans la réponse

### GET `/api/wifi-access-points/[id]/password`

- Déchiffre et retourne le mot de passe en clair
- Détecte automatiquement le format (ancien ou nouveau)
- Migre automatiquement les anciens mots de passe vers le nouveau format

## 🔒 Sécurité

### Conformité OWASP

- ✅ **A02: Cryptographic Failures** : Chiffrement par entrée avec AES-256-GCM
- ✅ **ASVS Niveau 3** : Dérivation de clé avec scrypt (N=16384, r=8, p=1)
- ✅ **Authentification** : Tag GCM pour détecter les modifications
- ✅ **Isolation** : Chaque mot de passe a sa propre clé

### Protection

1. **Isolation des clés** : Chaque mot de passe a sa propre clé dérivée
2. **Salt unique** : Chaque mot de passe a un salt unique
3. **Contexte unique** : L'ID du WiFi AP est utilisé dans la dérivation
4. **Chiffrement authentifié** : AES-256-GCM détecte les modifications
5. **Pas d'exposition** : Les mots de passe chiffrés ne sont jamais retournés dans les réponses API

## 📝 Utilisation

### Créer un Point d'Accès WiFi

```typescript
// Le mot de passe est automatiquement chiffré avec le vault
const response = await fetch('/api/wifi-access-points', {
  method: 'POST',
  body: JSON.stringify({
    technicalId: 'tech-123',
    ssid: 'MonWiFi',
    password: 'MonMotDePasse123', // Sera chiffré automatiquement
  }),
})
```

### Récupérer un Mot de Passe

```typescript
// Le mot de passe est automatiquement déchiffré
const response = await fetch('/api/wifi-access-points/[id]/password')
const { password } = await response.json()
// password contient le mot de passe en clair
```

### Migration

```bash
# Vérifier ce qui sera migré
npm run migrate:wifi-passwords -- --dry-run

# Effectuer la migration
npm run migrate:wifi-passwords
```

## ⚠️ Notes Importantes

1. **Rétrocompatibilité** : Les anciens mots de passe (AES-256-CBC) sont automatiquement migrés lors de la lecture
2. **Hash argon2** : Les mots de passe hashés avec argon2 (ancien système non réversible) ne peuvent pas être migrés
3. **Clé maître** : La clé maître (ENCRYPTION_KEY) est toujours nécessaire, mais chaque mot de passe a sa propre clé dérivée
4. **Migration automatique** : La migration se fait automatiquement lors de la lecture, mais il est recommandé d'exécuter le script de migration en masse

## 🔍 Dépannage

### Erreur "Impossible de déchiffrer le mot de passe"

- Vérifier que ENCRYPTION_KEY est correcte
- Vérifier que le format du mot de passe chiffré est valide
- Vérifier que l'ID du WiFi AP correspond

### Migration échoue

- Vérifier les logs pour identifier le problème
- Exécuter avec `--dry-run` pour voir ce qui sera migré
- Vérifier que ENCRYPTION_KEY est la même que celle utilisée pour chiffrer les anciens mots de passe

---

**Dernière mise à jour** : 2026-01-30

