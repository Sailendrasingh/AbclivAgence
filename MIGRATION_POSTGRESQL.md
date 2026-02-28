# Migration SQLite → PostgreSQL

Ce document décrit la migration de la base de données SQLite vers PostgreSQL.

## Prérequis

- **PostgreSQL** 14+ (conteneur Docker ou serveur dédié)
- **postgresql-client** (pg_dump, psql) pour les sauvegardes — inclus dans l'image Docker
- Pour les tests : une base PostgreSQL de test

## Configuration

### 1. Variables d'environnement

Dans `.env` :

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

Exemples :
- **Docker local** : `postgresql://postgres:postgres@host.docker.internal:5432/abcliv`
- **Réseau Docker** : `postgresql://postgres:secret@postgres:5432/abcliv`

### 2. Créer la base et appliquer les migrations

```bash
# Créer la base (si elle n'existe pas)
createdb -U postgres abcliv

# Appliquer les migrations Prisma
npx prisma migrate deploy
```

### 3. Initialiser l'admin

```bash
npm run restore:admin
```

## Sauvegardes

Les sauvegardes utilisent **pg_dump** au lieu de copier le fichier .db.

- **Format** : ZIP contenant `dump.sql` + dossier `uploads/`
- **Prérequis** : `postgresql-client` installé (déjà inclus dans le Dockerfile)
- **Restauration** : via `psql -f dump.sql`

## Tests

Les tests utilisent une base PostgreSQL de test. Définir :

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/abcliv_test"
```

Ou lancer PostgreSQL en Docker :

```bash
docker run -d --name postgres-test \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=abcliv_test \
  -p 5433:5432 \
  postgres:16

DATABASE_URL="postgresql://postgres:postgres@localhost:5433/abcliv_test" npm run test
```

## Docker Compose (exemple)

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: abcliv
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    environment:
      DATABASE_URL: postgresql://postgres:secret@postgres:5432/abcliv
    depends_on:
      - postgres

volumes:
  postgres_data:
```

## Initialisation rapide (Windows)

Avec Docker installé et démarré :

```powershell
npm run postgres:init
```

Ce script démarre PostgreSQL, applique les migrations et crée l'utilisateur Admin.

## Migration des données existantes (SQLite → PostgreSQL)

Pour migrer des données d'une ancienne base SQLite :

1. Exporter les données SQLite (script custom ou outil tiers)
2. Importer dans PostgreSQL (scripts d'import ou `psql`)
3. Ou utiliser un outil comme [pgloader](https://pgloader.io/) : `pgloader sqlite://prisma/dev.db postgresql://...`
