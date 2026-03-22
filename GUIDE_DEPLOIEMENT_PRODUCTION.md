# Guide de deploiement production (conforme Docker + GHCR prive)

Ce guide est la version conforme du deploiement production ABCLIV Agency.

Il remplace les anciennes procedures basees sur PM2/Node installe sur serveur.

## Architecture cible

- 2 conteneurs Docker:
  - `web` (Next.js)
  - `db` (PostgreSQL)
- Image applicative privee publiee sur GHCR:
  - `ghcr.io/sailendrasingh/abclivagence:latest`
  - `ghcr.io/sailendrasingh/abclivagence:sha-<commit>`

## Prerequis

- Serveur Linux avec Docker + Docker Compose plugin
- Repository GitHub prive
- Package GHCR en visibilite `Private`
- Token GitHub (PAT classic) avec scopes:
  - `repo`
  - `read:packages`

## 1) Authentifier le serveur a GHCR

Si tu utilises `sudo` pour Docker, fais aussi le login avec `sudo`:

```bash
echo "TON_PAT_GITHUB" | sudo docker login ghcr.io -u Sailendrasingh --password-stdin
```

Verification:

```bash
sudo docker pull ghcr.io/sailendrasingh/abclivagence:latest
```

## 2) Fichiers requis sur le serveur

Dans `/opt/abcliv` (exemple):

- `docker-compose.prod.yml`
- `.env.prod`

Exemple `.env.prod`:

```env
APP_IMAGE=ghcr.io/sailendrasingh/abclivagence:latest
POSTGRES_USER=abcliv
POSTGRES_PASSWORD=change-me-strong-password
POSTGRES_DB=abcliv
ENCRYPTION_KEY=change-me-32-characters-minimum
```

## 3) Deploiement standard

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

## 4) Mise a jour applicative

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d db
docker compose -f docker-compose.prod.yml --env-file .env.prod run --rm migrate
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d web
```

## 5) Rollback (image tag SHA)

```bash
APP_IMAGE="ghcr.io/sailendrasingh/abclivagence:sha-<commit>" \
  docker compose -f docker-compose.prod.yml --env-file .env.prod up -d web
```

Pour un rollback complet industrialise, utiliser le script du runbook:

- `abcliv-rollback sha-<commit>`

## 6) Sauvegarde et restauration DB

Backup rapide:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod exec -T db \
  pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" > /opt/abcliv/backups/db-$(date +%Y%m%d-%H%M%S).sql
```

Restore:

```bash
cat /opt/abcliv/backups/<fichier.sql> | docker compose -f docker-compose.prod.yml --env-file .env.prod exec -T db \
  psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
```

## 7) Procedures detaillees (source de verite)

Le runbook detaille (scripts update, rollback, backup safe, restore, troubleshooting) est ici:

- `docs/RUNBOOK-PRODUCTION-GHCR.md`

## 8) Notes de securite

- Ne jamais commiter `.env.prod`
- Changer le mot de passe Admin par defaut immediatement
- Garder PostgreSQL non expose publiquement
- Mettre l'application derriere reverse proxy + TLS
