# ADR-0002: Gates securite et qualite obligatoires

- Date: 2026-03-21
- Statut: Accepte
- Decisionnaires: Equipe technique

## Contexte

Les regressions sur auth/backup et les risques de securite imposent un controle systematique avant merge.

## Decision

Rendre obligatoires les gates CI suivantes sur la branche principale:

- `npm run lint`
- `npm run test`
- `npm run build`

Completer avec des controles periodiques:

- Drill de restauration (`npm run backup:drill`)
- Sante des secrets (`npm run secrets:check`)
- Mini-audit securite (`npm run security:audit:mini`)

## Alternatives considerees

- Validation manuelle uniquement:
  - Avantage: plus rapide a court terme.
  - Inconvenient: risque eleve d'erreurs humaines et de regression.

## Consequences

- Positives:
  - Reduction du risque de deploiement defectueux.
  - Traçabilite operationnelle renforcee.
- Negatives:
  - Temps CI potentiellement plus long.

## Plan de migration / rollout

- Industrialiser workflows GitHub Actions.
- Ajouter un template PR avec checklist.
- Suivre les KPIs de stabilite CI.

## References

- `.github/workflows/ci.yml`
- `.github/workflows/backup-drill.yml`
- `.github/pull_request_template.md`
