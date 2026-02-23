---
name: responsive-preservation
description: Vérifie que le responsive Mobile/Tablette/Desktop est respecté lors des modifications d'UI. Utiliser lors de modifications de composants, layouts, formulaires, dialogs, grilles, ou de la page agences. Référence PRD Section 4 (gestion responsive).
---

# Préservation du responsive — ABCLIV Agency

## Quand appliquer

- Modification de composants UI (layout, formulaires, cartes, listes)
- Ajout de grilles, flex, dialogs
- Modification de la page agences (Master/Détails)
- Changement de padding, espacements, tailles
- Ajout de boutons ou éléments interactifs

---

## Breakpoints Tailwind (PRD Section 4)

| Breakpoint | Largeur | Usage |
|------------|---------|-------|
| (défaut) | < 640px | Mobile |
| `sm` | ≥ 640px | Petit mobile / transition |
| `md` | ≥ 768px | **Tablette** — seuil mobile ↔ desktop |
| `lg` | ≥ 1024px | Desktop |
| `xl` | ≥ 1280px | Large desktop |
| `2xl` | ≥ 1536px | Très large desktop |

**Détection mobile** : `< 768px` (avant `md`). Au-dessus = tablette/desktop.

---

## Checklist responsive

### Mobile (< 768px)

- [ ] Padding réduit : `p-3` (au lieu de `p-6`), `p-4` pour les cards
- [ ] Espacements : `gap-2 sm:gap-4`, `space-y-2 sm:space-y-4`
- [ ] Textes : `text-base sm:text-lg` (sections), `text-base sm:text-2xl` (titres)
- [ ] Boutons : `w-full sm:w-auto`, **min-height 44px** (accessibilité)
- [ ] Grilles : `grid-cols-1 sm:grid-cols-2` (empilées sur mobile)
- [ ] Grille photos : `grid-cols-2 sm:grid-cols-3 md:grid-cols-4`
- [ ] Flex : `flex-col sm:flex-row`
- [ ] Dialogs : `max-w-[95vw] sm:max-w-lg`, `p-4 sm:p-6`, `max-h-[90vh]` + scroll
- [ ] Images : `max-w-full sm:max-w-md`, `h-48 sm:h-64`, `object-contain`
- [ ] Icônes techniques : `max-w-[60px] sm:max-w-[100px]`
- [ ] **Pas de scroll horizontal** : `overflow-x: hidden` si nécessaire

### Accessibilité mobile

- [ ] **Éléments interactifs** : hauteur minimale **44px**
- [ ] **Inputs / Select / Textarea** : taille de police **≥ 16px** (évite zoom iOS)
- [ ] **Boutons** : texte complet sur desktop ; icône ou abréviation sur mobile si besoin

### Master/Détails (page agences)

- [ ] Mobile : Master seul par défaut ; clic sur agence → Détails en plein écran
- [ ] Mobile : bouton Retour (ArrowLeft) dans l'en-tête des Détails
- [ ] Mobile : barre de redimensionnement **masquée**
- [ ] Desktop (≥ 768px) : Master et Détails côte à côte, redimensionnement actif

### Sidebar

- [ ] Desktop : largeur fixe `14rem` (224px)
- [ ] Mobile (drawer) : `w-1/2` (50 % de l'écran)
- [ ] Menu burger sur mobile

### Tableaux / listes longues

- [ ] Scroll horizontal autorisé sur mobile si nécessaire
- [ ] Affichage en **cartes** recommandé sur mobile (au lieu de table)

---

## Patterns Tailwind à utiliser

```
Padding :        p-4 sm:p-6
Grille 2 cols :  grid-cols-1 sm:grid-cols-2
Grille 4 cols :  grid-cols-2 sm:grid-cols-3 md:grid-cols-4
Flex direction : flex-col sm:flex-row
Largeur btn :    w-full sm:w-auto
Titre :          text-base sm:text-2xl
Dialog :         max-w-[95vw] sm:max-w-lg
Cacher mobile :  hidden md:flex (ou inverse)
```

---

## Règles strictes

1. **Pas de largeur fixe en px** pour les conteneurs principaux — utiliser `max-w-full`, `w-full`, ou breakpoints
2. **Prévention scroll horizontal** : `overflow-x: hidden` sur body (déjà dans `globals.css`)
3. **Images** : toujours `max-w-full` et `object-contain` pour préserver les proportions
4. **Dialogs** : toujours scroll vertical si contenu long (`overflow-y-auto`)

---

## Références

- PRD : `prd_application_web_gestion_des_agences.md` — Section 4 (Interface utilisateur)
- Breakpoints : `tailwind.config.ts` (défauts Tailwind)
- Layout agences : `app/dashboard/agences/page.tsx`
