# Script d'initialisation PostgreSQL pour ABCLIV Agency
# Exécute les étapes : démarrage Docker, migrations, création admin

Write-Host "=== Initialisation PostgreSQL ABCLIV ===" -ForegroundColor Cyan

# 1. Démarrer PostgreSQL (Docker Compose)
Write-Host "`n1. Nettoyage des conteneurs/volumes existants (si erreur précédente)..." -ForegroundColor Yellow
docker compose down -v 2>$null

Write-Host "`n2. Démarrage de PostgreSQL..." -ForegroundColor Yellow
docker compose up -d postgres
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur: Docker n'est peut-être pas démarré. Lancez Docker Desktop puis réessayez." -ForegroundColor Red
    exit 1
}

# Attendre que PostgreSQL soit prêt
Write-Host "Attente du démarrage de PostgreSQL (30 s)..."
Start-Sleep -Seconds 30

# 3. Migrations Prisma
Write-Host "`n3. Application des migrations Prisma..." -ForegroundColor Yellow
npx prisma migrate deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors des migrations." -ForegroundColor Red
    exit 1
}

# 4. Créer l'admin
Write-Host "`n4. Création de l'utilisateur Admin..." -ForegroundColor Yellow
npm run restore:admin
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors de la création de l'admin." -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Initialisation terminée ===" -ForegroundColor Green
Write-Host "Lancez l'application : npm run dev" -ForegroundColor White
Write-Host "Identifiants : Admin / Password" -ForegroundColor White
