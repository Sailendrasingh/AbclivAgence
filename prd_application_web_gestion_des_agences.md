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

* Framework : **Next.js – App Router**
* Langage : **TypeScript obligatoire**
* UI : **shadcn/ui**

  * Thème clair et sombre fournis par shadcn/ui
* CSS : Tailwind CSS
* Base de données : SQLite
* ORM : **Prisma (obligatoire)**
* API externe autorisée : **BAN uniquement**

Aucune autre technologie n'est autorisée.

### 3.0 Dépendances autorisées

Les dépendances suivantes sont autorisées et utilisées dans le projet :

#### Dépendances principales (dependencies)

* **@prisma/client** (^5.19.0) : Client Prisma pour l'accès à la base de données
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
* **next** (^14.2.0) : Framework Next.js
* **otpauth** (^9.3.2) : Bibliothèque pour la génération de TOTP (Time-based One-Time Password) pour l'authentification à deux facteurs (2FA)
* **prisma** (^5.19.0) : ORM Prisma
* **qrcode** (^1.5.3) : Bibliothèque de génération de codes QR (utilisée pour afficher le QR code de l'authentification à deux facteurs)
* **react** (^18.3.0) : Bibliothèque React
* **react-dom** (^18.3.0) : Bibliothèque React DOM
* **tailwind-merge** (^2.5.0) : Utilitaire pour fusionner intelligemment les classes Tailwind CSS (utilisé par shadcn/ui)
* **tailwindcss-animate** (^1.0.7) : Plugin Tailwind CSS pour les animations (utilisé par shadcn/ui)
* **validator** (^13.11.0) : Bibliothèque de validation de données (utilisée pour valider les adresses email selon la norme RFC)
* **yauzl** (^3.2.0) : Bibliothèque légère pour lire les archives ZIP (utilisée pour la restauration de sauvegardes)

#### Dépendances de développement (devDependencies)

* **@types/archiver** (^7.0.0) : Types TypeScript pour archiver
* **@types/node** (^20.14.0) : Types TypeScript pour Node.js
* **@types/qrcode** (^1.5.5) : Types TypeScript pour qrcode
* **@types/react** (^18.3.0) : Types TypeScript pour React
* **@types/react-dom** (^18.3.0) : Types TypeScript pour React DOM
* **@types/uuid** (^10.0.0) : Types TypeScript pour uuid (si utilisé)
* **@types/validator** (^13.15.10) : Types TypeScript pour validator
* **@types/yauzl** (^2.10.3) : Types TypeScript pour yauzl
* **autoprefixer** (^10.4.19) : Plugin PostCSS pour ajouter automatiquement les préfixes vendeurs CSS
* **eslint** (^8.57.0) : Linter JavaScript/TypeScript
* **eslint-config-next** (^14.2.0) : Configuration ESLint pour Next.js
* **postcss** (^8.4.38) : Outil de transformation CSS
* **tailwindcss** (^3.4.4) : Framework CSS utility-first
* **tsx** (^4.21.0) : Exécuteur TypeScript pour les scripts (utilisé pour exécuter les scripts de migration et d'initialisation)
* **typescript** (^5.5.0) : Compilateur TypeScript

---

## 3.1 Système de thèmes (clair / sombre)

* **Activation** : Mode dark via classe `dark` sur `<html>` (géré par `ThemeToggle`)
* **Configuration Tailwind** : `darkMode: ["class"]`
* **Implémentation** : Variables CSS HSL dans `globals.css`
* **Thème clair** :
  * Ambiance administrative claire
  * Couleur principale : **Orange** (HSL: 25 95% 50%)
  * Dégradé de marque : Orange → Blanc
  * Surfaces très lisibles (fonds blancs / très clairs)
  * Tokens avec teintes orange subtiles
* **Thème sombre** :
  * Ambiance aérée et moderne avec **Bleu ciel sombre** (Dark Sky Blue)
  * Couleur principale : **Bleu ciel** (HSL: 200 70% 60%)
  * Fonds : Bleu ciel très foncé (HSL: 200 30% 11%)
  * Surfaces : Bleu ciel foncé (HSL: 200 30% 13%)
  * Dégradé de marque : Bleu ciel → Bleu ciel foncé
  * Fonds sombres avec contrastes accessibles et tons bleu-gris perle
* **Fonctionnalités avancées** :
  * **Script inline dans `<head>`** : Évite le FOUC (Flash of Unstyled Content) en appliquant le thème avant le rendu
  * **Persistance localStorage** : Sauvegarde de la préférence utilisateur avec gestion d'erreurs (mode privé, etc.)
  * **Détection préférence système** : Fallback automatique sur `prefers-color-scheme` si aucune préférence stockée
  * **Synchronisation temps réel** : Écoute des changements de préférence système et mise à jour automatique (si aucune préférence stockée)
  * **Transitions CSS** : Transitions douces (200ms) entre les thèmes avec respect de `prefers-reduced-motion`
  * **Gestion d'hydratation React** : Évite les flashes pendant l'hydratation avec état `mounted`
  * **Accessibilité** : Support des navigateurs plus anciens avec fallback `addListener`/`removeListener`, `aria-label` sur le bouton
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
  * `.brand-gradient` : Dégradé de marque (orange→blanc / bleu ciel→bleu ciel foncé)
* **Adaptation des composants** :
  * **Vignettes de photos** : Utilisation de `dark:bg-secondary` (HSL: 200 25% 20%) pour distinguer du fond de l'onglet Photos (`background` à 11% de luminosité)
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
    * **Bouton Retour** : Un bouton "Retour" (icône `ArrowLeft`) est affiché dans l'en-tête des Détails sur mobile pour revenir au Master
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
    * **Partie fixe (non scrollable)** : Titre "Agences", bouton "Ajouter", champ de recherche et filtres d'état
    * **Partie scrollable** : Liste des agences avec ascenseur vertical qui commence à partir du premier agence
  * Liste agences avec nom et état
  * **Tri automatique** : Les agences sont triées par nom (ordre alphabétique) dans la zone Master
  * **Boutons d'action par agence** :
    * Bouton Modifier (icône Edit, couleur bleue) - à droite du nom
      * Visible pour les utilisateurs avec les rôles **Admin** ou **Super Admin**
    * Bouton Supprimer (icône Trash2, couleur rouge) - à droite du nom
      * Visible uniquement pour les utilisateurs avec le rôle **Super Admin**
    * Les boutons sont représentés par des pictogrammes appropriés et en couleur
  * **Ascenseur vertical** : L'ascenseur vertical est uniquement dans la partie scrollable (liste des agences), la partie fixe (titre, recherche, filtres) reste toujours visible
  * **Mode édition** : Le mode édition d'une agence ne peut être activé **que** depuis le bouton Modifier du Master
* **Zone Détails** :
  * **Structure en trois parties** :
    * **Partie fixe 1 (non scrollable)** : En-tête avec nom de l'agence, état, bouton Historique (Super Admin), boutons Annuler/Enregistrer (mode édition)
    * **Partie fixe 2 (non scrollable)** : Onglets (Général, Technique, Photos)
    * **Partie scrollable** : Contenu des onglets avec ascenseur vertical qui commence en dessous des onglets
  * Données agence organisées en onglets (Général, Technique, Photos)
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
  * **Ascenseur vertical** : L'ascenseur vertical est uniquement dans la partie scrollable (contenu des onglets), les parties fixes (en-tête et onglets) restent toujours visibles
  * **Conservation de l'onglet actif** : Lors du changement de sélection d'agence dans le Master, l'onglet actif (Général, Technique ou Photos) est conservé pour la nouvelle agence sélectionnée
  * **Boutons Annuler/Enregistrer** :
    * Positionnés au niveau du nom de l'agence, à droite
    * Visibles uniquement en mode édition
* **Menu vertical à gauche (Sidebar)** :
  * **Logo** :
    * Affichage du logo `logo.png` en haut et centré
    * Fond gris (`bg-gray-600`) en thème clair uniquement
    * Fond transparent en thème sombre
    * Largeur du fond identique à celle des boutons de menu
    * Logo centré à l'intérieur du fond
  * **Titre** : "Gestion Agences" affiché sous le logo, centré
  * Liste des menus de navigation avec icônes :
    * **Agences** : Icône Building2
    * **Utilisateurs** : Icône Users (visible uniquement pour Super Admin)
    * **Logs** : Icône FileText (visible uniquement pour Super Admin)
    * **Sauvegardes** : Icône HardDrive (visible uniquement pour Super Admin)
    * **Paramètres** : Icône Settings (visible uniquement pour Super Admin)
  * **Section utilisateur en bas** :
    * Nom de l'utilisateur (login) affiché
    * Bouton "Mon profil" (icône User) - lien vers `/dashboard/profil`
    * Bouton "Déconnexion" (icône LogOut)
  * En mobile : menu Burger
* **Mode clair / sombre** : Toggle disponible dans le header (voir section 3.1)
* **Boutons CRUD conditionnels** :
  * Tous les boutons "Ajouter", "Modifier", "Supprimer" dans tous les onglets (Général, Technique, Photos) ne sont visibles **que si le mode édition est activé** (après clic sur Modifier du Master)
* **Restrictions d'accès par rôle** :
  * **Menu de navigation** :
    * Boutons "Utilisateurs", "Logs" et "Sauvegardes" : Visibles uniquement pour les utilisateurs avec le rôle **Super Admin**
    * Bouton "Agences" : Visible pour tous les utilisateurs
  * **Gestion des agences** :
    * Bouton "Ajouter une agence" : Disponible uniquement pour les utilisateurs avec les rôles **Admin** ou **Super Admin**
    * Bouton "Modifier" d'une agence : Disponible pour les utilisateurs avec les rôles **Admin** ou **Super Admin**
    * Bouton "Supprimer" d'une agence : Disponible **uniquement** pour les utilisateurs avec le rôle **Super Admin**
    * Les utilisateurs avec le rôle **User** ne peuvent que consulter les agences (pas de création, modification ou suppression)
    * Les utilisateurs avec le rôle **Admin** peuvent créer et modifier des agences, mais ne peuvent pas les supprimer

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
  * Stockage : `null` si non renseigné
* **Gestion de l'ordre d'affichage** :
  * Champ `order` (Int) dans le modèle Contact pour définir l'ordre d'affichage
  * **Tri automatique** : Les contacts sont affichés triés par ordre croissant (`order` ASC)
  * **Réordonnancement** : En mode édition, boutons "Monter" (↑) et "Descendre" (↓) pour chaque contact
    * Boutons visibles uniquement en mode édition de l'agence
    * Bouton "Monter" désactivé pour le premier contact
    * Bouton "Descendre" désactivé pour le dernier contact
    * Échange des valeurs `order` entre deux contacts adjacents lors du déplacement
  * **Initialisation** : Lors de la création d'un nouveau contact, l'ordre est automatiquement défini à `max(order) + 1` pour l'agence
  * **Stockage** : Valeur par défaut `0` si non spécifiée
  * **Migration des contacts existants** : Un script de migration (`npm run migrate:contacts-order`) permet d'initialiser le champ `order` pour tous les contacts existants en se basant sur leur date de création (`createdAt`)
* **Gestion d'erreurs** : Messages d'erreur explicites retournés par l'API en cas de validation échouée

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
* Fichiers - **OPTIONNEL** (JSON array de chemins)
* Photos - **OPTIONNEL** (JSON array de chemins)
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

### 8.1 Affichage et navigation des photos

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
* **Validation de la taille des fichiers** :
  * **Taille maximale** : 5 MB par fichier
  * **Validation côté client** : Vérification immédiate lors de la sélection des fichiers
  * **Message d'erreur en français** : Si un fichier dépasse 5 MB, un message d'erreur en français est affiché indiquant que la taille maximale autorisée est de 5 MB par fichier
  * **Double vérification** : Vérification supplémentaire avant l'upload pour empêcher l'envoi de fichiers trop volumineux

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
* Taille max fichier : **5 MB**
* Types autorisés :

  * Photos : jpeg, png
  * Fichiers : jpeg, png

Aucun autre type autorisé.
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

* Champ de recherche global (header)
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
* **Vérification du mot de passe** : Validation du mot de passe avec argon2
* **Gestion du 2FA** :
  * Si l'utilisateur a le 2FA activé (`twoFactorEnabled = true`), l'API retourne `{ needsTwoFactor: true }` avec un status 200
  * Le formulaire de connexion affiche automatiquement un champ "Code 2FA" lorsque `needsTwoFactor` est détecté
  * L'utilisateur doit saisir le code à 6 chiffres depuis Google Authenticator
  * Le code est validé côté serveur avant de créer la session
  * Si le code est incorrect, un message d'erreur est affiché et l'utilisateur peut réessayer
* **Création de session** : La session n'est créée qu'après validation complète (mot de passe + code 2FA si activé)

### 11.2 Utilisateurs

* **Interface CRUD complète** : Page dédiée `/dashboard/utilisateurs` avec liste des utilisateurs
* **Créer** : Bouton "Nouvel utilisateur" avec formulaire (login, mot de passe, rôle, statut actif)
* **Modifier** : Bouton "Modifier" sur chaque utilisateur permettant de modifier login, mot de passe (optionnel), rôle et statut actif
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
* **Affichage** : Liste des utilisateurs avec login, rôle, statut actif et état 2FA

### 11.2.1 Mon profil

* **Page dédiée** : `/dashboard/profil` accessible depuis le bouton "Mon profil" dans la barre latérale
* **Fonctionnalités** :
  * Affichage du rôle (lecture seule)
  * Modification du login
  * Modification du mot de passe (optionnel, avec confirmation)
  * Messages d'erreur et de succès
* **API route** : `/api/auth/profile` (PUT) - Permet à un utilisateur de modifier son propre profil
* **Sécurité** : Chaque utilisateur ne peut modifier que son propre profil (vérification de session)

### 11.3 Sécurité obligatoire

* Hash mot de passe : **argon2**
* 2FA : **Google Authenticator uniquement**

  * QR Code affiché (format data URL complet retourné par `qrcode.toDataURL()`)
  * Secret affiché (format base32)
  * Librairie QR Code autorisée : `qrcode` (npm)
* Protection CSRF / XSS
* Validation stricte des entrées
* **Conformité OWASP Top 10 2021** : Voir section 16 pour les détails complets des mesures de sécurité implémentées

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
  * **Chargement dynamique** : La durée de session est chargée dynamiquement depuis l'API `/api/settings` au démarrage de l'application via le composant `SessionTimeoutWrapper`
  * **Application globale** : Le système de timeout est actif sur toutes les pages du dashboard grâce à l'intégration dans `DashboardLayout`

### 11.5 Paramètres de l'application

* **Page Paramètres** : `/dashboard/parametres` (accessible uniquement aux Super Admin)
* **Accès** : Bouton "Paramètres" dans la barre latérale (icône Settings), visible uniquement pour les utilisateurs avec le rôle **Super Admin**
* **Vérification d'accès** : Si un utilisateur non-Super Admin tente d'accéder à la page, un message "Accès refusé. Cette page est réservée aux Super Admin." est affiché
* **Paramètres disponibles** :
  * **Durée de session** :
    * Champ de saisie numérique pour définir la durée d'inactivité avant déconnexion automatique (en minutes)
    * **Valeur minimale** : 1 minute
    * **Valeur par défaut** : 1 minute (60 secondes)
    * **Validation** : Validation côté client et serveur pour s'assurer que la valeur est un nombre positif d'au moins 1 minute
    * **Enregistrement** : Les paramètres sont sauvegardés dans la base de données (modèle `AppSettings`)
    * **Application immédiate** : La nouvelle durée de session est appliquée immédiatement après enregistrement pour tous les utilisateurs connectés via le composant `SessionTimeoutWrapper` qui recharge la durée depuis l'API
* **API Routes** :
  * **GET `/api/settings`** : Récupère les paramètres de l'application
    * Vérification du rôle Super Admin
    * Création automatique des paramètres par défaut si ils n'existent pas
  * **PUT `/api/settings`** : Met à jour les paramètres de l'application
    * Vérification du rôle Super Admin
    * Validation de la durée de session (nombre positif, minimum 1 minute)
    * Utilisation de `upsert` pour créer ou mettre à jour les paramètres
* **Modèle de données** :
  * **Table `AppSettings`** : Stockage des paramètres de l'application
    * `id` : String (clé primaire, valeur fixe `"settings"`)
    * `sessionTimeout` : Int (durée en minutes, défaut: 60)
    * `updatedAt` : DateTime (date de dernière mise à jour)
* **Initialisation** : Un script d'initialisation (`npm run init:settings`) permet de créer les paramètres par défaut si ils n'existent pas
* **Composants techniques** :
  * `SessionTimeout` : Composant React qui gère le timeout d'inactivité côté client
  * `SessionTimeoutWrapper` : Wrapper qui charge la durée de session depuis l'API et l'applique au composant `SessionTimeout`
  * Intégration dans `DashboardLayout` pour être actif sur toutes les pages du dashboard

### 11.6 Contrôle d'accès basé sur les rôles (RBAC)

* **Rôles disponibles** :
  * **Super Admin** : Accès complet à toutes les fonctionnalités (création, modification et suppression d'agences, gestion des utilisateurs, logs, sauvegardes)
  * **Admin** : Peut créer et modifier des agences, mais ne peut pas les supprimer
  * **User** : Accès en lecture seule aux agences (consultation uniquement, pas de création, modification ou suppression)
* **Restrictions d'interface** :
  * Les éléments de menu et boutons sont masqués selon le rôle de l'utilisateur
  * Récupération du rôle via l'API `/api/auth/me` au chargement des composants
* **Menu de navigation** :
  * **Super Admin** : Accès à tous les menus (Agences, Utilisateurs, Logs, Sauvegardes, Paramètres)
  * **Admin** et **User** : Accès uniquement au menu "Agences"
* **Gestion des agences** :
  * **Super Admin** :
    * Peut créer de nouvelles agences (bouton "Ajouter" visible)
    * Peut modifier des agences (bouton "Modifier" visible)
    * Peut supprimer des agences (bouton "Supprimer" visible)
  * **Admin** :
    * Peut créer de nouvelles agences (bouton "Ajouter" visible)
    * Peut modifier des agences (bouton "Modifier" visible)
    * Ne peut pas supprimer des agences (bouton "Supprimer" masqué)
  * **User** :
    * Ne peut pas créer d'agences (bouton "Ajouter" masqué)
    * Ne peut pas modifier d'agences (bouton "Modifier" masqué)
    * Ne peut pas supprimer d'agences (bouton "Supprimer" masqué)
    * Accès en consultation seule

---

## 12. Logs

* Logs de connexion
* Logs actions utilisateur
* Stockage : SQLite
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
    * Bouton "Restaurer" pour chaque version avec confirmation
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
  * Format du nom de fichier : `backup-YYYY-MM-DDTHH-mm-ss-sssZ.zip` (timestamp ISO)
  * **Format de sauvegarde** : Archive ZIP compressée contenant :
    * La base de données SQLite complète (`prisma/dev.db`)
    * Le dossier `/uploads` complet avec toutes les photos et fichiers uploadés
  * **Compression** : Niveau de compression maximal (zlib level 9) pour optimiser l'espace disque
  * **Rétrocompatibilité** : Les anciennes sauvegardes au format `.db` (base de données uniquement) peuvent toujours être restaurées, mais les nouvelles sauvegardes sont au format `.zip`
* **Dossier de stockage** : **/backups** (racine projet)
  * Création automatique du dossier si inexistant
  * Stockage filesystem uniquement
* **Rétention** : **10 jours**
  * Nettoyage automatique : Les sauvegardes de plus de 10 jours sont automatiquement supprimées lors de chaque sauvegarde
  * Calcul basé sur la date de modification du fichier (`mtime`)
  * Les anciennes sauvegardes `.db` et les nouvelles sauvegardes `.zip` sont toutes nettoyées selon cette règle
  * **Restauration complète possible** :
    * **Interface de restauration** : Page `/dashboard/sauvegardes` accessible uniquement aux utilisateurs avec le rôle **Super Admin**
    * **Fonctionnalités requises** :
      * Liste des sauvegardes disponibles avec date, heure et taille
      * Bouton de restauration pour chaque sauvegarde
      * Confirmation avant restauration (action irréversible)
      * **Restauration complète** :
        * Pour les sauvegardes `.zip` : Extraction complète de l'archive (base de données + dossier uploads)
          * **Bibliothèque d'extraction** : `yauzl` (bibliothèque légère sans dépendances externes)
          * La base de données est restaurée dans `prisma/dev.db`
          * Le dossier `/uploads` est remplacé par celui de la sauvegarde
          * Une sauvegarde de l'état actuel est créée automatiquement avant la restauration
          * **Sécurité** : Protection contre les chemins malformés (chemins avec `..`, chemins absolus) - ces entrées sont ignorées lors de l'extraction
          * **Gestion d'erreurs** : Les erreurs individuelles lors de l'extraction sont loggées sans interrompre le processus complet, permettant la restauration partielle en cas de problème sur certains fichiers
        * Pour les anciennes sauvegardes `.db` (rétrocompatibilité) : Restauration uniquement de la base de données
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
  * **À implémenter** : Configuration d'un cron job ou scheduler pour exécuter automatiquement la sauvegarde quotidienne
  * **Commande manuelle** : `npm run backup` pour créer une sauvegarde manuelle
* **Accès** :
  * Menu "Sauvegardes" dans la barre latérale : Visible uniquement pour les utilisateurs avec le rôle **Super Admin**
  * Icône : HardDrive

---

## 16. Conformité OWASP Top 10 2021

L'application doit être conforme aux standards de sécurité OWASP Top 10 2021. Les mesures suivantes sont **obligatoires** et **implémentées** :

### 16.1 A01:2021 – Broken Access Control

* **Vérification de session** : Toutes les routes API vérifient la session via `getSession()`
* **Contrôle d'accès basé sur les rôles (RBAC)** : Implémenté avec vérification des rôles (Super Admin, Admin, User)
* **Vérification des permissions** : Les actions sensibles vérifient le rôle (ex: historique, sauvegardes)
* **Protection des routes** : Middleware protège les routes `/dashboard` et `/api`
* **Protection path traversal** : Validation stricte des chemins de fichiers pour éviter l'accès non autorisé aux fichiers système
  * Dans `app/api/files/[...path]/route.ts` : Vérification que le chemin résolu est bien dans le dossier `uploads/`
  * Utilisation de `resolve()` pour normaliser les chemins et détecter les tentatives de path traversal
* **Rate limiting** : Système de limitation du nombre de tentatives par IP
  * Limite : 5 tentatives par IP toutes les 15 minutes
  * Implémenté dans `lib/rate-limit.ts`
  * Application sur l'endpoint de login (`/api/auth/login`)

### 16.2 A02:2021 – Cryptographic Failures

* **Hachage des mots de passe** : Utilisation d'**argon2** (algorithme moderne et sécurisé)
* **2FA** : Implémenté avec TOTP (Google Authenticator)
* **Secrets 2FA** : Stockés en base32, jamais exposés en clair
* **Cookies sécurisés** : `httpOnly: true`, `secure: true` en production, `sameSite: "lax"`
* **Clé de chiffrement WiFi** : 
  * Variable d'environnement `ENCRYPTION_KEY` obligatoire en production
  * Validation de la longueur minimale (32 caractères)
  * Erreur si la clé n'est pas définie en production
  * Clé par défaut uniquement en développement (non sécurisée, avec avertissement)

### 16.3 A03:2021 – Injection

* **Prisma ORM** : Utilisation de Prisma protège contre les injections SQL
* **Pas de requêtes SQL brutes** : Aucune utilisation de `$queryRaw` ou `$executeRaw`
* **Validation des entrées** : Validation stricte avec regex pour les champs (poste, agent, ligne directe)
* **Validation des emails** : Utilisation de `validator.isEmail()` (RFC compliant)
* **Sanitization des chemins** : Protection contre path traversal dans restauration de sauvegarde (`entry.fileName.includes("..")`)

### 16.4 A04:2021 – Insecure Design

* **Architecture en couches** : Séparation claire entre API, logique métier, et données
* **Validation côté serveur** : Toutes les validations sont faites côté serveur
* **Gestion des erreurs** : Messages d'erreur génériques (pas d'exposition de détails)

### 16.5 A05:2021 – Security Misconfiguration

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
* **Cookies sécurisés** : Configuration correcte selon l'environnement

### 16.6 A06:2021 – Vulnerable and Outdated Components

* **Dépendances récentes** : La plupart des dépendances sont à jour
* **Next.js 14.2** : Version récente
* **Prisma 5.19** : Version récente
* **Recommandation** : Utiliser `npm audit` régulièrement et intégrer Snyk ou Dependabot

### 16.7 A07:2021 – Identification and Authentication Failures

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

### 16.8 A08:2021 – Software and Data Integrity Failures

* **Validation des fichiers uploadés** : 
  * Type MIME vérifié via `file.type`
  * **Validation stricte via magic bytes** : Vérification du type réel du fichier via les premiers octets (magic bytes)
    * JPEG : `0xFF, 0xD8, 0xFF`
    * PNG : `0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A`
  * Vérification que le type déclaré correspond au type réel détecté
  * Protection contre l'upload de fichiers malveillants renommés (ex: `.exe` renommé en `.jpg`)
* **Taille maximale** : 5 MB
* **Types autorisés** : `image/jpeg`, `image/png` uniquement
* **Noms de fichiers uniques** : Génération de noms uniques pour éviter les collisions
* **Protection path traversal** : Vérification des chemins dans restauration
* **dangerouslySetInnerHTML** : 
  * Utilisé uniquement dans `app/layout.tsx` pour le script de prévention FOUC
  * Contenu statique et contrôlé par le code source (pas de risque XSS)
  * Documenté avec commentaire explicatif

### 16.9 A09:2021 – Security Logging and Monitoring Failures

* **Journalisation des actions** : Toutes les actions importantes sont loggées
* **Informations de contexte** : IP, User-Agent, userId loggés
* **Rétention des logs** : Nettoyage automatique après 30 jours
* **Export des logs** : Export CSV disponible
* **Logs des tentatives de connexion** : Toutes les tentatives échouées sont loggées avec la raison

### 16.10 A10:2021 – Server-Side Request Forgery (SSRF)

* **API BAN** : URL fixe et validée (`https://api-adresse.data.gouv.fr`)
* **Pas d'URLs utilisateur** : Aucun endpoint ne fait de requêtes vers des URLs fournies par l'utilisateur
* **Validation de l'URL** : URL BAN hardcodée (whitelist)

### 16.11 Mesures de sécurité supplémentaires

* **Rate limiting** : Protection contre les attaques par force brute et DoS
  * Implémenté dans `lib/rate-limit.ts`
  * Système en mémoire (pour production, utiliser Redis)
  * Limite : 5 tentatives par IP toutes les 15 minutes
  * Application sur l'endpoint de login
* **Protection contre l'énumération d'utilisateurs** : Messages d'erreur génériques pour les tentatives de connexion échouées
* **Gestion sécurisée des mots de passe WiFi** : 
  * Chiffrement réversible avec AES-256-CBC
  * Clé de chiffrement stockée dans variable d'environnement
  * IV (Initialization Vector) aléatoire pour chaque chiffrement

---

## 17. Clause finale (bloquante)

❗ **Toute implémentation qui dépasse ce PRD est NON CONFORME.**

❗ **Toute ambiguïté doit bloquer l'IA et déclencher une question humaine.**
