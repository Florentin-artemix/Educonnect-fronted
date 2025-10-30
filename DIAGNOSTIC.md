# 🔧 Guide de Diagnostic EduConnect

## 🎯 État Actuel du Système

### ✅ Composants Fonctionnels
- **Frontend React** : Opérationnel sur port 5173
- **Interface utilisateur** : Toutes les pages CRUD créées
- **Navigation** : Menu latéral avec 8 modules + diagnostic
- **Design** : Interface Material-UI moderne et responsive

### ⚠️ Configuration Requise

#### 1. Backend Spring Boot
**Status : À configurer**
- Port : 8080
- Commande : `mvn spring-boot:run` dans le dossier Educonnect/
- Vérification : http://localhost:8080/api/users

#### 2. Configuration CORS
**Status : Requise pour la communication Frontend ↔ Backend**

**Solution A - Annotations par contrôleur :**
```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    // ... vos méthodes
}
```

**Solution B - Configuration globale (Recommandée) :**
Copiez le fichier `backend-config/CorsConfig.java` dans votre projet Spring Boot :
```
src/main/java/com/educonnect/Educonnect/config/CorsConfig.java
```

## 🚀 Démarrage Complet

### Étape 1 : Backend
```bash
cd Educonnect
mvn clean install
mvn spring-boot:run
```

### Étape 2 : Frontend
```bash
cd educonnect-front
npm run dev
```

### Étape 3 : Vérification
1. Accédez à http://localhost:5173
2. Cliquez sur "Diagnostic" dans le menu
3. Vérifiez que tous les points sont verts ✅

## 🔍 Page de Diagnostic

Une nouvelle page de diagnostic est disponible dans l'application :
- **Navigation** : Menu → Diagnostic
- **URL** : http://localhost:5173/status
- **Fonctionnalités** :
  - Test automatique de tous les endpoints
  - Détection des erreurs CORS
  - Solutions automatiques suggérées
  - Informations système complètes

## 📋 Fonctionnalités Disponibles

### Modules CRUD Complets :
1. **Utilisateurs** : Création, modification, suppression avec gestion des rôles
2. **Élèves** : Gestion complète avec dates et statuts de paiement
3. **Classes** : Organisation des classes avec niveaux
4. **Cours** : Planning et matières
5. **Notes** : Évaluation avec trimestres
6. **Paiements** : Suivi financier
7. **Communications** : Messages et annonces

### Fonctionnalités Avancées :
- **Pré-remplissage** : Les formulaires de modification se remplissent automatiquement
- **Validation** : Contrôles de saisie intégrés
- **Recherche** : Filtrage dans toutes les listes
- **Responsive** : Adaptation mobile et desktop
- **Gestion d'erreurs** : Messages informatifs et fallback

## 🛠️ Résolution de Problèmes

### Erreur "Network Error" ou CORS
1. Vérifiez que Spring Boot fonctionne sur port 8080
2. Ajoutez la configuration CORS (voir ci-dessus)
3. Redémarrez les deux serveurs

### Erreur "Cannot GET /api/..."
1. Vérifiez vos contrôleurs Spring Boot
2. Confirmez les annotations @RestController et @RequestMapping
3. Vérifiez la structure des URLs

### Interface ne se charge pas
1. Vérifiez que Vite fonctionne sur port 5173
2. Ouvrez la console développeur (F12)
3. Utilisez la page diagnostic intégrée

## 📞 Support

En cas de problème :
1. Consultez la page diagnostic : http://localhost:5173/status
2. Vérifiez les logs dans la console développeur
3. Redémarrez les deux serveurs si nécessaire

---

**Note** : Ce système est entièrement fonctionnel une fois la configuration CORS appliquée au backend Spring Boot.
