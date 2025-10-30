# 🔧 Guide de Résolution des Problèmes CORS

## 🚨 Problème CORS Détecté

Vous voyez cette erreur car le frontend React (localhost:5173) ne peut pas accéder au backend Spring Boot (localhost:8080) à cause des restrictions CORS.

## ✅ Solutions

### 1. Vérifiez que le Backend est Démarré

```bash
# Vérifiez que Spring Boot fonctionne
curl http://localhost:8080/api/users
# ou ouvrez dans le navigateur
```

### 2. Configuration CORS dans Spring Boot

Ajoutez `@CrossOrigin(origins = "*")` à tous vos contrôleurs :

```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")  // ← Ajoutez cette ligne
public class UserController {
    // ...
}
```

### 3. Configuration CORS Globale (Recommandée)

Créez une classe de configuration :

```java
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### 4. Configuration dans application.properties

Ajoutez dans `src/main/resources/application.properties` :

```properties
# Configuration CORS
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,PATCH,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true

# Configuration du serveur
server.port=8080
```

### 5. Redémarrage Complet

1. **Arrêtez** complètement Spring Boot (Ctrl+C)
2. **Compilez** le projet : `mvn clean compile`
3. **Redémarrez** : `mvn spring-boot:run`
4. **Rechargez** le frontend (F5)

## 🔍 Vérification

### Test Manuel des Endpoints

```bash
# Test des utilisateurs
curl -X GET http://localhost:8080/api/users

# Test des élèves  
curl -X GET http://localhost:8080/api/eleves

# Test des classes
curl -X GET http://localhost:8080/api/classes
```

### Test dans le Navigateur

Ouvrez ces URLs directement :
- http://localhost:8080/api/users
- http://localhost:8080/api/eleves
- http://localhost:8080/api/classes

## 🐛 Diagnostic

### Erreurs Communes

| Erreur | Cause | Solution |
|--------|-------|---------|
| `ERR_NETWORK` | Backend arrêté | Démarrer Spring Boot |
| `CORS policy` | Pas de @CrossOrigin | Ajouter @CrossOrigin |
| `404 Not Found` | Mauvaise URL | Vérifier les @RequestMapping |
| `500 Internal Error` | Erreur backend | Vérifier les logs Spring |

### Vérification de la Configuration

```java
// Dans chaque contrôleur, vérifiez :
@RestController
@RequestMapping("/api/users")  // ← URL correcte
@CrossOrigin(origins = "*")    // ← CORS activé
public class UserController {
    
    @GetMapping  // ← Méthode GET pour getAll()
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        // ...
    }
}
```

## 📋 Checklist de Vérification

- [ ] Spring Boot démarré sur port 8080
- [ ] @CrossOrigin ajouté à tous les contrôleurs  
- [ ] URLs des endpoints correctes (/api/...)
- [ ] Méthodes HTTP correctes (GET, POST, etc.)
- [ ] Pas d'erreurs dans les logs Spring Boot
- [ ] Frontend démarré sur port 5173

## 🚀 Test Final

Une fois la configuration CORS correcte :

1. **Rechargez** le frontend (F5)
2. Les **alertes d'erreur** doivent disparaître
3. Les **données réelles** doivent s'afficher
4. Les **opérations CRUD** doivent fonctionner

## 📞 Support

Si le problème persiste :
1. Vérifiez les **logs de Spring Boot**
2. Vérifiez la **console du navigateur** (F12)
3. Testez les **endpoints directement** avec curl/Postman

**Une fois CORS configuré, votre application sera entièrement fonctionnelle ! 🎉**
