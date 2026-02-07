# Manuel d'Utilisateur - Super Admin

**Version** : 1.0  
**Date** : 2026-01-31  
**Application** : ABCLIV - Gestion des Agences

> **Note** : Ce manuel contient des références à des captures d'écran. Les images doivent être placées dans le dossier `images/manuel-super-admin/` et nommées selon les références indiquées (ex: `page-connexion.png`, `formulaire-ajout-agence.png`, etc.).

---

## Table des matières

1. [Introduction](#1-introduction)
2. [Connexion et Authentification](#2-connexion-et-authentification)
3. [Interface et Navigation](#3-interface-et-navigation)
4. [Gestion des Agences](#4-gestion-des-agences)
5. [Gestion des Utilisateurs](#5-gestion-des-utilisateurs)
6. [Paramètres de l'Application](#6-paramètres-de-lapplication)
7. [Monitoring et Sécurité](#7-monitoring-et-sécurité)
8. [Logs](#8-logs)
9. [Sauvegardes](#9-sauvegardes)
10. [Mon Profil](#10-mon-profil)

---

## 1. Introduction

### 1.1 À propos de ce manuel

Ce manuel est destiné aux utilisateurs ayant le rôle **Super Admin** dans l'application ABCLIV - Gestion des Agences. Il couvre toutes les fonctionnalités disponibles pour ce niveau d'accès.

### 1.2 Rôle Super Admin

En tant que **Super Admin**, vous avez accès à **toutes les fonctionnalités** de l'application :

- ✅ Création, modification et **suppression** d'agences
- ✅ Gestion complète des utilisateurs (création, modification, suppression, 2FA)
- ✅ Accès aux paramètres de l'application
- ✅ Consultation et gestion des logs
- ✅ Création, restauration et suppression des sauvegardes
- ✅ Accès au monitoring de sécurité
- ✅ Gestion des fichiers orphelins et images manquantes
- ✅ Consultation et restauration de l'historique des agences

### 1.3 Prérequis

- Un compte utilisateur avec le rôle **Super Admin**
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Une connexion Internet active
- Une application d'authentification à deux facteurs (Google Authenticator, Microsoft Authenticator, etc.)

---

## 2. Connexion et Authentification

### 2.1 Accès à l'application

1. Ouvrez votre navigateur web
2. Accédez à l'URL de l'application (fournie par votre administrateur système)
3. Vous arrivez sur la page de connexion

![Page de connexion](images/manuel-super-admin/page-connexion.png "Page de connexion")

### 2.2 Première connexion

Si c'est votre première connexion :

1. Entrez votre **login** (identifiant)
2. Entrez votre **mot de passe**
3. Cliquez sur le bouton **"Se connecter"**

![Formulaire de connexion](images/manuel-super-admin/formulaire-connexion.png "Formulaire de connexion")

### 2.3 Authentification à deux facteurs (2FA)

#### 2.3.1 Configuration initiale du 2FA

Si le 2FA n'est pas encore configuré pour votre compte :

1. Après la connexion, vous serez redirigé vers la page de configuration du 2FA
2. Un **code QR** sera affiché à l'écran
3. Ouvrez votre application d'authentification (Google Authenticator, Microsoft Authenticator, etc.)
4. Scannez le code QR avec votre application
5. Entrez le **code à 6 chiffres** généré par votre application
6. Cliquez sur **"Valider"**

![Configuration 2FA avec QR code](images/manuel-super-admin/config-2fa-qr.png "Configuration 2FA avec QR code")

> **Important** : Conservez votre application d'authentification en sécurité. Sans elle, vous ne pourrez plus vous connecter.

#### 2.3.2 Connexion avec 2FA activé

Une fois le 2FA configuré, à chaque connexion :

1. Entrez votre **login** et **mot de passe**
2. Cliquez sur **"Se connecter"**
3. Entrez le **code à 6 chiffres** de votre application d'authentification
4. Cliquez sur **"Valider"**

![Saisie du code 2FA](images/manuel-super-admin/saisie-code-2fa.png "Saisie du code 2FA")

### 2.4 Gestion des erreurs de connexion

- **Identifiant ou mot de passe incorrect** : Vérifiez vos identifiants
- **Code 2FA incorrect** : Assurez-vous que l'heure de votre appareil est synchronisée
- **Compte verrouillé** : Après 5 tentatives échouées, votre compte est verrouillé pendant 15 minutes
- **Session expirée** : Reconnectez-vous si votre session a expiré

---

## 3. Interface et Navigation

### 3.1 Vue d'ensemble de l'interface

L'interface est organisée en deux zones principales :

- **Zone Master (gauche)** : Liste des agences avec recherche et filtres
- **Zone Détails (droite)** : Informations détaillées de l'agence sélectionnée

![Vue d'ensemble de l'interface](images/manuel-super-admin/vue-ensemble-interface.png "Vue d'ensemble de l'interface")

### 3.2 Menu de navigation (Sidebar)

Le menu latéral gauche contient les sections suivantes (toutes visibles pour Super Admin) :

- **🏢 Agences** : Gestion des agences
- **👥 Utilisateurs** : Gestion des utilisateurs (Super Admin uniquement)
- **📄 Logs** : Consultation des logs (Super Admin uniquement)
- **💾 Sauvegardes** : Gestion des sauvegardes (Super Admin uniquement)
- **⚙️ Paramètres** : Paramètres de l'application (Super Admin uniquement)

![Menu de navigation complet](images/manuel-super-admin/menu-navigation-complet.png "Menu de navigation complet")

### 3.3 Section utilisateur (bas du menu)

En bas du menu latéral, vous trouverez :

- **Photo de profil** : Votre photo (ou avatar avec initiales)
- **Nom d'utilisateur** : Votre login
- **👤 Mon profil** : Accès à votre profil personnel
- **🚪 Déconnexion** : Déconnexion de l'application

![Section utilisateur du menu](images/manuel-super-admin/section-utilisateur-menu.png "Section utilisateur du menu")

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

![Toggle thème clair/sombre](images/manuel-super-admin/toggle-theme.png "Toggle thème clair/sombre")

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

![Filtres par état](images/manuel-super-admin/filtres-par-etat.png "Filtres par état")

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- **Supprimer** : Cliquez sur l'icône 🗑️ pour supprimer l'agence (Super Admin uniquement)

**[CAPTURE: Liste des agences avec boutons d'action]**

#### 4.2.4 Ajouter une agence

1. Cliquez sur le bouton **"Ajouter une agence"** en haut de la liste
2. Un formulaire s'ouvre
3. Remplissez les champs obligatoires :
   - **Nom de l'agence** (obligatoire)
   - **État** (par défaut : ALERTE)
4. Remplissez les champs optionnels :
   - **Code Agence**
   - **Code Rayon**
   - **Date ouverture**
   - **Date fermeture**
   - **Photo principale**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'agence]**

### 4.3 Zone Détails (informations de l'agence)

#### 4.3.1 En-tête de l'agence

L'en-tête contient :

- **Nom de l'agence**
- **Bouton État** : Cliquez pour changer l'état (OK, ALERTE, INFO, FERMÉE)
- **Bouton Historique** : Consultez l'historique des modifications (Super Admin uniquement)
- **Boutons Annuler/Enregistrer** : Visibles uniquement en mode édition

**[CAPTURE: En-tête de l'agence]**

#### 4.3.2 Onglets

Les informations de l'agence sont organisées en 4 onglets :

1. **Général** : Informations générales, adresses, contacts
2. **Tâches** : Gestion des tâches
3. **Technique** : Informations techniques (réseau, PC, imprimantes, etc.)
4. **Photos** : Gestion des photos par type

**[CAPTURE: Onglets de l'agence]**

### 4.4 Onglet Général

#### 4.4.1 Informations générales

- **Photo principale** : Cliquez pour changer la photo
- **Nom de l'agence** : Modifiable en mode édition
- **Code Agence** : Modifiable en mode édition
- **Code Rayon** : Modifiable en mode édition
- **Date ouverture** : Modifiable en mode édition
- **Date fermeture** : Modifiable en mode édition

**[CAPTURE: Section Informations générales]**

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Cliquez sur **"Ajouter une adresse"**
2. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
3. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'adresse]**

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Recherche d'adresse via API BAN]**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- **Supprimer** : Cliquez sur l'icône 🗑️ pour supprimer l'agence (Super Admin uniquement)

**[CAPTURE: Liste des agences avec boutons d'action]**

#### 4.2.4 Ajouter une agence

1. Cliquez sur le bouton **"Ajouter une agence"** en haut de la liste
2. Un formulaire s'ouvre
3. Remplissez les champs obligatoires :
   - **Nom de l'agence** (obligatoire)
   - **État** (par défaut : ALERTE)
4. Remplissez les champs optionnels :
   - **Code Agence**
   - **Code Rayon**
   - **Date ouverture**
   - **Date fermeture**
   - **Photo principale**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'agence]**

### 4.3 Zone Détails (informations de l'agence)

#### 4.3.1 En-tête de l'agence

L'en-tête contient :

- **Nom de l'agence**
- **Bouton État** : Cliquez pour changer l'état (OK, ALERTE, INFO, FERMÉE)
- **Bouton Historique** : Consultez l'historique des modifications (Super Admin uniquement)
- **Boutons Annuler/Enregistrer** : Visibles uniquement en mode édition

**[CAPTURE: En-tête de l'agence]**

#### 4.3.2 Onglets

Les informations de l'agence sont organisées en 4 onglets :

1. **Général** : Informations générales, adresses, contacts
2. **Tâches** : Gestion des tâches
3. **Technique** : Informations techniques (réseau, PC, imprimantes, etc.)
4. **Photos** : Gestion des photos par type

**[CAPTURE: Onglets de l'agence]**

### 4.4 Onglet Général

#### 4.4.1 Informations générales

- **Photo principale** : Cliquez pour changer la photo
- **Nom de l'agence** : Modifiable en mode édition
- **Code Agence** : Modifiable en mode édition
- **Code Rayon** : Modifiable en mode édition
- **Date ouverture** : Modifiable en mode édition
- **Date fermeture** : Modifiable en mode édition

**[CAPTURE: Section Informations générales]**

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Cliquez sur **"Ajouter une adresse"**
2. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
3. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'adresse]**

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Recherche d'adresse via API BAN]**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- **Supprimer** : Cliquez sur l'icône 🗑️ pour supprimer l'agence (Super Admin uniquement)

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.2.4 Ajouter une agence

1. Cliquez sur le bouton **"Ajouter une agence"** en haut de la liste
2. Un formulaire s'ouvre
3. Remplissez les champs obligatoires :
   - **Nom de l'agence** (obligatoire)
   - **État** (par défaut : ALERTE)
4. Remplissez les champs optionnels :
   - **Code Agence**
   - **Code Rayon**
   - **Date ouverture**
   - **Date fermeture**
   - **Photo principale**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'agence]**

### 4.3 Zone Détails (informations de l'agence)

#### 4.3.1 En-tête de l'agence

L'en-tête contient :

- **Nom de l'agence**
- **Bouton État** : Cliquez pour changer l'état (OK, ALERTE, INFO, FERMÉE)
- **Bouton Historique** : Consultez l'historique des modifications (Super Admin uniquement)
- **Boutons Annuler/Enregistrer** : Visibles uniquement en mode édition

**[CAPTURE: En-tête de l'agence]**

#### 4.3.2 Onglets

Les informations de l'agence sont organisées en 4 onglets :

1. **Général** : Informations générales, adresses, contacts
2. **Tâches** : Gestion des tâches
3. **Technique** : Informations techniques (réseau, PC, imprimantes, etc.)
4. **Photos** : Gestion des photos par type

**[CAPTURE: Onglets de l'agence]**

### 4.4 Onglet Général

#### 4.4.1 Informations générales

- **Photo principale** : Cliquez pour changer la photo
- **Nom de l'agence** : Modifiable en mode édition
- **Code Agence** : Modifiable en mode édition
- **Code Rayon** : Modifiable en mode édition
- **Date ouverture** : Modifiable en mode édition
- **Date fermeture** : Modifiable en mode édition

**[CAPTURE: Section Informations générales]**

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Cliquez sur **"Ajouter une adresse"**
2. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
3. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'adresse]**

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Recherche d'adresse via API BAN]**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.2.4 Ajouter une agence

1. Cliquez sur le bouton **"Ajouter une agence"** en haut de la liste
2. Un formulaire s'ouvre
3. Remplissez les champs obligatoires :
   - **Nom de l'agence** (obligatoire)
   - **État** (par défaut : ALERTE)
4. Remplissez les champs optionnels :
   - **Code Agence**
   - **Code Rayon**
   - **Date ouverture**
   - **Date fermeture**
   - **Photo principale**
5. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 4.3 Zone Détails (informations de l'agence)

#### 4.3.1 En-tête de l'agence

L'en-tête contient :

- **Nom de l'agence**
- **Bouton État** : Cliquez pour changer l'état (OK, ALERTE, INFO, FERMÉE)
- **Bouton Historique** : Consultez l'historique des modifications (Super Admin uniquement)
- **Boutons Annuler/Enregistrer** : Visibles uniquement en mode édition

**[CAPTURE: En-tête de l'agence]**

#### 4.3.2 Onglets

Les informations de l'agence sont organisées en 4 onglets :

1. **Général** : Informations générales, adresses, contacts
2. **Tâches** : Gestion des tâches
3. **Technique** : Informations techniques (réseau, PC, imprimantes, etc.)
4. **Photos** : Gestion des photos par type

**[CAPTURE: Onglets de l'agence]**

### 4.4 Onglet Général

#### 4.4.1 Informations générales

- **Photo principale** : Cliquez pour changer la photo
- **Nom de l'agence** : Modifiable en mode édition
- **Code Agence** : Modifiable en mode édition
- **Code Rayon** : Modifiable en mode édition
- **Date ouverture** : Modifiable en mode édition
- **Date fermeture** : Modifiable en mode édition

**[CAPTURE: Section Informations générales]**

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Cliquez sur **"Ajouter une adresse"**
2. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
3. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'adresse]**

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Recherche d'adresse via API BAN]**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 4.3 Zone Détails (informations de l'agence)

#### 4.3.1 En-tête de l'agence

L'en-tête contient :

- **Nom de l'agence**
- **Bouton État** : Cliquez pour changer l'état (OK, ALERTE, INFO, FERMÉE)
- **Bouton Historique** : Consultez l'historique des modifications (Super Admin uniquement)
- **Boutons Annuler/Enregistrer** : Visibles uniquement en mode édition

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.3.2 Onglets

Les informations de l'agence sont organisées en 4 onglets :

1. **Général** : Informations générales, adresses, contacts
2. **Tâches** : Gestion des tâches
3. **Technique** : Informations techniques (réseau, PC, imprimantes, etc.)
4. **Photos** : Gestion des photos par type

**[CAPTURE: Onglets de l'agence]**

### 4.4 Onglet Général

#### 4.4.1 Informations générales

- **Photo principale** : Cliquez pour changer la photo
- **Nom de l'agence** : Modifiable en mode édition
- **Code Agence** : Modifiable en mode édition
- **Code Rayon** : Modifiable en mode édition
- **Date ouverture** : Modifiable en mode édition
- **Date fermeture** : Modifiable en mode édition

**[CAPTURE: Section Informations générales]**

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Cliquez sur **"Ajouter une adresse"**
2. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
3. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'adresse]**

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Recherche d'adresse via API BAN]**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.3.2 Onglets

Les informations de l'agence sont organisées en 4 onglets :

1. **Général** : Informations générales, adresses, contacts
2. **Tâches** : Gestion des tâches
3. **Technique** : Informations techniques (réseau, PC, imprimantes, etc.)
4. **Photos** : Gestion des photos par type

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 4.4 Onglet Général

#### 4.4.1 Informations générales

- **Photo principale** : Cliquez pour changer la photo
- **Nom de l'agence** : Modifiable en mode édition
- **Code Agence** : Modifiable en mode édition
- **Code Rayon** : Modifiable en mode édition
- **Date ouverture** : Modifiable en mode édition
- **Date fermeture** : Modifiable en mode édition

**[CAPTURE: Section Informations générales]**

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Cliquez sur **"Ajouter une adresse"**
2. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
3. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'adresse]**

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Recherche d'adresse via API BAN]**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 4.4 Onglet Général

#### 4.4.1 Informations générales

- **Photo principale** : Cliquez pour changer la photo
- **Nom de l'agence** : Modifiable en mode édition
- **Code Agence** : Modifiable en mode édition
- **Code Rayon** : Modifiable en mode édition
- **Date ouverture** : Modifiable en mode édition
- **Date fermeture** : Modifiable en mode édition

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Cliquez sur **"Ajouter une adresse"**
2. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
3. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'adresse]**

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Recherche d'adresse via API BAN]**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Cliquez sur **"Ajouter une adresse"**
2. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
3. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
4. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Recherche d'adresse via API BAN]**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

##### Recherche via API BAN

1. Cliquez sur l'icône 🔍 à côté du champ de recherche
2. Tapez l'adresse recherchée
3. Sélectionnez l'adresse dans les résultats
4. Les champs sont remplis automatiquement
5. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**[CAPTURE: Actions sur une adresse]**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

##### Modifier/Supprimer une adresse

- **Modifier** : Cliquez sur l'icône ✏️ à côté de l'adresse
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté de l'adresse

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de contact]**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.4.3 Contacts

##### Ajouter un contact

1. Cliquez sur **"Ajouter un contact"**
2. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
3. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des contacts]**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

##### Réorganiser les contacts (Drag & Drop)

1. Activez le mode édition de l'agence
2. Cliquez et maintenez sur l'icône ║ à gauche d'un contact
3. Glissez le contact vers la position souhaitée
4. Relâchez pour valider

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**[CAPTURE: Actions sur un contact]**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

##### Modifier/Supprimer un contact

- **Modifier** : Cliquez sur l'icône ✏️ à côté du contact
- **Supprimer** : Cliquez sur l'icône 🗑️ à côté du contact

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de tâche]**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 4.5 Onglet Tâches

#### 4.5.1 Vue d'ensemble

L'onglet Tâches permet de gérer les tâches associées à l'agence.

#### 4.5.2 Ajouter une tâche

1. Activez le mode édition de l'agence
2. Cliquez sur **"Ajouter une tâche"**
3. Remplissez les champs :
   - **Titre** (obligatoire)
   - **Date de création** (par défaut : aujourd'hui)
   - **Notes** (obligatoire)
   - **Importance** : URGENT, CRITIQUE ou INFO
   - **Photos** : Jusqu'à 5 photos (configurable dans Paramètres)
4. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**[CAPTURE: Filtres des tâches]**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.5.3 Filtrer les tâches

Vous pouvez filtrer les tâches par :

- **Importance** : URGENT, CRITIQUE, INFO, TOUS
- **Statut** : Clôturées / Non clôturées (toggle)

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.5.4 Actions sur les tâches

- **Modifier** : Cliquez sur l'icône ✏️ (visible en mode édition)
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche (visible en mode édition)
- **Supprimer** : Cliquez sur l'icône 🗑️ (Super Admin uniquement, visible en mode édition)

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**[CAPTURE: Ajout de photos à une tâche]**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.5.5 Photos dans les tâches

##### Ajouter des photos

1. Lors de la création ou modification d'une tâche
2. Cliquez sur **"Choisir des fichiers"**
3. Sélectionnez jusqu'à 5 photos (limite configurable)
4. Les photos s'affichent en miniatures
5. Cliquez sur une miniature pour la supprimer

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**[CAPTURE: Viewer de photos de tâche]**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

##### Visualiser les photos

1. Cliquez sur une miniature de photo
2. Un viewer s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite ou clic sur les moitiés gauche/droite de l'image
   - Indicateur de position (ex: "1/5")
4. **Zoom** :
   - Molette de la souris pour zoomer (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Suppression** : Cliquez sur l'icône 🗑️ en haut à gauche (en mode édition)

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration réseau]**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 4.6 Onglet Technique

#### 4.6.1 Réseau

1. Activez le mode édition
2. Entrez l'**Adresse IP LAN (CIDR)** (format : 192.168.1.0/24)
3. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de PC]**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.6.2 PC

##### Ajouter un PC

1. Activez le mode édition
2. Cliquez sur **"Ajouter un PC"**
3. Remplissez les champs :
   - **Nom** (obligatoire)
   - **IP**
   - **MAC**
   - **N° série**
   - **Marque**
   - **Modèle**
   - **Date d'achat**
   - **Date de garantie**
   - **Fichiers** (upload)
   - **Photos** (upload)
4. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**[CAPTURE: Drag & Drop des PC]**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

##### Réorganiser les PC (Drag & Drop)

1. Activez le mode édition
2. Cliquez et maintenez sur l'icône ║ à gauche d'un PC
3. Glissez le PC vers la position souhaitée
4. Relâchez pour valider

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration machine à affranchir]**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.6.3 Imprimantes

Similaire à la gestion des PC. Voir section 4.6.2.

#### 4.6.4 Machine à affranchir

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Connexion**
   - **IP**
   - **MAC**
3. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration WiFi]**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.6.5 WiFi

##### Routeur WiFi

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
3. Cliquez sur **"Enregistrer"**

##### Points d'accès WiFi

1. Activez le mode édition
2. Cliquez sur **"Ajouter un point d'accès"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **SSID**
   - **Mot de passe** (chiffré)
4. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**[CAPTURE: Configuration routeurs]**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.6.6 Routeurs

##### Routeur principal

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **IP**
   - **N° série**
   - **Type de liaison**
3. Cliquez sur **"Enregistrer"**

##### Routeur secours

Similaire au routeur principal.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration vidéo protection]**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.6.7 Vidéo protection

##### Enregistreur

1. Activez le mode édition
2. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **N° série**
   - **MAC**
   - **IP**
   - **Stockage**
3. Cliquez sur **"Enregistrer"**

##### Caméras

1. Activez le mode édition
2. Cliquez sur **"Ajouter une caméra"**
3. Remplissez les champs :
   - **Marque**
   - **Modèle**
   - **Type**
   - **IP**
4. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**[CAPTURE: Historique des notes techniques]**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.6.8 Notes techniques

1. Activez le mode édition
2. Saisissez vos notes dans le champ texte
3. Cliquez sur **"Enregistrer"**

> **Important** : Seul le Super Admin peut supprimer (vider) les notes techniques existantes.

##### Historique des notes techniques

1. Cliquez sur le bouton **"Historique"** à côté du champ de notes
2. Consultez toutes les versions précédentes
3. Cliquez sur **"Restaurer"** pour restaurer une version

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**[CAPTURE: Champs dynamiques]**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.6.9 Champs dynamiques

1. Activez le mode édition
2. Cliquez sur **"Ajouter un champ"**
3. Remplissez :
   - **Label** (nom du champ)
   - **Valeur**
4. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout de groupe de photos]**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 4.7 Onglet Photos

#### 4.7.1 Vue d'ensemble

L'onglet Photos permet de gérer les photos de l'agence organisées par type.

#### 4.7.2 Types de photos

Les photos sont organisées par type (ex: "Façade", "Intérieur", "Parking", etc.).

#### 4.7.3 Ajouter un groupe de photos

1. Activez le mode édition
2. Cliquez sur **"Ajouter un groupe de photos"**
3. Sélectionnez le **Type** de photo
4. Entrez un **Titre** (optionnel)
5. Sélectionnez les **Photos** à uploader
   - Taille maximale : Configurable dans Paramètres (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable dans Paramètres (défaut : 50 par type)
6. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**[CAPTURE: Lightbox de photos]**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.7.4 Visualiser les photos

1. Cliquez sur une vignette de photo
2. Un lightbox s'ouvre en plein écran
3. **Navigation** :
   - Flèches gauche/droite
   - Clic sur l'image (photo suivante si non zoomée)
   - Navigation en boucle (après la dernière, retour à la première)
4. **Zoom** :
   - Molette de la souris (1x à 5x)
   - Clic-glisser pour déplacer l'image zoomée
5. **Fermeture** : Clic en dehors de l'image ou bouton X

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Modification d'une photo]**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.7.5 Modifier une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône ✏️
4. Modifiez le **Titre** et/ou la **Date de création**
5. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**[CAPTURE: Dialog historique de l'agence]**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.7.6 Supprimer une photo

1. Activez le mode édition
2. Survolez une vignette de photo
3. Cliquez sur l'icône 🗑️
4. Confirmez la suppression

> **Attention** : La suppression est définitive. Le fichier physique est également supprimé.

### 4.8 Historique de l'agence

#### 4.8.1 Consulter l'historique

1. Sélectionnez une agence
2. Cliquez sur le bouton **"Historique"** dans l'en-tête (Super Admin uniquement)
3. Un dialog s'ouvre avec toutes les versions précédentes
4. Chaque version affiche :
   - Numéro de version
   - Utilisateur qui a fait la modification
   - Date et heure
   - Tous les détails de l'agence à cette version

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**[CAPTURE: Restauration d'une version]**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.8.2 Restaurer une version

1. Dans le dialog d'historique
2. Cliquez sur **"Restaurer"** pour la version souhaitée
3. Confirmez la restauration
4. L'agence est restaurée à cette version
5. Une nouvelle entrée d'historique est créée

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**[CAPTURE: Page de gestion des utilisateurs]**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

---

## 5. Gestion des Utilisateurs

> **Accès** : Super Admin uniquement

### 5.1 Accès à la gestion des utilisateurs

1. Cliquez sur **"👥 Utilisateurs"** dans le menu latéral
2. Vous arrivez sur la page de gestion des utilisateurs

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**[CAPTURE: Liste des utilisateurs]**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.2 Liste des utilisateurs

La page affiche tous les utilisateurs avec :

- **Photo de profil** (ou avatar avec initiales)
- **Login** (identifiant)
- **Rôle** (Super Admin, Super user, User)
- **Statut** (Actif, Désactivé, Verrouillé)
- **2FA** (Activé, Non activé)

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire d'ajout d'utilisateur]**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.3 Ajouter un utilisateur

1. Cliquez sur **"Ajouter un utilisateur"**
2. Remplissez le formulaire :
   - **Login** (obligatoire, unique)
   - **Mot de passe** (obligatoire)
   - **Rôle** : Super Admin, Super user ou User
   - **Photo de profil** (optionnel, JPEG/PNG, max 5 MB)
3. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**[CAPTURE: Formulaire de modification d'utilisateur]**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.4 Modifier un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Modifiez les champs souhaités :
   - **Login**
   - **Mot de passe** (laisser vide pour ne pas changer)
   - **Rôle**
   - **Photo de profil**
   - **Actif** (case à cocher)
3. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Confirmation de suppression d'utilisateur]**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.5 Supprimer un utilisateur

1. Cliquez sur l'icône 🗑️ à côté de l'utilisateur
2. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**[CAPTURE: Réinitialisation du 2FA]**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.6 Gestion du 2FA

#### 5.6.1 Réinitialiser le 2FA d'un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cliquez sur **"Réinitialiser le 2FA"**
3. L'utilisateur devra reconfigurer son 2FA à sa prochaine connexion

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**[CAPTURE: QR code 2FA]**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 5.6.2 Voir le QR code du 2FA

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Si le 2FA n'est pas activé, un bouton **"Voir le QR code"** est disponible
3. Le QR code s'affiche pour configuration

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**[CAPTURE: Page des paramètres]**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.7 Activer/Désactiver un utilisateur

1. Cliquez sur l'icône ✏️ à côté de l'utilisateur
2. Cochez/décochez la case **"Actif"**
3. Cliquez sur **"Enregistrer"**

> **Note** : Un utilisateur désactivé ne peut plus se connecter.

---

## 6. Paramètres de l'Application

> **Accès** : Super Admin uniquement

### 6.1 Accès aux paramètres

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Vous arrivez sur la page des paramètres

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**[CAPTURE: Onglets des paramètres]**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 6.2 Onglets des paramètres

Les paramètres sont organisés en 5 onglets :

1. **Général** : Paramètres généraux, fichiers orphelins, images manquantes
2. **Utilisateurs** : Gestion des utilisateurs (identique à la section 5)
3. **Sauvegardes** : Gestion des sauvegardes (voir section 9)
4. **Logs** : Consultation des logs (voir section 8)
5. **Monitoring** : Monitoring de sécurité (voir section 7)

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**[CAPTURE: Configuration durée de session]**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 6.3 Onglet Général

#### 6.3.1 Durée de session

1. Entrez la durée d'inactivité avant déconnexion automatique (en minutes)
2. **Valeur minimale** : 1 minute
3. **Valeur maximale** : 1440 minutes (24 heures)
4. Cliquez sur **"Enregistrer"**

> **Note** : La nouvelle durée s'applique immédiatement à tous les utilisateurs connectés.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**[CAPTURE: Configuration taille maximale des images]**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 6.3.2 Taille maximale des images

1. Entrez la taille maximale autorisée pour l'upload d'images (en Mo)
2. **Valeur par défaut** : 5 Mo
3. **Valeur minimale** : 1 Mo
4. **Valeur maximale** : 100 Mo
5. Cliquez sur **"Enregistrer"**

> **Note** : Les images déjà importées avec une taille supérieure sont conservées.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**[CAPTURE: Configuration max photos par type]**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 6.3.3 Nombre maximum de photos par type de photo

1. Entrez le nombre maximum de photos autorisées par type de photo
2. **Valeur par défaut** : 50
3. **Valeur minimale** : 1
4. **Valeur maximale** : 1000
5. Cliquez sur **"Enregistrer"**

> **Note** : Le type "Agence" n'est pas soumis à cette limite (1 seule photo autorisée).

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Configuration max photos par tâche]**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 6.3.4 Nombre maximum de photos par tâche

1. Entrez le nombre maximum de photos autorisées par tâche
2. **Valeur par défaut** : 5
3. **Valeur minimale** : 1
4. **Valeur maximale** : 100
5. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**[CAPTURE: Liste des fichiers orphelins]**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 6.3.5 Fichiers orphelins

##### Scanner les fichiers orphelins

1. Cliquez sur **"Scanner les fichiers orphelins"**
2. Le système scanne le dossier uploads
3. Une liste des fichiers orphelins s'affiche avec :
   - Chemin du fichier
   - Taille formatée
   - Date de modification

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression de fichiers orphelins]**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

##### Supprimer les fichiers orphelins

1. Cochez les fichiers à supprimer (ou **"Tout sélectionner"**)
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**[CAPTURE: Liste des images manquantes]**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 6.3.6 Images manquantes

##### Rechercher les images manquantes

1. Cliquez sur **"Rechercher les images manquantes"**
2. Le système scanne toutes les références dans la base de données
3. Une liste des images manquantes s'affiche avec :
   - Nom de l'agence (ou utilisateur)
   - Type de photo
   - Libellé (titre de la tâche pour les photos de tâches)
   - Date physique
   - Nom physique (chemin du fichier)

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**[CAPTURE: Onglet Monitoring]**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

---

## 7. Monitoring et Sécurité

> **Accès** : Super Admin uniquement

### 7.1 Accès au monitoring

1. Cliquez sur **"⚙️ Paramètres"** dans le menu latéral
2. Cliquez sur l'onglet **"Monitoring"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**[CAPTURE: Statistiques des alertes]**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 7.2 Statistiques en temps réel

Le monitoring affiche des statistiques en temps réel :

#### 7.2.1 Alertes

- **Total** : Nombre total d'alertes
- **Non résolues** : Alertes non résolues
- **Critiques** : Alertes de niveau critique
- **Élevées** : Alertes de niveau élevé
- **Dernières 24h** : Alertes créées dans les dernières 24 heures

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**[CAPTURE: Statistiques des logs]**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 7.2.2 Logs

- **Total** : Nombre total de logs
- **Dernières 24h** : Logs créés dans les dernières 24 heures
- **7 derniers jours** : Logs créés dans les 7 derniers jours
- **Tentatives échouées** : Tentatives de connexion échouées
- **Actions sensibles** : Actions sensibles enregistrées

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**[CAPTURE: Statistiques des utilisateurs]**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 7.2.3 Utilisateurs

- **Total** : Nombre total d'utilisateurs
- **Actifs** : Utilisateurs actifs
- **Verrouillés** : Utilisateurs verrouillés (tentatives échouées)
- **Désactivés** : Utilisateurs désactivés

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**[CAPTURE: Statistiques des sessions]**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 7.2.4 Sessions

- **Actives** : Nombre de sessions actives

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**[CAPTURE: Liste des alertes]**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 7.3 Liste des alertes

#### 7.3.1 Consulter les alertes

La liste des alertes affiche :

- **Type** : Type d'alerte (ex: "Tentative de connexion échouée")
- **Niveau** : Niveau de sévérité (Critique, Élevé, Moyen, Faible)
- **Utilisateur** : Utilisateur concerné
- **Date** : Date et heure de l'alerte
- **IP** : Adresse IP de l'utilisateur
- **Statut** : Résolu / Non résolu

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**[CAPTURE: Filtres des alertes]**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 7.3.2 Filtrer les alertes

Vous pouvez filtrer les alertes par :

- **Statut** : Toutes, Résolues, Non résolues
- **Niveau** : Tous, Critique, Élevé, Moyen, Faible

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**[CAPTURE: Résolution d'une alerte]**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 7.3.3 Résoudre une alerte

1. Cliquez sur une alerte pour voir les détails
2. Cliquez sur **"Marquer comme résolu"**
3. L'alerte est marquée comme résolue

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**[CAPTURE: Page des logs]**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

---

## 8. Logs

> **Accès** : Super Admin uniquement

### 8.1 Accès aux logs

1. Cliquez sur **"📄 Logs"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Logs"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**[CAPTURE: Liste des logs]**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 8.2 Consultation des logs

La page affiche tous les logs avec :

- **Date et heure**
- **Utilisateur** (ou "Système")
- **Action** (ex: "AGENCE_CREEE", "UTILISATEUR_MODIFIE")
- **Détails** (informations supplémentaires)
- **Adresse IP**
- **User Agent**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**[CAPTURE: Filtres des logs]**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 8.3 Filtrer les logs

Vous pouvez filtrer les logs par :

- **Utilisateur** : Sélectionnez un utilisateur spécifique
- **Action** : Tapez le nom de l'action
- **Date** : Utilisez les filtres de date

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**[CAPTURE: Export des logs]**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 8.4 Exporter les logs

1. Cliquez sur **"Exporter en CSV"**
2. Un fichier CSV est téléchargé avec tous les logs

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**[CAPTURE: Purge des logs]**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 8.5 Purger tous les logs

1. Cliquez sur **"Purger tous les logs"**
2. Un dialog de confirmation s'ouvre
3. Tapez **"PURGER"** (en majuscules) dans le champ de confirmation
4. Cliquez sur **"Confirmer"**

> **Attention** : Cette action est irréversible. Tous les logs seront supprimés définitivement.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**[CAPTURE: Page des sauvegardes]**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

---

## 9. Sauvegardes

> **Accès** : Super Admin uniquement

### 9.1 Accès aux sauvegardes

1. Cliquez sur **"💾 Sauvegardes"** dans le menu latéral
   OU
2. Cliquez sur **"⚙️ Paramètres"** puis l'onglet **"Sauvegardes"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**[CAPTURE: Liste des sauvegardes]**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 9.2 Liste des sauvegardes

La page affiche toutes les sauvegardes disponibles avec :

- **Nom du fichier**
- **Date de création**
- **Taille** (formatée)
- **Intégrité** : ✅ Valide, ❌ Corrompue, ⚠️ Inconnue
- **Actions** : Restaurer, Supprimer

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**[CAPTURE: Création d'une sauvegarde]**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 9.3 Créer une sauvegarde

1. Cliquez sur **"Créer une sauvegarde"**
2. La sauvegarde est créée automatiquement
3. Un message de confirmation s'affiche

> **Note** : Les sauvegardes sont automatiques quotidiennes. Les sauvegardes de plus de 10 jours sont automatiquement supprimées.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**[CAPTURE: Restauration d'une sauvegarde]**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 9.4 Restaurer une sauvegarde

1. Cliquez sur **"Restaurer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre avec les détails de la sauvegarde
3. Confirmez la restauration

> **Attention** : La restauration remplace toutes les données actuelles. Cette action est irréversible.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**[CAPTURE: Suppression d'une sauvegarde]**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 9.5 Supprimer une sauvegarde

1. Cliquez sur **"Supprimer"** à côté de la sauvegarde souhaitée
2. Un dialog de confirmation s'ouvre
3. Confirmez la suppression

> **Attention** : La suppression est définitive et irréversible.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

---

## 10. Mon Profil

### 10.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 10.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 10.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 10.4 Gérer le 2FA

#### 10.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 10.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 11. Alerte de Session

### 11.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 11.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 12. Conseils et Bonnes Pratiques

### 12.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 12.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez l'historique** pour suivre les modifications
- **Sauvegardez régulièrement** vos données importantes

### 12.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Organisez les contacts et PC** par ordre d'importance

---

## 13. Support et Assistance

### 13.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super Admin)
4. **Contactez votre administrateur système**

### 13.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

