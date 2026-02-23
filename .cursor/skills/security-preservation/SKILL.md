---
name: security-preservation
description: Vérifie que la sécurité de l'application ABCLIV Agency est préservée lors des modifications. Utiliser lors de modifications des routes API, de l'authentification, des uploads, des chemins de fichiers, des dépendances, ou de toute logique sensible. Référence OWASP Top 10 2021 et PRD Section 15.
---

# Préservation de la sécurité — ABCLIV Agency

## Quand appliquer

- Modification de routes API (`app/api/**`)
- Changement auth, session, 2FA, RBAC
- Upload de fichiers, chemins d'accès, restauration
- Nouvelle dépendance ou mise à jour majeure
- Ajout/modification de champs utilisateur (validation)
- Utilisation de `dangerouslySetInnerHTML` ou évaluation dynamique

---

## Checklist avant commit

### Accès et autorisation

- [ ] Toutes les routes API vérifient `getSession()` avant traitement
- [ ] Les actions sensibles (suppression, restauration, purge) vérifient le rôle (Super Admin si requis)
- [ ] RBAC respecté : User (lecture), Super user (CRUD sans suppression), Super Admin (tout)

### Protection des entrées

- [ ] Routes POST/PUT/PATCH/DELETE : `requireCSRF()` appelé
- [ ] Données utilisateur validées avec schéma Zod (`validateRequest` ou équivalent)
- [ ] Sanitization appliquée après validation : `sanitize()` de `lib/sanitize`

### Chemins et fichiers

- [ ] Aucun chemin construit à partir d'entrée utilisateur sans validation
- [ ] Path traversal bloqué : rejet si `..`, `/`, `\` dans les noms ; `resolve()` + vérification `startsWith(uploadsDir)` ou `backupsDir`
- [ ] Magic bytes vérifiés pour les uploads (JPEG, PNG uniquement)

### Authentification et secrets

- [ ] Mots de passe : argon2 uniquement (`hashPassword`, `verifyPassword`)
- [ ] Pas de `console.log` de tokens, sessions, cookies, secrets
- [ ] `ENCRYPTION_KEY` requis en production (min 32 caractères)

### Headers et configuration

- [ ] `next.config.js` : headers sécurité inchangés (X-Frame-Options, CSP, HSTS)
- [ ] CSP stricte en production (pas de `unsafe-eval` si possible)

---

## Fichiers clés à consulter

| Rôle | Fichier |
|------|---------|
| Auth, 2FA | `lib/auth.ts` |
| CSRF | `lib/csrf.ts`, `lib/csrf-middleware.ts` |
| Validation | `lib/validation-middleware.ts`, `lib/validations.ts` |
| Sanitization | `lib/sanitize.ts` |
| Rate limit | `lib/rate-limit.ts` |
| Sessions | `lib/session-secure.ts` |
| Upload | `app/api/upload/route.ts` |
| Fichiers | `app/api/files/[...path]/route.ts` |
| Sauvegardes | `app/api/backups/[filename]/route.ts`, `restore/route.ts` |
| PRD sécurité | `prd_application_web_gestion_des_agences.md` (Section 15) |

---

## Règles strictes

1. **Pas de `$queryRaw` / `$executeRaw`** — Prisma protège contre l'injection SQL
2. **API BAN uniquement** — URL hardcodée `https://api-adresse.data.gouv.fr`
3. **Pas de dépendance non listée** dans le PRD Section 3.0 sans accord
4. **dangerouslySetInnerHTML** — Interdit sauf script FOUC dans `app/layout.tsx`
5. **Messages d'erreur génériques** — Pas d'exposition de détails internes (stacks, chemins)

---

## En cas de doute

Demander confirmation avant de modifier une logique de sécurité. Référer à `SECURITY.md` pour le rapport de synthèse OWASP.
