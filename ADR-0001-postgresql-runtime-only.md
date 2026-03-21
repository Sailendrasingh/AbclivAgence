# ADR-0001: PostgreSQL uniquement en runtime

- Date: 2026-03-21
- Statut: Accepte
- Decisionnaires: Equipe technique

## Contexte

Le projet a migre de SQLite vers PostgreSQL. Le maintien d'une logique duale augmentait la complexite, les risques de divergence et la surface d'incident.

## Decision

La base runtime de l'application est PostgreSQL uniquement. Les chemins de fallback SQLite sont exclus du runtime.

## Alternatives considerees

- Conserver un mode SQLite optionnel:
  - Avantage: simplicite locale percue.
  - Inconvenient: dette technique, tests dual-stack, risque de non-conformite PRD.

## Consequences

- Positives:
  - Chemin de code unique et plus fiable.
  - Sauvegarde/restauration standardisee (`pg_dump`/`psql`).
- Negatives:
  - Necessite un environnement PostgreSQL en dev/test.

## Plan de migration / rollout

- Validation schema Prisma sur PostgreSQL.
- Verification tests unitaires/e2e.
- Mise a jour documentation de reference.

## References

- `MIGRATION_POSTGRESQL.md`
- `prd_application_web_gestion_des_agences.md`
- `GUIDE_DEPLOIEMENT_PRODUCTION.md`
