# EduConnect Frontend

Interface utilisateur React pour le système de gestion scolaire EduConnect.

## 🚀 Fonctionnalités

- **Gestion des utilisateurs** : CRUD complet avec gestion des rôles
- **Gestion des élèves** : Inscription, modification, statut de paiement
- **Gestion des classes** : Création et attribution d'enseignants
- **Gestion des cours** : Organisation par classe et enseignant
- **Gestion des notes** : Saisie et calcul automatique des moyennes
- **Gestion des paiements** : Suivi des frais scolaires par trimestre
- **Communications** : Système de messagerie interne
- **Interface responsive** : Compatible mobile et desktop

## 🛠️ Technologies utilisées

- **React 19** avec hooks
- **Material-UI** pour l'interface utilisateur
- **Axios** pour les appels API
- **React Router** pour la navigation
- **Date-fns/Dayjs** pour la gestion des dates
- **Vite** comme bundler

## 📋 Prérequis

- Node.js 16+ 
- npm ou yarn
- Backend EduConnect en cours d'exécution sur `http://localhost:8080`

## 🚀 Installation

1. **Cloner le projet** :
   ```bash
   git clone <repository-url>
   cd educonnect-front
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur** :
   http://localhost:5173

## 📁 Structure du projet

```
src/
├── components/
│   ├── common/              # Composants réutilisables
│   ├── users/               # Gestion des utilisateurs
│   ├── eleves/              # Gestion des élèves
│   ├── classes/             # Gestion des classes
│   ├── cours/               # Gestion des cours
│   ├── notes/               # Gestion des notes
│   ├── paiements/           # Gestion des paiements
│   ├── communications/      # Système de messagerie
│   ├── Dashboard.jsx        # Tableau de bord
│   └── Layout.jsx           # Layout principal
├── services/
│   └── api.js               # Configuration API
├── hooks/
│   └── useNotification.js   # Hooks personnalisés
├── utils/
│   └── constants.js         # Constantes et utilitaires
├── App.jsx                  # Composant principal
└── main.jsx                 # Point d'entrée
```

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Configuration de l'API

Le frontend communique avec le backend via les endpoints :
- `/api/users` - Gestion des utilisateurs
- `/api/eleves` - Gestion des élèves
- `/api/classes` - Gestion des classes
- `/api/cours` - Gestion des cours
- `/api/notes` - Gestion des notes
- `/api/paiements` - Gestion des paiements
- `/api/communications` - Communications
- `/api/roles` - Gestion des rôles

## 📱 Fonctionnalités détaillées

### Tableau de bord
- Vue d'ensemble des statistiques
- Accès rapide aux différentes sections
- Cartes interactives avec compteurs

### Gestion des utilisateurs
- Création/modification/suppression d'utilisateurs
- Attribution de rôles multiples
- Validation des emails et téléphones
- Interface de formulaire avec pré-remplissage

### Gestion des élèves  
- Fiche complète de l'élève
- Gestion du statut de paiement
- Association aux classes
- Sélection de dates avec calendrier

### Gestion des notes
- Saisie de notes par cours et période
- Calcul automatique des moyennes sur 20
- Codes couleur selon les résultats
- Filtrage par élève/cours/période

### Gestion des paiements
- Suivi des frais par trimestre
- Calcul automatique des montants restants
- Statuts visuels (Payé/En attente/En retard)
- Historique des paiements

### Communications
- Système de messagerie interne
- Types de messages (Info/Alerte/Rappel/Convocation)
- Interface de lecture et d'écriture
- Suivi des envois

## 🔒 Sécurité

- Validation côté client des formulaires
- Gestion des erreurs API
- Confirmation pour les suppressions
- Messages d'erreur informatifs

## 🎨 Interface utilisateur

- Design Material Design
- Thème cohérent avec couleurs primaires
- Navigation par sidebar responsive
- Tables avec pagination
- Dialogs modales pour les formulaires
- Snackbars pour les notifications
- Chips colorés pour les statuts

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

### Preview du build

```bash
npm run preview
```

### Déploiement sur serveur web

Le dossier `dist/` contient les fichiers statiques prêts à être déployés sur n'importe quel serveur web (Apache, Nginx, etc.).

## 🐛 Debugging

### Problèmes courants

1. **Erreur de CORS** : Vérifier que le backend autorise les requêtes depuis `http://localhost:5173`

2. **API non disponible** : S'assurer que le backend Spring Boot fonctionne sur le port 8080

3. **Erreurs 404** : Vérifier les URLs des endpoints dans `services/api.js`

### Logs de développement

Les erreurs sont affichées dans :
- Console du navigateur
- Snackbars utilisateur
- Console Node.js (côté serveur Vite)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement

---

**EduConnect Frontend** - Système de gestion scolaire moderne et intuitif

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
