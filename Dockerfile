FROM node:20-bullseye-slim

# Dépendances système minimales pour argon2/sharp
RUN apt-get update && \
    apt-get install -y python3 build-essential && \
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

ENV NODE_ENV=production

# Build Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
