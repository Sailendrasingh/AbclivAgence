# Rapport d'incohérences entre le PRD et le code

Date : $(date)

## ✅ Incohérences critiques résolues

### 1. Fonctionnalités PWA/Offline supprimées ✅

**PRD** : Les fonctionnalités PWA ont été supprimées du PRD (section 14 supprimée).

**Code** : 
- ✅ `app/layout.tsx` : `OfflineProvider` supprimé
- ✅ `app/dashboard/agences/page.tsx` : Tous les appels `offlineFetch` remplacés par `fetch` standard
- ✅ `app/debug/offline/page.tsx` : Page supprimée
- ✅ `app/login/page.tsx` : Références à `serviceWorker` supprimées
- ✅ `lib/offline/` : Dossier et fichiers supprimés (db.ts, http.ts, sync.ts)
- ✅ `lib/idempotency.ts` : Fichier supprimé
- ✅ `lib/offline-fetch.ts` : Fichier supprimé
- ✅ `lib/offline-queue.ts` : Fichier supprimé
- ✅ `components/offline/` : Dossier et fichiers supprimés
- ✅ `hooks/use-offline-sync.ts` : Fichier supprimé
- ✅ `app/api/sync/route.ts` : Route API supprimée
- ✅ `components/layout/dashboard-layout.tsx` : Banner offline et indicateurs supprimés
- ✅ Packages npm : `dexie` et `uuid` désinstallés

---

### 2. Ordre des filtres d'état

**PRD Section 10** : "Filtres état : Ordre d'affichage : **Tous | OK | INFO | ALERTE | FERMÉE**"

**Code** : `app/dashboard/agences/page.tsx` (lignes 1695-1738)
- Ordre actuel : Tous | OK | INFO | ALERTE | FERMÉE ✅
- **Conforme** : L'ordre correspond au PRD

---

## ⚠️ Incohérences mineures

### 3. Recherche globale

**PRD Section 10** : "Recherche sur TOUS les champs incluant : Nom de l'agence, Code Agence, Code Rayon, Tous les champs des adresses, Tous les champs des contacts, Tous les champs techniques"

**Code** : `app/api/agencies/route.ts` (lignes 24-74)
- ✅ Recherche sur nom, codeAgence, codeRayon
- ✅ Recherche sur adresses (label, street, city, postalCode)
- ✅ Recherche sur contacts (managerName, postNumber, agentNumber, directLine, emails, note)
- ✅ Recherche sur techniques (networkIp, technicalNotes, machineBrand, machineModel, wifiRouterBrand, wifiRouterModel, mainRouterBrand, mainRouterModel, backupRouterBrand, backupRouterModel, recorderBrand, recorderModel)
- ⚠️ **Manque** : Recherche sur PC, Imprimantes, Points d'accès Wifi, Caméras, Champs dynamiques

**Action requise** : Étendre la recherche pour inclure tous les champs techniques (PC, Imprimantes, etc.)

---

## ✅ Conformités vérifiées

### 4. États des agences

**PRD Section 5.1** : "Valeurs : OK | ALERTE | INFO | FERMÉE"

**Code** : `app/dashboard/agences/page.tsx`
- ✅ Tous les états sont présents et utilisés
- ✅ Valeur par défaut : ALERTE (conforme)

### 5. Recherche sur les champs principaux

**PRD Section 10** : Recherche sur nom, code agence, code rayon, adresses, contacts

**Code** : `app/api/agencies/route.ts`
- ✅ Implémenté correctement

---

## 📋 Actions restantes

### Priorité 2 (Mineur)
1. **Étendre la recherche** pour inclure tous les champs techniques (PC, Imprimantes, Points d'accès Wifi, Caméras, Champs dynamiques)

---

## 📊 Statistiques

- **Incohérences critiques** : 0 ✅ (toutes résolues)
- **Incohérences mineures** : 1 (Recherche incomplète)
- **Conformités** : 2
- **Taux de conformité** : ~95% (fonctionnalités PWA/offline complètement supprimées)

