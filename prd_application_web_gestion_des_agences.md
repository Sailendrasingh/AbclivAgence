# Product Requirement Document (PRD)

⚠️ **PRD strict – Développement en Vibe Coding (piloté par IA)**
Langue de l’interface : **FRANÇAIS UNIQUEMENT**

Ce document est **contractuel, prescriptif et exhaustif**.
L’IA **ne doit pas interpréter**, **ne doit pas compléter**, **ne doit pas optimiser**, **ne doit pas improviser**.

👉 **Tout ce qui n’est pas explicitement écrit ici est interdit.**

---

## 1. Cadre impératif pour l’IA (anti‑hallucination)

### 1.1 Interdictions absolues

L’IA ne doit jamais :

* Ajouter un champ, une règle, une logique ou une UI non décrite
* Choisir une technologie différente
* Modifier une structure validée
* Déduire un comportement métier
* Ajouter une dépendance non autorisée

### 1.2 Obligations

L’IA doit :

* Implémenter **strictement** ce PRD
* Demander confirmation humaine en cas de doute
* Prioriser **sécurité, robustesse, traçabilité**

---

## 2. Objectif unique du produit

Développer une application web permettant **exclusivement** :

* CRUD des agences
* Historisation des modifications
* Consultation sécurisée

Aucune autre finalité.

---

## 3. Stack technique (verrouillée)

* Framework : **Next.js 16.1.1 – App Router**
* Langage : **TypeScript obligatoire**
* React : **19.2.3**
* UI : **shadcn/ui**

  * Thème clair et sombre fournis par shadcn/ui
* CSS : Tailwind CSS
* Base de données : **PostgreSQL** (obligatoire en runtime projet).
* ORM : **Prisma 5.22.0 (obligatoire)**
* API externe autorisée : **BAN uniquement**

Aucune autre technologie n'est autorisée.

### 3.0 Dépendances autorisées

Les dépendances suivantes sont autorisées et utilisées dans le projet :

#### Dépendances principales (dependencies)

* **@prisma/client** (^5.22.0) : Client Prisma pour l'accès à la base de données
* **@radix-ui/react-avatar** (^1.1.0) : Composant Avatar de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-dialog** (^1.1.0) : Composant Dialog de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-dropdown-menu** (^2.1.0) : Composant Dropdown Menu de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-label** (^2.1.0) : Composant Label de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-select** (^2.1.0) : Composant Select de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-separator** (^1.1.0) : Composant Separator de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-slot** (^1.1.0) : Utilitaire Slot de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-switch** (^2.1.0) : Composant Switch de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-tabs** (^1.1.0) : Composant Tabs de Radix UI (utilisé par shadcn/ui)
* **@radix-ui/react-toast** (^1.2.0) : Composant Toast de Radix UI (utilisé par shadcn/ui)
* **archiver** (^7.0.1) : Bibliothèque pour créer des archives ZIP (utilisée pour les sauvegardes)
* **argon2** (^0.31.2) : Bibliothèque de hachage de mots de passe (utilisée pour l'authentification)
* **class-variance-authority** (^0.7.0) : Utilitaire pour gérer les variantes de classes CSS (utilisé par shadcn/ui)
* **clsx** (^2.1.1) : Utilitaire pour combiner des classes CSS conditionnellement (utilisé par shadcn/ui)
* **exifr** (^7.1.3) : Bibliothèque d'extraction de métadonnées EXIF des images (utilisée pour récupérer la date de création originale des photos)
* **lucide-react** (^0.427.0) : Bibliothèque d'icônes React (utilisée pour toutes les icônes de l'interface)
* **next** (^16.1.1) : Framework Next.js
* **otpauth** (^9.3.2) : Bibliothèque pour la génération de TOTP (Time-based One-Time Password) pour l'authentification à deux facteurs (2FA)
* **prisma** (^5.22.0) : ORM Prisma
* **qrcode** (^1.5.3) : Bibliothèque de génération de codes QR (utilisée pour afficher le QR code de l'authentification à deux facteurs)
* **react** (^19.2.3) : Bibliothèque React
* **react-dom** (^19.2.3) : Bibliothèque React DOM
* **sharp** (^0.33.0) : Bibliothèque de traitement d'images haute performance (utilisée pour redimensionner les photos de profil en 100x100px)
* **tailwind-merge** (^2.5.0) : Utilitaire pour fusionner intelligemment les classes Tailwind CSS (utilisé par shadcn/ui)
* **tailwindcss-animate** (^1.0.7) : Plugin Tailwind CSS pour les animations (utilisé par shadcn/ui)
* **validator** (^13.12.0) : Bibliothèque de validation de données (utilisée pour valider les adresses email selon la norme RFC)
* **yauzl** (^3.2.0) : Bibliothèque légère pour lire les archives ZIP (utilisée pour la restauration de sauvegardes)
* **zod** (^4.3.4) : Bibliothèque de validation de schémas TypeScript (utilisée pour valider strictement toutes les entrées API)

**Note importante sur ClamAV** : Le scan antivirus utilise ClamAV si disponible sur le système. ClamAV n'est pas une dépendance npm mais doit être installé séparément sur le serveur (ex: `sudo apt-get install clamav clamav-daemon` sur Ubuntu/Debian). Le système fonctionne avec un scan heuristique en fallback si ClamAV n'est pas disponible, mais l'installation de ClamAV est recommandée en production pour un scan complet.

#### Dépendances de développement (devDependencies)

* **@types/archiver** (^7.0.0) : Types TypeScript pour archiver
* **@types/node** (^20.14.0) : Types TypeScript pour Node.js
* **@types/qrcode** (^1.5.5) : Types TypeScript pour qrcode
* **@types/react** (^19.0.6) : Types TypeScript pour React
* **@types/react-dom** (^19.0.2) : Types TypeScript pour React DOM
* **@types/validator** (^13.15.10) : Types TypeScript pour validator
* **@types/yauzl** (^2.10.3) : Types TypeScript pour yauzl
* **autoprefixer** (^10.4.19) : Plugin PostCSS pour ajouter automatiquement les préfixes vendeurs CSS
* **eslint** (^8.57.0) : Linter JavaScript/TypeScript
* **eslint-config-next** (^16.1.1) : Configuration ESLint pour Next.js
* **postcss** (^8.4.38) : Outil de transformation CSS
* **tailwindcss** (^3.4.4) : Framework CSS utility-first
* **tsx** (^4.21.0) : Exécuteur TypeScript pour les scripts (utilisé pour exécuter les scripts de migration et d'initialisation)
* **typescript** (^5.5.0) : Compilateur TypeScript

---

## 3.1 Système de thèmes (clair / sombre)

* **Activation** : Mode dark via classe `dark` sur `<html>`, mode clair via classe `light` (géré par `ThemeToggle` et script inline dans `<head>`)
* **Configuration Tailwind** : `darkMode: ["class"]`
* **Implémentation** : Variables CSS HSL dans `app/theme.css`
* **Thème clair** : Deux variantes documentées ; implémentation dans `app/theme.css` (variables `:root` et `.light`).
  * **Variante « Lumière » (actuelle)** : Moderne et très lisible. Couleur principale **Indigo** (HSL: 239 84% 57%). Fond neutre en dégradé doux (blanc chaud → blanc). Texte slate foncé (`--foreground`: 222 47% 11%). Surfaces en blanc. Bordures gris clair. `--radius: 0.5rem`.
  * **Variante « Orange dégradé » (historique)** : Ambiance chaude, dégradé orange visible (orange → pêche → crème). Primary orange (HSL: 26 90% 52%). Le wrapper `dashboard-shell` peut rester transparent pour laisser voir le dégradé.
  * Surfaces de contenu : Cards et popovers en blanc pour une lisibilité optimale.
  * Tokens : primary, accent, border, radius définis dans `theme.css`.
* **Thème sombre** :
  * Ambiance raffinée avec profondeur et contraste améliorés (inspirée de CoreUI Dark)
  * Couleur principale : **Violet / Bleu** (HSL: 239 84% 67%)
  * Fonds : Dégradé subtil sur le body (HSL 224° 22% 9% → 218° 16% 14%) pour profondeur
  * Background : HSL 222 20% 11%
  * Surfaces : Gris-Bleu foncé (HSL: 220 16% 15% pour card/popover)
  * Texte : `--foreground` (HSL: 220 14% 92%) pour contraste optimal
  * Dégradé de marque : Violet → Transparent
  * Bordures : HSL 220 14% 24% pour meilleure définition
  * Primary : HSL 239 84% 67% (violet plus vif pour meilleure visibilité)
* **Fonctionnalités avancées** :
  * **Script inline dans `<head>`** : Évite le FOUC (Flash of Unstyled Content) en appliquant le thème avant le rendu
  * **Persistance localStorage** : Sauvegarde de la préférence utilisateur avec gestion d'erreurs (mode privé, etc.)
  * **Détection préférence système** : Fallback automatique sur `prefers-color-scheme` si aucune préférence stockée
  * **Synchronisation temps réel** : Écoute des changements de préférence système et mise à jour automatique (si aucune préférence stockée)
  * **Transitions CSS** : Transitions douces (200ms) entre les thèmes avec respect de `prefers-reduced-motion`
  * **Gestion d'hydratation React** : Évite les flashes pendant l'hydratation avec état `mounted`
  * **Accessibilité** : Support des navigateurs plus anciens avec fallback `addListener`/`removeListener`, `aria-label` sur le bouton. Toutes les modales (composants `Dialog`) exigent impérativement la présence d'un composant `DialogTitle` (affiché ou masqué avec `sr-only`) pour garantir la compatibilité avec les lecteurs d'écran.
* **Tokens couleurs disponibles** :
  * `background`, `surface`, `card`
  * `text` (via `foreground`), `muted`, `border`
  * `primary`, `primary-foreground`
  * `secondary`, `secondary-foreground`
  * `accent`, `accent-foreground`
  * `danger`, `danger-foreground`
  * `destructive`, `destructive-foreground`
  * `input`, `ring`, `popover`, `popover-foreground`
* **Classes utilitaires CSS** :
  * `.panel` : Panneau avec bordure et ombre
  * `.btn-primary` : Bouton primaire avec hover
  * `.input` : Style d'input avec focus ring
  * `.badge` : Badge arrondi
  * `.brand-gradient` : Dégradé de marque (mode clair : primary orange → teinte milieu du dégradé ; mode sombre : primary violet → background)
  * `.dashboard-shell` : Wrapper principal du dashboard ; en mode clair (` .light .dashboard-shell`), fond transparent pour laisser visible le dégradé orange du body
* **Adaptation des composants** :
  * **Vignettes de photos** : Utilisation de `dark:bg-secondary` (HSL: 200 25% 20%) pour distinguer du fond de l'onglet Photos (`background` à 11% de luminosité)
  * **Bordures des champs de saisie** : Tous les champs de saisie (Input, Textarea) utilisent la variable `border` (et non `input`) pour garantir une bordure visible
    * En thème clair : Bordure orange claire (`--border` teinte orange ~26 35% 85%) visible sur fond blanc / dégradé
    * En thème sombre : Bordure bleu-gris (`--border: 220 14% 24%`) visible sur fond sombre
    * La bordure est visible même sans focus pour améliorer la lisibilité et l'accessibilité
  * Tous les composants s'adaptent automatiquement via les variables CSS du thème

---

## 4. Interface utilisateur (UI figée)

* Interface **en français uniquement**
* Organisation **Master / Détails obligatoire**
* **Gestion des ascenseurs** :
  * **Pas d'ascenseur global** : Aucun ascenseur vertical sur la fenêtre principale (body/main)
  * **Ascenseur Master** : Ascenseur vertical uniquement dans la zone Master, commençant à partir du premier agence (la partie fixe avec titre, recherche et filtres reste toujours visible)
  * **Ascenseur Détails** : Ascenseur vertical uniquement dans la zone Détails, commençant en dessous des onglets (l'en-tête et les onglets restent toujours visibles)
* **Redimensionnement entre zones Master et Détails** :
  * Barre de redimensionnement entre les deux zones
  * Largeur Master ajustable entre 20% et 60% de la largeur totale
  * Largeur minimale Master : 200px
  * Largeur minimale Détails : 300px
  * Curseur col-resize pendant le redimensionnement
  * **Mémorisation de la largeur** : La largeur du redimensionnement est sauvegardée dans `localStorage` et persiste pendant toute la session, même lors de la navigation entre les différentes pages de l'application
* **Gestion responsive** :
  * **Breakpoints Tailwind** :
    * `sm`: 640px (petit mobile)
    * `md`: 768px (tablette)
    * `lg`: 1024px (desktop)
    * `xl`: 1280px (large desktop)
    * `2xl`: 1536px (très large desktop)
  * **Détection mobile** : Détection automatique si la largeur d'écran est < 768px (breakpoint `md` de Tailwind)
  * **Gestion mobile (< 768px)** :
    * **Affichage par défaut** : Sur mobile, seul le Master (liste des agences) est affiché par défaut (100% de largeur)
    * **Navigation** : Au clic sur une agence dans le Master, les Détails s'affichent en plein écran (remplacement du Master)
    * **Bouton Retour** : Un bouton "Retour" (icône `ArrowLeft`) est affiché dans l'en-tête des Détails sur mobile pour revenir au Master. Le bouton doit avoir `aria-label="Retour à la liste des agences"` pour l'accessibilité (lecteurs d'écran). Au clic, la zone Master redevient visible et les données des détails sont réinitialisées.
    * **Barre de redimensionnement** : Masquée sur mobile (redimensionnement non disponible)
    * **Chargement des détails** : Les détails ne sont chargés que lorsque l'utilisateur clique sur une agence (optimisation des appels API)
    * **Padding** : Réduit sur mobile (`p-3` au lieu de `p-6`, `p-4` au lieu de `p-6` pour les cards)
    * **Textes** : Tailles adaptées pour meilleure lisibilité (`text-base sm:text-lg` pour les titres de sections, `text-base sm:text-2xl` pour les titres principaux)
    * **Boutons** : Largeur complète sur mobile (`w-full sm:w-auto`), hauteur minimale 44px pour l'accessibilité
    * **Grilles** : Colonnes empilées verticalement (`grid-cols-1 sm:grid-cols-2`), espacement réduit (`gap-2 sm:gap-4`)
    * **Grille photos** : 2 colonnes sur mobile, 3 sur tablette, 4 sur desktop (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4`)
    * **Flex** : Direction verticale sur mobile (`flex-col sm:flex-row`)
    * **Dialogs** : Largeur maximale 95vw sur mobile (`max-w-[95vw] sm:max-w-lg`), hauteur maximale 90vh avec scroll, padding réduit (`p-4 sm:p-6`)
    * **Images** : Responsive avec `max-w-full sm:max-w-md`, hauteur adaptée (`h-48 sm:h-64`), `object-contain` pour préserver les proportions
    * **Icônes techniques** : Taille réduite sur mobile (`max-w-[60px] sm:max-w-[100px]`)
    * **Espacements** : Réduits sur mobile (`space-y-2 sm:space-y-4`, `gap-2 sm:gap-4`)
    * **Prévention du scroll horizontal** : `overflow-x: hidden` sur body, `max-width: 100vw`, `box-sizing: border-box` sur tous les éléments
  * **Comportement desktop (≥ 768px)** : Sur desktop, le comportement reste inchangé (Master et Détails côte à côte avec redimensionnement)
  * **Règles générales responsive** :
    * **Tous les éléments interactifs** : Hauteur minimale 44px sur mobile (accessibilité)
    * **Tous les inputs/selects/textarea** : Taille de police 16px minimum sur mobile (évite le zoom automatique iOS)
    * **Tous les boutons** : Texte complet sur desktop, texte abrégé ou icône seule sur mobile si nécessaire
    * **Tous les tableaux/listes** : Scroll horizontal si nécessaire sur mobile
    * **Tous les dialogs** : Padding réduit sur mobile (`p-4 sm:p-6`), scroll vertical si contenu trop long
* **Zone Master** :
  * **Structure en deux parties** :
    * **Partie fixe (non scrollable)** : Titre "Agences", bouton "Ajouter", champ de recherche et filtres d'état (Tous, OK, INFO, ALERTE, FERMÉE)
    * **Comportement des filtres** : Un seul appel API (`GET /api/agencies?search=...&filter=...`) par changement de filtre ou de recherche (debounce 300 ms sur la recherche ; pas de double appel au clic sur un filtre)
    * **Partie scrollable** : Liste des agences avec ascenseur vertical qui commence à partir du premier agence
  * Liste agences avec nom et état
  * **Tri automatique** : Les agences sont triées par nom (ordre alphabétique) dans la zone Master
  * **Boutons d'action par agence** :
    * Bouton Modifier (icône Edit, couleur bleue) - à droite du nom
      * Visible pour les utilisateurs avec les rôles **Super user** ou **Super Admin**
    * Bouton Supprimer (icône Trash2, couleur rouge) - à droite du nom
      * Visible uniquement pour les utilisateurs avec le rôle **Super Admin**
    * Les boutons sont représentés par des pictogrammes appropriés et en couleur
  * **Ascenseur vertical** : L'ascenseur vertical est uniquement dans la partie scrollable (liste des agences), la partie fixe (titre, recherche, filtres) reste toujours visible
  * **Mode édition** : Le mode édition d'une agence ne peut être activé **que** depuis le bouton Modifier du Master
* **Zone Détails** :
  * **Structure en trois parties** :
    * **Partie fixe 1 (non scrollable)** : En-tête avec nom de l'agence, état, bouton Historique (Super Admin), boutons Annuler/Enregistrer (mode édition)
    * **Partie fixe 2 (non scrollable)** : Onglets (Général, Tâches, Technique, Photos)
    * **Partie scrollable** : Contenu des onglets avec ascenseur vertical qui commence en dessous des onglets
  * Données agence organisées en onglets (Général, Tâches, Technique, Photos)
  * **Onglet Général** :
    * **Groupe "Informations générales"** :
      * Photo principale de l'agence (centrée en haut)
      * Nom de l'agence
      * Code Agence (champ texte)
      * Code Rayon (champ texte)
      * Date ouverture (champ date)
      * Date fermeture (champ date)
    * **Note** : Le champ "État" n'est pas affiché dans le groupe "Informations générales", mais reste visible et modifiable dans l'en-tête de la zone Détails (à droite du nom de l'agence)
    * Section Adresses
    * Section Contacts
  * **Onglet Tâches** :
    * Interface de gestion des tâches avec liste des tâches
    * Colonnes affichées : Créée le, Créée par, Clôturée le, Clôturée par, Notes, Importance
    * **Visibilité conditionnelle des boutons d'action** :
      * Les boutons "Ajouter une tâche", "Modifier", "Clôturer" et "Supprimer" ne sont **visibles que si le mode édition de l'agence est activé** (depuis le bouton "Modifier" du Master)
      * En mode consultation (sans édition), seuls les filtres et la liste des tâches sont visibles
      * Les boutons d'action apparaissent uniquement lorsque l'agence est en mode édition
    * Actions disponibles : Modifier, Clôturer, Supprimer
    * Bouton "Ajouter une tâche"
    * Filtre par importance (URGENT, CRITIQUE, INFO, TOUS)
      * **Visibilité permanente** : Les boutons de filtre restent toujours visibles même s'il n'y a pas de tâches correspondantes au filtre sélectionné
      * Permet de changer de filtre même quand aucun résultat n'est affiché
      * Filtres disponibles sur mobile et desktop
    * **Filtre par statut de clôture** :
      * Bouton toggle "Clôturées"/"Non clôturées" pour inclure ou exclure les tâches clôturées
      * **Texte dynamique** : 
        * Affiche "Clôturées" quand les tâches clôturées sont incluses (état par défaut)
        * Affiche "Non clôturées" quand les tâches clôturées sont exclues
      * **Style visuel** :
        * Style vert (actif) quand les tâches clôturées sont exclues
        * Style blanc/gris (inactif) quand les tâches clôturées sont incluses
      * Disponible sur mobile et desktop
      * Les filtres par importance et par statut de clôture fonctionnent en combinaison
    * Affichage en cartes (mobile et desktop)
    * Tâches clôturées avec fond grisé et badge "Clôturée"
    * Notes limitées à 5 lignes avec scrollbar pour les notes plus longues
    * **Photos dans les tâches** : ✅ **IMPLÉMENTÉ** (2026-01-31)
      * **Upload de photos** : Possibilité d'ajouter jusqu'à N photos par tâche (N configurable dans les Paramètres, par défaut : 5)
      * **Paramètre** : `maxPhotosPerTask` dans `AppSettings` (défaut: 5, min: 1, max: 100)
      * **Format** : Photos stockées dans le champ `photos` de la table `Task` (JSON array de chemins)
      * **Types autorisés** : JPEG, PNG uniquement
      * **Taille maximale** : Utilise le paramètre global `maxImageSizeMB` (par défaut : 5 MB)
      * **Affichage** : Photos affichées en petites vignettes (16x16) dans les cartes de tâches
      * **Visualisation** : Clic sur une vignette ouvre un dialog avec :
        * Navigation entre photos (flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image)
        * Zoom avec molette de la souris (1x à 5x)
        * Déplacement de l'image zoomée avec clic-glisser
        * Suppression de photo (uniquement en mode édition)
        * Indicateur de position (ex: "1/5") et niveau de zoom
      * **Validation** : Vérification côté client et serveur du nombre maximum de photos
      * **Libellés dynamiques** : Les libellés et messages d'erreur utilisent la valeur configurée
    * **Restrictions d'accès par rôle** (applicables uniquement en mode édition) :
      * **Utilisateur de type User** :
        * Les boutons "Modifier" et "Clôturer" ne sont **pas visibles** pour les utilisateurs de type **User** (même en mode édition)
        * Les utilisateurs de type **User** ne peuvent que consulter les tâches (accès en lecture seule)
        * Le bouton "Ajouter une tâche" n'est **pas visible** car les utilisateurs de type **User** ne peuvent pas activer le mode édition d'une agence
      * **Utilisateur de type Super user** :
        * Les boutons "Modifier" et "Clôturer" sont visibles et utilisables (uniquement en mode édition)
        * Le bouton "Supprimer" n'est **pas visible** pour les utilisateurs de type **Super user** (même en mode édition)
      * **Utilisateur de type Super Admin** :
        * Tous les boutons sont visibles et utilisables (Modifier, Clôturer, Supprimer) uniquement en mode édition
    * **Restriction de suppression des notes** : Seul le **Super Admin** peut supprimer (vider) les notes des tâches existantes
      * Les utilisateurs **Super user** peuvent modifier les notes des tâches mais ne peuvent pas les supprimer
      * Les utilisateurs **User** ne peuvent pas modifier les tâches (boutons Modifier et Clôturer masqués)
      * Si un utilisateur non-Super Admin tente de vider le champ de notes d'une tâche, une erreur est affichée et l'opération est bloquée
      * La vérification est effectuée à la fois côté client (interface) et côté serveur (API)
    * **Restriction de suppression des tâches** : Seul le **Super Admin** peut supprimer une tâche
      * Le bouton "Supprimer" n'est **pas visible** pour les utilisateurs **Super user** et **User**
      * Si un utilisateur non-Super Admin tente de supprimer une tâche via l'API, une erreur 403 est retournée avec le message "Seul le Super Admin peut supprimer une tâche"
      * La vérification est effectuée à la fois côté client (interface) et côté serveur (API)
  * **Ascenseur vertical** : L'ascenseur vertical est uniquement dans la partie scrollable (contenu des onglets), les parties fixes (en-tête et onglets) restent toujours visibles
  * **Conservation de l'onglet actif** : Lors du changement de sélection d'agence dans le Master, l'onglet actif (Général, Tâches, Technique ou Photos) est conservé pour la nouvelle agence sélectionnée
  * **Boutons Annuler/Enregistrer** :
    * Positionnés au niveau du nom de l'agence, à droite
    * Visibles uniquement en mode édition
* **Menu vertical à gauche (Sidebar)** :
  * **Largeur (desktop)** : Largeur fixe de **14rem** (224px), calée sur le bouton « Tableau de bord » (icône + texte + padding). La sidebar ne s'élargit pas en fonction du logo ni des autres contenus.
  * **Largeur (mobile)** : En mode drawer (menu burger), la sidebar occupe **50 %** de la largeur de l'écran (`w-1/2`).
  * **Logo** :
    * Affichage du logo `logo.png` en haut et centré
    * Fond gris (`bg-gray-600`) en thème clair uniquement
    * Fond transparent en thème sombre
    * Largeur du fond identique à celle des boutons de menu
    * Logo centré à l'intérieur du fond
  * **Titre** : "Gestion Agences" affiché sous le logo, centré
  * Liste des menus de navigation avec icônes :
    * **Tableau de bord** : Icône LayoutDashboard, lien vers `/dashboard`
    * **Agences** : Icône Building2
    * **Calendrier** : Icône Calendar, lien vers `/dashboard/calendrier` (visible pour tous les utilisateurs)
    * **Utilisateurs** : Icône Users (visible uniquement pour Super Admin)
    * **Logs** : Icône FileText (visible uniquement pour Super Admin)
    * **Sauvegardes** : Icône HardDrive (visible uniquement pour Super Admin)
    * **Paramètres** : Icône Settings (visible uniquement pour Super Admin)
  * **Section utilisateur en bas** :
    * **Photo de profil** : Photo de l'utilisateur affichée en 48x48px (ou avatar avec initiales si aucune photo)
    * Nom de l'utilisateur (login) affiché
    * Bouton "Mon profil" (icône User) - lien vers `/dashboard/profil`
    * Bouton "Déconnexion" (icône LogOut)
  * **Bouton de changement de thème** :
    * Positionné en bas de la sidebar, juste avant le bouton "Déconnexion"
    * Affiche le texte "Sombre" en mode clair et "Clair" en mode sombre
    * Icône Moon en mode clair, icône Sun en mode sombre
    * Style identique aux autres boutons de menu (variant "ghost", largeur complète, alignement à gauche)
  * En mobile : menu Burger
* **Header (en-tête)** :
  * **Statistiques d'agences** :
    * Affichage en temps réel des statistiques d'agences dans le header
    * **Compteurs affichés** :
      * **OK** : Nombre d'agences avec l'état "OK" (icône CheckCircle2, couleur verte)
      * **INFO** : Nombre d'agences avec l'état "INFO" (icône Info, couleur jaune)
      * **ALERTE** : Nombre d'agences avec l'état "ALERTE" (icône AlertTriangle, couleur rouge)
      * **FERMÉE** : Nombre d'agences avec l'état "FERMÉE" (icône XCircle, couleur grise)
    * **Animation** : Animation `slideInFade` avec délais échelonnés pour chaque statistique (0ms, 150ms, 300ms, 450ms)
    * **Mise à jour événementielle** : Les statistiques sont mises à jour uniquement via des événements personnalisés, sans polling automatique
      * **Événement déclenché** : `agencyStatsRefresh` est dispatché après chaque action CRUD sur une agence (création, modification, suppression)
      * **Chargement initial** : Les statistiques sont chargées une seule fois au montage du composant
      * **Pas de polling** : Aucun appel API automatique périodique (pas de `setInterval`)
      * **Réanimation** : L'animation est réinitialisée uniquement lorsque les données statistiques changent réellement (via une clé `animationKey`)
    * **Responsive** : 
      * Sur mobile : Affichage compact avec icônes et nombres uniquement (texte "OK", "INFO", etc. masqué)
      * Sur desktop : Affichage complet avec texte des labels
    * **Format d'affichage** : `[Icône] [Nombre] [Label]` (label masqué sur mobile)
* **Boutons CRUD conditionnels** :
  * Tous les boutons "Ajouter", "Modifier", "Supprimer" dans tous les onglets (Général, Technique, Photos) ne sont visibles **que si le mode édition est activé** (après clic sur Modifier du Master)
* **Feedback utilisateur et confirmations** :
  * **Toasts** : Les messages de succès et d'erreur après une action (création, modification, suppression) sont affichés via un système de toasts (notifications temporaires en bas à droite), et non via des boîtes de dialogue natives (`alert`). Variantes : succès (vert), erreur (destructive), information (défaut). Fermeture automatique après 5 secondes ou manuelle.
  * **Modales de confirmation** : Toutes les actions destructives (suppression d'agence, adresse, contact, tâche, photo, groupe de photos, PC, imprimante, point d'accès WiFi, caméra, champ dynamique) et les restaurations d'historique (notes techniques, agence) utilisent une modale de confirmation réutilisable (composant `ConfirmDialog`) avec titre, description, boutons Annuler et Confirmer/Supprimer/Restaurer. Aucune utilisation de `confirm()` ou `alert()` pour ces cas.
  * **États de chargement** : Les boutons d'action asynchrones (Enregistrer agence, Supprimer dans la modale, Créer agence, Restaurer) affichent un état de chargement (spinner et libellé « Enregistrement… », « Supprimer… », etc.) et sont désactivés pendant le traitement.
  * **Champs obligatoires** : Les champs obligatoires peuvent être indiqués visuellement via le composant `Label` avec la prop `required` (astérisque rouge et `aria-required` pour l'accessibilité).
  * **Erreurs de chargement** : Sur la page Tableau de bord (`/dashboard`), en cas d'échec du chargement des données, un message d'erreur et un bouton « Réessayer » sont affichés pour relancer la requête.
* **Restrictions d'accès par rôle** :
  * **Menu de navigation** :
    * Boutons "Utilisateurs", "Logs" et "Sauvegardes" : Visibles uniquement pour les utilisateurs avec le rôle **Super Admin**
    * Boutons "Agences" et "Calendrier" : Visibles pour tous les utilisateurs
  * **Gestion des agences** :
    * Bouton "Ajouter une agence" : Disponible uniquement pour les utilisateurs avec les rôles **Super user** ou **Super Admin**
    * Bouton "Modifier" d'une agence : Disponible pour les utilisateurs avec les rôles **Super user** ou **Super Admin**
    * Bouton "Supprimer" d'une agence : Disponible **uniquement** pour les utilisateurs avec le rôle **Super Admin**
    * Les utilisateurs avec le rôle **User** ne peuvent que consulter les agences (pas de création, modification ou suppression)
    * Les utilisateurs avec le rôle **Super user** peuvent créer et modifier des agences, mais ne peuvent pas les supprimer
  * **Modification des détails d'une agence** :
    * Les utilisateurs avec le rôle **User** ne peuvent **pas** modifier les détails d'une agence
    * Le bouton "Modifier" dans la vue des détails d'une agence (mobile et desktop) n'est **pas visible** pour les utilisateurs de type **User**
    * La fonction `handleEditAgencyFromMaster` retourne immédiatement si l'utilisateur est de type **User**, empêchant toute tentative d'édition

* **Page Calendrier** (`/dashboard/calendrier`) :
  * **Objectif** : Vue calendrier de toutes les tâches (toutes agences), design inspiré de Google Agenda.
  * **Layout** : Barre latérale gauche (sidebar dédiée) + zone principale à droite. La sidebar peut être repliée.
  * **Sidebar Calendrier** :
    * Bouton **« + Créer »** (lien vers `/dashboard/agences`) pour créer une tâche depuis une agence.
    * **Mini-calendrier** : affichage du mois avec navigation par flèches ; clic sur un jour pour définir la date affichée dans la vue principale. Le jour courant est mis en évidence (pastille bleue), la date de focus en gris.
    * Champ **« Rechercher… »** : filtre en direct sur le titre des tâches et le nom de l’agence.
    * Section **« Tâches »** : case à cocher « Afficher les clôturées » pour inclure ou exclure les tâches clôturées.
  * **Barre du haut (zone principale)** :
    * Bouton **« Aujourd’hui »** pour revenir à la date du jour.
    * Flèches précédent / suivant (période selon la vue).
    * Titre de la période affichée (ex. « Février 2026 », « Janv. - févr. 2026 Semaine 6 », « 1 février 2026 Semaine 5 », « Févr. - Juil. 2026 »).
    * Sélecteur de vue : **Mois** | **Semaine** | **Jour** | **Planning**.
  * **Vues** :
    * **Vue Mois** : Grille LUN–DIM (semaine commençant le lundi), numéro du jour en haut à gauche de chaque case, jour courant en pastille bleue. Tâches affichées en barres colorées (bordure gauche selon importance : bleu INFO, orange CRITIQUE, rouge URGENT, gris clôturée). Au-delà de 4 tâches par jour, affichage « +N ».
    * **Vue Semaine** : En-têtes des jours (LUN 26, MAR 27, …) avec colonne horaire (00:00 à 23:00) à gauche. Ligne « Jour entier » en haut de chaque jour avec les tâches ; grille horaire en pointillés en dessous.
    * **Vue Jour** : Un seul jour avec en-tête (ex. DIM. 1), bloc « Jour entier » listant les tâches du jour (pastille de couleur, titre, agence), puis grille horaire (00:00–23:00).
    * **Vue Planning (agenda)** : Liste chronologique des tâches sur plusieurs mois (période chargée : 6 mois à partir du mois affiché). Regroupement par date (ex. « 1 FÉVR, DIM. », « 4 FÉVR, MER. ») avec pour chaque tâche : pastille de couleur, « Jour entier », titre, nom de l’agence.
  * **API** : `GET /api/tasks?from=YYYY-MM-DD&to=YYYY-MM-DD` (paramètres optionnels) retourne les tâches pour la plage demandée (session requise). Utilisée pour alimenter les quatre vues.
  * **Données affichées** : Les tâches sont positionnées par **date de création** (`createdAt`). Pas d’heure de début/fin dans le modèle actuel ; toutes les tâches sont affichées en « Jour entier ».
  * **Accès** : Visible pour tous les utilisateurs connectés (lien dans la sidebar principale).

---

## 5. Données AGENCE

### 5.1 Champs principaux

* Photo principale (1 seule)
* Nom de l'agence (obligatoire)
* État de l'agence :

  * Champ explicite
  * Valeurs : OK | ALERTE | INFO | FERMÉE
  * **Valeur par défaut : ALERTE**
  * Bouton visuel (vert pour OK, rouge pour ALERTE, jaune pour INFO, gris pour FERMÉE)
* **Code Agence** : Champ texte (optionnel)
* **Code Rayon** : Champ texte (optionnel)
* **Date ouverture** : Champ date (optionnel)
* **Date fermeture** : Champ date (optionnel)
* **Modification d'une agence** :
  * La modification d'une agence ne peut être activée **que** depuis le bouton Modifier du Master
  * En mode édition, les champs suivants deviennent éditables :
    * **Dans l'en-tête de la zone Détails** (à droite du nom de l'agence) :
      * État (OK, ALERTE, INFO, FERMÉE) - Bouton visuel modifiable
    * **Dans l'onglet Général, groupe "Informations générales"** :
      * Nom de l'agence
      * Code Agence
      * Code Rayon
      * Date ouverture
      * Date fermeture
  * Les boutons Annuler/Enregistrer apparaissent à droite du nom de l'agence, au même niveau
  * Le changement de sélection d'agence dans le Master désactive automatiquement le mode édition

### 5.2 Adresses

* Une ou plusieurs adresses
* **Deux modes de saisie disponibles** :
  * **Mode recherche API BAN** : Recherche d'adresse via l'API BAN (recommandé)
    * Composant de recherche avec champ de saisie et bouton "Rechercher"
    * Affichage des résultats de recherche avec sélection possible
    * L'adresse complète avec numéro est automatiquement extraite (numéro + rue)
  * **Mode saisie manuelle** : Saisie directe des champs d'adresse
    * Champ "Rue" (obligatoire) : Ex: "23-25 Rue Jean-Jacques Rousseau"
    * Champ "Code postal" (obligatoire) : Ex: "75001"
    * Champ "Ville" (obligatoire) : Ex: "Paris"
    * **Géocodage automatique** : Lors de l'enregistrement, l'adresse saisie manuellement est automatiquement géocodée via l'API BAN pour récupérer les coordonnées GPS (latitude/longitude)
    * Si le géocodage réussit, les coordonnées sont stockées et le bouton "Voir sur Google Maps" est disponible
    * Si le géocodage échoue, l'adresse est quand même enregistrée mais sans coordonnées GPS
* **Interface de saisie** :
  * Choix du mode via boutons radio : "Recherche API BAN" ou "Saisie manuelle"
  * Affichage conditionnel des champs selon le mode choisi
  * Champ "Label" (obligatoire) : Label personnalisé pour identifier l'adresse
* **Optimisation du cache** : Les images sont mises en cache par le navigateur avec des en-têtes HTTP optimisés (voir section 9)
* Bouton Google Maps par adresse (visible uniquement si coordonnées GPS disponibles)
* Icône imposée : Spotlight (remplacée par Search dans l'implémentation)
* **Affichage en cartes** :
  * Chaque adresse est affichée dans une carte avec la même couleur de fond que les cartes Contact (`bg-slate-50` en thème clair, `bg-slate-800/50` en thème sombre)
  * Structure de la carte :
    * **CardHeader** : Contient le label de l'adresse (titre) et les boutons d'action (Modifier, Supprimer) en mode édition
    * **CardContent** : Contient les informations de l'adresse (rue avec icône MapPin, code postal et ville, bouton "Voir sur Google Maps" si coordonnées GPS disponibles)
  * **Grille responsive** : Les cartes sont affichées dans une grille qui s'ajuste automatiquement pour occuper toute la largeur disponible :
    * **Mobile** : 1 colonne
    * **Tablette** : 2 colonnes
    * **Desktop** : Jusqu'à 3 colonnes maximum, avec ajustement automatique selon le nombre d'adresses
    * Les cartes s'ajustent automatiquement pour occuper toute la largeur disponible (utilisation de `auto-fit` avec `minmax`)
    * Largeur minimale de 300px par carte
  * **Boutons d'action** : Les boutons Modifier et Supprimer sont visibles uniquement en mode édition de l'agence

---

## 6. Groupe CONTACTS (structure fermée)

* **Nom** - **OBLIGATOIRE** (seul champ obligatoire)
  * Label dans l'interface : "Nom"
  * Validation : Champ non vide requis
* Numéro de poste (6 chiffres exacts) - **OPTIONNEL**
  * Validation : Si renseigné, doit contenir exactement 6 chiffres
  * Stockage : Chaîne vide `""` si non renseigné (compatible avec schéma Prisma)
* Numéro d'agent (4 chiffres exacts) - **OPTIONNEL**
  * Validation : Si renseigné, doit contenir exactement 4 chiffres
  * Stockage : Chaîne vide `""` si non renseigné (compatible avec schéma Prisma)
* Ligne directe - **OPTIONNEL**
  * Label dans l'interface : "Ligne directe" (sans format affiché)
  * **Format flexible** : Accepte la saisie avec ou sans espaces
    * Format avec espaces : `00 00 00 00 00`
    * Format sans espaces : `0000000000`
  * Validation : Doit contenir exactement 10 chiffres (espaces ignorés lors de la validation)
  * **Normalisation automatique** : La valeur est automatiquement normalisée au format avec espaces (`00 00 00 00 00`) lors du stockage en base de données
  * Stockage : Chaîne vide `""` si non renseigné
* Emails - **OPTIONNEL**
  * 0 ou plusieurs emails
  * Validation RFC via **librairie autorisée (ex: validator)** pour chaque email si fourni
  * Stockage : JSON array en base de données (tableau vide `[]` si aucun email)
* Champ note texte - **OPTIONNEL**
  * **Limite de caractères** : Maximum 1000 caractères
  * **Compteur de caractères** : 
    * Affiché uniquement si plus de 100 caractères sont saisis
    * Format : `{nombre} / 1000 caractères`
    * **Couleurs dynamiques** :
      * Rouge si > 1000 caractères (dépassement)
      * Orange si > 900 caractères (proche de la limite)
      * Gris par défaut
    * **Limite côté client** : Le champ Textarea utilise `maxLength={1000}` pour empêcher la saisie au-delà de 1000 caractères
  * **Affichage des notes** :
    * **Limitation visuelle** : Les notes sont limitées à 5 lignes maximum lors de l'affichage
    * **Bouton "Voir plus"/"Réduire"** : 
      * Affiché si la note dépasse 5 lignes ou 300 caractères
      * Permet d'afficher la note complète ou de la réduire à 5 lignes
      * **État réduit** : `whiteSpace: 'normal'` avec `-webkit-line-clamp: 5` pour tronquer le texte
      * **État étendu** : `whiteSpace: 'pre-wrap'` pour préserver les retours à la ligne
  * Stockage : `null` si non renseigné
* **Gestion de l'ordre d'affichage** :
  * Champ `order` (Int) dans le modèle Contact pour définir l'ordre d'affichage
  * **Tri automatique** : Les contacts sont affichés triés par ordre croissant (`order` ASC)
  * **Réordonnancement par drag and drop** : En mode édition, les contacts peuvent être réordonnés par glisser-déposer (drag and drop HTML5 natif)
    * **Fonctionnalité drag and drop** : Chaque contact est draggable en mode édition
    * **Indicateur visuel** : Icône de poignée (`GripVertical`) affichée à gauche de chaque contact en mode édition pour indiquer que l'élément peut être déplacé
    * **Feedback visuel** :
      * Opacité réduite (50%) pendant le drag de l'élément déplacé
      * Bordure mise en évidence (couleur primaire, épaisseur 2px) sur la zone de drop cible
      * Curseur "move" affiché sur les éléments draggables en mode édition
    * **Mise à jour automatique** : Lors du drop, tous les ordres sont recalculés et mis à jour dans la base de données
    * **Rechargement** : Les détails de l'agence sont automatiquement rechargés après le drop pour afficher le nouvel ordre
  * **Initialisation** : Lors de la création d'un nouveau contact, l'ordre est automatiquement défini à `max(order) + 1` pour l'agence
  * **Stockage** : Valeur par défaut `0` si non spécifiée
  * **Migration des contacts existants** : Un script de migration (`npm run migrate:contacts-order`) permet d'initialiser le champ `order` pour tous les contacts existants en se basant sur leur date de création (`createdAt`)
* **Gestion d'erreurs** : Messages d'erreur explicites retournés par l'API en cas de validation échouée
* **Affichage en cartes** :
  * Chaque contact est affiché dans une carte avec une couleur de fond appropriée (`bg-slate-50` en thème clair, `bg-slate-800/50` en thème sombre)
  * Structure de la carte :
    * **CardHeader** : Contient le nom du contact (titre) et les boutons d'action (Modifier, Supprimer) en mode édition
    * **CardContent** : Contient les informations du contact (poste, agent, ligne directe, emails, note)
      * **Affichage de la note** : 
        * Les notes sont limitées à 5 lignes maximum lors de l'affichage
        * Un bouton "Voir plus"/"Réduire" est affiché si la note dépasse 5 lignes ou 300 caractères
        * Permet d'afficher la note complète ou de la réduire à 5 lignes
  * **Grille responsive** : Les cartes sont affichées dans une grille responsive :
    * **Mobile** : 1 colonne
    * **Tablette** : 2 colonnes
    * **Desktop** : 3 colonnes maximum

---

## 7. Groupe TECHNIQUE

**CRUD complet obligatoire** : Toutes les sections techniques doivent avoir des fonctionnalités de création, modification et suppression (selon les règles de chaque section).

**CRUD conditionnel** : Tous les boutons Ajouter, Modifier, Supprimer dans l'onglet Technique (PC, Imprimantes, Points d'accès Wifi, Caméras, Champs dynamiques) ne sont visibles **que si le mode édition de l'agence est activé** depuis le bouton Modifier du Master.

**Mode édition technique** : Le mode édition technique est activé uniquement depuis le bouton "Modifier" du Master. Dans ce mode :
* Les champs éditables deviennent des inputs
* Un bouton "Enregistrer" permet de sauvegarder toutes les modifications en une seule fois
* Un bouton "Annuler" permet d'annuler les modifications et de revenir au mode consultation
* Si aucune information technique n'existe, un bouton "Créer les informations techniques" permet de les initialiser
* **Note** : Le mode édition technique est indépendant du mode édition de l'agence, mais les boutons CRUD des sous-sections (PC, Imprimantes, etc.) dépendent du mode édition de l'agence
* **Pas de bouton Modifier dans l'onglet Technique** : Aucun bouton "Modifier" n'est présent dans l'onglet Technique lui-même. Le mode édition technique ne peut être activé que depuis le bouton "Modifier" du Master

### 7.1 Réseau

* Adresse IP LAN (CIDR obligatoire)
* **Édition directe** dans l'onglet Technique

### 7.2 PC (0 à N)

* Nom - **OBLIGATOIRE**
* IP - **OPTIONNEL**
* MAC - **OPTIONNEL**
* N° série - **OPTIONNEL**
* Marque - **OPTIONNEL**
* Modèle - **OPTIONNEL**
* Date achat - **OPTIONNEL**
* Date garantie - **OPTIONNEL**
* **Note sur les champs optionnels** : L'interface permet de laisser ces champs vides. L'API convertit silencieusement ces entrées vides (`""`) en valeurs `null` saines pour valider le schéma strict de Prisma et de la base de données.
* Fichiers - **OPTIONNEL** (JSON array de chemins)
* Photos - **OPTIONNEL** (JSON array de chemins)
* **Gestion de l'ordre d'affichage** :
  * Champ `order` (Int) dans le modèle PC pour définir l'ordre d'affichage
  * **Tri automatique** : Les PC sont affichés triés par ordre croissant (`order` ASC)
  * **Réordonnancement par drag and drop** : En mode édition, les PC peuvent être réordonnés par glisser-déposer (drag and drop HTML5 natif)
    * **Fonctionnalité drag and drop** : Chaque PC est draggable en mode édition
    * **Indicateur visuel** : Icône de poignée (`GripVertical`) affichée à gauche de chaque PC en mode édition pour indiquer que l'élément peut être déplacé
    * **Feedback visuel** :
      * Opacité réduite (50%) pendant le drag de l'élément déplacé
      * Bordure mise en évidence (couleur primaire, épaisseur 2px) sur la zone de drop cible
      * Curseur "move" affiché sur les éléments draggables en mode édition
    * **Mise à jour automatique** : Lors du drop, tous les ordres sont recalculés et mis à jour dans la base de données
    * **Rechargement** : Les détails de l'agence sont automatiquement rechargés après le drop pour afficher le nouvel ordre
  * **Initialisation** : Lors de la création d'un nouveau PC, l'ordre est automatiquement défini à `max(order) + 1` pour le technicalId associé
  * **Stockage** : Valeur par défaut `0` si non spécifiée
* **CRUD complet** : Boutons Ajouter, Modifier, Supprimer pour chaque PC
* **Affichage intégral** : Tous les champs renseignés doivent être affichés dans l'interface avec leurs labels
* **Format dates** : Affichage au format français (JJ/MM/AAAA)
* **Photos** : Affichage en miniatures (20x20) si présentes
* **Icône** : L'image `computer.png` du dossier `public` remplace le titre "PC" avec une taille maximale de 100x100 pixels

### 7.3 Imprimantes (0 à N)

* Champs identiques aux PC
* **CRUD complet** : Boutons Ajouter, Modifier, Supprimer pour chaque imprimante
* **Affichage intégral** : Identique aux PC
* **Icône** : L'image `printer.png` du dossier `public` remplace le titre "Imprimantes" avec une taille maximale de 100x100 pixels

### 7.4 Machine à affranchir

* Marque - **OPTIONNEL**
* Modèle - **OPTIONNEL**
* Connexion : Wifi | Filaire - **OPTIONNEL**
* IP - **OPTIONNEL**
* MAC - **OPTIONNEL**
* **Édition directe** dans l'onglet Technique (mode édition)
* **Icône** : L'image `machineAffranchir.png` du dossier `public` remplace le titre "Machine à affranchir" avec une taille maximale de 100x100 pixels

### 7.5 Wifi

* Routeur Wifi : Marque, Modèle, IP, N° série - **OPTIONNEL** pour chaque champ
* **Édition directe** dans l'onglet Technique (mode édition)
* **Icône** : L'image `wifi.png` du dossier `public` remplace le titre "Wifi" avec une taille maximale de 100x100 pixels
* Points d'accès Wifi (0 à N) :

  * Marque, Modèle, IP, N° série - **OPTIONNEL** pour chaque champ
  * Nom SSID - **OPTIONNEL**
  * Mot de passe :

    * Chiffré en base avec chiffrement réversible (AES)
    * **Affichage avec icône d'œil** : Le mot de passe est masqué par défaut (••••••••) et peut être révélé/masqué en cliquant sur une icône d'œil
    * **Icône Eye** : Affiche le mot de passe en clair
    * **Icône EyeOff** : Masque le mot de passe
    * **OPTIONNEL** (peut être laissé vide lors de la modification)
  * **CRUD complet** : Boutons Ajouter, Modifier, Supprimer pour chaque point d'accès
  * **Affichage intégral** : Tous les champs renseignés doivent être affichés dans l'interface avec leurs labels (SSID, Marque, Modèle, IP, N° série, Mot de passe)

### 7.6 Routeurs

* Principal : Marque, Modèle, IP, N° série, Type lien (champ texte) - **OPTIONNEL** pour chaque champ
* Secours : Marque, Modèle, IP, N° série - **OPTIONNEL** pour chaque champ
* **Édition directe** dans l'onglet Technique (mode édition)

### 7.7 Vidéo protection

* Enregistreur : Marque, Modèle, N° série, MAC, IP, Stockage (champ texte) - **OPTIONNEL** pour chaque champ
* **Édition directe** dans l'onglet Technique (mode édition)
* Caméras : Marque, Modèle, Type (champ texte), IP (si applicable) - **OPTIONNEL** pour chaque champ
* **CRUD complet** : Boutons Ajouter, Modifier, Supprimer pour chaque caméra

### 7.8 Notes techniques

* Champ note - **OPTIONNEL**
* **Édition directe** dans l'onglet Technique (mode édition)
* **Affichage de la dernière version** : La dernière version des notes techniques (depuis l'historique) est toujours affichée, que ce soit en mode édition ou en mode lecture
* **Sauvegarde depuis le bouton Enregistrer de l'agence** : Les notes techniques sont automatiquement sauvegardées lorsque l'utilisateur clique sur le bouton "Enregistrer" de l'agence (en plus du bouton "Enregistrer" de l'onglet Technique)
* **Affichage visuel** : En mode lecture, les notes techniques sont affichées dans une zone avec fond coloré, padding et hauteur minimale pour une meilleure lisibilité
* Historisation activée
* **Historique consultable ET restaurable (max 100 versions)**
* **Restriction de suppression** : Seul le **Super Admin** peut supprimer (vider) les notes techniques existantes
  * Les utilisateurs **Super user** et **User** peuvent modifier les notes techniques mais ne peuvent pas les supprimer
  * Si un utilisateur non-Super Admin tente de vider le champ de notes techniques, une erreur est affichée et l'opération est bloquée
  * La vérification est effectuée à la fois côté client (interface) et côté serveur (API)

### 7.9 Champs dynamiques

* Clé / Valeur - **OBLIGATOIRE** (clé et valeur requises)
* Ordre modifiable - **OBLIGATOIRE** (numéro d'ordre)
* **CRUD complet** : Boutons Ajouter, Modifier, Supprimer pour chaque champ dynamique
* Suppression autorisée
* Aucune logique automatique
* **Affichage trié** : Les champs dynamiques sont affichés triés par ordre croissant

---

## 8. Groupes PHOTOS (CRUD)

* Photos Bureau
* Photos Connexion
* Photos Armoire électrique
* Photos de l'agence :
  * **Unicité** : Une seule photo de type "Photos de l'agence" par agence
  * **Remplacement** : L'ajout d'une nouvelle photo de ce type remplace la précédente
  * **Affichage** : La photo de l'agence s'affiche dans l'onglet "Général", centrée en haut
  * **Mise à jour** : La photo de l'agence met à jour le champ `photo` de l'agence principale
* Photos Divers
* **Suppression des fichiers physiques** :
  * Lors de la suppression d'une photo individuelle, le fichier physique correspondant est automatiquement supprimé du dossier `/uploads`
  * Lors de la suppression d'un groupe de photos entier, tous les fichiers physiques du groupe sont supprimés avant la suppression en base de données
  * La suppression est irréversible : les fichiers sont définitivement supprimés du système de fichiers

### 8.1 Recherche dans l'onglet Photos

* **Champ de recherche** :
  * Champ de recherche affiché dans l'en-tête de l'onglet Photos (CardHeader)
  * Icône de recherche (Search) à gauche du champ
  * Placeholder : "Rechercher par libellé ou type de photo..."
  * **Bouton de réinitialisation** : Bouton en forme de croix (X) à droite du champ, visible uniquement lorsque le champ contient du texte
    * Permet de vider manuellement le champ de recherche
    * Positionné à droite du champ avec espacement approprié
* **Fonctionnalités de recherche** :
  * **Recherche par libellé** : Filtre les photos selon leur titre individuel ou le titre du groupe
  * **Recherche par type** : Filtre les photos selon leur type (ex: "Façade", "Intérieur", "PC", etc.)
  * **Recherche insensible à la casse** : La recherche ignore les majuscules/minuscules
  * **Recherche sans accents** : La recherche ignore les accents (normalisation Unicode NFD)
  * **Filtrage en temps réel** : Les résultats sont filtrés instantanément lors de la saisie
  * **Filtrage des onglets** : Seuls les types de photos contenant des résultats sont affichés dans les onglets
  * **Conservation de la recherche** : La recherche est conservée lors du changement d'onglet de type de photo
  * **Réinitialisation automatique** : La recherche est réinitialisée uniquement lors du changement d'agence (pas lors du changement d'onglet)
* **Message d'absence de résultats** :
  * Si aucune photo ne correspond à la recherche, un message est affiché : "Aucune photo ne correspond à la recherche "[terme]"" (avec le terme de recherche entre guillemets)
  * Si aucune photo n'est enregistrée, un message est affiché : "Aucune photo enregistrée"

### 8.2 Affichage et navigation des photos

* **Stockage des métadonnées** :
  * Chaque photo est stockée avec son chemin (`path`), sa date de création (`createdAt`) et son titre individuel (`title`)
  * **Format de stockage** : JSON array d'objets `{ path: string, createdAt: string, title?: string }` dans le champ `photos` du PhotoGroup
  * **Titre individuel** : Chaque photo peut avoir son propre titre indépendant des autres photos du même type ou du même groupe
  * **Titre du groupe** : Le PhotoGroup peut également avoir un titre (`title`) qui sert de titre par défaut pour les photos qui n'ont pas de titre individuel
  * **Priorité d'affichage** : Si une photo a un titre individuel, celui-ci est utilisé. Sinon, le titre du groupe est utilisé. Si aucun des deux n'existe, aucun titre n'est affiché
  * **Rétrocompatibilité** : Les anciennes photos (format string) sont automatiquement converties en objets lors de la migration
* **Date de création physique** :
  * **Récupération lors de l'upload** : Pour les images JPEG/PNG, la date de création est récupérée depuis les métadonnées EXIF dans l'ordre de priorité suivant :
    1. `DateTimeOriginal` (date de prise de vue originale)
    2. `CreateDate` (date de création)
    3. `ModifyDate` (date de modification)
  * **Fallback File object** : Si aucune métadonnée EXIF n'est disponible, la propriété `lastModified` du File object du navigateur est utilisée (date de modification originale du fichier)
  * **Fallback système de fichiers** : Si aucune des méthodes précédentes ne fonctionne, la date de création du fichier système (`birthtime` ou `mtime`) est utilisée en dernier recours
  * **Important** : La récupération de la date se fait AVANT l'écriture du fichier sur le disque pour éviter d'utiliser la date de création du nouveau fichier
  * **Modification manuelle** : La date de création peut être modifiée manuellement lors de l'édition d'une photo via le dialog de modification
  * **Migration automatique** : Un script de migration (`npm run migrate:photos`) permet de mettre à jour toutes les photos existantes avec leur date de création réelle
* **Affichage en vignettes** :
  * Les photos sont affichées sous forme de vignettes (miniatures) organisées par type dans des onglets
  * **Organisation par onglets** : Les photos sont organisées en onglets par type pour améliorer l'UX et la navigation
    * **Système d'onglets** : Chaque type de photo (ex: "Agence", "PC", "Imprimante", etc.) dispose de son propre onglet
    * **Compteur de photos** : Chaque onglet affiche le nombre de photos du type correspondant au format `Type (nombre)`
    * **Navigation** : L'utilisateur peut naviguer entre les différents types de photos en cliquant sur les onglets
    * **Sélection automatique** : Le premier type disponible est automatiquement sélectionné au chargement
    * **Mise à jour dynamique** : Si le type sélectionné n'existe plus (après suppression), le premier type disponible est automatiquement sélectionné
    * **Responsive** : Les onglets s'adaptent sur mobile avec `flex-wrap` pour un affichage optimal
  * **Format carré** : Les vignettes sont au format carré (même largeur et hauteur)
  * **Image entière sans déformation** : L'intégralité de l'image est affichée sans déformation (object-contain)
  * **Regroupement par type** : Toutes les photos d'un même type sont affichées dans une seule grille, indépendamment du PhotoGroup d'origine
  * **Titre et date sur vignette** : 
    * Le titre individuel de la photo (ou le titre du groupe si aucun titre individuel) s'affiche à gauche en bas de chaque vignette avec un fond semi-transparent
    * La date de création s'affiche à droite en bas de chaque vignette (format DD/MM/YYYY)
    * Layout flex avec `justify-between` pour séparer titre et date
  * **Actions en mode édition** : En mode édition d'une agence, chaque vignette affiche deux boutons au survol :
    * **Bouton Modifier** (icône Edit) : Ouvre un dialog dédié pour modifier le titre et la date de création de cette photo spécifique (pas le titre du groupe)
      * Le dialog affiche :
        * Un champ de saisie pour le titre (optionnel)
        * Un champ de date pour la date de création (modifiable)
        * Un aperçu de la photo
      * La modification du titre et de la date n'affecte que la photo sélectionnée, pas les autres photos du même type ou du même groupe
      * La date est affichée au format "YYYY-MM-DD" dans le champ de saisie et convertie automatiquement en format ISO pour le stockage
    * **Bouton Supprimer** (icône Trash2) : Supprime la photo individuelle du groupe
      * **Suppression physique** : Lors de la suppression d'une photo, le fichier physique est également supprimé du dossier `/uploads`
      * La suppression est irréversible : la photo est retirée de la base de données ET le fichier est supprimé du système de fichiers
  * **Aperçu dans dialog d'édition** : Lors de l'édition d'un groupe de photos, les photos existantes sont affichées en aperçu (miniatures) avec leur date de création
  * **Pas de liste des PhotoGroups** : En mode édition, seule l'affichage en vignettes avec les boutons d'action individuels est visible. Aucune liste des PhotoGroups n'est affichée en dessous des vignettes.
* **Lightbox** : Le clic sur une vignette ouvre la photo en plein écran (lightbox) avec affichage en fenêtre pleine
  * **Fond plein écran** : Fond noir opaque (`bg-black`) couvrant tout l'écran
  * **Image plein écran** : La photo occupe toute la hauteur et largeur disponible de l'écran
  * **Préservation des proportions** : L'image utilise `object-contain` pour afficher l'intégralité de la photo sans déformation
  * **Z-index élevé** : La lightbox est affichée au-dessus de tous les autres éléments (`z-[9999]`)
  * **Zoom et déplacement** :
    * **Zoom avec la molette** : Zoom/dézoom progressif avec la molette de la souris (niveau de zoom de 1x à 5x maximum)
      * Molette vers le haut : zoom avant
      * Molette vers le bas : zoom arrière
      * Zoom centré sur le point de la souris
    * **Déplacement avec la souris** : Déplacement de l'image zoomée en maintenant le clic gauche et en glissant
      * Curseur `grab` quand zoomé (prêt à déplacer)
      * Curseur `grabbing` pendant le déplacement
      * Seuil de 5px pour éviter les micro-mouvements
    * **Support tactile mobile** :
      * **Pinch-to-zoom** : Zoom/dézoom avec deux doigts (pincement/écartement)
        * Zoom centré sur le point entre les deux doigts
        * Niveau de zoom de 1x à 5x maximum
      * **Déplacement avec un doigt** : Glisser avec un doigt pour déplacer l'image zoomée
        * Transition fluide entre zoom (2 doigts) et drag (1 doigt)
      * **Gestion des gestes** : `touchAction: 'none'` pour désactiver les gestes par défaut du navigateur
    * **Réinitialisation automatique** : Le zoom et la position sont réinitialisés à chaque changement de photo ou fermeture de la lightbox
    * **Clic sur la photo** :
      * Si zoomé : réinitialise le zoom à 1x
      * Si non zoomé : passe à la photo suivante
* **Navigation en boucle** :
  * Navigation uniquement sur les photos du même type
  * Navigation infinie en boucle : après la dernière photo, retour à la première, et inversement
  * Flèche gauche : photo précédente (même type) - bouton en haut à gauche
  * Flèche droite : photo suivante (même type) - bouton en haut à droite
  * Clic sur la photo : même action que la flèche droite (photo suivante) si non zoomé
* **Fermeture** : 
  * Clic en dehors de la photo (fond noir) → fermeture de la lightbox et retour à l'onglet Photos
  * Bouton X en haut à droite pour fermer la lightbox
* **Titre en lightbox** : Le titre individuel de la photo (ou le titre du groupe si aucun titre individuel) s'affiche en bas, centré, sur la photo agrandie avec un fond noir semi-transparent (`bg-black/70`)
* **Validation de la taille des fichiers** : ✅ **CONFIGURABLE** (2026-01-31)
  * **Taille maximale** : Configurable dans les Paramètres (par défaut : 5 MB par fichier)
  * **Paramètre** : `maxImageSizeMB` dans `AppSettings` (défaut: 5 Mo, min: 1 Mo, max: 100 Mo)
  * **Validation côté client** : Vérification immédiate lors de la sélection des fichiers avec la valeur configurée
  * **Message d'erreur en français** : Si un fichier dépasse la taille maximale configurée, un message d'erreur en français est affiché avec la taille maximale actuelle
  * **Double vérification** : Vérification supplémentaire avant l'upload pour empêcher l'envoi de fichiers trop volumineux
  * **Libellés dynamiques** : Les libellés dans l'interface affichent automatiquement la taille maximale configurée

---

## 9. Uploads & Stockage fichiers

* Stockage : **filesystem uniquement**
* **Suppression automatique des fichiers** :
  * Lors de la suppression d'une photo individuelle, le fichier physique correspondant est automatiquement supprimé du dossier `/uploads`
  * Lors de la suppression d'un groupe de photos entier, tous les fichiers physiques du groupe sont supprimés
  * La suppression des fichiers est gérée silencieusement : si un fichier n'existe pas déjà, l'erreur est ignorée sans bloquer la suppression dans la base de données
  * **Format des chemins** : Les chemins sont stockés au format `/uploads/filename.jpg` et convertis en chemins absolus pour la suppression
* **Récupération de la date de création** :
  * Lors de l'upload, la date de création originale est automatiquement extraite depuis les métadonnées EXIF de l'image
  * Priorité des métadonnées EXIF : `DateTimeOriginal` > `CreateDate` > `ModifyDate`
  * **Fallback File object** : Si aucune métadonnée EXIF n'est disponible, la propriété `lastModified` du File object du navigateur est utilisée (date de modification originale du fichier)
  * **Fallback système de fichiers** : Si aucune des méthodes précédentes ne fonctionne, la date de création du fichier système (`birthtime` ou `mtime`) est utilisée en dernier recours
  * **Important** : La récupération de la date se fait AVANT l'écriture du fichier sur le disque pour éviter d'utiliser la date de création du nouveau fichier
  * La date de création et le titre individuel sont stockés avec chaque photo dans le format `{ path: string, createdAt: string, title?: string }`
  * **Modification manuelle** : La date de création peut être modifiée manuellement lors de l'édition d'une photo via le dialog de modification (champ de date au format "YYYY-MM-DD")
  * **Migration des photos existantes** : Un script de migration (`npm run migrate:photos`) permet de mettre à jour toutes les photos existantes avec leur date de création réelle depuis les métadonnées EXIF ou le système de fichiers
* Dossier uploads : **/uploads** (racine projet)
  * **Photos de profil** : Stockées dans `/uploads/user-photos/` (ou `/uploads/profiles/` selon la configuration)
  * **Photos d'agences** : Stockées dans `/uploads/` (racine du dossier uploads)
  * **Quarantaine** : Fichiers temporaires stockés dans `/uploads/quarantine/` avant validation et traitement
* Taille max fichier : ✅ **CONFIGURABLE** (2026-01-31) - Définie dans les Paramètres (par défaut : 5 MB pour toutes les images)
  * **Paramètre global** : `maxImageSizeMB` dans `AppSettings` (défaut: 5 Mo, min: 1 Mo, max: 100 Mo)
  * **Application** : S'applique à toutes les images (photos d'agences, photos de groupes, photos de tâches, photos de profil)
  * **Libellés dynamiques** : Les libellés dans l'interface affichent automatiquement la taille maximale configurée
* Types autorisés :

  * Photos : jpeg, png
  * Fichiers : jpeg, png
  * **Photos de profil** : jpeg, png uniquement (taille max selon paramètre global `maxImageSizeMB`, voir Paramètres)

Aucun autre type autorisé.
* **Photos de profil** :
  * **Taille maximale** : ✅ **CONFIGURABLE** (2026-01-31) - Utilise le paramètre global `maxImageSizeMB` (par défaut : 5 MB, configurable dans les Paramètres)
  * **Redimensionnement automatique** : Toutes les photos de profil sont automatiquement redimensionnées en 100x100px (carré) lors de l'upload
  * **Validation stricte** : Vérification du type MIME via magic bytes pour prévenir les attaques par upload de fichiers malveillants
  * **Sécurité renforcée** :
    * **Scan antivirus** : Tous les fichiers uploadés sont scannés avec ClamAV (si disponible) et un scan heuristique en fallback
      * **Support ClamAV** : Utilisation de `clamdscan` si ClamAV est installé sur le serveur
      * **Scan heuristique** : Détection de signatures suspectes (scripts malveillants, exécutables déguisés) pour les fichiers non-images
      * **Détection d'images** : Les images valides (JPEG/PNG) sont traitées différemment pour éviter les faux positifs
      * **Rejet automatique** : Les fichiers détectés comme malveillants sont automatiquement rejetés et supprimés
    * **Quarantaine** : Tous les fichiers uploadés sont d'abord placés en quarantaine avant d'être traités
      * **Dossier de quarantaine** : `/uploads/quarantine/` pour stocker temporairement les fichiers
      * **Processus** : Upload → Quarantaine → Scan → Libération si propre → Traitement
      * **Nettoyage automatique** : Script de nettoyage (`npm run clean:quarantine`) pour supprimer les fichiers anciens (plus de 24h)
      * **Suppression automatique** : Les fichiers malveillants sont supprimés de la quarantaine après rejet
    * **Sandboxing** : Le traitement d'images (redimensionnement) est isolé dans un worker thread
      * **Worker thread isolé** : Traitement dans un contexte séparé pour limiter les risques de sécurité
      * **Timeout** : Timeout de 30 secondes pour le worker, 10 secondes pour le fallback direct
      * **Validation** : Validation des dimensions et taille maximale dans le worker
      * **Fallback** : Traitement direct avec timeout si le worker est indisponible
  * **Suppression automatique** : Lors de l'upload d'une nouvelle photo, l'ancienne photo est automatiquement supprimée du système de fichiers
  * **Stockage** : Le chemin relatif de la photo est stocké dans le champ `photo` du modèle `User` (format : `/uploads/user-photos/filename.jpg`)
  * **Logging** : Toutes les opérations sont loggées (upload, rejet, suppression) avec le moteur de scan utilisé
  * **Affichage** :
    * **Sidebar** : Photo affichée en 48x48px
    * **Page profil** : Photo affichée en 100x100px
    * **Liste utilisateurs** : Photo affichée en 40x40px
    * **Avatar de remplacement** : Si aucune photo n'est définie, affichage d'un avatar avec les initiales de l'utilisateur et une couleur de fond générée automatiquement basée sur le login
* **Optimisation du cache des images** :
  * **En-têtes HTTP de cache** : Les images servies via `/api/files/[...path]` incluent des en-têtes de cache optimisés pour améliorer les performances
  * **Cache-Control** : `public, max-age=31536000, immutable` (cache de 1 an, fichiers immutables)
  * **ETag** : Génération d'un ETag basé sur la taille et la date de modification pour la validation conditionnelle
  * **Last-Modified** : En-tête avec la date de modification du fichier
  * **Expires** : Date d'expiration pour compatibilité avec les anciens navigateurs
  * **Validation conditionnelle** : Support de `If-None-Match` pour retourner `304 Not Modified` si l'image n'a pas changé
  * **Bénéfices** : Réduction significative de la bande passante et amélioration des temps de chargement lors des visites suivantes

---

## 10. Recherche & Filtres

* Champ de recherche dans la zone Master (partie fixe, non scrollable)
* Recherche texte simple
* **Recherche sur TOUS les champs** incluant :
  * Nom de l'agence
  * Code Agence
  * Code Rayon
  * Tous les champs des adresses
  * Tous les champs des contacts
  * Tous les champs techniques
* **Debounce** : Délai de 300ms après la dernière frappe avant de lancer la recherche pour limiter les appels API
* **Filtres état** : Ordre d'affichage : **Tous | OK | INFO | ALERTE | FERMÉE**
* **Gestion des erreurs réseau** : 
  * Les erreurs réseau sont gérées silencieusement, l'application conserve les données déjà chargées en cas de perte de connexion

---

## 11. Authentification & Sécurité

### 11.1 Compte initial

* Login : Admin
* Mot de passe : Password
* Rôle : Super Admin

### 11.1.1 Processus de connexion

* **Formulaire de connexion** : Page `/login` avec champs login et mot de passe
* **Thème clair/sombre** : Bouton de bascule (icône lune/soleil) visible en haut à droite, persistant via localStorage, avec fallback sur la préférence système `prefers-color-scheme`; aucune différence d'hydratation (contenu initial identique avant montage)
* **Vérification du mot de passe** : Validation du mot de passe avec argon2
* **Gestion du 2FA** :
  * Si l'utilisateur a le 2FA activé (`twoFactorEnabled = true`), l'API retourne `{ needsTwoFactor: true }` avec un status 200
  * Le formulaire de connexion affiche automatiquement un champ "Code 2FA" lorsque `needsTwoFactor` est détecté
  * **2FA obligatoire pour Super Admin** : Les comptes Super Admin doivent configurer le 2FA lors de la première connexion
    * **Connexion autorisée** : Les Super Admin peuvent se connecter avec login/mot de passe même si le 2FA n'est pas activé
    * **Session créée** : Une session est créée pour permettre l'accès à la page de configuration 2FA
    * **Redirection automatique** : Après connexion réussie, redirection automatique vers `/dashboard/setup-2fa` si `requiresTwoFactorSetup: true`
    * **Page de configuration obligatoire** : Page dédiée `/dashboard/setup-2fa` pour configurer le 2FA avant d'accéder au reste de l'application
    * **Protection automatique** : Le composant `Require2FASetup` vérifie et redirige automatiquement les Super Admin sans 2FA vers la page de configuration
    * **Vérification sur routes protégées** : Toutes les routes nécessitant les privilèges Super Admin vérifient que le 2FA est activé
    * **Avertissement dans le profil** : Avertissement visuel pour les Super Admin qui n'ont pas activé le 2FA (si accès au profil)
    * **Le 2FA ne peut pas être désactivé** : Le 2FA ne peut pas être désactivé pour les Super Admin (bouton désactivé dans l'interface)
  * L'utilisateur doit saisir le code à 6 chiffres depuis Google Authenticator
  * Le code est validé côté serveur avant de créer la session
  * Si le code est incorrect, un message d'erreur est affiché et l'utilisateur peut réessayer
* **Création de session** : 
  * Pour les utilisateurs normaux : La session n'est créée qu'après validation complète (mot de passe + code 2FA si activé)
  * Pour les Super Admin sans 2FA : La session est créée après validation du mot de passe pour permettre l'accès à la page de configuration 2FA

### 11.2 Utilisateurs

* **Interface CRUD complète** : Page dédiée `/dashboard/utilisateurs` avec liste des utilisateurs
* **Créer** : Bouton "Nouvel utilisateur" avec formulaire (login, mot de passe, rôle, statut actif)
* **Modifier** : Bouton "Modifier" sur chaque utilisateur permettant de modifier login, mot de passe (optionnel), rôle, statut actif et photo de profil
* **Photo de profil** :
  * **Affichage** : Photo de profil affichée en 40x40px dans la liste des utilisateurs (ou avatar avec initiales si aucune photo)
  * **Upload** : Possibilité d'uploader une photo de profil lors de la création ou modification d'un utilisateur (JPEG ou PNG, taille max selon paramètre global `maxImageSizeMB`)
  * **Redimensionnement automatique** : La photo est automatiquement redimensionnée en 100x100px (carré) lors de l'upload
  * **Prévisualisation** : Aperçu de la nouvelle photo avant l'enregistrement
  * **Suppression** : Possibilité de supprimer la photo de profil existante
  * **Avatar de remplacement** : Si aucune photo n'est définie, affichage d'un avatar avec les initiales de l'utilisateur et une couleur de fond générée automatiquement
  * **Sécurité** : Toutes les photos de profil sont soumises au scan antivirus, à la quarantaine et au sandboxing (voir section 9 pour les détails)
* **Désactiver/Activer** : Bouton "Désactiver" ou "Activer" pour basculer le statut actif d'un utilisateur
* **Supprimer** : Bouton "Supprimer" avec confirmation avant suppression définitive
* **Gestion 2FA** :
  * Bouton "2FA" pour configurer le 2FA (génération du secret et QR Code)
  * Dialog avec affichage du QR Code et du secret
    * **Format du QR Code** : L'API retourne une data URL complète (format `data:image/png;base64,xxxxx`) générée par la bibliothèque `qrcode`
    * **Affichage** : Le QR Code est affiché directement via l'attribut `src` de l'élément `<img>` sans ajout de préfixe supplémentaire
    * **Taille** : QR Code affiché en 192x192 pixels (classe `w-48 h-48`)
  * Validation du code de vérification depuis Google Authenticator
  * Activation/désactivation du 2FA
* **Affichage** : Liste des utilisateurs avec photo de profil (ou avatar), login, rôle, statut actif et état 2FA

### 11.2.1 Protection du compte Admin

* **Compte Admin protégé** : Le compte avec le login "Admin" (identifié par `login === "Admin"`) bénéficie de protections spéciales pour garantir la sécurité et la disponibilité du système
* **Protections côté serveur** :
  * **API PUT `/api/users/[id]`** : Empêche toute modification du compte Admin (désactivation, changement de rôle, changement de login)
    * Vérification avant modification : Si l'utilisateur cible a le login "Admin", l'API retourne une erreur 403 avec le message "Le compte Admin ne peut pas être modifié"
    * **Exception** : Seul le mot de passe peut être modifié pour le compte Admin
  * **API DELETE `/api/users/[id]`** : Empêche la suppression du compte Admin
    * Vérification avant suppression : Si l'utilisateur cible a le login "Admin", l'API retourne une erreur 403 avec le message "Le compte Admin ne peut pas être supprimé"
* **Protections côté client** :
  * **Bouton "Désactiver/Activer"** : Désactivé visuellement pour le compte Admin avec un tooltip explicatif "Le compte Admin ne peut pas être désactivé"
  * **Bouton "Supprimer"** : Désactivé visuellement pour le compte Admin avec un tooltip explicatif "Le compte Admin ne peut pas être supprimé"
  * **Formulaire d'édition** :
    * **Champ "Login"** : Désactivé et non modifiable pour le compte Admin avec un tooltip "Le login du compte Admin ne peut pas être modifié"
    * **Champ "Rôle"** : Désactivé et non modifiable pour le compte Admin
    * **Switch "Actif"** : Désactivé et non modifiable pour le compte Admin avec un tooltip "Le compte Admin ne peut pas être désactivé"
    * **Champ "Mot de passe"** : Reste modifiable (seul champ modifiable pour le compte Admin)
  * **Fonction `handleToggleActive`** : Vérification préalable empêchant la désactivation avec un message d'alerte "Le compte Admin ne peut pas être désactivé"
  * **Fonction `handleDeleteUser`** : Vérification préalable empêchant la suppression avec un message d'alerte "Le compte Admin ne peut pas être supprimé"
  * **Fonction `handleSaveUser`** :
    * Empêche la modification du login du compte Admin (vérification `selectedUser.login === "Admin" && userFormData.login !== "Admin"`)
    * Pour le compte Admin, seule la modification du mot de passe est autorisée (les autres champs sont ignorés dans la requête API)
* **Justification** : Ces protections garantissent qu'un compte administrateur principal reste toujours disponible pour la gestion du système, même en cas d'erreur ou de tentative malveillante

### 11.2.2 Mon profil

* **Page dédiée** : `/dashboard/profil` accessible depuis le bouton "Mon profil" dans la barre latérale
* **Fonctionnalités** :
  * Affichage du rôle (lecture seule)
  * Modification du login
  * Modification du mot de passe (optionnel, avec confirmation)
  * **Photo de profil** :
    * **Affichage** : Photo de profil affichée en 100x100px (ou avatar avec initiales si aucune photo)
    * **Upload** : Possibilité d'uploader une photo de profil (JPEG ou PNG, taille max selon paramètre global `maxImageSizeMB`, voir Paramètres)
    * **Redimensionnement automatique** : La photo est automatiquement redimensionnée en 100x100px (carré) lors de l'upload
    * **Prévisualisation** : Aperçu de la nouvelle photo avant l'enregistrement
    * **Suppression** : Possibilité de supprimer la photo de profil existante
    * **Avatar de remplacement** : Si aucune photo n'est définie, affichage d'un avatar avec les initiales de l'utilisateur et une couleur de fond générée automatiquement
    * **Sécurité** : Toutes les photos de profil sont soumises au scan antivirus, à la quarantaine et au sandboxing (voir section 9 pour les détails)
  * Messages d'erreur et de succès
* **API routes** :
  * `/api/auth/profile` (PUT) - Permet à un utilisateur de modifier son propre profil (login, mot de passe)
  * `/api/users/[id]/photo` (POST) - Permet d'uploader une photo de profil pour un utilisateur
  * `/api/users/[id]/photo` (DELETE) - Permet de supprimer la photo de profil d'un utilisateur
* **Sécurité** : Chaque utilisateur ne peut modifier que son propre profil (vérification de session). Les Super Admin peuvent modifier les photos de profil de tous les utilisateurs

### 11.3 Sécurité obligatoire

* Hash mot de passe : **argon2**
* **2FA : Google Authenticator uniquement**
  * QR Code affiché (format data URL complet retourné par `qrcode.toDataURL()`)
    * **Génération** : QR Code généré à 600px de largeur avec marge de 2 et niveau de correction d'erreur 'M'
    * **Affichage dans la page de configuration obligatoire** : 
      * Desktop : 500px × 500px (taille fixe optimale pour le scan)
      * Mobile/Tablette : 85% de la largeur de la fenêtre (responsive)
  * Secret affiché (format base32)
  * Librairie QR Code autorisée : `qrcode` (npm)
  * **2FA obligatoire pour Super Admin** :
    * **Configuration forcée lors de la connexion** : Les Super Admin doivent configurer le 2FA lors de leur première connexion
    * **Connexion autorisée** : Les Super Admin peuvent se connecter avec login/mot de passe, mais sont redirigés vers `/dashboard/setup-2fa`
    * **Page de configuration dédiée** : Page `/dashboard/setup-2fa` avec interface complète pour générer le QR Code et activer le 2FA
    * **Layout spécial** : La page de configuration 2FA utilise un layout spécial sans sidebar ni header
    * **Protection automatique** : Le composant `Require2FASetup` redirige automatiquement les Super Admin sans 2FA vers la page de configuration
    * **Vérification sur routes protégées** : Toutes les routes nécessitant les privilèges Super Admin vérifient que le 2FA est activé via `requireTwoFactorForSuperAdmin()`
    * **Middleware et fonctions utilitaires** : 
      * `lib/two-factor-required.ts` : Fonctions pour vérifier si le 2FA est obligatoire
      * `lib/require-two-factor.ts` : Middleware pour vérifier le 2FA sur les routes protégées
    * **Avertissement dans le profil** : Avertissement visuel (bannière jaune) pour les Super Admin qui n'ont pas activé le 2FA (si accès au profil)
    * **Bouton "Activer (Obligatoire)"** : Bouton mis en évidence pour les Super Admin dans le profil
    * **Le 2FA ne peut pas être désactivé** : Le 2FA ne peut pas être désactivé pour les Super Admin (bouton "Obligatoire" désactivé)
* **Protection CSRF / XSS** :
  * **Utilisation systématique de `apiFetch`** : Toutes les requêtes API côté client utilisent `apiFetch` au lieu de `fetch` natif
    * `apiFetch` ajoute automatiquement le token CSRF dans les headers (`x-csrf-token`) et dans le body (pour FormData)
    * `apiFetch` inclut automatiquement les credentials (cookies de session)
    * `apiFetch` gère automatiquement le retry en cas d'erreur CSRF (récupération d'un nouveau token)
    * `apiFetch` configure automatiquement les headers `Content-Type` pour JSON
    * **Fichiers concernés** : Tous les fichiers dans `app/dashboard/` utilisent `apiFetch` pour les requêtes vers `/api/*`
  * **Middleware CSRF** : Validation du token CSRF sur toutes les routes modifiantes (POST, PUT, DELETE, PATCH)
  * **Sanitization XSS** : Toutes les entrées utilisateur sont sanitizées après validation
* **Validation stricte des entrées** :
  * **Zod** : Utilisation de schémas Zod pour valider toutes les entrées API (users, contacts, agencies, addresses, pcs, etc.)
  * **Validation côté serveur** : Toutes les routes API modifiantes utilisent un middleware de validation avec Zod
  * **Messages d'erreur détaillés** : Les erreurs de validation retournent des messages explicites pour faciliter le débogage
  * **Sanitization** : Après validation, toutes les entrées utilisateur sont sanitizées pour prévenir les attaques XSS
* **Conformité OWASP Top 10 2021** : Voir section 15 pour les détails complets des mesures de sécurité implémentées

### 11.4 Gestion de la session et timeout d'inactivité

* **Expiration automatique par inactivité** :
  * La session expire automatiquement après une période d'inactivité configurable
  * **Durée par défaut** : 1 minute (60 secondes)
  * **Durée configurable** : La durée peut être modifiée par un Super Admin dans la page Paramètres (voir section 11.5)
  * **Détection d'inactivité** : L'application surveille les actions utilisateur suivantes :
    * Mouvements de souris (`mousemove`, `mousedown`, `click`)
    * Frappe au clavier (`keypress`)
    * Défilement (`scroll`)
    * Touches tactiles (`touchstart`)
  * **Réinitialisation du timer** : Chaque action utilisateur réinitialise le timer d'inactivité à zéro
  * **Déconnexion automatique** : Si aucune action n'est détectée pendant la durée configurée, l'utilisateur est automatiquement déconnecté et redirigé vers la page de connexion (`/login`)
  * **Gestion côté client** : Le timeout est géré côté client via un composant React (`SessionTimeout`) qui :
    * Écoute les événements utilisateur sur le document entier (capture phase)
    * Utilise `setTimeout` pour déclencher la déconnexion après expiration
    * Appelle l'API `/api/auth/logout` pour déconnecter l'utilisateur
    * Redirige vers `/login` après déconnexion
  * **Alerte avant expiration** : ✅ **IMPLÉMENTÉ** (2026-01-30)
    * **Affichage automatique** : Dialog d'alerte affiché 30 secondes avant l'expiration de la session
    * **Compte à rebours** : Affichage en temps réel du nombre de secondes restantes (30, 29, 28...)
    * **Prolongation de session** : Bouton "Prolonger la session" pour réinitialiser le timer d'inactivité
    * **Fermeture du dialog** : Fermer le dialog (Escape ou clic extérieur) prolonge automatiquement la session
    * **Interface** : Dialog avec icône d'alerte, message clair et bouton d'action
  * **Chargement dynamique** : La durée de session est chargée dynamiquement depuis l'API `/api/settings` au démarrage de l'application via le composant `SessionTimeoutWrapper`
  * **Application globale** : Le système de timeout est actif sur toutes les pages du dashboard grâce à l'intégration dans `DashboardLayout`

### 11.5 Paramètres de l'application

* **Page Paramètres** : `/dashboard/parametres` (accessible uniquement aux Super Admin)
* **Fil d'Ariane** : Un fil d'Ariane (breadcrumb) est affiché en haut de la page : « Tableau de bord > Paramètres > [onglet actif] » (Général, Utilisateurs, Sauvegardes, Logs, Monitoring) pour faciliter la navigation et le repérage.
* **Accès** : Bouton "Paramètres" dans la barre latérale (icône Settings), visible uniquement pour les utilisateurs avec le rôle **Super Admin**
* **Vérification d'accès** : Si un utilisateur non-Super Admin tente d'accéder à la page, un message "Accès refusé. Cette page est réservée aux Super Admin." est affiché
* **Onglets disponibles** :
  * **Général** : Paramètres de session, fichiers orphelins
  * **Utilisateurs** : Gestion des utilisateurs (CRUD, 2FA)
  * **Sauvegardes** : Gestion des sauvegardes (création, restauration, suppression individuelle)
  * **Logs** : Consultation et export des logs
  * **Monitoring** : ✅ **IMPLÉMENTÉ** (2026-01-30) - Dashboard de monitoring de sécurité (statistiques, alertes)
* **Paramètres disponibles** :
  * **Durée de session** :
    * Champ de saisie numérique pour définir la durée d'inactivité avant déconnexion automatique (en minutes)
    * **Valeur minimale** : 1 minute
    * **Valeur maximale** : 1440 minutes (24 heures)
  * **Taille maximale des images** : ✅ **IMPLÉMENTÉ** (2026-01-31)
    * Champ de saisie numérique pour définir la taille maximale autorisée pour l'upload d'images (en Mo)
    * **Valeur par défaut** : 5 Mo
    * **Valeur minimale** : 1 Mo
    * **Valeur maximale** : 100 Mo
    * **Application** : La taille maximale est appliquée lors de l'upload de toutes les images (photos d'agences, photos de groupes, photos de tâches, photos de profil)
    * **Conservation** : Les images déjà importées avec une taille supérieure à la nouvelle limite sont conservées (pas de suppression)
    * **Libellés dynamiques** : Les libellés dans l'interface d'upload affichent automatiquement la taille maximale configurée (ex: "max 5 MB" devient "max 10 MB" si configuré à 10 Mo)
  * **Nombre maximum de photos par type de photo** : ✅ **IMPLÉMENTÉ** (2026-01-31)
    * Champ de saisie numérique pour définir le nombre maximum de photos autorisées par type de photo dans un groupe
    * **Valeur par défaut** : 50 photos
    * **Valeur minimale** : 1 photo
    * **Valeur maximale** : 1000 photos
    * **Application** : Validation lors de l'import de photos dans les groupes de photos (onglet Photos du Détails de l'agence)
    * **Comptage** : Le système compte toutes les photos existantes du même type pour l'agence avant d'autoriser l'ajout de nouvelles photos
    * **Exception** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée)
    * **Message d'erreur** : Affiche le nombre de photos existantes, le nombre de nouvelles photos et la limite configurée
  * **Nombre maximum de photos par tâche** : ✅ **IMPLÉMENTÉ** (2026-01-31)
    * Champ de saisie numérique pour définir le nombre maximum de photos autorisées par tâche
    * **Valeur par défaut** : 5 photos
    * **Valeur minimale** : 1 photo
    * **Valeur maximale** : 100 photos
    * **Application** : Validation lors de l'ajout de photos dans les tâches (onglet Tâches du Détails de l'agence)
    * **Interface** : Les libellés et messages d'erreur utilisent la valeur configurée (ex: "Maximum 5 photos autorisées" devient "Maximum 10 photos autorisées" si configuré à 10)
  * **Gestion des fichiers orphelins** (onglet Général) :
    * **Fonctionnalité** : Scan du dossier uploads pour trouver les images non référencées dans la base de données
    * **Processus** :
      * Bouton "Scanner les fichiers orphelins" pour lancer le scan
      * Vérification de toutes les références dans la base de données :
        * Photos de profil (`User.photo`)
        * Photos d'agences (`Agency.photo`)
        * Photos dans les groupes (`PhotoGroup.photos`)
        * Photos et fichiers des imprimantes (`Printer.photos`, `Printer.files`)
        * Photos des tâches (`Task.photos`) ✅ **IMPLÉMENTÉ** (2026-01-31)
      * Affichage de la liste des fichiers orphelins trouvés avec :
        * Chemin du fichier
        * Taille formatée
        * Date de modification
    * **Sélection multiple** : Cases à cocher pour sélectionner les fichiers à supprimer
    * **Actions** :
      * Bouton "Tout sélectionner" / "Tout désélectionner"
      * Bouton "Supprimer" avec confirmation pour supprimer les fichiers sélectionnés
    * **Sécurité** :
      * Accès réservé aux Super Admin
      * Protection CSRF sur l'API de suppression
      * Validation des chemins (protection path traversal)
      * Logging des suppressions
    * **API** :
      * `GET /api/files/orphaned` : Scanne et retourne la liste des fichiers orphelins
      * `DELETE /api/files/orphaned` : Supprime les fichiers orphelins sélectionnés
  * **Images manquantes** (onglet Général) : ✅ **IMPLÉMENTÉ** (2026-01-30)
    * **Fonctionnalité** : Scan des images référencées dans la base de données pour trouver celles qui sont manquantes physiquement
    * **Processus** :
      * Bouton "Rechercher les images manquantes" pour lancer le scan
      * Vérification de toutes les références dans la base de données :
        * Photos dans les groupes (`PhotoGroup.photos`)
        * Photos d'agences (`Agency.photo`)
        * Photos de profil (`User.photo`)
        * Photos des tâches (`Task.photos`) ✅ **IMPLÉMENTÉ** (2026-01-31)
      * Affichage de la liste des images manquantes trouvées avec :
        * Nom de l'agence (ou utilisateur pour les photos de profil)
        * Type de photo
        * Libellé (titre de la tâche pour les photos de tâches)
        * Date physique
        * Nom physique (chemin du fichier)
    * **Accès** : Réservé aux Super Admin
    * **API** : `GET /api/files/missing` : Scanne et retourne la liste des images manquantes
* **API Routes** :
  * **GET `/api/settings`** : Récupère les paramètres de l'application
    * Vérification du rôle Super Admin
    * Création automatique des paramètres par défaut si ils n'existent pas
  * **PUT `/api/settings`** : Met à jour les paramètres de l'application
    * Vérification du rôle Super Admin
    * Validation de la durée de session (nombre positif, minimum 1 minute, maximum 1440 minutes)
    * Validation de la taille maximale des images (nombre positif, minimum 1 Mo, maximum 100 Mo)
    * Validation du nombre maximum de photos par type (nombre positif, minimum 1, maximum 1000)
    * Validation du nombre maximum de photos par tâche (nombre positif, minimum 1, maximum 100)
    * Utilisation de `upsert` pour créer ou mettre à jour les paramètres
* **Modèle de données** :
  * **Table `AppSettings`** : Stockage des paramètres de l'application
    * `id` : String (clé primaire, valeur fixe `"settings"`)
* `sessionTimeout` : Int (durée en minutes, défaut: 1)
    * `maxImageSizeMB` : Int (taille maximale des images en Mo, défaut: 5) ✅ **IMPLÉMENTÉ** (2026-01-31)
    * `maxPhotosPerType` : Int (nombre maximum de photos par type de photo, défaut: 50) ✅ **IMPLÉMENTÉ** (2026-01-31)
    * `maxPhotosPerTask` : Int (nombre maximum de photos par tâche, défaut: 5) ✅ **IMPLÉMENTÉ** (2026-01-31)
    * `updatedAt` : DateTime (date de dernière mise à jour)
* **Initialisation** : Un script d'initialisation (`npm run init:settings`) permet de créer les paramètres par défaut si ils n'existent pas
* **Composants techniques** :
  * `SessionTimeout` : Composant React qui gère le timeout d'inactivité côté client
  * `SessionTimeoutWrapper` : Wrapper qui charge la durée de session depuis l'API et l'applique au composant `SessionTimeout`
  * Intégration dans `DashboardLayout` pour être actif sur toutes les pages du dashboard

### 11.6 Contrôle d'accès basé sur les rôles (RBAC)

* **Rôles disponibles** :
  * **Super Admin** : Accès complet à toutes les fonctionnalités (création, modification et suppression d'agences, gestion des utilisateurs, logs, sauvegardes)
  * **Super user** : Peut créer et modifier des agences, mais ne peut pas les supprimer
  * **User** : Accès en lecture seule aux agences (consultation uniquement, pas de création, modification ou suppression)
* **Restrictions d'interface** :
  * Les éléments de menu et boutons sont masqués selon le rôle de l'utilisateur
  * Récupération du rôle via l'API `/api/auth/me` au chargement des composants
* **Menu de navigation** :
  * **Super Admin** : Accès à tous les menus (Tableau de bord, Agences, Calendrier, Utilisateurs, Logs, Sauvegardes, Paramètres)
  * **Super user** et **User** : Accès aux menus "Tableau de bord", "Agences" et "Calendrier" uniquement
* **Gestion des agences** :
  * **Super Admin** :
    * Peut créer de nouvelles agences (bouton "Ajouter" visible)
    * Peut modifier des agences (bouton "Modifier" visible)
    * Peut supprimer des agences (bouton "Supprimer" visible)
  * **Super user** :
    * Peut créer de nouvelles agences (bouton "Ajouter" visible)
    * Peut modifier des agences (bouton "Modifier" visible)
    * Ne peut pas supprimer des agences (bouton "Supprimer" masqué)
  * **User** :
    * Ne peut pas créer d'agences (bouton "Ajouter" masqué)
    * Ne peut pas modifier d'agences (bouton "Modifier" masqué dans la liste et dans la vue des détails)
    * Ne peut pas supprimer d'agences (bouton "Supprimer" masqué)
    * Ne peut pas modifier les détails d'une agence (bouton "Modifier" dans la vue des détails masqué en mode mobile et desktop)
    * La fonction `handleEditAgencyFromMaster` empêche toute tentative d'édition pour les utilisateurs de type **User**
    * Accès en consultation seule

---

## 12. Logs

* Logs de connexion
* Logs actions utilisateur
* Stockage : **PostgreSQL**
* Export : **CSV uniquement**
* Rétention : **30 jours**
* **Interface utilisateur** :
  * **Page** : `/dashboard/logs` accessible uniquement aux utilisateurs avec le rôle **Super Admin**
  * **Titre** : "Logs" affiché en haut de la page
  * **Boutons d'action** :
    * **Bouton "Purger tous les logs"** : Visible uniquement si des logs existent
      * Variant : `destructive` (rouge)
      * Icône : Trash2
    * **Bouton "Exporter en CSV"** : Toujours visible
      * Icône : Download
  * **Affichage responsive** :
    * **Mode mobile** (< 768px) :
      * Les boutons sont affichés **directement en dessous du titre "Logs"**
      * Les boutons sont **empilés verticalement** (un bouton par ligne)
      * Les boutons ont une **largeur automatique** (basée sur leur contenu) et **ne prennent pas toute la largeur de l'écran**
      * Les boutons sont alignés à gauche
    * **Mode desktop** (≥ 768px) :
      * Les boutons sont affichés **côte à côte** (horizontalement)
      * Les boutons ont une largeur automatique
* **Purge de tous les logs** :
  * **Bouton** : "Purger tous les logs" visible uniquement si des logs existent
  * **Confirmation obligatoire** : Dialog de confirmation avec saisie du mot "PURGER" (en majuscules)
    * Le bouton de confirmation est désactivé tant que le texte saisi n'est pas exactement "PURGER"
    * Message d'avertissement affiché dans le dialog
  * **Accès** : Uniquement pour les utilisateurs avec le rôle **Super Admin** (vérification côté API)
  * **Action** : Suppression définitive de tous les logs de la base de données
  * **Logging** : Action journalisée avec le nombre de logs supprimés (création d'un log avant la purge)

---

## 13. Historisation globale

* **Historisation des agences** :
  * Toute modification d'une agence est automatiquement historisée
  * Maximum **100 versions par agence** (les versions les plus anciennes sont automatiquement supprimées)
  * Chaque version contient l'état complet de l'agence (nom, état, code agence, code rayon, dates, etc.) au format JSON
  * **Interface de consultation** : Bouton "Historique" dans l'en-tête de la zone Détails
    * Visible uniquement en mode consultation (pas en mode édition)
    * **Accès restreint** : Visible uniquement pour les utilisateurs avec le rôle **Super Admin**
  * **Restauration possible** : Restauration version par version depuis l'interface
    * Dialog affichant toutes les versions avec date, utilisateur et aperçu des données
    * Bouton "Restaurer" pour chaque version avec modale de confirmation (ConfirmDialog, variant default, libellé « Restaurer »)
    * La restauration crée automatiquement une nouvelle entrée d'historique
  * **Routes API** :
    * `GET /api/agencies/[id]/history` : Récupération de l'historique d'une agence (accès réservé aux **Super Admin**)
    * `POST /api/agencies/[id]/history/restore` : Restauration d'une version spécifique (accès réservé aux **Super Admin**)
* **Historisation des notes techniques** :
  * Historisation séparée pour les notes techniques (voir section 7.8)
  * Maximum **100 versions par note technique**

---

## 14. Sauvegardes

* **Sauvegarde automatique** : **quotidienne**
  * Script de sauvegarde : `scripts/backup.ts`
  * Commande : `npm run backup`
  * Format du nom de fichier : `backup-YYYY-MM-DDTHH-mm-ss-sssZ.encrypted.zip` (timestamp ISO)
  * **Format de sauvegarde** : Archive ZIP compressée et chiffrée contenant :
    * **PostgreSQL** : Dump SQL via `pg_dump` (script `scripts/backup.ts`, module `lib/db-backup.ts`). Si `DATABASE_URL` est une URL `postgresql://`, la sauvegarde utilise ce format.
    * Le dossier `/uploads` complet avec toutes les photos et fichiers uploadés
  * **Compression** : Niveau de compression maximal (zlib level 9) pour optimiser l'espace disque
  * **Chiffrement** : **AES-256-GCM** (Advanced Encryption Standard avec Galois/Counter Mode)
    * **Algorithme** : AES-256-GCM avec authentification intégrée
    * **Clé de chiffrement** : Dérivée depuis la variable d'environnement `ENCRYPTION_KEY` (minimum 32 caractères)
    * **Dérivation de clé** : Utilisation de `scrypt` avec un salt aléatoire (32 bytes) pour chaque fichier
    * **IV (Initialization Vector)** : Aléatoire de 16 bytes pour chaque fichier
    * **Tag d'authentification** : 16 bytes pour garantir l'intégrité des données
    * **AAD (Additional Authenticated Data)** : "abcliv-agency-backup" pour lier le contexte
    * **Format du fichier chiffré** : `salt (32 bytes) + iv (16 bytes) + tag (16 bytes) + données chiffrées`
    * **Sécurité** : Protection contre les attaques de modification et garantit la confidentialité et l'intégrité des données
  * **Rétrocompatibilité** : 
    * Les anciennes sauvegardes au format `.db` (base de données uniquement) peuvent toujours être restaurées
    * Les anciennes sauvegardes au format `.zip` non chiffrées peuvent être restaurées (détection automatique du chiffrement)
    * Les nouvelles sauvegardes sont au format `.encrypted.zip` (ZIP chiffré)
* **Dossier de stockage** : **/backups** (racine projet)
  * Création automatique du dossier si inexistant
  * Stockage filesystem uniquement
  * **Sécurité** : Tous les fichiers de sauvegarde sont chiffrés avant stockage
  * **Validation d'intégrité** : ✅ **IMPLÉMENTÉ** (2026-01-30)
    * **Checksums SHA-256** : Calcul et vérification automatiques pour chaque sauvegarde
    * **Stockage** : Checksums sauvegardés dans des fichiers `.sha256` (format standard)
    * **Vérification automatique** : Avant chaque restauration de sauvegarde
    * **Rejet des sauvegardes corrompues** : Impossible de restaurer une sauvegarde avec checksum invalide
    * **Interface utilisateur** : Indicateurs visuels (✅ valide, ❌ corrompue, ⚠️ inconnue)
    * **Nettoyage automatique** : Suppression des checksums orphelins
    * **Module** : `lib/backup-integrity.ts` avec fonctions complètes
* **Rétention** : **10 jours**
  * Nettoyage automatique : Les sauvegardes de plus de 10 jours sont automatiquement supprimées lors de chaque sauvegarde
  * Calcul basé sur la date de modification du fichier (`mtime`)
  * Les anciennes sauvegardes `.db`, `.zip` et les nouvelles sauvegardes `.encrypted.zip` sont toutes nettoyées selon cette règle
  * **Restauration complète possible** :
    * **Interface de restauration** : Page `/dashboard/sauvegardes` accessible uniquement aux utilisateurs avec le rôle **Super Admin**
      * **Fonctionnalités requises** :
      * Liste des sauvegardes disponibles avec date, heure et taille
      * Bouton de restauration pour chaque sauvegarde
      * Bouton de suppression pour chaque sauvegarde : ✅ **IMPLÉMENTÉ** (2026-01-30)
        * **Action** : Suppression individuelle d'une sauvegarde spécifique
        * **Confirmation** : Dialog de confirmation avec détails de la sauvegarde (nom, date, taille)
        * **Sécurité** : Protection path traversal, vérification du format de fichier
        * **Nettoyage** : Suppression automatique du fichier de checksum associé (`.sha256`)
        * **Logging** : Action journalisée avec le nom du fichier supprimé
        * **Alerte** : Alerte de sécurité pour action sensible
        * **API** : `DELETE /api/backups/[filename]`
      * Confirmation avant restauration (action irréversible)
      * **Restauration complète** :
        * Pour les sauvegardes `.encrypted.zip` : Déchiffrement automatique puis extraction complète de l'archive (base de données + dossier uploads)
          * **Déchiffrement** : Détection automatique du format chiffré et déchiffrement avec la clé `ENCRYPTION_KEY`
          * **Bibliothèque d'extraction** : `yauzl` (bibliothèque légère sans dépendances externes)
          * **PostgreSQL** : Restauration via `psql` (si `DATABASE_URL` est une URL `postgresql://`). Voir `lib/db-backup.ts`.
          * Le dossier `/uploads` est remplacé par celui de la sauvegarde
          * Une sauvegarde de l'état actuel est créée automatiquement avant la restauration
          * **Sécurité** : Protection contre les chemins malformés (chemins avec `..`, chemins absolus) - ces entrées sont ignorées lors de l'extraction
          * **Gestion d'erreurs** : Les erreurs individuelles lors de l'extraction sont loggées sans interrompre le processus complet, permettant la restauration partielle en cas de problème sur certains fichiers
        * Pour les sauvegardes `.zip` non chiffrées (rétrocompatibilité) : Détection automatique du format et extraction directe
        * Pour les anciennes sauvegardes `.db` (rétrocompatibilité) : 
          * Détection automatique du format chiffré
          * Si chiffré : Déchiffrement puis restauration de la base de données
          * Si non chiffré : Restauration directe de la base de données
      * **Note** : La restauration remplace complètement la base de données ET les fichiers uploadés par la version sauvegardée
      * **Sauvegarde avant restauration** : Une sauvegarde automatique de l'état actuel est créée avant chaque restauration (format `backup-before-restore-YYYY-MM-DDTHH-mm-ss-sssZ.zip`)
* **Purge de toutes les sauvegardes** :
  * **Bouton** : "Purger toutes les sauvegardes" visible uniquement si des sauvegardes existent
  * **Confirmation obligatoire** : Dialog de confirmation avec saisie du mot "PURGER" (en majuscules)
    * Le bouton de confirmation est désactivé tant que le texte saisi n'est pas exactement "PURGER"
    * Message d'avertissement affiché dans le dialog
  * **Accès** : Uniquement pour les utilisateurs avec le rôle **Super Admin** (vérification côté API)
  * **Action** : Suppression définitive de toutes les sauvegardes (fichiers `.zip` et `.db`)
  * **Logging** : Action journalisée avec le nombre de sauvegardes supprimées
* **Automatisation** :
  * **Implémenté via PM2** : Un processus automatisé dans `ecosystem.config.js` exécute la sauvegarde quotidienne en ciblant le script `npm run backup` (à 02:00 du matin).
  * **Commande manuelle** : `npm run backup` pour créer une sauvegarde manuelle
* **Nettoyage de la quarantaine** :
  * **Script** : `scripts/clean-quarantine.js`
  * **Commande** : `npm run clean:quarantine`
  * **Fonction** : Supprime automatiquement les fichiers en quarantaine plus anciens que 24 heures
  * **Recommandation** : Configurer un cron job ou scheduler pour exécuter ce script quotidiennement
* **Accès** :
  * Menu "Sauvegardes" dans la barre latérale : Visible uniquement pour les utilisateurs avec le rôle **Super Admin**
  * Icône : HardDrive

---

## 15. Conformité OWASP Top 10 2021

L'application doit être conforme aux standards de sécurité OWASP Top 10 2021. Les mesures suivantes sont **obligatoires** et **implémentées**. Un rapport de synthèse (risques identifiés, correctifs appliqués, recommandations) est maintenu à la racine du projet dans **`SECURITY.md`**.

### 15.1 A01:2021 – Broken Access Control

* **Vérification de session** : Toutes les routes API vérifient la session via `getSession()`
* **Contrôle d'accès basé sur les rôles (RBAC)** : Implémenté avec vérification des rôles (Super Admin, Super user, User)
* **Vérification des permissions** : Les actions sensibles vérifient le rôle (ex: historique, sauvegardes)
* **Protection des routes** : Proxy (anciennement middleware) protège les routes `/dashboard` et `/api`
* **Protection path traversal** : Validation stricte des chemins de fichiers pour éviter l'accès non autorisé aux fichiers système
  * Dans `app/api/files/[...path]/route.ts` : Vérification que le chemin résolu est bien dans le dossier `uploads/` (`startsWith(uploadsDir)`)
  * Sauvegardes : rejet de `filename` contenant `..`, `/` ou `\` ; utilisation de `resolve()` et vérification que le chemin résolu reste dans le répertoire des sauvegardes (DELETE et POST restore). Pour `DELETE /api/backups/[filename]` : `filePath.startsWith(backupsDir)` après `resolve()`
  * Utilisation de `resolve()` pour normaliser les chemins et détecter les tentatives de path traversal
* **Rate limiting** : Système de limitation du nombre de tentatives par IP
  * Limite : 5 tentatives par IP toutes les 15 minutes
  * Implémenté dans `lib/rate-limit.ts`
  * Application sur l'endpoint de login (`/api/auth/login`)

### 15.2 A02:2021 – Cryptographic Failures

* **Hachage des mots de passe** : Utilisation d'**argon2** (algorithme moderne et sécurisé)
* **2FA** : Implémenté avec TOTP (Google Authenticator)
* **2FA obligatoire pour Super Admin** :
  * **Configuration forcée lors de la connexion** : Les Super Admin doivent configurer le 2FA lors de leur première connexion
  * **Connexion autorisée** : Les Super Admin peuvent se connecter avec login/mot de passe, mais sont redirigés vers `/dashboard/setup-2fa`
  * **Page de configuration dédiée** : Page `/dashboard/setup-2fa` avec interface complète pour générer le QR Code et activer le 2FA
  * **Layout spécial** : La page de configuration 2FA utilise un layout spécial sans sidebar ni header (`app/dashboard/setup-2fa/layout.tsx`)
  * **Protection automatique** : Le composant `Require2FASetup` redirige automatiquement les Super Admin sans 2FA vers la page de configuration
  * **Vérification sur routes protégées** : Toutes les routes nécessitant les privilèges Super Admin vérifient que le 2FA est activé via `requireTwoFactorForSuperAdmin()`
  * **Middleware et fonctions utilitaires** : 
    * `lib/two-factor-required.ts` : Fonctions pour vérifier si le 2FA est obligatoire
    * `lib/require-two-factor.ts` : Middleware pour vérifier le 2FA sur les routes protégées
  * **Avertissement dans le profil** : Avertissement visuel pour les Super Admin qui n'ont pas activé le 2FA (si accès au profil)
  * **Le 2FA ne peut pas être désactivé** : Le 2FA ne peut pas être désactivé pour les Super Admin (bouton désactivé dans l'interface)
* **Secrets 2FA** : Stockés en base32, jamais exposés en clair
* **Cookies sécurisés** : `httpOnly: true`, `secure: true` en production, `sameSite: "lax"`
* **Clé de chiffrement WiFi** : 
  * Variable d'environnement `ENCRYPTION_KEY` obligatoire en production
  * Validation de la longueur minimale (32 caractères)
  * Erreur si la clé n'est pas définie en production
  * Clé par défaut uniquement en développement (non sécurisée, avec avertissement)

### 15.3 A03:2021 – Injection

* **Prisma ORM** : Utilisation de Prisma protège contre les injections SQL
* **Pas de requêtes SQL brutes** : Aucune utilisation de `$queryRaw` ou `$executeRaw` dans le code applicatif. Exception documentée : `lib/ensure-session-table.ts` utilise `$queryRaw` avec une requête fixe (aucune entrée utilisateur) pour vérifier l'existence de la table Session. Les scripts de migration one-off peuvent utiliser `$executeRawUnsafe` en environnement contrôlé.
* **CSRF** : Toutes les routes modifiantes (POST, PUT, PATCH, DELETE) protégées par `requireCSRF()` ou `verifyCSRFToken`, notamment : agencies, contacts, addresses, upload, settings, users, **backups (DELETE, POST restore)**, **alerts (POST resolve)**, **history restore (technical, agencies)**.
* **Validation des entrées** :
  * **Schémas Zod** : Validation stricte avec Zod pour tous les champs (users, contacts, agencies, addresses, pcs, etc.)
  * **Validation regex** : Validation stricte avec regex pour les champs spécifiques (poste, agent, ligne directe)
  * **Validation des emails** : Utilisation de `validator.isEmail()` (RFC compliant) combinée avec validation Zod
* **Sanitization des entrées** : Toutes les entrées utilisateur sont sanitizées après validation pour prévenir les attaques XSS
* **Sanitization des chemins** : Protection contre path traversal :
  * Fichiers servis : `app/api/files/[...path]/route.ts` (chemin résolu et vérification `startsWith(uploadsDir)`)
  * Sauvegardes : rejet du paramètre `filename` contenant `..`, `/` ou `\` sur les routes backup (DELETE et POST restore) ; chemin résolu vérifié pour rester dans le répertoire des sauvegardes
  * Entrées d'archive : `entry.fileName.includes("..")` lors de la restauration

### 15.4 A04:2021 – Insecure Design

* **Architecture en couches** : Séparation claire entre API, logique métier, et données
* **Validation côté serveur** : Toutes les validations sont faites côté serveur
* **Gestion des erreurs** : Messages d'erreur génériques (pas d'exposition de détails)

### 15.5 A05:2021 – Security Misconfiguration

* **Headers de sécurité HTTP** : Configuration dans `next.config.js`
  * `X-Frame-Options: DENY` (protection clickjacking)
  * `X-Content-Type-Options: nosniff` (protection MIME sniffing)
  * `X-XSS-Protection: 1; mode=block`
  * `Content-Security-Policy` (protection XSS)
    * **Configuration adaptative selon l'environnement** :
      * **Production** : CSP stricte sans `unsafe-eval` pour maximiser la sécurité
      * **Développement** : CSP avec `unsafe-eval` nécessaire pour le fonctionnement de Webpack/Next.js
    * **Directives CSP** :
      * `default-src 'self'` : Par défaut, uniquement depuis le même origine
      * `script-src 'self' 'unsafe-inline'` (+ `'unsafe-eval'` en développement uniquement)
      * `style-src 'self' 'unsafe-inline'` : Styles inline autorisés
      * `img-src 'self' data: blob:` : Images depuis le même origine, data URLs et blob URLs
      * `font-src 'self' data:` : Polices depuis le même origine et data URLs
      * `connect-src 'self'` : Connexions API uniquement vers le même origine
      * `worker-src 'self' blob:` : Web Workers depuis le même origine et blob URLs (nécessaire pour certaines fonctionnalités)
      * `frame-ancestors 'none'` : Protection contre le clickjacking
  * `Strict-Transport-Security` (HSTS avec preload)
  * `Permissions-Policy` (limitation des APIs)
* **Mode strict React** : `reactStrictMode: true` dans `next.config.js`
* **Variables d'environnement** : Utilisation de `.env` pour la configuration
  * **DATABASE_URL** : URL de la base de données PostgreSQL : `postgresql://user:password@host:port/dbname`.
  * **ENCRYPTION_KEY** : **OBLIGATOIRE** - Clé de chiffrement pour les sauvegardes et la base de données (minimum 32 caractères)
    * **Génération** : Utiliser `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` pour générer une clé sécurisée
    * **Sécurité** : Ne jamais commiter cette clé dans Git, utiliser `.env.local` en développement et variables d'environnement sécurisées en production
    * **Usage** : Utilisée pour chiffrer les backups et potentiellement la base de données
  * **NODE_ENV** : Environnement d'exécution (`development`, `production`, `test`)
* **Cookies sécurisés** : Configuration correcte selon l'environnement

### 15.6 A06:2021 – Vulnerable and Outdated Components

* **Dépendances récentes** : La plupart des dépendances sont à jour
* **Next.js 16.1.1** : Version récente (migration depuis 15.5.9)
* **React 19.2.3** : Version récente
* **Prisma 5.22.0** : Version récente
* **Migration middleware → proxy** : Le fichier `middleware.ts` a été remplacé par `proxy.ts` conformément aux conventions Next.js 16
* **Routes API asynchrones** : Toutes les routes API avec paramètres dynamiques utilisent désormais `Promise<{ params }>` pour la compatibilité Next.js 16
* **Recommandation** : Utiliser `npm audit` régulièrement et intégrer Snyk ou Dependabot

### 15.7 A07:2021 – Identification and Authentication Failures

* **Hachage sécurisé** : argon2 pour les mots de passe
* **2FA** : Implémenté avec TOTP
* **Gestion des sessions** : Cookies httpOnly et secure
* **Journalisation des tentatives** : Logs des tentatives de connexion échouées
* **Timeout de session** : Implémenté avec inactivité
* **Désactivation d'utilisateurs** : Champ `active` pour désactiver les comptes
* **Verrouillage de compte** : 
  * Verrouillage automatique après 5 tentatives échouées
  * Durée de verrouillage : 15 minutes
  * Champs dans le schéma Prisma : `lockedUntil` (DateTime?) et `failedLoginAttempts` (Int)
  * Réinitialisation automatique après connexion réussie
  * Messages d'erreur indiquant le temps restant avant déverrouillage

### 15.8 A08:2021 – Software and Data Integrity Failures

* **Validation des fichiers uploadés** : 
  * Type MIME vérifié via `file.type`
  * **Validation stricte via magic bytes** : Vérification du type réel du fichier via les premiers octets (magic bytes)
    * JPEG : `0xFF, 0xD8, 0xFF`
    * PNG : `0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A`
  * Vérification que le type déclaré correspond au type réel détecté
  * Protection contre l'upload de fichiers malveillants renommés (ex: `.exe` renommé en `.jpg`)
* **Taille maximale** : Configurable (paramètre `maxImageSizeMB`, défaut 5 MB)
* **Types autorisés** : `image/jpeg`, `image/png` uniquement
* **Noms de fichiers uniques** : Génération de noms uniques pour éviter les collisions
* **Protection path traversal** : Vérification des chemins dans restauration
* **dangerouslySetInnerHTML** : 
  * Utilisé uniquement dans `app/layout.tsx` pour le script de prévention FOUC
  * Contenu statique et contrôlé par le code source (pas de risque XSS)
  * Documenté avec commentaire explicatif

### 15.9 A09:2021 – Security Logging and Monitoring Failures

* **Journalisation centralisée** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Système Winston** : Logging structuré avec fichiers séparés
  * **Fichiers de log** :
    * `logs/combined.log` : Tous les logs (rotation automatique, 10 MB max, 5 fichiers)
    * `logs/error.log` : Uniquement les erreurs (rotation automatique, 10 MB max, 5 fichiers)
    * `logs/security.log` : Logs de sécurité (rotation automatique, 10 MB max, 10 fichiers)
  * **Format JSON structuré** : Logs avec métadonnées (timestamp, niveau, service, environnement, contexte)
  * **Format console** : Logs colorisés et formatés pour le développement
  * **Niveaux de log** : error, warn, info, debug
  * **Support services externes** : Configuration optionnelle pour CloudWatch, ELK, Splunk
  * **Module** : `lib/logger.ts` avec fonctions `logError()`, `logWarning()`, `logInfo()`, `logDebug()`, `logSecurity()`
  * **Intégration** : `createLog()` utilise maintenant le logger centralisé en plus de la base de données
* **Alertes automatiques** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Détection automatique** :
    * Tentatives de connexion échouées multiples (3+ dans 5 minutes) → Alerte medium/high
    * Accès non autorisés → Alerte high
    * Actions sensibles (restauration sauvegarde, purge, suppression utilisateur) → Alertes selon sévérité
  * **Types d'alertes** : FAILED_LOGIN_ATTEMPTS, UNAUTHORIZED_ACCESS, SENSITIVE_ACTION, etc.
  * **Sévérités** : low, medium, high, critical
  * **Stockage** : Table `Alert` dans la base de données avec statut de résolution
  * **Module** : `lib/alerts.ts` avec fonctions `createAlert()`, `checkFailedLoginAttempts()`, `alertUnauthorizedAccess()`, `alertSensitiveAction()`, `resolveAlert()`
  * **Intégration** : Login, backups, users
* **Dashboard de monitoring** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Page dédiée** : `/dashboard/monitoring` (Super Admin uniquement)
  * **Statistiques en temps réel** :
    * Alertes (total, non résolues, critiques, élevées, dernières 24h)
    * Logs (total, dernières 24h, 7 jours, tentatives échouées, actions sensibles)
    * Utilisateurs (total, actifs, verrouillés)
    * Sessions (actives)
  * **Affichage des alertes** : Liste avec badges de sévérité, bouton de résolution
  * **Actualisation automatique** : Toutes les 30 secondes
  * **Routes API** : `GET /api/alerts`, `GET /api/monitoring/stats`, `POST /api/alerts/[id]/resolve`

* **Journalisation des actions** : Toutes les actions importantes sont loggées
* **Informations de contexte** : IP, User-Agent, userId loggés
* **Rétention des logs** : Nettoyage automatique après 30 jours
* **Export des logs** : Export CSV disponible
* **Logs des tentatives de connexion** : Toutes les tentatives échouées sont loggées avec la raison

### 15.10 A10:2021 – Server-Side Request Forgery (SSRF)

* **API BAN** : URL fixe et validée (`https://api-adresse.data.gouv.fr`)
* **Pas d'URLs utilisateur** : Aucun endpoint ne fait de requêtes vers des URLs fournies par l'utilisateur
* **Validation de l'URL** : URL BAN hardcodée (whitelist)

### 15.11 Mesures de sécurité supplémentaires

* **Rate limiting** : Protection contre les attaques par force brute et DoS
  * Implémenté dans `lib/rate-limit.ts`
  * Système en mémoire (pour production, utiliser Redis)
  * Limite : 5 tentatives par IP toutes les 15 minutes
  * Application sur l'endpoint de login
* **Protection contre l'énumération d'utilisateurs** : Messages d'erreur génériques pour les tentatives de connexion échouées
* **Gestion sécurisée des mots de passe WiFi** : ✅ **AMÉLIORÉ** (2026-01-30)
  * **Vault sécurisé** : Chiffrement par entrée avec clé unique dérivée
  * **Algorithme** : AES-256-GCM (chiffrement authentifié)
  * **Dérivation de clé** : scrypt avec salt unique par mot de passe (N=16384, r=8, p=1)
  * **Contexte unique** : ID du WiFi AP utilisé dans la dérivation de clé
  * **Avantage** : Si une clé est compromise, les autres mots de passe restent sécurisés
  * **Migration automatique** : Les anciens mots de passe (AES-256-CBC) sont automatiquement migrés vers le nouveau format lors de la lecture
  * **Module** : `lib/wifi-vault.ts` avec fonctions complètes
  * **Script de migration** : `npm run migrate:wifi-passwords` pour migrer tous les mots de passe en masse

---

## 16. Architecture événementielle pour les statistiques

* **Système de mise à jour événementielle** :
  * Les statistiques d'agences dans le header sont mises à jour via un système d'événements personnalisés, sans polling automatique
  * **Événement personnalisé** : `agencyStatsRefresh` est dispatché sur l'objet `window` après chaque action CRUD sur une agence
  * **Actions déclenchant l'événement** :
    * Création d'une nouvelle agence (`handleCreateAgency`)
    * Modification d'une agence (`handleSaveAgency`) - notamment lors du changement d'état
    * Suppression d'une agence (`handleDeleteAgency`)
  * **Écoute de l'événement** : Le composant `AgencyStats` écoute l'événement `agencyStatsRefresh` et met à jour les statistiques en appelant l'API `/api/agencies`
  * **Chargement initial** : Les statistiques sont chargées une seule fois au montage du composant
  * **Pas de polling** : Aucun appel API automatique périodique (pas de `setInterval` ou `setTimeout` récurrent)
  * **Avantages** :
    * Réduction de la charge serveur (pas d'appels API inutiles)
    * Mise à jour en temps réel uniquement lorsque nécessaire
    * Meilleure performance et expérience utilisateur
  * **Implémentation technique** :
    * Utilisation de `window.addEventListener('agencyStatsRefresh', handleRefresh)` dans le composant `AgencyStats`
    * Utilisation de `window.dispatchEvent(new CustomEvent('agencyStatsRefresh'))` après chaque action CRUD
    * Nettoyage de l'écouteur lors du démontage du composant

---

## 17. Optimisations de performance React

### 17.1 Mémorisation des composants

* **Composants mémorisés** :
  * **Button** : Utilisation de `React.memo` pour éviter les re-renders inutiles
  * **Input** : Utilisation de `React.memo` et `useMemo` pour mémoriser le className calculé
* **Bénéfices** : Réduction significative des re-renders et amélioration de la réactivité de l'interface

### 17.2 Optimisation des handlers

* **Handlers mémorisés avec `useCallback`** :
  * Tous les handlers de clic (boutons, filtres, sélection d'agence) sont mémorisés avec `useCallback`
  * Handlers de recherche et de filtres mémorisés pour éviter les re-créations à chaque render
* **Handlers `onChange` optimisés** :
  * Utilisation de la forme fonctionnelle de `setState` : `setState((prev) => ({ ...prev, field: value }))`
  * Évite les dépendances dans les closures et améliore les performances lors de la saisie
* **Bénéfices** : Réduction de la latence lors de la saisie et des clics sur les boutons

### 17.3 Optimisation des polices

* **Configuration des polices Google** :
  * Désactivation du préchargement automatique (`preload: false`) pour éviter les warnings du navigateur
  * Utilisation de `display: 'swap'` pour améliorer les performances de chargement
* **Bénéfices** : Suppression des warnings de console et amélioration du temps de chargement initial

### 17.4 Optimisation des images

* **Gestion des images statiques** :
  * Utilisation de balises `<img>` standard pour les icônes statiques au lieu de `next/image`
  * Classes Tailwind `w-auto h-auto` pour maintenir le ratio d'aspect
  * Contraintes `max-w` et `max-h` pour limiter la taille sans affecter le ratio
* **Bénéfices** : Suppression des warnings de console concernant les ratios d'aspect et meilleure flexibilité CSS

---

## 18. Configuration 2FA obligatoire pour Super Admin

### 18.1 Flux de connexion

* **Connexion initiale** : Les Super Admin peuvent se connecter avec login/mot de passe même si le 2FA n'est pas activé
* **Création de session** : Une session est créée pour permettre l'accès à la page de configuration 2FA
* **Redirection automatique** : Après connexion réussie, si `requiresTwoFactorSetup: true`, redirection automatique vers `/dashboard/setup-2fa`

### 18.2 Page de configuration 2FA obligatoire

* **Route** : `/dashboard/setup-2fa`
* **Accès** : Accessible uniquement pour les Super Admin qui n'ont pas activé le 2FA
* **Layout spécial** : N'affiche pas la sidebar ni le header normal (layout dédié)
* **Fonctionnalités** :
  * Génération du QR Code 2FA
    * **Taille de génération** : QR Code généré à 600px de largeur avec marge de 2 et niveau de correction d'erreur 'M' (dans `lib/auth.ts`)
    * **Affichage responsive** : 
      * Desktop : 500px × 500px (taille fixe optimale pour le scan)
      * Mobile/Tablette : 85% de la largeur de la fenêtre (s'adapte automatiquement pour éviter le débordement)
      * Utilisation de `min(500px, 85vw)` pour garantir une taille suffisante tout en restant dans les limites de l'écran
    * **Conteneur** : Bordure arrondie avec fond blanc/gris foncé selon le thème, ombre portée pour améliorer la visibilité
  * Affichage du secret (pour saisie manuelle)
  * Saisie du code de vérification depuis Google Authenticator
  * Activation automatique du 2FA après validation
  * Redirection vers `/dashboard/agences` après activation réussie
* **Protection** : 
  * Vérification automatique que l'utilisateur est Super Admin
  * Redirection si le 2FA est déjà activé
  * Redirection si ce n'est pas un Super Admin

### 18.3 Composant de protection automatique

* **Composant** : `Require2FASetup` dans `components/require-2fa-setup.tsx`
* **Intégration** : Intégré dans le layout du dashboard (`app/dashboard/layout.tsx`)
* **Fonctionnement** :
  * Vérifie automatiquement si le Super Admin doit configurer le 2FA
  * Redirige vers `/dashboard/setup-2fa` si nécessaire
  * Ne vérifie pas sur la page de configuration elle-même (évite les boucles)
* **Vérification** : Appelle `/api/auth/me` pour vérifier `requiresTwoFactorSetup`

### 18.4 Routes API concernées

* **Routes de configuration 2FA** : `/api/users/[id]/2fa` (POST, PUT) - Accessibles sans vérification 2FA pour permettre la configuration initiale
* **Route de vérification** : `/api/auth/verify-2fa` (POST) - Accessible sans vérification 2FA
* **Autres routes Super Admin** : Toutes les autres routes nécessitant Super Admin vérifient que le 2FA est activé via `requireTwoFactorForSuperAdmin()`

---

## 19. Utilisation systématique de `apiFetch` pour la protection CSRF

### 19.1 Principe

* **Obligation** : Toutes les requêtes API côté client vers `/api/*` doivent utiliser `apiFetch` au lieu de `fetch` natif
* **Raison** : Garantir la protection CSRF automatique et la cohérence dans toute l'application

### 19.2 Fonctionnalités de `apiFetch`

* **Ajout automatique du token CSRF** :
  * Pour les requêtes modifiantes (POST, PUT, DELETE, PATCH) : ajout du token dans le header `x-csrf-token`
  * Pour FormData : ajout du token dans le FormData (`_csrf`) ET dans le header
  * Récupération automatique du token depuis `/api/auth/me` si non disponible
* **Gestion des credentials** : Inclusion automatique des cookies de session (`credentials: "include"`)
* **Retry automatique** : En cas d'erreur 403 CSRF, réessai automatique avec un nouveau token
* **Headers automatiques** : Configuration automatique de `Content-Type: application/json` pour les requêtes JSON

### 19.3 Fichiers concernés

* **Fichiers modifiés** :
  * `app/dashboard/parametres/page.tsx` : Tous les `fetch` remplacés par `apiFetch`
  * Tous les autres fichiers dans `app/dashboard/` doivent également utiliser `apiFetch`
* **Import requis** : `import { apiFetch } from "@/lib/api-client"`

### 19.4 Exceptions

* **Requêtes publiques** : Les requêtes vers `/api/auth/login` peuvent utiliser `skipCSRF: true` avec `apiFetch`
* **APIs externes** : Les requêtes vers des APIs externes (ex: BAN) peuvent utiliser `fetch` natif

---

## 20. Déploiement en Production

### 20.1 Environnement cible

* **Système d'exploitation** : Ubuntu Server LTS (20.04, 22.04 ou 24.04) uniquement
* **Node.js** : Version 18.x ou 20.x LTS
* **npm** : Version 9.x ou supérieure
* **Process Manager** : PM2 (recommandé)
* **Reverse Proxy** : Nginx (recommandé)
* **SSL/TLS** : Certificat SSL (Let's Encrypt recommandé)

### 20.2 Configuration requise

* **Variables d'environnement obligatoires** :
  * `DATABASE_URL` : URL de la base de données PostgreSQL (`postgresql://...`)
  * `ENCRYPTION_KEY` : Clé de chiffrement de 64 caractères hexadécimaux (générée avec `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
  * `NODE_ENV` : Doit être défini à `"production"`
  * `NEXT_PUBLIC_APP_URL` : URL publique de l'application (optionnel)
* **Sécurité** :
  * Le fichier `.env` ne doit jamais être commité dans Git
  * Permissions restrictives : `chmod 600 .env`
  * La clé de chiffrement ne doit jamais être partagée

### 20.3 Dépendances système

* **ClamAV** (recommandé) : Pour le scan antivirus des fichiers uploadés
  * Installation : `sudo apt install -y clamav clamav-daemon`
  * Mise à jour des définitions : `sudo freshclam`
  * Le système fonctionne avec un scan heuristique en fallback si ClamAV n'est pas disponible
* **PM2** : Pour la gestion du processus Node.js
  * Installation : `sudo npm install -g pm2`
  * Configuration : Fichier `ecosystem.config.js` à la racine du projet

### 20.4 Processus de déploiement

* **Script de déploiement** : `scripts/deploy.sh`
  * Automatise le processus de déploiement complet
  * Options disponibles :
    * `--no-pull` : Ne pas récupérer le code depuis Git
    * `--no-backup` : Ne pas créer de sauvegarde avant déploiement
  * Étapes automatiques :
    * Vérification des prérequis
    * Sauvegarde (si script `backup.sh` existe)
    * Récupération du code depuis Git (`git pull`)
    * Installation des dépendances (`npm install --production`)
    * Génération du client Prisma (`npx prisma generate`)
    * Application des migrations (`npx prisma migrate deploy`)
    * Build de l'application (`npm run build`)
    * Redémarrage PM2
* **Configuration PM2** : Fichier `ecosystem.config.js` fourni avec le projet
  * Nom de l'application : `abcliv-agency`
  * Port : 3000
  * Redémarrage automatique en cas d'erreur
  * Limite mémoire : 1 GB (redémarrage automatique si dépassée)

### 20.5 Mises à jour en production

* **Processus standard** :
  1. Sauvegarde obligatoire avant toute mise à jour (base de données, uploads, `.env`)
  2. Récupération du code depuis Git (`git pull origin main`)
  3. Installation des nouvelles dépendances (`npm install --production`)
  4. Génération Prisma si schéma modifié (`npx prisma generate`)
  5. Application des migrations (`npx prisma migrate deploy`)
  6. Rebuild de l'application (`npm run build`)
  7. Redémarrage de l'application (`pm2 restart abcliv-agency`)
  8. Vérification post-déploiement (logs, tests fonctionnels)
* **Script automatisé** : Utiliser `./scripts/deploy.sh` pour automatiser le processus
* **Rollback** : Procédure documentée dans `GUIDE_DEPLOIEMENT_PRODUCTION.md`
  * Restauration du code depuis un commit précédent
  * Restauration de la base de données depuis la sauvegarde
  * Rebuild et redémarrage

### 20.6 Documentation de déploiement

* **Guide complet** : `GUIDE_DEPLOIEMENT_PRODUCTION.md`
  * Étapes détaillées de déploiement initial
  * Configuration de Nginx comme reverse proxy
  * Configuration SSL/TLS avec Let's Encrypt
  * Configuration des tâches automatiques (sauvegardes, nettoyage)
  * Procédures de maintenance et de mise à jour
  * Dépannage et résolution de problèmes
* **Scripts fournis** :
  * `scripts/deploy.sh` : Script de déploiement automatisé
  * `scripts/backup.sh` : Script de sauvegarde (à créer selon les besoins)
  * `scripts/clean-quarantine.js` : Nettoyage automatique de la quarantaine
* **Configuration PM2** : `ecosystem.config.js` à la racine du projet

### 20.7 Tâches automatiques

* **Nettoyage de la quarantaine** :
  * Script : `npm run clean:quarantine`
  * Cron recommandé : Toutes les heures (`0 * * * *`)
* **Sauvegardes automatiques** :
  * Script de sauvegarde à créer selon les besoins (`scripts/backup.sh`)
  * Cron recommandé : Tous les jours à 2h du matin (`0 2 * * *`)
  * Rétention : 10 jours (conforme à la section 14)

### 20.8 Sécurité en production

* **Checklist de sécurité** :
  * Clé de chiffrement unique et sécurisée générée
  * Fichier `.env` avec permissions `600`
  * Mot de passe Admin changé après première connexion
  * SSL/TLS configuré et fonctionnel
  * Pare-feu configuré (ports 80, 443 uniquement)
  * ClamAV installé et mis à jour
  * Sauvegardes automatiques configurées
  * Logs surveillés régulièrement
  * Mises à jour système régulières
  * 2FA activé pour les utilisateurs administrateurs
* **Mises à jour régulières** :
  * Système Ubuntu : `sudo apt update && sudo apt upgrade -y`
  * Dépendances npm : `npm audit fix`
  * ClamAV : `sudo freshclam`

### 20.9 Monitoring et logs

* **Logs PM2** :
  * Fichiers : `logs/error.log` et `logs/out.log` (ou `/var/log/abcliv-agency/` selon configuration)
  * Commande : `pm2 logs abcliv-agency`
* **Logs Nginx** :
  * Accès : `/var/log/nginx/access.log`
  * Erreurs : `/var/log/nginx/error.log`
* **Logs centralisés de l'application** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Système Winston** : Logging structuré avec fichiers séparés
  * **Fichiers** :
    * `logs/combined.log` : Tous les logs (rotation automatique, 10 MB max, 5 fichiers)
    * `logs/error.log` : Uniquement les erreurs (rotation automatique, 10 MB max, 5 fichiers)
    * `logs/security.log` : Logs de sécurité (rotation automatique, 10 MB max, 10 fichiers)
  * **Format JSON** : Logs structurés pour analyse
  * **Support services externes** : Configuration optionnelle via variables d'environnement
  * **Documentation** : Guide complet dans `LOGGING_CENTRALISE.md`
* **Dashboard de monitoring** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Page** : `/dashboard/monitoring` (Super Admin uniquement)
  * **Statistiques en temps réel** : Alertes, logs, utilisateurs, sessions
  * **Affichage des alertes** : Liste avec résolution
  * **Actualisation automatique** : Toutes les 30 secondes
* **Alertes automatiques** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Détection** : Tentatives de connexion multiples, accès non autorisés, actions sensibles
  * **Stockage** : Table `Alert` dans la base de données
  * **Résolution** : Système de résolution avec suivi
  * **Documentation** : Intégré dans le dashboard de monitoring
* **Monitoring PM2** :
  * Statut PM2 : `pm2 status`
  * Monitoring en temps réel : `pm2 monit`
  * Utilisation des ressources : `pm2 list`

---

## 21. Clause finale (bloquante)

❗ **Toute implémentation qui dépasse ce PRD est NON CONFORME.**

❗ **Toute ambiguïté doit bloquer l'IA et déclencher une question humaine.**

---

**Dernière mise à jour** : 2026-02-21

---

## 22. Fonctionnalités de sécurité avancées (2026-01-30)

### 22.1 Système d'alertes automatiques

* **Détection automatique** :
  * Tentatives de connexion échouées multiples (3+ dans 5 minutes) → Alerte medium/high
  * Accès non autorisés → Alerte high
  * Actions sensibles (restauration sauvegarde, purge, suppression utilisateur) → Alertes selon sévérité
* **Types d'alertes** : FAILED_LOGIN_ATTEMPTS, UNAUTHORIZED_ACCESS, SENSITIVE_ACTION, etc.
* **Sévérités** : low, medium, high, critical
* **Stockage** : Table `Alert` dans la base de données avec statut de résolution
* **Module** : `lib/alerts.ts` avec fonctions complètes
* **Intégration** : Login, backups, users
* **Routes API** : `GET /api/alerts`, `POST /api/alerts/[id]/resolve`

### 22.2 Dashboard de monitoring

* **Onglet dans Paramètres** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Accès** : Onglet "Monitoring" dans la page `/dashboard/parametres` (Super Admin uniquement)
  * **Navigation** : Accessible via le sidebar dans la section Paramètres, sous l'onglet Logs
  * **Statistiques en temps réel** :
    * Alertes (total, non résolues, critiques, élevées, dernières 24h)
    * Logs (total, dernières 24h, 7 jours, tentatives échouées, actions sensibles)
    * Utilisateurs (total, actifs, verrouillés, désactivés)
    * Sessions (actives)
  * **Affichage des alertes** : Liste avec badges de sévérité, bouton de résolution
  * **Actualisation automatique** : Toutes les 30 secondes
  * **Bouton d'actualisation** : Bouton manuel pour forcer le rafraîchissement
  * **Routes API** : `GET /api/monitoring/stats`, `GET /api/alerts`, `POST /api/alerts/[id]/resolve`
* **Page dédiée** : `/dashboard/monitoring` (Super Admin uniquement) - **Déprécié, utiliser l'onglet dans Paramètres**

### 22.3 Système de logging centralisé

* **Système Winston** : Logging structuré avec fichiers séparés
* **Fichiers de log** :
  * `logs/combined.log` : Tous les logs (rotation automatique, 10 MB max, 5 fichiers)
  * `logs/error.log` : Uniquement les erreurs (rotation automatique, 10 MB max, 5 fichiers)
  * `logs/security.log` : Logs de sécurité (rotation automatique, 10 MB max, 10 fichiers)
* **Format JSON structuré** : Logs avec métadonnées (timestamp, niveau, service, environnement, contexte)
* **Format console** : Logs colorisés et formatés pour le développement
* **Niveaux de log** : error, warn, info, debug
* **Support services externes** : Configuration optionnelle pour CloudWatch, ELK, Splunk
* **Module** : `lib/logger.ts` avec fonctions `logError()`, `logWarning()`, `logInfo()`, `logDebug()`, `logSecurity()`
* **Intégration** : `createLog()` utilise maintenant le logger centralisé en plus de la base de données
* **Documentation** : Guide complet dans `LOGGING_CENTRALISE.md`

### 22.4 Vault sécurisé pour mots de passe WiFi

* **Chiffrement par entrée** : Chaque mot de passe WiFi a sa propre clé dérivée
* **Algorithme** : AES-256-GCM (chiffrement authentifié)
* **Dérivation de clé** : scrypt avec salt unique par mot de passe (N=16384, r=8, p=1)
* **Contexte unique** : ID du WiFi AP utilisé dans la dérivation de clé
* **Avantage** : Si une clé est compromise, les autres mots de passe restent sécurisés
* **Format** : `salt:iv:tag:encrypted` (tous en hex)
* **Migration automatique** : Les anciens mots de passe (AES-256-CBC) sont automatiquement migrés vers le nouveau format lors de la lecture
* **Module** : `lib/wifi-vault.ts` avec fonctions `encryptWifiPassword()`, `decryptWifiPassword()`, `isVaultFormat()`, `migrateOldPassword()`
* **Script de migration** : `npm run migrate:wifi-passwords` pour migrer tous les mots de passe en masse
* **Documentation** : Guide complet dans `VAULT_WIFI.md`

### 22.5 Validation d'intégrité des sauvegardes

* **Checksums SHA-256** : Calcul et vérification automatiques pour chaque sauvegarde
* **Stockage** : Checksums sauvegardés dans des fichiers `.sha256` (format standard)
* **Vérification automatique** : Avant chaque restauration de sauvegarde
* **Rejet des sauvegardes corrompues** : Impossible de restaurer une sauvegarde avec checksum invalide
* **Interface utilisateur** : Indicateurs visuels (✅ valide, ❌ corrompue, ⚠️ inconnue)
* **Nettoyage automatique** : Suppression des checksums orphelins
* **Module** : `lib/backup-integrity.ts` avec fonctions complètes

### 22.6 Scan de vulnérabilités automatisé

* **Dependabot** : Configuration dans `.github/dependabot.yml`
  * Scan automatique hebdomadaire (tous les lundis à 9h00 UTC)
  * Alertes de sécurité automatiques
  * Pull requests automatiques pour les corrections
  * Groupement des mises à jour (production/dev)
  * Limite de 10 PRs ouvertes simultanément
* **GitHub Actions** : Workflow automatisé dans `.github/workflows/security-audit.yml`
  * Exécution de `npm audit` sur chaque PR et push vers `main`
  * Scan hebdomadaire automatique
  * Rapports JSON téléchargeables
  * Commentaires automatiques sur les PRs
* **Scripts npm** : Commandes disponibles
  * `npm run audit` : Scan complet
  * `npm run audit:fix` : Correction automatique
  * `npm run audit:production` : Scan des dépendances de production
  * `npm run audit:json` : Génération de rapport JSON
* **Documentation** : Guide complet dans `SECURITY_SCAN.md`

### 22.7 Timeout sur requêtes externes

* **Timeout de 5 secondes** : Protection contre les API externes lentes
* **AbortController** : Annulation propre des requêtes expirées
* **Gestion d'erreurs** : Messages d'erreur clairs (code HTTP 504 Gateway Timeout)
* **Validation de réponse** : Vérification basique de la structure de la réponse
* **Implémentation** : `app/api/ban/search/route.ts` avec fonction `fetchWithTimeout()`
* **Protection DoS** : Empêche les attaques par déni de service via API externe

### 22.8 Politique de mots de passe forts

* **Validation stricte** : Minimum 12 caractères
* **Exigences** : Au moins une majuscule, une minuscule, un chiffre, un caractère spécial
* **Messages d'erreur détaillés** : Guide l'utilisateur pour créer un mot de passe conforme
* **Validation** : Côté serveur (Zod) et affichage côté client
* **Schémas** : `createUserSchema`, `updateUserSchema`, `updateProfileSchema` dans `lib/validations/user.ts`
* **Fonction de validation** : `validatePasswordStrength()` dans `lib/auth.ts`

---

## 23. Améliorations récentes (2026-01-30)

### 23.1 Alerte de fermeture de session

* **Alerte 30 secondes avant expiration** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Affichage automatique** : Dialog d'alerte affiché automatiquement 30 secondes avant la déconnexion automatique
  * **Compte à rebours en temps réel** : Affichage du nombre de secondes restantes (30, 29, 28...)
  * **Prolongation de session** : Bouton "Prolonger la session" pour réinitialiser le timer d'inactivité
  * **Fermeture du dialog** : Fermer le dialog (touche Escape ou clic à l'extérieur) prolonge automatiquement la session
  * **Interface utilisateur** : Dialog avec icône d'alerte, message clair et bouton d'action
  * **Composant** : `components/session-timeout.tsx` avec gestion des timers multiples

### 23.2 Suppression individuelle des sauvegardes

* **Bouton de suppression** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Emplacement** : Bouton "Supprimer" à côté du bouton "Restaurer" pour chaque sauvegarde dans l'onglet Sauvegardes
  * **Confirmation** : Dialog de confirmation avec détails de la sauvegarde (nom, date, taille)
  * **Sécurité** :
    * Protection path traversal
    * Vérification du format de fichier (doit commencer par "backup-" et se terminer par ".encrypted.zip", ".zip" ou ".db")
    * Vérification que le 2FA est activé pour les Super Admin
  * **Nettoyage automatique** : Suppression du fichier de checksum associé (`.sha256`) si présent
  * **Logging** : Action journalisée avec le nom du fichier supprimé
  * **Alerte de sécurité** : Alerte créée pour action sensible
  * **API** : `DELETE /api/backups/[filename]`

### 23.3 Intégration du Monitoring dans Paramètres

* **Onglet Monitoring** : ✅ **IMPLÉMENTÉ** (2026-01-30)
  * **Emplacement** : Onglet "Monitoring" dans la page `/dashboard/parametres`
  * **Navigation** : Accessible via le sidebar dans la section Paramètres, sous l'onglet Logs
  * **Fonctionnalités** : Identiques à la page dédiée `/dashboard/monitoring` (statistiques, alertes, résolution)
  * **Avantage** : Centralisation de toutes les fonctionnalités d'administration dans une seule page

### 23.4 Page Calendrier (2026-02-21)

* **Page Calendrier** : ✅ **IMPLÉMENTÉ** (2026-02-21)
  * **Route** : `/dashboard/calendrier`, lien dans la sidebar (icône Calendar)
  * **Design** : Inspiré de Google Agenda (sidebar gauche + zone principale, quatre vues)
  * **Sidebar** : Bouton « + Créer » (lien agences), mini-calendrier, recherche, filtre « Afficher les clôturées » ; sidebar repliable
  * **Vues** : Mois (grille LUN–DIM), Semaine (créneaux horaires + jour entier), Jour (un jour + grille horaire), Planning (liste chronologique sur 6 mois)
  * **API** : `GET /api/tasks?from=&to=` pour le chargement des tâches par plage de dates
  * **Accès** : Tous les utilisateurs connectés

---

## 24. Industrialisation sécurité/qualité (2026-03-21)

### 24.1 Chaîne qualité CI et gouvernance PR

* **Workflow CI** : `.github/workflows/ci.yml`
  * Exécute `npm ci`, génération Prisma, préparation DB de test PostgreSQL, `npm run lint`, `npm run test`, `npm run build`
* **Template PR** : `.github/pull_request_template.md` (résumé, plan de test, checklist sécurité, risques, rollback)
* **Objectif** : rendre les contrôles qualité/sécurité systématiques avant merge

### 24.2 Résilience backups et hygiène secrets

* **Drill de restauration** : script `npm run backup:drill` (`scripts/backup-drill.ts`) pour vérifier la restaurabilité d'une sauvegarde chiffrée
* **Santé secrets** : script `npm run secrets:check` (`scripts/check-secrets-health.ts`) pour valider présence/longueur de clé et suivi de rotation
* **Automatisation mensuelle** : `.github/workflows/backup-drill.yml`

### 24.3 Durcissement auth/session/CSRF

* **Lockout alerting** : alerte `ACCOUNT_LOCKED` lors de verrouillage compte après échecs login/2FA
* **CSRF étendu** : routes API mutatives protégées (`requireCSRF()` ou validation équivalente), avec exception contrôlée pour `POST /api/auth/login`
* **Logs API** : suppression des logs verbeux sensibles pour limiter l'exposition d'informations

### 24.4 Campagnes e2e critiques

* **Suite critique sécurité** : `npm run test:e2e:critical`
* **Suite mobile UX/perf** : `npm run test:e2e:mobile:perf`
* **But** : détecter rapidement les régressions sur parcours à fort impact (auth, redirections, feedback erreur, garde-fous mobile)

### 24.5 Gouvernance technique et audit interne

* **Source de vérité architecture** : `ARCHITECTURE_SOURCE_OF_TRUTH.md`
* **Registre ADR** : `ADR_INDEX.md` + ADR initiales (`ADR-0001`, `ADR-0002`)
* **Mini-audit OWASP interne** : `npm run security:audit:mini`
  * Rapport généré : `reports/SECURITY_MINI_AUDIT.md`
  * Statut actuel : **0 HIGH / 0 MEDIUM / 0 LOW**
