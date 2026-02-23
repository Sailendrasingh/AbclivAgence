# Product Requirement Document (PRD)

**Date** : 2026-02-23

## Overview
**ABCLIV Agency Dashboard** — Application de gestion d'agences avec calendrier, contacts, données techniques, photos, authentification 2FA, logs, historisation et sauvegardes. Stack : Next.js App Router, TypeScript, shadcn/ui, Tailwind CSS, SQLite, Prisma ORM.

---

## Fonctionnalités

| # | Section | Status |
|---|---------|--------|
| 1 | **Stack technique** (Next.js, TS, shadcn/ui, Tailwind, SQLite, Prisma, API BAN, PWA) | ✅ 100% |
| 2 | **Thèmes** (clair orange / sombre raffiné dégradé, anti-FOUC, transitions, accessibilité) | ✅ 100% |
| 3 | **Interface** (Master/Détails, redimensionnement, responsive mobile, sidebar, burger menu) | ✅ 100% |
| 4 | **Données Agence** (photo, nom, état OK/INFO/ALERTE/FERMÉE, adresses BAN, Google Maps) | ✅ 100% |
| 5 | **Contacts** (CRUD, validation poste/agent/ligne directe/emails, ordre modifiable) | ✅ 100% |
| 6 | **Technique** (Réseau, PC, Imprimantes, Machine à affranchir, WiFi, Routeurs, Vidéo protection, Notes, Champs dynamiques) | ✅ 100% |
| 7 | **Photos** (groupes, vignettes, lightbox zoom/pan/tactile, EXIF, suppression physique) | ✅ 100% |
| 8 | **Uploads** (filesystem, 5 MB, JPEG/PNG, magic bytes, cache HTTP optimisé) | ✅ 100% |
| 9 | **Recherche & Filtres** (tous les champs, debounce 300ms, filtres état) | ✅ 100% |
| 10 | **Auth & Sécurité** (argon2, 2FA Google Authenticator, RBAC, session timeout, CSRF, verrouillage compte) | ✅ 100% |
| 11 | **Logs** (connexion, actions, SQLite, CSV, rétention 30j, purge) | ✅ 100% |
| 12 | **Historisation** (agences max 100 versions, notes techniques, UI consultation + restauration) | ✅ 100% |
| 13 | **PWA & Offline** (manifest, service worker, file d'attente, sync) | ✅ 100% |
| 14 | **Sauvegardes** (ZIP db+uploads, rétention 10j, restauration UI, purge) | ✅ 100% |
| 15 | **OWASP Top 10** (A01-A10 tous couverts) | ✅ 100% |
| 16 | **Dashboard** (KPIs, graphique circulaire, barres, tâches urgentes, agences récentes, responsive) | ✅ 100% |
| 17 | **Calendrier** (Mois/Semaine/Jour/Planning, positionnement temporel, UX mobile Google Calendar, FAB, drawer, détails tâche) | ✅ 100% |
| 18 | **Error Boundary** (error.tsx avec message convivial + bouton Réessayer, stack trace en dev) | ✅ 100% |
| 19 | **Loading Skeleton** (loading.tsx avec animate-pulse pendant la navigation) | ✅ 100% |
| 20 | **Page 404** (not-found.tsx personnalisée avec retour au tableau de bord) | ✅ 100% |
| 21 | **Sécurité Logs** (suppression console.log sensibles, IP unifiée via getClientIP) | ✅ 100% |
| 22 | **Paramètres** (Refonte UI moderne 2 colonnes, sidebar verticale, cartes thématiques) | ✅ 100% |
| 23 | **Tests E2E Playwright** (connexion Admin 2FA, création agence, mobile changement d'agence) | ✅ 100% |
| 24 | **Accessibilité mobile** (aria-label bouton Retour, correction crash au retour liste) | ✅ 100% |
| 25 | **Thème sombre raffiné** (dégradé body, contraste, primary violet vif) | ✅ 100% |

---

## Refactoring Progress
- PhotoSection extraction completed ✅
- TechnicalSection extraction pending ⏳
- Page layout simplification pending ⏳

## Conformité globale : **100%** ✅

Tous les rapports de vérification (`RAPPORT_CONFORMITE_PRD.md`, `VERIFICATION_CONFORMITE_PRD.md`, `AUDIT_FONCTIONNALITES_PRD.md`) confirment la conformité totale au PRD.

**Recommandation** : Le projet est prêt pour la production.
