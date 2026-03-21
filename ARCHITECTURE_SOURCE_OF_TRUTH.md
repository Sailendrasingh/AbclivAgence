# Source de verite technique

Ce document sert de point d'entree unique pour la gouvernance technique ABCLIV Agency.

## 1) Composants de reference

- PRD fonctionnel: `prd_application_web_gestion_des_agences.md`
- PRD resume: `ProductRequirementDocument.md`
- Guide de deploiement: `GUIDE_DEPLOIEMENT_PRODUCTION.md`
- Securite: `SECURITY.md`
- Runbook incidents critiques: `RUNBOOK_INCIDENTS_AUTH_BACKUP.md`
- Audit index PostgreSQL: `AUDIT_INDEX_POSTGRESQL.md`

## 2) Decisions d'architecture (ADR)

- Registre ADR: `ADR_INDEX.md`
- Template ADR: `ADR_TEMPLATE.md`
- ADR existantes:
  - `ADR-0001-postgresql-runtime-only.md`
  - `ADR-0002-security-quality-gates.md`

## 3) Regles de mise a jour

- Toute decision structurante (stack, securite, persistence, CI/CD) doit avoir une ADR.
- Toute evolution de processus operationnel doit mettre a jour le runbook associe.
- Toute modification de comportement produit doit etre reflétée dans le PRD.
- Une PR est consideree "Done" uniquement si code + tests + docs sont alignes.

## 4) Owners proposes

- Owner architecture applicative: equipe technique lead.
- Owner securite: referent securite.
- Owner operations (backup/restore): referent exploitation.

## 5) Cadence de revue

- Revue mensuelle du registre ADR.
- Revue bi-mensuelle des runbooks incidents.
- Revue trimestrielle complete (securite/perf/dette) avec plan 90 jours.
