FROM node:20-bullseye-slim

# Dépendances système : argon2/sharp + postgresql-client pour pg_dump/psql (sauvegardes)
RUN apt-get update && \
    apt-get install -y python3 build-essential postgresql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Installer les dépendances sans scripts postinstall
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Prisma: copier les schémas et générer le client
COPY prisma ./prisma
RUN npx prisma generate

# Copier le reste du code
COPY . .

ARG DATABASE_URL=postgresql://postgres:postgres@localhost:5432/abcliv
ARG ENCRYPTION_KEY=build-encryption-key-32-chars-long!!
ARG NEXT_TELEMETRY_DISABLED=1

ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}
ENV ENCRYPTION_KEY=${ENCRYPTION_KEY}
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

# Build Next.js
RUN npm run build

EXPOSE 3000

# En production : définir DATABASE_URL (ex: postgresql://user:pass@host:5432/db) et ENCRYPTION_KEY (≥32 car.) via env_file ou variables d'environnement
CMD ["npm", "run", "start"]
