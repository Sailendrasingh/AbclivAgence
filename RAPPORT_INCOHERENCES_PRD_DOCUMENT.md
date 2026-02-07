# Rapport d'incohérences internes du PRD

**Document analysé** : `prd_application_web_gestion_des_agences.md`  
**Date d'analyse** : 2026-02-07  
**Corrections appliquées** : 2026-02-07 (toutes les corrections listées ci-dessous ont été intégrées au PRD)

Ce rapport recense les **incohérences à l'intérieur du PRD** (contradictions, doublons, numérotation, ambiguïtés), sans comparaison au code.

---

## 1. Numérotation des sections

### 1.1 Deux sections "17"
- **Ligne ~1569** : `## 17. Architecture événementielle pour les statistiques`
- **Ligne ~1592** : `## 17. Optimisations de performance React`

**Recommandation** : Renuméroter la deuxième en **18**, et décaler les sections suivantes (18→19, 19→20, … 22→23, 23→24).

### 1.2 Section 15 manquante
- Après **## 14. Sauvegardes** vient directement **## 16. Conformité OWASP Top 10 2021**.
- Il n’existe pas de section 15.

**Recommandation** : Soit ajouter une section 15 (si un thème a été oublié), soit renuméroter à partir de 15 pour combler le trou (16→15, 17→16, etc.).

---

## 2. Sous-sections 11.2.1 et 11.2.2 (Authentification)

- **### 11.2.1 Protection du compte Admin** (ligne ~908) : contenu correct.
- **### 11.2.2 Mon profil** (ligne ~927) : le texte est une **copie de "Protection du compte Admin"** (même liste de protections serveur/client, pas de description de la page Mon profil).
- **### 11.2.1 Mon profil** (ligne ~948) : **bon contenu** (page `/dashboard/profil`, modification login/mot de passe, photo, etc.).

Incohérences :
- Le libellé **11.2.1** est utilisé deux fois (Protection du compte Admin puis Mon profil).
- **11.2.2** est mal renseigné (contenu dupliqué au lieu de "Mon profil").

**Recommandation** :  
- Garder **11.2.1 Protection du compte Admin** et **11.2.2 Mon profil** avec un seul bloc "Mon profil" (celui qui décrit la page dédiée, modification login/mot de passe, photo, API, etc.).  
- Supprimer le bloc 11.2.2 actuel (copie de la protection Admin) et le second 11.2.1 "Mon profil" en ne laissant qu’une sous-section "Mon profil" correcte.

---

## 3. Taille maximale des photos de profil (1 MB vs paramètre global)

- **Section 9, "Types autorisés"** (ligne ~802) :  
  « **Photos de profil** : jpeg, png uniquement **(maximum 1 MB)** ».
- **Section 9, plus bas** (ligne ~806) :  
  « **Taille maximale** : CONFIGURABLE – Utilise le paramètre global **maxImageSizeMB** (par défaut : **5 MB**) ».
- **Section 11.2 Utilisateurs** (ligne ~891) : upload photo de profil « **maximum 1 MB** ».
- **Section 11.2.1 Mon profil** (ligne ~855) : « **maximum 1 MB** ».

Donc :
- Soit les photos de profil sont **fixées à 1 MB** (et alors il ne faut pas dire qu’elles utilisent `maxImageSizeMB` avec défaut 5 MB).
- Soit elles suivent le **paramètre global** (et alors il faut retirer les "maximum 1 MB" et aligner sur `maxImageSizeMB`).

**Recommandation** : Choisir une règle unique (ex. 1 MB dédié aux photos de profil, ou bien toutes les images dont profil avec `maxImageSizeMB`) et harmoniser le PRD en conséquence.

---

## 4. Bloc "Gestion des fichiers orphelins" dupliqué (section 11.5)

Dans **11.5 Paramètres de l'application**, le paragraphe **"Gestion des fichiers orphelins"** (onglet Général) apparaît **deux fois** :
- Premier bloc (avec liste de vérifications incluant `User.photo`, `Agency.photo`, `PhotoGroup.photos`, imprimantes, `Task.photos`, etc.).
- Second bloc identique en structure, avec liste légèrement différente (ordre des références).

**Recommandation** : Supprimer le bloc dupliqué et ne garder qu’une seule description à jour (incluant toutes les références : User, Agency, PhotoGroup, imprimantes, Task, etc.).

---

## 5. Rétention des sauvegardes (10 jours vs 30 jours)

- **Section 14. Sauvegardes** (ligne ~1313) :  
  « **Rétention : 10 jours** » avec nettoyage automatique des sauvegardes de plus de 10 jours.
- **Section 20.7 Tâches automatiques** (ligne ~1802) :  
  « **Rétention : 30 jours (configurable)** ».

Contradiction : 10 jours (fixe) vs 30 jours (configurable).

**Recommandation** : Unifier la règle (par ex. "10 jours par défaut, configurable jusqu’à 30 jours" ou une seule valeur de référence) et mettre à jour les deux sections.

---

## 6. Rôle "Admin" dans la section 16 (OWASP)

- **Section 16.1 A01:2021** (ligne ~1365) :  
  « Contrôle d'accès basé sur les rôles (RBAC) : … (Super Admin, **Admin**, User) ».
- Partout ailleurs dans le PRD, les rôles sont : **Super Admin**, **Super user**, **User**.  
  "Admin" est le **login** du compte initial, pas un rôle.

**Recommandation** : Remplacer "Admin" par "Super user" dans la phrase concernée de la section 16.1.

---

## 7. Dépendance @types/uuid (section 3.0)

- **Section 3.0 devDependencies** (ligne ~104) :  
  « **@types/uuid** (^10.0.0) : Types TypeScript pour uuid **(si utilisé)** ».
- Le rapport `RAPPORT_INCOHERENCES_PRD.md` indique que le package **uuid** a été désinstallé avec la suppression des fonctionnalités PWA/offline.

**Recommandation** : Si `uuid` n’est plus utilisé nulle part, retirer **@types/uuid** de la liste des dépendances autorisées du PRD (et du `package.json` si encore présent).

---

## 8. Section 16 (OWASP) – Taille maximale des fichiers

- **Section 16.8 A08:2021** (ligne ~1493) :  
  « **Taille maximale : 5 MB** » (en dur).
- Ailleurs dans le PRD (sections 9, 11.5, paramètres) : taille max **configurable** via `maxImageSizeMB` (défaut 5 Mo).

**Recommandation** : Remplacer par une formulation du type : « Taille maximale configurable (paramètre `maxImageSizeMB`, défaut 5 MB). »

---

## 9. "Dernière mise à jour" en fin de document

- **Ligne ~1852** : « **Dernière mise à jour** : 2026-01-30 ».
- Plusieurs ajouts dans le PRD sont datés **2026-01-31** (paramètres images, nombre de photos par type/tâche, etc.).

**Recommandation** : Mettre à jour la date (ex. 2026-01-31) ou adopter une formulation du type "Dernière mise à jour majeure : …" pour éviter la contradiction.

---

## 10. Résumé des actions proposées

| Priorité | Incohérence | Action |
|----------|-------------|--------|
| Haute | Deux sections 17 | Renuméroter (17→18, 18→19, …) |
| Haute | Section 15 manquante | Renuméroter à partir de 15 ou ajouter une section 15 |
| Haute | 11.2.1 / 11.2.2 (doublon + mauvais contenu) | Fusionner "Mon profil" en une seule sous-section, supprimer le doublon |
| Haute | Photos de profil 1 MB vs maxImageSizeMB | Décider règle unique et harmoniser le PRD |
| Moyenne | Gestion des fichiers orphelins dupliquée | Supprimer le bloc dupliqué en 11.5 |
| Moyenne | Rétention sauvegardes 10 vs 30 jours | Unifier 10 jours / 30 jours / configurable |
| Moyenne | Rôle "Admin" en 16.1 | Remplacer par "Super user" |
| Basse | @types/uuid | Retirer si uuid n’est plus utilisé |
| Basse | Taille max 5 MB en 16.8 | Préciser "configurable, défaut 5 MB" |
| Basse | Dernière mise à jour | Mettre à jour la date (ex. 2026-01-31) |

---

**Note** : Ce rapport ne traite pas des écarts entre le PRD et le code (voir `RAPPORT_INCOHERENCES_PRD.md` pour la conformité code/PRD).
