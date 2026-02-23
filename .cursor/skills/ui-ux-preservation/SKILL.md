---
name: ui-ux-preservation
description: Préserve l'UI/UX existante : ne pas modifier l'interface utilisateur (layout, styles, composants, textes, structure visuelle) sauf demande explicite. Utiliser lors de toute modification de code pour éviter les changements UI/UX non demandés.
---

# Préservation de l'UI/UX — ABCLIV Agency

## Règle impérative

**Ne pas modifier l'UI/UX sauf demande explicite de l'utilisateur.**

Si l'utilisateur demande une correction de bug, une nouvelle fonctionnalité backend, un refactoring, etc. — et ne mentionne **pas** l'interface — toutes les modifications doivent rester **invisibles** côté utilisateur. Le rendu, les textes, la disposition et les interactions existantes doivent rester inchangés.

---

## Ce qui constitue une modification UI/UX

- **Layout** : structure des grilles, flex, colonnes, espacements
- **Styles** : classes Tailwind, couleurs, tailles, bordures
- **Composants visuels** : boutons, cartes, dialogs, formulaires
- **Textes** : libellés, messages, placeholders, titres
- **Ordre / hiérarchie** : disposition des éléments, onglets
- **Animations, transitions**
- **Icônes** : remplacement ou ajout d'icônes
- **Comportements visuels** : afficher/masquer, états visuels

---

## Comportement attendu

### Demande sans mention UI/UX (ex : "Corriger le bug X", "Ajouter la validation Y")

- Modifier **uniquement** la logique (API, validation, lib, état)
- Ne pas toucher aux composants React, aux classes CSS, au markup
- Ne pas reformuler les textes, réorganiser les champs ou changer la mise en page
- Si le fix impose un changement visuel minime (ex : afficher une erreur) : le faire avec le **minimum** de changement, en conservant le style et la structure existants

### Demande explicite UI/UX (ex : "Améliorer le formulaire", "Changer le layout", "Refaire le design de...")

- Appliquer le skill `responsive-preservation` pour le responsive
- Respecter le PRD (Section 4 Interface utilisateur)
- Ne pas dégrader l’accessibilité ni le responsive existant

---

## Vérification avant modification

Avant de modifier un fichier UI (`page.tsx`, `*.tsx` dans `components/`) :

1. **L’utilisateur a-t-il explicitement demandé un changement d’interface ?**
   - Non → Ne pas modifier le rendu, les styles ni les textes
   - Oui → Procéder en respectant le PRD et le responsive

2. **Le changement est-il strictement nécessaire pour la demande ?**
   - Exemple : ajout d’un champ backend → si le PRD impose un champ dans le formulaire, l’ajouter ; sinon, ne pas toucher à l’UI
   - Exemple : correction de bug → si le bug est purement logique, ne pas modifier l’UI

---

## Exceptions explicites

Modifications UI **autorisées sans demande explicite** :

- Correction d’un **bug visuel** rapporté (ex : "Le bouton ne s’affiche pas")
- Ajout d’un **élément requis par le PRD** pour une nouvelle fonctionnalité
- **Correction d’accessibilité** (WCAG) si demandée
- **Correction de responsive** si un problème est signalé

---

## Règles strictes

1. **Pas de "amélioration" UI non demandée** — pas de refonte, pas de "nettoyage" visuel
2. **Pas de réécriture de textes** — conserver les libellés existants
3. **Pas de réorganisation de layout** — garder la structure actuelle
4. **En cas de doute** — demander confirmation avant de modifier l’UI
