# ModelMock - Mock Data Generator

**ModelMock** est une classe générique conçue pour générer des données fictives basées sur un modèle de données fourni. Elle utilise des fichiers JSON contenant des noms, des adresses, des villes, des rues et des numéros de cartes de crédit pour remplir les champs du modèle, ce qui permet de créer des jeux de données réalistes pour les tests et le prototypage.

## Fonctionnalités

- **Injection de données réalistes** : ModelMock charge des données depuis des fichiers JSON, incluant des noms, adresses, villes, rues, etc.
- **Génération aléatoire** : Crée des valeurs aléatoires pour différents types de données (`string`, `number`, `boolean`, `Date`).
- **Flexible et extensible** : Compatible avec n’importe quel modèle de données.

## Prérequis

Pour utiliser **ModelMock**, vous devez vous assurer : que 

**HttpClient** est bien configuré dans votre application Angular. Vous pouvez l’ajouter dans votre fichier `app.module.ts` ou `app.config.ts` (en mode standalone).


Assurez-vous d'avoir placé les fichiers JSON suivants dans le dossier `assets/data` de votre application :

- `firstname.json` - Contient des noms de personnes
- `address.json` - Contient des adresses
- `city.json` - Contient des villes
- `street.json` - Contient des noms de rues
- `creditcard.json` - Contient des numéros de cartes de crédit fictifs

Vous pouvez télécharger ces fichiers depuis [notre dépôt Git](https://github.com/lemu94/modelMock/tree/master/projects/model-mock/src/data) et les placer dans `assets/data` de votre projet.

## Installation

1. Installez la librairie dans votre projet Angular :

   ```bash
   npm install model-mock

Pour utiliser la classe **ModelMock**, suivez ces étapes :

2. **Créez un modèle de données** - Définissez un modèle de données qui représentera la structure de votre objet. Par exemple :

   ```typescript
   interface UserModel {
     name: string;
     age: number;
     address: string;
     city: string;
     street: string;
     credit_card: string;
   }
   ```
3. **Initialisez une instance de ModelMock** 
Créez une instance de la classe ModelMock en lui passant le modèle de données, puis récupérez des données fictives en appelant la méthode get :
```typescript
import { ModelMock } from "model-mock";

// Exemple de modèle utilisateur vide
const userData: UserModel = {
  name: "",
  age: 0,
  address: "",
  city: "",
  street: "",
  credit_card: ""
};

// Créez une instance de ModelMock
const mock = new ModelMock<UserModel>(userData);

// Récupérez les données fictives
const mockData = mock.get;
console.log(mockData);
```
## Utilisations possibles

 ModelMock peut être utilisé pour :

- **Tester des interfaces utilisateur** : Génère des données réalistes, permettant de tester les interfaces sans dépendre d'une base de données.
- **Génération de rapports de test automatisés** : Crée des scénarios variés pour valider les cas de test.
- **Prototypage rapide** : Fournit des données cohérentes pour les démonstrations et les phases de développement initiales.

## Méthodes principales

- **`createRandomString(key: string)`** : Génère une chaîne de caractères réaliste en fonction du type de champ (nom, adresse, ville, etc.).
- **`createRandomDate()`** : Crée une date aléatoire comprise entre l'année 2000 et la date actuelle.
- **`createListData(count: number)`** : Génère un tableau d'éléments de données fictives selon le modèle de données fourni.
