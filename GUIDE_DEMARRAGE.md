# 🚀 Guide de Démarrage Rapide - EduConnect Frontend

## 📋 Prérequis
- ✅ Node.js 16+ installé
- ✅ Backend EduConnect en cours d'exécution sur http://localhost:8080

## 🏃‍♂️ Démarrage Rapide

### Option 1: PowerShell (Recommandé)
```powershell
# Ouvrir PowerShell en tant qu'administrateur dans le dossier
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\start.ps1
```

### Option 2: Manuel
```bash
npm install
npm run dev
```

### Option 3: Fichier Batch
```cmd
double-click sur start.bat
```

## 🌐 Accès à l'Application
Une fois démarré, ouvrez votre navigateur sur:
**http://localhost:5173**

## 🎯 Fonctionnalités Disponibles

### 🏠 Tableau de Bord
- Vue d'ensemble des statistiques
- Accès rapide aux différentes sections

### 👥 Gestion des Utilisateurs
- ➕ Créer un utilisateur avec rôles
- ✏️ Modifier (formulaire pré-rempli)
- 🗑️ Supprimer avec confirmation
- 👁️ Voir les détails

### 🎓 Gestion des Élèves
- ➕ Inscrire un nouvel élève
- ✏️ Modifier les informations
- 📅 Sélecteur de date de naissance
- 💰 Gestion du statut de paiement
- 🏫 Association à une classe

### 🏫 Gestion des Classes
- ➕ Créer une nouvelle classe
- 👨‍🏫 Assigner un enseignant
- 📚 Voir le nombre d'élèves
- 📅 Gestion de l'année scolaire

### 📚 Gestion des Cours
- ➕ Créer un cours
- ⚖️ Définir la pondération
- 🏫 Associer à une classe
- 👨‍🏫 Assigner un enseignant

### 📊 Gestion des Notes
- ➕ Saisir une note
- 🧮 Calcul automatique des moyennes sur 20
- 🎨 Codes couleur selon les résultats
- 📅 Gestion par période (trimestre/semestre)

### 💰 Gestion des Paiements
- ➕ Enregistrer un paiement
- 💳 Suivi des montants (total/payé/restant)
- 📊 Statuts visuels avec codes couleur
- 📅 Gestion par trimestre

### 📢 Communications
- ➕ Envoyer un message
- 📧 Types: Information/Alerte/Rappel/Convocation
- 👁️ Visualiser les détails
- 📅 Historique des envois

## 🎨 Interface Utilisateur

### Navigation
- **Sidebar responsive** avec icônes
- **Menu burger** sur mobile
- **Breadcrumb** pour la navigation

### Formulaires
- **Validation en temps réel**
- **Pré-remplissage automatique** en modification
- **Messages d'erreur informatifs**
- **Confirmation avant suppression**

### Tableaux
- **Recherche et filtres**
- **Pagination automatique**
- **Actions rapides** (Voir/Modifier/Supprimer)
- **Tri par colonnes**

### Notifications
- **Snackbars** pour le feedback
- **Codes couleur** pour les statuts
- **Messages de succès/erreur**

## 🔧 Configuration

### Variables d'environnement (.env)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=EduConnect
VITE_APP_VERSION=1.0.0
```

### Ports par défaut
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080

## 🐛 Résolution de Problèmes

### Erreur CORS
- Vérifier que le backend autorise les requêtes depuis localhost:5173
- Ajouter `@CrossOrigin(origins = "*")` dans les contrôleurs Spring

### API non disponible
- S'assurer que le backend Spring Boot fonctionne
- Vérifier l'URL dans les variables d'environnement

### Erreurs de compilation
```bash
npm install --force
npm run dev
```

### Port déjà utilisé
```bash
npx kill-port 5173
npm run dev
```

## 📱 Responsive Design
- ✅ Desktop (1920x1080+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (320px-768px)

## 🚀 Production

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Déploiement
Les fichiers de production sont dans le dossier `dist/`

## 📞 Support
En cas de problème:
1. Vérifier les logs dans la console du navigateur (F12)
2. Vérifier les logs du serveur Vite
3. Consulter la documentation des erreurs

**Bon développement ! 🎉**
