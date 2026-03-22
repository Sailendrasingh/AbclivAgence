# Runbook Production - ABCLIV Agency (GHCR prive)

Ce document centralise toutes les procedures de mise en production avec 2 conteneurs Docker:

- `web` (application Next.js)
- `db` (PostgreSQL)

Le deploiement utilise une image Docker privee publiee sur GitHub Container Registry (GHCR).

---

## 1) Prerequis

- Repository GitHub en **prive**
- Workflows presents sur `main`:
  - `.github/workflows/docker-private-image.yml`
  - `.github/workflows/deploy-prod-private.yml` (optionnel, deploiement via SSH)
- Docker + Docker Compose plugin installes sur le serveur

---

## 2) Generer un token GitHub (PAT) pour le serveur

Le serveur doit pouvoir faire `docker pull` sur GHCR prive.

### Scopes a cocher (token classic)

- `repo`
- `read:packages`

Puis generer le token et le copier (il ne sera plus affiche ensuite).

---

## 3) Authentifier le serveur a GHCR

Si tu utilises `sudo` pour Docker, fais aussi le login avec `sudo`:

```bash
echo "TON_PAT_GITHUB" | sudo docker login ghcr.io -u Sailendrasingh --password-stdin
```

Verification:

```bash
sudo docker pull ghcr.io/sailendrasingh/abclivagence:latest
```

---

## 4) Publier l'image Docker privee depuis GitHub Actions

1. Aller dans `Actions`
2. Lancer le workflow `Docker Private Image` (ou push sur `main`)
3. Verifier que le job est vert

Tags publies:

- `ghcr.io/sailendrasingh/abclivagence:latest`
- `ghcr.io/sailendrasingh/abclivagence:sha-<commit>`

Si `docker pull ...:latest` retourne `not found`, l'image n'a pas encore ete publiee avec succes.

---

## 5) Fichiers production sur le serveur

Dans `/opt/abcliv` (exemple):

- `docker-compose.prod.yml`
- `.env.prod`

Exemple de `.env.prod`:

```env
APP_IMAGE=ghcr.io/sailendrasingh/abclivagence:latest
POSTGRES_USER=abcliv
POSTGRES_PASSWORD=change-me-strong-password
POSTGRES_DB=abcliv
ENCRYPTION_KEY=change-me-32-characters-minimum
```

---

## 6) Deploiement standard (2 conteneurs)

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d db
docker compose -f docker-compose.prod.yml --env-file .env.prod run --rm migrate
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d web
```

Verification:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod ps
docker compose -f docker-compose.prod.yml --env-file .env.prod logs -f web
```

---

## 7) Script update en 1 commande

Creer:

```bash
sudo tee /usr/local/bin/abcliv-update >/dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
cd /opt/abcliv
docker compose -f docker-compose.prod.yml --env-file .env.prod pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d db
docker compose -f docker-compose.prod.yml --env-file .env.prod run --rm migrate
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d web
docker compose -f docker-compose.prod.yml --env-file .env.prod ps
EOF
sudo chmod +x /usr/local/bin/abcliv-update
```

Utilisation:

```bash
abcliv-update
```

---

## 8) Script rollback applicatif (tag SHA)

Creer:

```bash
sudo tee /usr/local/bin/abcliv-rollback >/dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
if [[ $# -ne 1 ]]; then
  echo "Usage: abcliv-rollback <tag>"
  echo "Ex: abcliv-rollback sha-369f8a6"
  exit 1
fi
TAG="$1"
cd /opt/abcliv
BASE_IMAGE="$(awk -F= '/^APP_IMAGE=/{print $2}' .env.prod | sed 's/:.*$//')"
APP_IMAGE="${BASE_IMAGE}:${TAG}" docker compose -f docker-compose.prod.yml --env-file .env.prod pull web migrate
APP_IMAGE="${BASE_IMAGE}:${TAG}" docker compose -f docker-compose.prod.yml --env-file .env.prod run --rm migrate
APP_IMAGE="${BASE_IMAGE}:${TAG}" docker compose -f docker-compose.prod.yml --env-file .env.prod up -d web
APP_IMAGE="${BASE_IMAGE}:${TAG}" docker compose -f docker-compose.prod.yml --env-file .env.prod ps
EOF
sudo chmod +x /usr/local/bin/abcliv-rollback
```

Utilisation:

```bash
abcliv-rollback sha-<commit>
```

---

## 9) Update securise avec backup automatique DB

Creer:

```bash
sudo tee /usr/local/bin/abcliv-update-safe >/dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

cd /opt/abcliv
set -a
source .env.prod
set +a

TS="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="/opt/abcliv/backups"
BACKUP_FILE="${BACKUP_DIR}/db-preupdate-${TS}.sql"

mkdir -p "${BACKUP_DIR}"

echo "1) Sauvegarde PostgreSQL avant update..."
docker compose -f docker-compose.prod.yml --env-file .env.prod exec -T db \
  pg_dump -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" > "${BACKUP_FILE}"

echo "Backup créée: ${BACKUP_FILE}"

echo "2) Pull images..."
docker compose -f docker-compose.prod.yml --env-file .env.prod pull

echo "3) Démarrage DB..."
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d db

echo "4) Migrations..."
docker compose -f docker-compose.prod.yml --env-file .env.prod run --rm migrate

echo "5) Redémarrage web..."
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d web

echo "6) État des services..."
docker compose -f docker-compose.prod.yml --env-file .env.prod ps

echo "Update safe terminé."
EOF
sudo chmod +x /usr/local/bin/abcliv-update-safe
```

Utilisation:

```bash
abcliv-update-safe
```

---

## 10) Restore base de donnees depuis un backup SQL

Creer:

```bash
sudo tee /usr/local/bin/abcliv-db-restore >/dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: abcliv-db-restore <fichier.sql>"
  echo "Ex: abcliv-db-restore /opt/abcliv/backups/db-preupdate-20260322-181500.sql"
  exit 1
fi

SQL_FILE="$1"
if [[ ! -f "$SQL_FILE" ]]; then
  echo "Fichier introuvable: $SQL_FILE"
  exit 1
fi

cd /opt/abcliv
set -a
source .env.prod
set +a

echo "Restauration de ${SQL_FILE} ..."
cat "$SQL_FILE" | docker compose -f docker-compose.prod.yml --env-file .env.prod exec -T db \
  psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"

echo "Restauration terminée."
EOF
sudo chmod +x /usr/local/bin/abcliv-db-restore
```

Utilisation:

```bash
abcliv-db-restore /opt/abcliv/backups/db-preupdate-YYYYMMDD-HHMMSS.sql
```

---

## 11) Troubleshooting rapide

### A) `denied` pendant `docker pull`

- Faire le login GHCR avec `sudo` si `pull` est fait avec `sudo`.
- Verifier token: `repo` + `read:packages`.

### B) `not found` pendant `docker pull :latest`

- Le workflow `Docker Private Image` n'a pas publie l'image avec succes.
- Relancer workflow et verifier le build.

### C) Build GHCR echec `npm run build`

- Ouvrir le log complet du run GitHub Actions.
- Corriger l'erreur TypeScript/Next remontee.

---

## 12) Checklist securite post-deploiement

- Changer le mot de passe Admin par defaut
- Verifier package GHCR en `Private`
- Ne jamais versionner `.env.prod`
- Garder PostgreSQL non expose publiquement
- Mettre l'app derriere reverse proxy + TLS
- Sauvegardes regulieres testees (restore compris)

