# Runbook incidents Auth & Backups

Ce runbook décrit les actions de diagnostic et de remédiation pour les incidents critiques autour de l'authentification et des sauvegardes.

## 1) Incident Authentification (login 5xx / 401 anormaux)

### Symptômes
- Hausse des `POST /api/auth/login` en 5xx
- Utilisateurs bloqués malgré identifiants valides
- Erreurs sessions/cookies/CSRF

### Diagnostic rapide (10 min)
1. Vérifier l'état applicatif: `npm run build` et logs serveur.
2. Vérifier la base: connectivité PostgreSQL et présence des tables Prisma.
3. Vérifier variables: `DATABASE_URL`, `ENCRYPTION_KEY`, `NODE_ENV`.
4. Vérifier horloge serveur (impact 2FA TOTP).
5. Vérifier saturation rate-limit / lockout.

### Commandes utiles
- `npm run test:auth`
- `npx tsx scripts/check-db-connection.ts`
- `npx tsx scripts/check-admin-status.ts`

### Actions correctives
- Si table session absente: `npx prisma generate` puis `npx prisma db push`.
- Si lockout massif: contrôler IP/NAT et règles rate-limit.
- Si 2FA invalide généralisé: vérifier décalage horaire serveur.

### Validation post-correctif
- Login standard OK
- Login 2FA OK
- Logout puis relogin OK
- Aucune fuite d'information sensible dans les logs

---

## 2) Incident Sauvegarde / Restauration

### Symptômes
- Échec `npm run backup`
- Restauration impossible depuis `/dashboard/sauvegardes`
- Checksums invalides

### Diagnostic rapide (10 min)
1. Vérifier présence outils: `pg_dump`, `psql`.
2. Vérifier espace disque sur `backups/` et `uploads/`.
3. Vérifier `ENCRYPTION_KEY` et permissions des dossiers.
4. Vérifier intégrité checksum (`.sha256`) des archives.

### Commandes utiles
- `npm run backup`
- `npx tsx scripts/verify-data.ts`
- `npx tsx scripts/check-db-connection.ts`

### Actions correctives
- Si `pg_dump` absent: installer client PostgreSQL.
- Si checksum invalide: isoler l'archive corrompue et restaurer la dernière archive valide.
- Si restauration échoue: exécuter une restauration à blanc sur la base de test.

### Validation post-correctif
- Sauvegarde manuelle réussie
- Restauration de test réussie
- Vérification métier (agences, contacts, tâches) cohérente

---

## 3) Rollback opérationnel

1. Basculer en maintenance (si nécessaire).
2. Restaurer la dernière sauvegarde valide.
3. Redémarrer l'application.
4. Vérifier login/admin + dashboards + données clés.
5. Documenter RCA (cause racine, correctif, prévention).

