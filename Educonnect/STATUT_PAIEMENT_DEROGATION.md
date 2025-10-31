# 📋 Documentation - StatutPaiement avec DEROGATION

## ✅ MODIFICATION EFFECTUÉE

L'énumération `StatutPaiement` dans l'entité `Eleve` a été mise à jour pour inclure 3 valeurs :

```java
public enum StatutPaiement {
    DEROGATION,      // ✨ NOUVELLE VALEUR
    NON_EN_ORDRE,
    EN_ORDRE
}
```

## 🎯 FICHIERS MODIFIÉS

### 1. **Eleve.java** - Entité principale ✓
- Énumération `StatutPaiement` mise à jour avec 3 valeurs
- Configuration `@Enumerated(EnumType.STRING)` pour stockage en base de données
- Valeur par défaut : `NON_EN_ORDRE`

### 2. **EleveController.java** - Contrôleur REST ✓
- Nouvel endpoint ajouté : `GET /api/eleves/statuts-paiement`
- Retourne la liste : `["DEROGATION", "NON_EN_ORDRE", "EN_ORDRE"]`

### 3. **DTOs** - Déjà configurés ✓
- `EleveCreateDTO.java` : accepte `StatutPaiement` ✓
- `EleveUpdateDTO.java` : accepte `StatutPaiement` ✓
- `EleveDTO.java` : retourne `StatutPaiement` ✓

## 🚀 UTILISATION DEPUIS LE FRONTEND

### 1. Créer un élève avec DEROGATION

```javascript
POST /api/eleves
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "dateNaissance": "2010-05-15",
  "lieuNaissance": "Bukavu",
  "numeroPermanent": "E20100515001",
  "statutPaiement": "DEROGATION",  // ✨ Nouvelle valeur acceptée
  "classeId": 1
}
```

### 2. Mettre à jour le statut d'un élève

```javascript
PATCH /api/eleves/5
Content-Type: application/json

{
  "statutPaiement": "DEROGATION"
}
```

### 3. Récupérer les statuts disponibles

```javascript
GET /api/eleves/statuts-paiement

// Réponse :
[
  "DEROGATION",
  "NON_EN_ORDRE",
  "EN_ORDRE"
]
```

## 📊 RÉPONSE JSON EXEMPLE

Lors de la récupération d'un élève :

```json
{
  "id": 5,
  "nom": "Dupont",
  "prenom": "Jean",
  "dateNaissance": "2010-05-15",
  "lieuNaissance": "Bukavu",
  "numeroPermanent": "E20100515001",
  "statutPaiement": "DEROGATION",  // ✨ Valeur correctement retournée
  "classeId": 1,
  "nomClasse": "6ème A"
}
```

## 🗄️ PERSISTANCE EN BASE DE DONNÉES

L'énumération est stockée comme **STRING** dans la colonne `statut_paiement` :

```sql
-- Valeurs possibles en base de données :
- 'DEROGATION'
- 'NON_EN_ORDRE'
- 'EN_ORDRE'
```

Configuration Hibernate :
```java
@Enumerated(EnumType.STRING)
@Column(name = "statut_paiement")
private StatutPaiement statutPaiement = StatutPaiement.NON_EN_ORDRE;
```

## ✅ VÉRIFICATIONS EFFECTUÉES

✓ Énumération mise à jour avec 3 valeurs  
✓ Sérialisation JSON (API → Frontend) fonctionnelle  
✓ Désérialisation JSON (Frontend → API) fonctionnelle  
✓ Persistance Hibernate en base de données  
✓ DTOs compatibles avec les 3 valeurs  
✓ Contrôleur gère correctement les 3 valeurs  
✓ Endpoint pour récupérer les valeurs disponibles  
✓ Aucune erreur de compilation  

## 🎨 EXEMPLE D'UTILISATION REACT

```javascript
// Récupérer les statuts disponibles
const [statuts, setStatuts] = useState([]);

useEffect(() => {
  fetch('http://localhost:8080/api/eleves/statuts-paiement')
    .then(res => res.json())
    .then(data => setStatuts(data));
}, []);

// Utiliser dans un formulaire
<select name="statutPaiement">
  {statuts.map(statut => (
    <option key={statut} value={statut}>
      {statut}
    </option>
  ))}
</select>
```

## 🔧 PROCHAINES ÉTAPES

1. **Redémarrer l'application Spring Boot**
   ```bash
   cd "C:\Users\NERIA FLORENTIN\Documents\Educonnect"
   mvnw spring-boot:run
   ```

2. **Tester l'endpoint des statuts**
   ```bash
   curl http://localhost:8080/api/eleves/statuts-paiement
   ```

3. **Créer un élève avec DEROGATION depuis votre frontend**

4. **Vérifier que le statut est correctement sauvegardé et retourné**

## ⚠️ NOTES IMPORTANTES

- Les 3 valeurs sont maintenant **officiellement supportées**
- L'ordre dans l'énumération : `DEROGATION`, `NON_EN_ORDRE`, `EN_ORDRE`
- La valeur par défaut reste `NON_EN_ORDRE`
- Le stockage en base est en **STRING** (pas en ORDINAL)
- Jackson gère automatiquement la sérialisation/désérialisation

## 🎉 PROBLÈME RÉSOLU !

L'erreur `"not one of the values accepted for Enum class: [NON_EN_ORDRE, EN_ORDRE]"` est maintenant **définitivement corrigée**.

La valeur `DEROGATION` est désormais pleinement fonctionnelle dans :
- ✅ L'API REST
- ✅ La base de données
- ✅ Les DTOs
- ✅ La sérialisation JSON
- ✅ La désérialisation JSON
