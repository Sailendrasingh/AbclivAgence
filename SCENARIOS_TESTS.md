# Scénarios de Tests - Application de Gestion des Agences

Ce document liste tous les scénarios de test à implémenter pour valider le bon fonctionnement de l'application selon le PRD.

---

## 📋 Table des matières

1. [Authentification & Sécurité](#1-authentification--sécurité)
2. [Gestion des Agences (CRUD)](#2-gestion-des-agences-crud)
3. [Gestion des Contacts](#3-gestion-des-contacts)
4. [Gestion des Adresses](#4-gestion-des-adresses)
5. [Gestion des Photos](#5-gestion-des-photos)
6. [Données Techniques](#6-données-techniques)
7. [Gestion des Utilisateurs](#7-gestion-des-utilisateurs)
8. [Interface Utilisateur](#8-interface-utilisateur)
9. [Sécurité & OWASP](#9-sécurité--owasp)
10. [Historisation](#10-historisation)
11. [Sauvegardes & Restauration](#11-sauvegardes--restauration)
12. [Paramètres](#12-paramètres)
13. [Logs](#13-logs)

---

## 1. Authentification & Sécurité

### 1.1 Connexion

#### Scénario 1.1.1 : Connexion réussie avec mot de passe
- **Prérequis** : Utilisateur existant avec mot de passe valide
- **Actions** :
  1. Accéder à `/login`
  2. Saisir un login valide
  3. Saisir le mot de passe correct
  4. Cliquer sur "Se connecter"
- **Résultat attendu** :
  - Redirection vers `/dashboard/agences`
  - Session créée
  - Cookie de session présent

#### Scénario 1.1.2 : Connexion échouée - Mot de passe incorrect
- **Prérequis** : Utilisateur existant
- **Actions** :
  1. Accéder à `/login`
  2. Saisir un login valide
  3. Saisir un mot de passe incorrect
  4. Cliquer sur "Se connecter"
- **Résultat attendu** :
  - Message d'erreur affiché
  - Pas de redirection
  - Compteur de tentatives échouées incrémenté

#### Scénario 1.1.3 : Connexion échouée - Utilisateur inexistant
- **Actions** :
  1. Accéder à `/login`
  2. Saisir un login inexistant
  3. Saisir un mot de passe
  4. Cliquer sur "Se connecter"
- **Résultat attendu** :
  - Message d'erreur générique (sécurité)
  - Pas de redirection

#### Scénario 1.1.4 : Connexion avec 2FA activé
- **Prérequis** : Utilisateur avec 2FA activé
- **Actions** :
  1. Se connecter avec login/mot de passe corrects
  2. Saisir le code 2FA valide depuis Google Authenticator
  3. Valider
- **Résultat attendu** :
  - Redirection vers le dashboard
  - Session créée

#### Scénario 1.1.5 : Connexion avec 2FA - Code incorrect
- **Prérequis** : Utilisateur avec 2FA activé
- **Actions** :
  1. Se connecter avec login/mot de passe corrects
  2. Saisir un code 2FA incorrect
  3. Valider
- **Résultat attendu** :
  - Message d'erreur "Code 2FA incorrect"
  - Pas de connexion
  - Compteur de tentatives échouées incrémenté

#### Scénario 1.1.6 : Verrouillage de compte après 5 tentatives
- **Prérequis** : Utilisateur existant
- **Actions** :
  1. Effectuer 5 tentatives de connexion avec mot de passe incorrect
- **Résultat attendu** :
  - Compte verrouillé après la 5ème tentative
  - Message d'erreur indiquant le verrouillage (15 minutes)
  - `lockedUntil` défini dans la base de données
  - `failedLoginAttempts` = 5

#### Scénario 1.1.7 : Rate limiting sur login
- **Actions** :
  1. Effectuer plus de 5 tentatives de connexion depuis la même IP en moins de 15 minutes
- **Résultat attendu** :
  - Blocage temporaire avec message "Trop de tentatives"
  - Code HTTP 429
  - Délai de réessai indiqué

#### Scénario 1.1.8 : Connexion avec compte inactif
- **Prérequis** : Utilisateur avec `active: false`
- **Actions** :
  1. Tenter de se connecter avec cet utilisateur
- **Résultat attendu** :
  - Message d'erreur "Compte désactivé"
  - Pas de connexion

### 1.2 Déconnexion

#### Scénario 1.2.1 : Déconnexion réussie
- **Prérequis** : Utilisateur connecté
- **Actions** :
  1. Cliquer sur "Déconnexion" dans le sidebar
- **Résultat attendu** :
  - Redirection vers `/login`
  - Session supprimée
  - Cookie de session supprimé

### 1.3 Protection des routes

#### Scénario 1.3.1 : Accès non autorisé à une route protégée
- **Actions** :
  1. Accéder directement à `/dashboard/agences` sans être connecté
- **Résultat attendu** :
  - Redirection vers `/login`
  - Message d'erreur si nécessaire

#### Scénario 1.3.2 : Accès avec session expirée
- **Prérequis** : Session expirée (selon timeout configuré)
- **Actions** :
  1. Tenter d'accéder à une route protégée
- **Résultat attendu** :
  - Redirection vers `/login`
  - Message "Session expirée"

---

## 2. Gestion des Agences (CRUD)

### 2.1 Création d'agence

#### Scénario 2.1.1 : Création réussie (Admin/Super Admin)
- **Prérequis** : Utilisateur connecté avec rôle Admin ou Super Admin
- **Actions** :
  1. Cliquer sur "Ajouter" dans le Master
  2. Saisir un nom d'agence
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Agence créée avec état "ALERTE" par défaut
  - Agence visible dans la liste Master
  - Agence sélectionnée automatiquement
  - Statistiques mises à jour

#### Scénario 2.1.2 : Création échouée - Nom vide
- **Prérequis** : Utilisateur Admin/Super Admin
- **Actions** :
  1. Cliquer sur "Ajouter"
  2. Ne pas saisir de nom
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Message d'erreur "Le nom est requis"
  - Agence non créée

#### Scénario 2.1.3 : Création refusée - Rôle User
- **Prérequis** : Utilisateur avec rôle User
- **Actions** :
  1. Tenter d'accéder au bouton "Ajouter"
- **Résultat attendu** :
  - Bouton "Ajouter" non visible

### 2.2 Modification d'agence

#### Scénario 2.2.1 : Modification réussie
- **Prérequis** : Agence existante, utilisateur Admin/Super Admin
- **Actions** :
  1. Cliquer sur "Modifier" dans le Master
  2. Modifier le nom
  3. Modifier l'état (OK, INFO, ALERTE, FERMÉE)
  4. Modifier Code Agence, Code Rayon
  5. Modifier Date ouverture, Date fermeture
  6. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Modifications sauvegardées
  - Historique créé (Super Admin)
  - Statistiques mises à jour si l'état change
  - Mode édition désactivé

#### Scénario 2.2.2 : Modification - Annulation
- **Prérequis** : Mode édition activé
- **Actions** :
  1. Modifier des champs
  2. Cliquer sur "Annuler"
- **Résultat attendu** :
  - Modifications perdues
  - Retour aux valeurs originales
  - Mode édition désactivé

#### Scénario 2.2.3 : Modification - Nom vide
- **Prérequis** : Mode édition activé
- **Actions** :
  1. Vider le champ nom
  2. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Message d'erreur "Le nom est requis"
  - Modifications non sauvegardées

#### Scénario 2.2.4 : Modification refusée - Rôle User
- **Prérequis** : Utilisateur avec rôle User
- **Actions** :
  1. Tenter de voir le bouton "Modifier"
- **Résultat attendu** :
  - Bouton "Modifier" non visible

### 2.3 Suppression d'agence

#### Scénario 2.3.1 : Suppression réussie (Super Admin uniquement)
- **Prérequis** : Agence existante, utilisateur Super Admin
- **Actions** :
  1. Cliquer sur "Supprimer" (icône Trash2) dans le Master
  2. Confirmer la suppression
- **Résultat attendu** :
  - Agence supprimée
  - Agence retirée de la liste
  - Statistiques mises à jour
  - Si agence sélectionnée, sélectionner la première disponible

#### Scénario 2.3.2 : Suppression - Annulation
- **Prérequis** : Utilisateur Super Admin
- **Actions** :
  1. Cliquer sur "Supprimer"
  2. Annuler dans la confirmation
- **Résultat attendu** :
  - Agence non supprimée
  - Dialog fermé

#### Scénario 2.3.3 : Suppression refusée - Rôle Admin
- **Prérequis** : Utilisateur avec rôle Admin
- **Actions** :
  1. Tenter de voir le bouton "Supprimer"
- **Résultat attendu** :
  - Bouton "Supprimer" non visible

### 2.4 Recherche et filtrage

#### Scénario 2.4.1 : Recherche par nom
- **Prérequis** : Plusieurs agences dans la liste
- **Actions** :
  1. Saisir un nom dans le champ "Rechercher"
- **Résultat attendu** :
  - Liste filtrée par nom (debounce 300ms)
  - Résultats mis à jour automatiquement

#### Scénario 2.4.2 : Filtrage par état
- **Prérequis** : Agences avec différents états
- **Actions** :
  1. Cliquer sur un filtre (Tous, OK, INFO, ALERTE, FERMÉE)
- **Résultat attendu** :
   - Liste filtrée par état
   - Bouton du filtre actif mis en évidence

#### Scénario 2.4.3 : Recherche + Filtre combinés
- **Actions** :
  1. Saisir un nom dans la recherche
  2. Sélectionner un filtre d'état
- **Résultat attendu** :
  - Liste filtrée par nom ET état

#### Scénario 2.4.4 : Réinitialisation de la recherche
- **Prérequis** : Recherche active
- **Actions** :
  1. Cliquer sur le bouton X dans le champ recherche
- **Résultat attendu** :
  - Champ recherche vidé
  - Liste complète affichée

### 2.5 Affichage et navigation

#### Scénario 2.5.1 : Sélection d'agence dans le Master
- **Prérequis** : Plusieurs agences dans la liste
- **Actions** :
  1. Cliquer sur une agence dans le Master
- **Résultat attendu** :
  - Agence sélectionnée (fond accent)
  - Détails affichés dans la zone Détails
  - Onglet actif conservé

#### Scénario 2.5.2 : Tri automatique par nom
- **Prérequis** : Agences avec noms variés
- **Résultat attendu** :
  - Agences triées par ordre alphabétique (sensible à la casse, français)

#### Scénario 2.5.3 : Redimensionnement Master/Détails
- **Prérequis** : Mode desktop (≥ 768px)
- **Actions** :
  1. Glisser la barre de redimensionnement
- **Résultat attendu** :
  - Largeur Master ajustée (20% - 60%)
  - Largeur minimale respectée (200px Master, 300px Détails)
  - Largeur sauvegardée dans localStorage
  - Largeur restaurée au rechargement

#### Scénario 2.5.4 : Navigation mobile
- **Prérequis** : Écran < 768px
- **Actions** :
  1. Cliquer sur une agence dans le Master
- **Résultat attendu** :
  - Détails affichés en plein écran
  - Bouton "Retour" visible dans l'en-tête
  - Master masqué

#### Scénario 2.5.5 : Retour au Master (mobile)
- **Prérequis** : Détails affichés sur mobile
- **Actions** :
  1. Cliquer sur le bouton "Retour"
- **Résultat attendu** :
  - Master affiché
  - Détails masqués

---

## 3. Gestion des Contacts

### 3.1 Création de contact

#### Scénario 3.1.1 : Création réussie
- **Prérequis** : Mode édition activé, agence sélectionnée
- **Actions** :
  1. Aller dans l'onglet "Général"
  2. Cliquer sur "Ajouter" dans la section Contacts
  3. Remplir les champs (nom, prénom, fonction, email, téléphone)
  4. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Contact créé
  - Contact visible dans la liste
  - Ordre automatique assigné

#### Scénario 3.1.2 : Création - Email invalide
- **Actions** :
  1. Saisir un email invalide (format incorrect)
  2. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Message d'erreur "Email invalide"
  - Contact non créé

#### Scénario 3.1.3 : Création - Téléphone invalide
- **Actions** :
  1. Saisir un téléphone invalide (format incorrect)
  2. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Message d'erreur "Téléphone invalide"
  - Contact non créé

### 3.2 Modification de contact

#### Scénario 3.2.1 : Modification réussie
- **Prérequis** : Contact existant, mode édition
- **Actions** :
  1. Cliquer sur "Modifier" sur un contact
  2. Modifier les champs
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Modifications sauvegardées
  - Contact mis à jour dans la liste

### 3.3 Suppression de contact

#### Scénario 3.3.1 : Suppression réussie
- **Prérequis** : Contact existant, mode édition
- **Actions** :
  1. Cliquer sur "Supprimer" sur un contact
  2. Confirmer
- **Résultat attendu** :
  - Contact supprimé
  - Contact retiré de la liste

### 3.4 Réorganisation des contacts

#### Scénario 3.4.1 : Réorganisation par glisser-déposer
- **Prérequis** : Plusieurs contacts, mode édition
- **Actions** :
  1. Glisser un contact vers le haut/bas
- **Résultat attendu** :
  - Ordre mis à jour
  - Ordre sauvegardé en base
  - Liste réorganisée visuellement

---

## 4. Gestion des Adresses

### 4.1 Création d'adresse (BAN)

#### Scénario 4.1.1 : Création via API BAN
- **Prérequis** : Mode édition, agence sélectionnée
- **Actions** :
  1. Aller dans l'onglet "Général"
  2. Cliquer sur "Ajouter" dans la section Adresses
  3. Sélectionner mode "BAN"
  4. Saisir une adresse
  5. Sélectionner une adresse dans les suggestions
  6. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Adresse créée avec coordonnées géographiques
  - Adresse visible dans la liste

#### Scénario 4.1.2 : Création manuelle
- **Actions** :
  1. Sélectionner mode "Manuel"
  2. Remplir les champs (label, rue, ville, code postal)
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Adresse créée sans coordonnées
  - Adresse visible dans la liste

### 4.2 Modification d'adresse

#### Scénario 4.2.1 : Modification réussie
- **Prérequis** : Adresse existante, mode édition
- **Actions** :
  1. Cliquer sur "Modifier" sur une adresse
  2. Modifier les champs
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Adresse mise à jour
  - Coordonnées recalculées si mode BAN

### 4.3 Suppression d'adresse

#### Scénario 4.3.1 : Suppression réussie
- **Prérequis** : Adresse existante, mode édition
- **Actions** :
  1. Cliquer sur "Supprimer" sur une adresse
  2. Confirmer
- **Résultat attendu** :
  - Adresse supprimée
  - Adresse retirée de la liste

---

## 5. Gestion des Photos

### 5.1 Upload de photos

#### Scénario 5.1.1 : Upload réussi - Photo principale
- **Prérequis** : Mode édition, agence sélectionnée
- **Actions** :
  1. Aller dans l'onglet "Général"
  2. Cliquer sur "Modifier" sur la photo principale
  3. Sélectionner une image (JPEG/PNG, < 5MB)
  4. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Photo uploadée
  - Photo affichée
  - Date de création EXIF préservée si disponible

#### Scénario 5.1.2 : Upload - Fichier trop volumineux
- **Actions** :
  1. Tenter d'uploader un fichier > 5MB
- **Résultat attendu** :
  - Message d'erreur "Fichier trop volumineux"
  - Upload refusé

#### Scénario 5.1.3 : Upload - Type MIME invalide
- **Actions** :
  1. Tenter d'uploader un fichier non-image (ex: .txt)
- **Résultat attendu** :
  - Message d'erreur "Type de fichier non autorisé"
  - Upload refusé

#### Scénario 5.1.4 : Upload - Validation magic bytes
- **Actions** :
  1. Tenter d'uploader un fichier avec extension .jpg mais contenu non-image
- **Résultat attendu** :
  - Message d'erreur "Fichier corrompu"
  - Upload refusé

### 5.2 Groupes de photos

#### Scénario 5.2.1 : Création de groupe de photos
- **Prérequis** : Mode édition, onglet Photos
- **Actions** :
  1. Cliquer sur "Ajouter un groupe"
  2. Sélectionner un type (Agence, Machine, etc.)
  3. Saisir un titre
  4. Uploader plusieurs photos
  5. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Groupe créé
  - Photos uploadées
  - Groupe visible dans l'onglet correspondant

#### Scénario 5.2.2 : Upload multiple de photos
- **Actions** :
  1. Sélectionner plusieurs fichiers (Ctrl+clic)
  2. Uploader
- **Résultat attendu** :
  - Toutes les photos uploadées
  - Progression affichée

### 5.3 Affichage des photos

#### Scénario 5.3.1 : Lightbox - Ouverture
- **Prérequis** : Photos existantes
- **Actions** :
  1. Cliquer sur une photo
- **Résultat attendu** :
  - Lightbox ouvert
  - Photo en grand format
  - Boutons navigation (précédent/suivant)

#### Scénario 5.3.2 : Lightbox - Navigation
- **Prérequis** : Lightbox ouvert, plusieurs photos
- **Actions** :
  1. Cliquer sur "Suivant" ou "Précédent"
- **Résultat attendu** :
  - Photo suivante/précédente affichée
  - Compteur mis à jour

#### Scénario 5.3.3 : Lightbox - Zoom
- **Prérequis** : Lightbox ouvert
- **Actions** :
  1. Cliquer sur le bouton zoom ou double-cliquer
- **Résultat attendu** :
  - Photo zoomée
  - Possibilité de déplacer (drag)

#### Scénario 5.3.4 : Lightbox - Fermeture
- **Prérequis** : Lightbox ouvert
- **Actions** :
  1. Cliquer sur X ou ESC
- **Résultat attendu** :
  - Lightbox fermé
  - Retour à la vue normale

### 5.4 Modification de groupe

#### Scénario 5.4.1 : Modification titre et date
- **Prérequis** : Groupe existant, mode édition
- **Actions** :
  1. Cliquer sur "Modifier" sur un groupe
  2. Modifier le titre
  3. Modifier la date
  4. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Titre et date mis à jour
  - Groupe mis à jour dans la liste

### 5.5 Suppression de photos

#### Scénario 5.5.1 : Suppression d'une photo
- **Prérequis** : Photo existante, mode édition
- **Actions** :
  1. Cliquer sur "Supprimer" sur une photo
  2. Confirmer
- **Résultat attendu** :
  - Photo supprimée
  - Fichier supprimé du serveur
  - Photo retirée de la liste

#### Scénario 5.5.2 : Suppression d'un groupe
- **Prérequis** : Groupe existant, mode édition
- **Actions** :
  1. Cliquer sur "Supprimer" sur un groupe
  2. Confirmer
- **Résultat attendu** :
  - Groupe supprimé
  - Toutes les photos du groupe supprimées
  - Fichiers supprimés du serveur

---

## 6. Données Techniques

### 6.1 Création de données techniques

#### Scénario 6.1.1 : Création réussie
- **Prérequis** : Mode édition, onglet Technique
- **Actions** :
  1. Cliquer sur "Créer les informations techniques"
  2. Remplir les champs (IP réseau, machine, etc.)
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Données techniques créées
  - Formulaire affiché avec les données

### 6.2 Modification de données techniques

#### Scénario 6.2.1 : Modification réussie
- **Prérequis** : Données techniques existantes, mode édition
- **Actions** :
  1. Modifier les champs dans l'onglet Technique
  2. Cliquer sur "Enregistrer" (dans l'en-tête)
- **Résultat attendu** :
  - Données techniques mises à jour
  - Historique créé pour les notes techniques

#### Scénario 6.2.2 : Validation IP CIDR
- **Actions** :
  1. Saisir une IP réseau au format non-CIDR
  2. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Message d'erreur "L'adresse IP LAN doit être au format CIDR"
  - Modifications non sauvegardées

### 6.3 Gestion des PC

#### Scénario 6.3.1 : Ajout de PC
- **Prérequis** : Données techniques existantes, mode édition
- **Actions** :
  1. Cliquer sur "Ajouter" dans la section PC
  2. Remplir les champs (nom, IP, MAC, etc.)
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - PC créé
  - PC visible dans la liste

#### Scénario 6.3.2 : Modification de PC
- **Prérequis** : PC existant, mode édition
- **Actions** :
  1. Cliquer sur "Modifier" sur un PC
  2. Modifier les champs
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - PC mis à jour

#### Scénario 6.3.3 : Suppression de PC
- **Prérequis** : PC existant, mode édition
- **Actions** :
  1. Cliquer sur "Supprimer" sur un PC
  2. Confirmer
- **Résultat attendu** :
  - PC supprimé

### 6.4 Gestion des Imprimantes

#### Scénario 6.4.1 : Ajout d'imprimante
- **Prérequis** : Données techniques existantes, mode édition
- **Actions** :
  1. Cliquer sur "Ajouter" dans la section Imprimantes
  2. Remplir les champs
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Imprimante créée

### 6.5 Gestion des Points d'accès WiFi

#### Scénario 6.5.1 : Ajout de point d'accès WiFi
- **Prérequis** : Données techniques existantes, mode édition
- **Actions** :
  1. Cliquer sur "Ajouter" dans la section WiFi
  2. Remplir les champs (SSID, mot de passe, etc.)
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Point d'accès créé
  - Mot de passe chiffré en base

#### Scénario 6.5.2 : Affichage/masquage mot de passe WiFi
- **Prérequis** : Point d'accès WiFi existant
- **Actions** :
  1. Cliquer sur l'icône œil pour afficher/masquer le mot de passe
- **Résultat attendu** :
  - Mot de passe affiché/masqué
  - Mot de passe déchiffré correctement

### 6.6 Gestion des Caméras

#### Scénario 6.6.1 : Ajout de caméra
- **Prérequis** : Données techniques existantes, mode édition
- **Actions** :
  1. Cliquer sur "Ajouter" dans la section Caméras
  2. Remplir les champs
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Caméra créée

### 6.7 Champs dynamiques

#### Scénario 6.7.1 : Ajout de champ dynamique
- **Prérequis** : Données techniques existantes, mode édition
- **Actions** :
  1. Cliquer sur "Ajouter" dans la section Champs dynamiques
  2. Saisir un nom et une valeur
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Champ dynamique créé
  - Ordre automatique assigné

#### Scénario 6.7.2 : Réorganisation des champs dynamiques
- **Prérequis** : Plusieurs champs dynamiques, mode édition
- **Actions** :
  1. Glisser-déposer un champ
- **Résultat attendu** :
  - Ordre mis à jour
  - Ordre sauvegardé

### 6.8 Notes techniques

#### Scénario 6.8.1 : Modification des notes techniques
- **Prérequis** : Données techniques existantes, mode édition
- **Actions** :
  1. Modifier le texte dans "Notes techniques"
  2. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Notes sauvegardées
  - Historique créé (version incrémentée)

#### Scénario 6.8.2 : Consultation de l'historique des notes
- **Prérequis** : Notes techniques avec historique
- **Actions** :
  1. Cliquer sur "Historique" dans la section Notes techniques
- **Résultat attendu** :
  - Dialog avec historique affiché
  - Versions listées avec dates et utilisateurs
  - Possibilité de restaurer une version

---

## 7. Gestion des Utilisateurs

### 7.1 Création d'utilisateur (Super Admin uniquement)

#### Scénario 7.1.1 : Création réussie
- **Prérequis** : Utilisateur Super Admin connecté
- **Actions** :
  1. Aller dans "Utilisateurs"
  2. Cliquer sur "Ajouter"
  3. Remplir les champs (login, mot de passe, rôle)
  4. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Utilisateur créé
  - Mot de passe hashé (argon2)
  - Utilisateur visible dans la liste

#### Scénario 7.1.2 : Création - Login déjà existant
- **Actions** :
  1. Tenter de créer un utilisateur avec un login existant
- **Résultat attendu** :
  - Message d'erreur "Login déjà existant"
  - Utilisateur non créé

### 7.2 Modification d'utilisateur

#### Scénario 7.2.1 : Modification réussie
- **Prérequis** : Utilisateur existant, Super Admin
- **Actions** :
  1. Cliquer sur "Modifier" sur un utilisateur
  2. Modifier les champs
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Utilisateur mis à jour
  - Si mot de passe modifié, nouveau hash créé

### 7.3 Activation/Désactivation d'utilisateur

#### Scénario 7.3.1 : Désactivation d'utilisateur
- **Prérequis** : Utilisateur actif, Super Admin
- **Actions** :
  1. Basculer le switch "Actif" sur un utilisateur
- **Résultat attendu** :
  - Utilisateur désactivé (`active: false`)
  - Utilisateur ne peut plus se connecter

### 7.4 Gestion du 2FA

#### Scénario 7.4.1 : Activation 2FA pour un utilisateur
- **Prérequis** : Utilisateur existant, Super Admin
- **Actions** :
  1. Cliquer sur "Activer 2FA" sur un utilisateur
  2. Scanner le QR code avec Google Authenticator
  3. Saisir le code de vérification
  4. Cliquer sur "Activer 2FA"
- **Résultat attendu** :
  - 2FA activé
  - Secret sauvegardé en base
  - Utilisateur doit utiliser 2FA pour se connecter

#### Scénario 7.4.2 : Désactivation 2FA
- **Prérequis** : Utilisateur avec 2FA activé, Super Admin
- **Actions** :
  1. Cliquer sur "Désactiver 2FA"
  2. Confirmer
- **Résultat attendu** :
  - 2FA désactivé
  - Secret supprimé

### 7.5 Mon profil

#### Scénario 7.5.1 : Modification du profil utilisateur
- **Prérequis** : Utilisateur connecté
- **Actions** :
  1. Aller dans "Mon profil"
  2. Cliquer sur "Modifier"
  3. Modifier le login
  4. Modifier le mot de passe (2 fois)
  5. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Profil mis à jour
  - Si mot de passe modifié, nouveau hash créé

#### Scénario 7.5.2 : Modification mot de passe - Mots de passe non identiques
- **Actions** :
  1. Saisir un nouveau mot de passe
  2. Saisir un mot de passe de confirmation différent
  3. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Message d'erreur "Les mots de passe ne correspondent pas"
  - Modifications non sauvegardées

#### Scénario 7.5.3 : Activation 2FA depuis Mon profil
- **Prérequis** : Utilisateur connecté
- **Actions** :
  1. Aller dans "Mon profil"
  2. Cliquer sur "Activer" dans la section 2FA
  3. Scanner le QR code
  4. Saisir le code de vérification
  5. Cliquer sur "Activer 2FA"
- **Résultat attendu** :
  - 2FA activé pour l'utilisateur connecté

---

## 8. Interface Utilisateur

### 8.1 Thèmes

#### Scénario 8.1.1 : Basculer vers thème sombre
- **Actions** :
  1. Cliquer sur le bouton de changement de thème
- **Résultat attendu** :
  - Thème sombre activé
  - Classe `dark` ajoutée sur `<html>`
  - Préférence sauvegardée dans localStorage
  - Interface adaptée au thème sombre

#### Scénario 8.1.2 : Basculer vers thème clair
- **Prérequis** : Thème sombre actif
- **Actions** :
  1. Cliquer sur le bouton de changement de thème
- **Résultat attendu** :
  - Thème clair activé
  - Classe `dark` retirée`
  - Préférence sauvegardée

#### Scénario 8.1.3 : Détection préférence système
- **Prérequis** : Aucune préférence sauvegardée
- **Actions** :
  1. Charger la page
- **Résultat attendu** :
  - Thème détecté depuis `prefers-color-scheme`
  - Thème appliqué automatiquement

### 8.2 Responsive Design

#### Scénario 8.2.1 : Affichage mobile (< 768px)
- **Prérequis** : Écran < 768px
- **Résultat attendu** :
  - Menu burger visible
  - Sidebar masqué par défaut
  - Master en plein écran
  - Textes et espacements adaptés
  - Boutons en largeur complète

#### Scénario 8.2.2 : Affichage desktop (≥ 768px)
- **Prérequis** : Écran ≥ 768px
- **Résultat attendu** :
  - Sidebar visible
  - Master et Détails côte à côte
  - Barre de redimensionnement visible

### 8.3 Navigation

#### Scénario 8.3.1 : Navigation entre pages
- **Actions** :
  1. Cliquer sur différents liens du menu (Agences, Utilisateurs, etc.)
- **Résultat attendu** :
  - Navigation réussie
  - Page active mise en évidence dans le menu
  - Largeur Master/Détails conservée

#### Scénario 8.3.2 : Navigation - Menu masqué selon rôle
- **Prérequis** : Utilisateur avec rôle User
- **Résultat attendu** :
  - Menu "Utilisateurs", "Logs", "Sauvegardes", "Paramètres" non visibles

### 8.4 Onglets

#### Scénario 8.4.1 : Changement d'onglet
- **Prérequis** : Agence sélectionnée
- **Actions** :
  1. Cliquer sur un onglet (Général, Technique, Photos)
- **Résultat attendu** :
  - Contenu de l'onglet affiché
  - Onglet actif mis en évidence
  - Onglet conservé lors du changement d'agence

### 8.5 Statistiques

#### Scénario 8.5.1 : Affichage des statistiques
- **Résultat attendu** :
  - Statistiques affichées dans le header
  - Compteurs OK, INFO, ALERTE, FERMÉE visibles
  - Couleurs correctes (vert, jaune, rouge, gris)
  - Animation d'entrée au chargement

#### Scénario 8.5.2 : Mise à jour automatique des statistiques
- **Prérequis** : Statistiques affichées
- **Actions** :
  1. Changer l'état d'une agence
- **Résultat attendu** :
  - Statistiques mises à jour automatiquement (dans les 2 secondes)
  - Animation rejouée si changement détecté

---

## 9. Sécurité & OWASP

### 9.1 Protection contre les injections

#### Scénario 9.1.1 : Injection SQL
- **Actions** :
  1. Tenter d'injecter du SQL dans un champ (ex: `'; DROP TABLE users; --`)
- **Résultat attendu** :
  - Requête échouée ou échappée
  - Aucune donnée supprimée
  - Prisma protège contre les injections

### 9.2 Protection path traversal

#### Scénario 9.2.1 : Upload avec path traversal
- **Actions** :
  1. Tenter d'uploader un fichier avec un nom contenant `../`
- **Résultat attendu** :
  - Chemin normalisé
  - Fichier sauvegardé dans le dossier autorisé uniquement

### 9.3 Validation des fichiers

#### Scénario 9.3.1 : Upload fichier avec extension falsifiée
- **Actions** :
  1. Renommer un fichier .txt en .jpg et tenter l'upload
- **Résultat attendu** :
  - Validation magic bytes échoue
  - Upload refusé

### 9.4 Rate limiting

#### Scénario 9.4.1 : Rate limiting sur login
- **Actions** :
  1. Effectuer 6+ tentatives de login en moins de 15 minutes
- **Résultat attendu** :
  - Blocage temporaire
  - Code HTTP 429

### 9.5 XSS Protection

#### Scénario 9.5.1 : Injection de script dans un champ
- **Actions** :
  1. Saisir `<script>alert('XSS')</script>` dans un champ texte
- **Résultat attendu** :
  - Script échappé ou filtré
  - Pas d'exécution de script
  - Contenu affiché comme texte

### 9.6 CSRF Protection

#### Scénario 9.6.1 : Requête CSRF
- **Actions** :
  1. Tenter une requête POST depuis un site externe
- **Résultat attendu** :
  - Requête rejetée
  - Protection par cookies SameSite

---

## 10. Historisation

### 10.1 Historique des agences

#### Scénario 10.1.1 : Consultation de l'historique
- **Prérequis** : Agence avec historique, Super Admin
- **Actions** :
  1. Cliquer sur "Historique" dans l'en-tête de l'agence
- **Résultat attendu** :
  - Dialog avec historique affiché
  - Versions listées avec dates et utilisateurs
  - Différences visibles

#### Scénario 10.1.2 : Restauration d'une version
- **Prérequis** : Historique consulté, Super Admin
- **Actions** :
  1. Cliquer sur "Restaurer" sur une version
  2. Confirmer
- **Résultat attendu** :
  - Version restaurée
  - Nouvelle entrée d'historique créée
  - Données de l'agence mises à jour

### 10.2 Historique des notes techniques

#### Scénario 10.2.1 : Consultation de l'historique des notes
- **Prérequis** : Notes techniques avec historique
- **Actions** :
  1. Cliquer sur "Historique" dans la section Notes techniques
- **Résultat attendu** :
  - Dialog avec historique affiché
  - Versions listées

#### Scénario 10.2.2 : Restauration d'une version de notes
- **Prérequis** : Historique des notes consulté
- **Actions** :
  1. Cliquer sur "Restaurer" sur une version
- **Résultat attendu** :
  - Notes restaurées
  - Nouvelle version créée

---

## 11. Sauvegardes & Restauration

### 11.1 Création de sauvegarde

#### Scénario 11.1.1 : Création manuelle de sauvegarde
- **Prérequis** : Super Admin
- **Actions** :
  1. Aller dans "Sauvegardes"
  2. Cliquer sur "Créer une sauvegarde"
  3. Saisir un nom
  4. Cliquer sur "Créer"
- **Résultat attendu** :
  - Sauvegarde créée (fichier ZIP)
  - Sauvegarde visible dans la liste
  - Taille et date affichées

### 11.2 Restauration de sauvegarde

#### Scénario 11.2.1 : Restauration réussie
- **Prérequis** : Sauvegarde existante, Super Admin
- **Actions** :
  1. Cliquer sur "Restaurer" sur une sauvegarde
  2. Confirmer
- **Résultat attendu** :
  - Base de données restaurée
  - Photos restaurées
  - Message de succès

#### Scénario 11.2.2 : Restauration - Fichier corrompu
- **Actions** :
  1. Tenter de restaurer un fichier ZIP corrompu
- **Résultat attendu** :
  - Message d'erreur
  - Restauration échouée

### 11.3 Suppression de sauvegarde

#### Scénario 11.3.1 : Suppression réussie
- **Prérequis** : Sauvegarde existante, Super Admin
- **Actions** :
  1. Cliquer sur "Supprimer" sur une sauvegarde
  2. Confirmer
- **Résultat attendu** :
  - Sauvegarde supprimée
  - Fichier supprimé du serveur

---

## 12. Paramètres

### 12.1 Consultation des paramètres

#### Scénario 12.1.1 : Affichage des paramètres
- **Prérequis** : Utilisateur connecté
- **Actions** :
  1. Aller dans "Paramètres"
- **Résultat attendu** :
  - Paramètres affichés (timeout session, etc.)
  - Valeurs en lecture seule pour non-Super Admin

### 12.2 Modification des paramètres

#### Scénario 12.2.1 : Modification réussie (Super Admin)
- **Prérequis** : Super Admin
- **Actions** :
  1. Modifier le timeout de session
  2. Cliquer sur "Enregistrer"
- **Résultat attendu** :
  - Paramètres sauvegardés
  - Nouveau timeout appliqué

#### Scénario 12.2.2 : Modification refusée (Non-Super Admin)
- **Prérequis** : Utilisateur Admin ou User
- **Actions** :
  1. Tenter de modifier les paramètres
- **Résultat attendu** :
  - Champs en lecture seule
  - Bouton "Enregistrer" non visible

---

## 13. Logs

### 13.1 Consultation des logs

#### Scénario 13.1.1 : Affichage des logs
- **Prérequis** : Super Admin
- **Actions** :
  1. Aller dans "Logs"
- **Résultat attendu** :
  - Logs affichés
  - Filtres disponibles (type, utilisateur, date)
  - Pagination si nécessaire

#### Scénario 13.1.2 : Filtrage des logs
- **Prérequis** : Logs affichés
- **Actions** :
  1. Appliquer des filtres (type, utilisateur, date)
- **Résultat attendu** :
  - Logs filtrés
  - Résultats mis à jour

### 13.2 Export des logs

#### Scénario 13.2.1 : Export CSV
- **Prérequis** : Logs affichés, Super Admin
- **Actions** :
  1. Cliquer sur "Exporter"
- **Résultat attendu** :
  - Fichier CSV téléchargé
  - Tous les logs exportés (ou filtrés)

---

## 📊 Priorisation des Tests

### Phase 1 - Critiques (À implémenter en premier)
- ✅ Authentification (login, 2FA, verrouillage)
- ✅ Sécurité (rate limiting, RBAC, XSS, CSRF)
- ✅ CRUD Agences (création, modification, suppression)
- ✅ Upload fichiers (validation, path traversal)

### Phase 2 - Fonctionnels (Priorité moyenne)
- ✅ Gestion Contacts/Adresses
- ✅ Gestion Photos (upload, lightbox)
- ✅ Données Techniques (CRUD PC, imprimantes, WiFi, caméras)
- ✅ Historisation

### Phase 3 - UI/UX (Priorité basse)
- ✅ Thèmes (clair/sombre)
- ✅ Responsive design
- ✅ Navigation et onglets
- ✅ Statistiques

---

## 🎯 Objectifs de Couverture

- **Tests unitaires** : 80%+ de couverture
- **Tests API** : 100% des routes critiques
- **Tests E2E** : 100% des parcours utilisateur critiques
- **Tests de sécurité** : 100% des vulnérabilités OWASP Top 10

---

## 📝 Notes d'Implémentation

1. **Utiliser les fixtures** : Créer des données de test réutilisables
2. **Isoler les tests** : Chaque test doit être indépendant
3. **Nettoyer après chaque test** : Réinitialiser la base de données
4. **Mocker les dépendances externes** : API BAN, etc.
5. **Tests parallèles** : Utiliser des bases de données séparées par worker
6. **Documenter les tests** : Chaque test doit avoir un nom descriptif

---

**Ce document doit être mis à jour au fur et à mesure de l'implémentation des tests.**

