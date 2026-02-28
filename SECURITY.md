# Rapport de sécurité – ABCLIV Agency

Ce document résume les risques identifiés, les correctifs appliqués et les recommandations restantes.

---

## 1. Correctifs appliqués

### 1.1 Path traversal sur la restauration de sauvegarde
- **Fichier** : `app/api/backups/[filename]/restore/route.ts`
- **Risque** : Le paramètre `filename` pouvait contenir `..` ou `/` et permettre d’accéder à des fichiers en dehors du répertoire `backups`.
- **Correction** : Rejet des noms contenant `..`, `/` ou `\`, utilisation de `resolve()` et vérification que le chemin résolu reste sous `backupsDir`.

### 1.2 Clé de chiffrement par défaut (WiFi)
- **Fichier** : `app/api/wifi-access-points/[id]/password/route.ts`
- **Risque** : En l’absence de `ENCRYPTION_KEY`, une clé fixe était utilisée pour déchiffrer les mots de passe WiFi (ancien format).
- **Correction** : Si `ENCRYPTION_KEY` est absente ou trop courte, la fonction de déchiffrement refuse de déchiffrer (log d’erreur + retour chaîne vide). Aucune clé par défaut n’est utilisée.

### 1.3 Fuites d’information dans les logs (login)
- **Fichier** : `app/api/auth/login/route.ts`
- **Risque** : Logs contenant `DATABASE_URL`, liste d’utilisateurs, aperçu du hash mot de passe, longueur/aperçu du mot de passe.
- **Correction** : Suppression de tous les `console.log` / `console.error` de débogage exposant des données sensibles.

### 1.4 Audit sécurité (février 2025)
- **Logs sensibles** : Suppression des `console.log`/`console.error` exposant hash, mot de passe, session (id, login, role), cookie ou token CSRF dans `lib/auth.ts`, `app/api/settings/route.ts`, `app/api/auth/profile/route.ts`, `app/api/upload/route.ts`, `lib/api-client.ts`.
- **CSRF** : Ajout de `requireCSRF()` sur les routes modifiantes sans protection : `DELETE /api/backups/[filename]`, `POST /api/backups/[filename]/restore`, `POST /api/alerts/[id]/resolve`, `POST /api/technical/[id]/history/restore`, `POST /api/agencies/[id]/history/restore`.
- **Path traversal (backup DELETE)** : Utilisation de `resolve()` + vérification `filePath.startsWith(backupsDir)` dans `app/api/backups/[filename]/route.ts` ; suppression du `console.warn` exposant un chemin de fichier.

---

## 2. Points déjà en place (à conserver)

- **Session** : `lib/session.ts` + `lib/session-secure.ts` ; tokens en base avec fallback cookie (à remplacer en production par la table Session).
- **Auth** : Vérification de session et rôle sur les routes API ; 2FA exigé pour les actions Super Admin.
- **CSRF** : `requireCSRF` / `verifyCSRFToken` sur agencies, contacts, addresses, upload, settings, users, backups (DELETE, restore), alerts (resolve), history restore (technical, agencies), etc.
- **Upload** : Types MIME autorisés, vérification des magic bytes, protection CSRF.
- **Fichiers** : `app/api/files/[...path]/route.ts` – path traversal bloqué via `resolve` + `startsWith(uploadsDir)`.
- **Backup DELETE** : Contrôle path traversal sur `filename` (rejet de `..`, `/`, `\`) + `resolve()` et `startsWith(backupsDir)`.
- **Sanitization** : `lib/sanitize.ts` utilisé (ex. agences) pour limiter les risques XSS.
- **Layout** : `dangerouslySetInnerHTML` limité à un script de thème statique (pas d’entrée utilisateur).

---

## 3. Recommandations restantes

### 3.1 Variables d’environnement
- **Production** : Définir `ENCRYPTION_KEY` (≥ 32 caractères) pour le vault WiFi et les sauvegardes chiffrées. Ne jamais s’appuyer sur une clé par défaut.
- **`lib/wifi-vault.ts`** : En dev, une clé par défaut est encore utilisée si `ENCRYPTION_KEY` est absente ; s’assurer de ne pas déployer en production sans `ENCRYPTION_KEY`.

### 3.2 Session
- Utiliser la table Session en production et éviter le fallback cookie (userId seul). Documenter que le fallback est temporaire / dev uniquement.

### 3.3 CSRF
- Les routes modifiantes (backups, alerts resolve, history restore) sont désormais protégées par `requireCSRF`. À maintenir pour toute nouvelle route POST/PUT/PATCH/DELETE.

### 3.4 Logs
- Éviter de logger des tokens CSRF (même tronqués), mots de passe ou chemins sensibles. Les logs upload/API client déjà présents peuvent être réduits ou désactivés en production.

### 3.5 Scripts
- **`scripts/migrate-wifi-passwords.ts`** : Utilise encore une clé par défaut si `ENCRYPTION_KEY` est absente. À exécuter uniquement avec `ENCRYPTION_KEY` définie (ou refuser l’exécution en production sans clé).

### 3.6 Requêtes SQL brutes (Prisma)
- **`lib/ensure-session-table.ts`** : Utilise `prisma.$queryRaw` avec une requête **fixe** (aucune entrée utilisateur), pour vérifier l'existence de la table Session. Pas de risque d'injection.
- **Scripts** (`scripts/create-app-settings-table.ts`, `add-contact-order-column.ts`, `add-pc-order-column.ts`, `initialize-pc-orders.ts`) : Utilisent `$executeRawUnsafe` / `$queryRawUnsafe` pour des migrations ou initialisations one-off. À exécuter uniquement en environnement contrôlé ; ne pas exposer à des entrées utilisateur.

---

## 4. Résumé

| Élément                    | Statut / action                                      |
|---------------------------|------------------------------------------------------|
| Path traversal (restore, DELETE backup) | Corrigé (resolve + startsWith)        |
| Clé WiFi par défaut       | Corrigé (refus de déchiffrer sans ENCRYPTION_KEY)    |
| Logs sensibles (login, auth, settings, profile, upload, api-client) | Corrigé |
| Session / CSRF / Auth     | En place ; CSRF étendu à backups, alerts, history restore |
| ENCRYPTION_KEY en prod    | À configurer obligatoirement                         |
| Requêtes SQL brutes       | Documenté : 1 usage fixe (ensure-session-table), scripts one-off uniquement |

*Dernière mise à jour : février 2025*
