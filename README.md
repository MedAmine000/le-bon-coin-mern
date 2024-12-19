# Projet "Le Bon Coin MERN"

Une application MERN (MongoDB, Express, React, Node.js) inspirée de **Le Bon Coin**, permettant aux utilisateurs de poster et gérer des annonces.

## **Fonctionnalités**

1. **Authentification** :
   - Inscription avec nom d'utilisateur, email et mot de passe.
   - Connexion sécurisée avec JWT.
2. **Gestion des annonces** :
   - Ajout, modification, suppression des annonces.
   - Téléversement d'images.
   - Filtrage des annonces par catégorie.
3. **Gestion des droits** :
   - Seuls les auteurs peuvent modifier ou supprimer leurs annonces.
4. **Visualisation détaillée** :
   - Page dédiée pour chaque annonce avec ses détails.

## **Technologies utilisées**

### **Frontend**
- React.js
- Bootstrap pour le style
- Axios pour les requêtes API
- React Router pour la navigation

### **Backend**
- Node.js
- Express.js
- MongoDB avec Mongoose
- Multer pour le téléversement d'images
- JSON Web Token (JWT) pour l'authentification

## **Installation**

1. Clonez le projet :
   ```bash
   git clone <votre-lien-du-dépôt>
   cd BonCoinProjet
   ```
   
Installez les dépendances pour le backend :

   ```bash
cd backend
npm install
```
Créez un fichier .env dans le dossier backend et ajoutez les variables suivantes :

```env

MONGO_URI=mongodb://127.0.0.1:27017/leboncoin
JWT_SECRET=votre_clé_secrète
JWT_EXPIRES_IN=1d
Lancez le serveur backend :
```

```bash

npm start
```

Installez les dépendances pour le frontend :

```bash
cd ../frontend
npm install
```
Lancez le serveur frontend :

```bash

npm start
```
Utilisation
Accédez à l'URL suivante pour utiliser l'application :
Frontend : http://localhost:3000
Backend : http://localhost:8080
