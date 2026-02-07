# Manuel d'Utilisateur - Super user

**Version** : 1.0  
**Date** : 2026-01-31  
**Application** : ABCLIV - Gestion des Agences

---

## Table des matières

1. [Introduction](#1-introduction)
2. [Connexion et Authentification](#2-connexion-et-authentification)
3. [Interface et Navigation](#3-interface-et-navigation)
4. [Gestion des Agences](#4-gestion-des-agences)
5. [Mon Profil](#5-mon-profil)
6. [Conseils et Bonnes Pratiques](#6-conseils-et-bonnes-pratiques)

---

## 1. Introduction

### 1.1 À propos de ce manuel

Ce manuel est destiné aux utilisateurs ayant le rôle **Super user** dans l'application ABCLIV - Gestion des Agences. Il couvre toutes les fonctionnalités disponibles pour ce niveau d'accès.

### 1.2 Rôle Super user

En tant que **Super user**, vous avez accès aux fonctionnalités suivantes :

- ✅ **Création** de nouvelles agences
- ✅ **Modification** des agences existantes
- ✅ **Consultation** de toutes les agences
- ❌ **Suppression** d'agences (réservée aux Super Admin)
- ❌ Gestion des utilisateurs (réservée aux Super Admin)
- ❌ Accès aux paramètres (réservé aux Super Admin)
- ❌ Consultation des logs (réservée aux Super Admin)
- ❌ Gestion des sauvegardes (réservée aux Super Admin)
- ❌ Accès au monitoring (réservé aux Super Admin)
- ❌ Consultation de l'historique des agences (réservée aux Super Admin)

### 1.3 Prérequis

- Un compte utilisateur avec le rôle **Super user**
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Une connexion Internet active
- Une application d'authentification à deux facteurs (Google Authenticator, Microsoft Authenticator, etc.)

---

## 2. Connexion et Authentification

### 2.1 Accès à l'application

1. Ouvrez votre navigateur web
2. Accédez à l'URL de l'application (fournie par votre administrateur système)
3. Vous arrivez sur la page de connexion

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 2.2 Première connexion

Si c'est votre première connexion :

1. Entrez votre **login** (identifiant)
2. Entrez votre **mot de passe**
3. Cliquez sur le bouton **"Se connecter"**

**[CAPTURE: Formulaire de connexion]**

### 2.3 Authentification à deux facteurs (2FA)

#### 2.3.1 Configuration initiale du 2FA

Si le 2FA n'est pas encore configuré pour votre compte :

1. Après la connexion, vous serez redirigé vers la page de configuration du 2FA
2. Un **code QR** sera affiché à l'écran
3. Ouvrez votre application d'authentification (Google Authenticator, Microsoft Authenticator, etc.)
4. Scannez le code QR avec votre application
5. Entrez le **code à 6 chiffres** généré par votre application
6. Cliquez sur **"Valider"**

**[CAPTURE: Configuration 2FA avec QR code]**

> **Important** : Conservez votre application d'authentification en sécurité. Sans elle, vous ne pourrez plus vous connecter.

#### 2.3.2 Connexion avec 2FA activé

Une fois le 2FA configuré, à chaque connexion :

1. Entrez votre **login** et **mot de passe**
2. Cliquez sur **"Se connecter"**
3. Entrez le **code à 6 chiffres** de votre application d'authentification
4. Cliquez sur **"Valider"**

**[CAPTURE: Saisie du code 2FA]**

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

**[CAPTURE: Vue d'ensemble de l'interface]**

### 3.2 Menu de navigation (Sidebar)

Le menu latéral gauche contient uniquement :

- **🏢 Agences** : Gestion des agences

> **Note** : Les sections "Utilisateurs", "Logs", "Sauvegardes" et "Paramètres" ne sont pas visibles pour les Super user (réservées aux Super Admin).

**[CAPTURE: Menu de navigation Super user]**

### 3.3 Section utilisateur (bas du menu)

En bas du menu latéral, vous trouverez :

- **Photo de profil** : Votre photo (ou avatar avec initiales)
- **Nom d'utilisateur** : Votre login
- **👤 Mon profil** : Accès à votre profil personnel
- **🚪 Déconnexion** : Déconnexion de l'application

**[CAPTURE: Section utilisateur du menu]**

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

**[CAPTURE: Toggle thème clair/sombre]**

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**[CAPTURE: Champ de recherche]**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 2.2 Première connexion

Si c'est votre première connexion :

1. Entrez votre **login** (identifiant)
2. Entrez votre **mot de passe**
3. Cliquez sur le bouton **"Se connecter"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 2.3 Authentification à deux facteurs (2FA)

#### 2.3.1 Configuration initiale du 2FA

Si le 2FA n'est pas encore configuré pour votre compte :

1. Après la connexion, vous serez redirigé vers la page de configuration du 2FA
2. Un **code QR** sera affiché à l'écran
3. Ouvrez votre application d'authentification (Google Authenticator, Microsoft Authenticator, etc.)
4. Scannez le code QR avec votre application
5. Entrez le **code à 6 chiffres** généré par votre application
6. Cliquez sur **"Valider"**

**[CAPTURE: Configuration 2FA avec QR code]**

> **Important** : Conservez votre application d'authentification en sécurité. Sans elle, vous ne pourrez plus vous connecter.

#### 2.3.2 Connexion avec 2FA activé

Une fois le 2FA configuré, à chaque connexion :

1. Entrez votre **login** et **mot de passe**
2. Cliquez sur **"Se connecter"**
3. Entrez le **code à 6 chiffres** de votre application d'authentification
4. Cliquez sur **"Valider"**

**[CAPTURE: Saisie du code 2FA]**

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

**[CAPTURE: Vue d'ensemble de l'interface]**

### 3.2 Menu de navigation (Sidebar)

Le menu latéral gauche contient uniquement :

- **🏢 Agences** : Gestion des agences

> **Note** : Les sections "Utilisateurs", "Logs", "Sauvegardes" et "Paramètres" ne sont pas visibles pour les Super user (réservées aux Super Admin).

**[CAPTURE: Menu de navigation Super user]**

### 3.3 Section utilisateur (bas du menu)

En bas du menu latéral, vous trouverez :

- **Photo de profil** : Votre photo (ou avatar avec initiales)
- **Nom d'utilisateur** : Votre login
- **👤 Mon profil** : Accès à votre profil personnel
- **🚪 Déconnexion** : Déconnexion de l'application

**[CAPTURE: Section utilisateur du menu]**

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

**[CAPTURE: Toggle thème clair/sombre]**

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**[CAPTURE: Champ de recherche]**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 2.3 Authentification à deux facteurs (2FA)

#### 2.3.1 Configuration initiale du 2FA

Si le 2FA n'est pas encore configuré pour votre compte :

1. Après la connexion, vous serez redirigé vers la page de configuration du 2FA
2. Un **code QR** sera affiché à l'écran
3. Ouvrez votre application d'authentification (Google Authenticator, Microsoft Authenticator, etc.)
4. Scannez le code QR avec votre application
5. Entrez le **code à 6 chiffres** généré par votre application
6. Cliquez sur **"Valider"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

> **Important** : Conservez votre application d'authentification en sécurité. Sans elle, vous ne pourrez plus vous connecter.

#### 2.3.2 Connexion avec 2FA activé

Une fois le 2FA configuré, à chaque connexion :

1. Entrez votre **login** et **mot de passe**
2. Cliquez sur **"Se connecter"**
3. Entrez le **code à 6 chiffres** de votre application d'authentification
4. Cliquez sur **"Valider"**

**[CAPTURE: Saisie du code 2FA]**

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

**[CAPTURE: Vue d'ensemble de l'interface]**

### 3.2 Menu de navigation (Sidebar)

Le menu latéral gauche contient uniquement :

- **🏢 Agences** : Gestion des agences

> **Note** : Les sections "Utilisateurs", "Logs", "Sauvegardes" et "Paramètres" ne sont pas visibles pour les Super user (réservées aux Super Admin).

**[CAPTURE: Menu de navigation Super user]**

### 3.3 Section utilisateur (bas du menu)

En bas du menu latéral, vous trouverez :

- **Photo de profil** : Votre photo (ou avatar avec initiales)
- **Nom d'utilisateur** : Votre login
- **👤 Mon profil** : Accès à votre profil personnel
- **🚪 Déconnexion** : Déconnexion de l'application

**[CAPTURE: Section utilisateur du menu]**

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

**[CAPTURE: Toggle thème clair/sombre]**

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**[CAPTURE: Champ de recherche]**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

> **Important** : Conservez votre application d'authentification en sécurité. Sans elle, vous ne pourrez plus vous connecter.

#### 2.3.2 Connexion avec 2FA activé

Une fois le 2FA configuré, à chaque connexion :

1. Entrez votre **login** et **mot de passe**
2. Cliquez sur **"Se connecter"**
3. Entrez le **code à 6 chiffres** de votre application d'authentification
4. Cliquez sur **"Valider"**

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

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

**[CAPTURE: Vue d'ensemble de l'interface]**

### 3.2 Menu de navigation (Sidebar)

Le menu latéral gauche contient uniquement :

- **🏢 Agences** : Gestion des agences

> **Note** : Les sections "Utilisateurs", "Logs", "Sauvegardes" et "Paramètres" ne sont pas visibles pour les Super user (réservées aux Super Admin).

**[CAPTURE: Menu de navigation Super user]**

### 3.3 Section utilisateur (bas du menu)

En bas du menu latéral, vous trouverez :

- **Photo de profil** : Votre photo (ou avatar avec initiales)
- **Nom d'utilisateur** : Votre login
- **👤 Mon profil** : Accès à votre profil personnel
- **🚪 Déconnexion** : Déconnexion de l'application

**[CAPTURE: Section utilisateur du menu]**

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

**[CAPTURE: Toggle thème clair/sombre]**

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**[CAPTURE: Champ de recherche]**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

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

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 3.2 Menu de navigation (Sidebar)

Le menu latéral gauche contient uniquement :

- **🏢 Agences** : Gestion des agences

> **Note** : Les sections "Utilisateurs", "Logs", "Sauvegardes" et "Paramètres" ne sont pas visibles pour les Super user (réservées aux Super Admin).

**[CAPTURE: Menu de navigation Super user]**

### 3.3 Section utilisateur (bas du menu)

En bas du menu latéral, vous trouverez :

- **Photo de profil** : Votre photo (ou avatar avec initiales)
- **Nom d'utilisateur** : Votre login
- **👤 Mon profil** : Accès à votre profil personnel
- **🚪 Déconnexion** : Déconnexion de l'application

**[CAPTURE: Section utilisateur du menu]**

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

**[CAPTURE: Toggle thème clair/sombre]**

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**[CAPTURE: Champ de recherche]**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 3.2 Menu de navigation (Sidebar)

Le menu latéral gauche contient uniquement :

- **🏢 Agences** : Gestion des agences

> **Note** : Les sections "Utilisateurs", "Logs", "Sauvegardes" et "Paramètres" ne sont pas visibles pour les Super user (réservées aux Super Admin).

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 3.3 Section utilisateur (bas du menu)

En bas du menu latéral, vous trouverez :

- **Photo de profil** : Votre photo (ou avatar avec initiales)
- **Nom d'utilisateur** : Votre login
- **👤 Mon profil** : Accès à votre profil personnel
- **🚪 Déconnexion** : Déconnexion de l'application

**[CAPTURE: Section utilisateur du menu]**

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

**[CAPTURE: Toggle thème clair/sombre]**

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**[CAPTURE: Champ de recherche]**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 3.3 Section utilisateur (bas du menu)

En bas du menu latéral, vous trouverez :

- **Photo de profil** : Votre photo (ou avatar avec initiales)
- **Nom d'utilisateur** : Votre login
- **👤 Mon profil** : Accès à votre profil personnel
- **🚪 Déconnexion** : Déconnexion de l'application

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

**[CAPTURE: Toggle thème clair/sombre]**

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**[CAPTURE: Champ de recherche]**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 3.4 Thème clair/sombre

Vous pouvez basculer entre le thème clair et sombre en cliquant sur l'icône de thème dans le menu.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

---

## 4. Gestion des Agences

### 4.1 Vue d'ensemble

La page **Agences** est la page principale de l'application. Elle permet de gérer toutes les agences.

### 4.2 Zone Master (liste des agences)

#### 4.2.1 Recherche d'agences

1. Utilisez le champ de recherche en haut de la liste
2. Tapez le nom de l'agence recherchée
3. La liste se filtre automatiquement

**[CAPTURE: Champ de recherche]**

#### 4.2.2 Filtres par état

Vous pouvez filtrer les agences par état :

- **Tous** : Affiche toutes les agences
- **OK** : Agences en état OK (vert)
- **ALERTE** : Agences en alerte (rouge)
- **INFO** : Agences en information (jaune)
- **FERMÉE** : Agences fermées (gris)

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

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

**[CAPTURE: Filtres par état]**

#### 4.2.3 Actions sur les agences

Pour chaque agence dans la liste, vous pouvez :

- **Sélectionner** : Cliquez sur une agence pour voir ses détails
- **Modifier** : Cliquez sur l'icône ✏️ pour activer le mode édition
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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
- ❌ **Bouton Historique** : Non disponible (réservé aux Super Admin)
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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.4.2 Adresses

##### Ajouter une adresse

1. Activez le mode édition
2. Cliquez sur **"Ajouter une adresse"**
3. Choisissez le mode de saisie :
   - **Recherche API BAN** : Recherche automatique via l'API BAN
   - **Saisie manuelle** : Saisie manuelle des champs
4. Remplissez les champs :
   - **Label** (ex: "Siège social", "Agence principale")
   - **Rue**
   - **Ville**
   - **Code postal**
   - **Pays** (par défaut : France)
5. Cliquez sur **"Enregistrer"**

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.4.3 Contacts

##### Ajouter un contact

1. Activez le mode édition
2. Cliquez sur **"Ajouter un contact"**
3. Remplissez les champs :
   - **Nom du gestionnaire** (obligatoire)
   - **Numéro de poste** (6 chiffres exacts)
   - **Numéro d'agent** (4 chiffres exacts)
   - **Ligne directe** (format : 00 00 00 00 00)
   - **Emails** (un ou plusieurs, format RFC)
   - **Note** (optionnel)
4. Cliquez sur **"Enregistrer"**

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**[CAPTURE: Actions sur une tâche]**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.5.4 Actions sur les tâches

En mode édition, vous pouvez :

- **Modifier** : Cliquez sur l'icône ✏️
- **Clôturer** : Cliquez sur l'icône ✓ pour clôturer une tâche
- ❌ **Supprimer** : Non disponible (réservé aux Super Admin)

> **Note** : Le bouton "Supprimer" n'est pas visible pour les Super user.

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

#### 4.5.5 Restrictions sur les notes de tâches

> **Important** : En tant que Super user, vous pouvez **modifier** les notes des tâches, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes.

Si vous tentez de vider le champ de notes d'une tâche existante, un message d'erreur s'affichera : "Seul le Super Admin peut supprimer les notes des tâches".

#### 4.5.6 Photos dans les tâches

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

> **Important** : En tant que Super user, vous pouvez **modifier** les notes techniques, mais vous **ne pouvez pas les supprimer** (vider le champ). Seul le Super Admin peut supprimer les notes techniques.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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
   - Taille maximale : Configurable par le Super Admin (défaut : 5 MB)
   - Types autorisés : JPEG, PNG uniquement
   - Nombre maximum : Configurable par le Super Admin (défaut : 50 par type)
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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**[CAPTURE: Page Mon profil]**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

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

---

## 5. Mon Profil

### 5.1 Accès au profil

1. Cliquez sur **"👤 Mon profil"** en bas du menu latéral
2. Vous arrivez sur votre page de profil

**
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-**

### 5.2 Informations du profil

La page affiche :

- **Photo de profil** : Cliquez pour changer
- **Login** : Votre identifiant (non modifiable)
- **Rôle** : Votre rôle (non modifiable)
- **2FA** : Statut de l'authentification à deux facteurs

**[CAPTURE: Informations du profil]**

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.2 Informations du profil

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

### 5.3 Changer le mot de passe

1. Cliquez sur **"Changer le mot de passe"**
2. Entrez votre **mot de passe actuel**
3. Entrez votre **nouveau mot de passe**
4. Confirmez le **nouveau mot de passe**
5. Cliquez sur **"Enregistrer"**

**[CAPTURE: Changement de mot de passe]**

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.3 Changer le mot de passe

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

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

Si vous êtes inactif pendant une période proche de l'expiration de votre session :

1. Un dialog d'alerte s'affiche **30 secondes avant** l'expiration
2. Un compte à rebours affiche le temps restant
3. Cliquez sur **"Prolonger la session"** pour rester connecté
4. Si vous ne réagissez pas, vous serez automatiquement déconnecté

**[CAPTURE: Alerte d'expiration de session]**

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 5.4 Gérer le 2FA

#### 5.4.1 Activer le 2FA

1. Si le 2FA n'est pas activé, cliquez sur **"Activer le 2FA"**
2. Scannez le code QR avec votre application d'authentification
3. Entrez le code à 6 chiffres
4. Cliquez sur **"Valider"**

#### 5.4.2 Désactiver le 2FA

1. Si le 2FA est activé, cliquez sur **"Désactiver le 2FA"**
2. Confirmez la désactivation

> **Note** : La désactivation du 2FA nécessite une confirmation pour des raisons de sécurité.

---

## 6. Conseils et Bonnes Pratiques

### 6.1 Sécurité

- **Changez votre mot de passe régulièrement**
- **Activez le 2FA** pour une sécurité renforcée
- **Ne partagez jamais vos identifiants**
- **Déconnectez-vous** lorsque vous avez terminé

### 6.2 Gestion des agences

- **Vérifiez les informations** avant d'enregistrer
- **Utilisez les filtres** pour trouver rapidement les agences
- **Organisez les contacts et PC** par ordre d'importance

### 6.3 Performance

- **Filtrez les listes** pour trouver rapidement les éléments
- **Utilisez la recherche** pour localiser une agence spécifique
- **Réorganisez les contacts et PC** par drag & drop

### 6.4 Limitations

En tant que Super user, vous ne pouvez pas :

- ❌ Supprimer des agences (contactez un Super Admin)
- ❌ Supprimer des tâches (contactez un Super Admin)
- ❌ Supprimer les notes des tâches (contactez un Super Admin)
- ❌ Supprimer les notes techniques (contactez un Super Admin)
- ❌ Accéder aux paramètres de l'application
- ❌ Consulter les logs
- ❌ Gérer les sauvegardes
- ❌ Consulter l'historique des agences

---

## 7. Alerte de Session

### 7.1 Alerte avant expiration

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

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

, '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        **

### 7.2 Prolonger la session

Vous pouvez prolonger votre session de plusieurs façons :

- Cliquer sur **"Prolonger la session"** dans le dialog d'alerte
- Fermer le dialog (prolonge automatiquement la session)
- Effectuer une action (clic, frappe, défilement)

---

## 8. Support et Assistance

### 8.1 En cas de problème

Si vous rencontrez un problème :

1. **Vérifiez votre connexion Internet**
2. **Rafraîchissez la page** (F5)
3. **Vérifiez vos permissions** (rôle Super user)
4. **Contactez votre administrateur système** (Super Admin)

### 8.2 Messages d'erreur courants

- **"Non autorisé"** : Vérifiez que vous êtes connecté et que vous avez les permissions nécessaires
- **"Session expirée"** : Reconnectez-vous
- **"Erreur serveur"** : Contactez votre administrateur système
- **"Seul le Super Admin peut supprimer..."** : Cette action nécessite les droits Super Admin. Contactez votre administrateur.

### 8.3 Besoin d'une fonctionnalité réservée aux Super Admin ?

Si vous avez besoin d'accéder à une fonctionnalité réservée aux Super Admin (suppression d'agence, consultation des logs, etc.), contactez votre administrateur système.

---

**Fin du manuel**

*Dernière mise à jour : 2026-01-31*

