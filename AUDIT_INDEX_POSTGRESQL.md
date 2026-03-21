# Audit index PostgreSQL (lot initial)

## Objectif
Réduire les latences sur les endpoints les plus sollicités (`/api/dashboard/*`, filtres/aggrégations, historiques, logs).

## Requêtes ciblées
- Dashboard:
  - `task.findMany({ where: { createdAt >= ... } })`
  - `task.findMany({ where: { closedAt >= ... } })`
  - `task.findMany({ where: { closedAt: null, importance: "URGENT" }, orderBy: { createdAt: "desc" } })`
  - `alert.findMany({ where: { resolved: false }, orderBy: { createdAt: "desc" } })`
  - `agency.findMany({ orderBy: { updatedAt: "desc" } })`
- Historisation:
  - `agencyHistory` par `agencyId` et date
  - `technicalHistory` par `technicalId` et date
- Logs:
  - listing/purge/export par fenêtre temporelle

## Index ajoutés dans `prisma/schema.prisma`
- `Session`: `userId`, `expiresAt`
- `Agency`: `state`, `updatedAt`
- `Address`: `agencyId`
- `Contact`: `agencyId`, `(agencyId, order)`
- `PC`: `technicalId`, `(technicalId, order)`
- `Printer`, `WifiAccessPoint`, `Camera`: `technicalId`
- `DynamicField`: `technicalId`, `(technicalId, order)`
- `TechnicalHistory`: `(technicalId, createdAt)`, `userId`
- `PhotoGroup`: `agencyId`
- `AgencyHistory`: `(agencyId, createdAt)`, `userId`
- `Log`: `createdAt`, `(userId, createdAt)`
- `Task`: `agencyId`, `createdBy`, `closedBy`, `createdAt`, `closedAt`, `(importance, closedAt, createdAt)`
- `Alert`: `(resolved, createdAt)`, `(userId, createdAt)`

## Application
1. Générer migration:
   - `npx prisma migrate dev -n add_performance_indexes`
2. Vérifier plan SQL:
   - `EXPLAIN ANALYZE` sur les requêtes dashboard/logs avant/après.
3. Déployer:
   - `npx prisma migrate deploy`

## KPI de succès
- P95 `/api/dashboard/global` et `/api/dashboard/summary` en baisse.
- Réduction du temps de tri/liste sur logs et historiques.
- Pas de régression fonctionnelle (tests API + build).

