# Rapport du Projet MERN "Le Coin"

## 1. Introduction
Ce projet est une plateforme web inspirée de "Le Bon Coin", développée avec la stack MERN (MongoDB, Express.js, React.js, Node.js). Il permet aux utilisateurs de publier, consulter et gérer des annonces. La plateforme inclut des fonctionnalités avancées comme la géolocalisation, la gestion des images, l'authentification sécurisée, et des filtres pour les annonces.

---

## 2. Fonctionnalités Principales

### Gestion des utilisateurs

- **Inscription** : Les utilisateurs peuvent s'inscrire avec un email, un mot de passe (validation avancée), un numéro de téléphone et une localisation.
- **Connexion** : Accès sécurisé avec authentification par JWT.
- **Déconnexion** : Déconnexion facile depuis la barre de navigation.

### Gestion des annonces

- **Création d'annonces** : Les utilisateurs peuvent créer des annonces en précisant un titre, une description, une catégorie, un prix, une localisation (via une carte interactive) et une image.
- **Mise à jour** : Les annonces peuvent être modifiées par leurs auteurs.
- **Suppression** : Les annonces peuvent être supprimées par leurs auteurs.
- **Géolocalisation** : Les annonces incluent une localisation affichée sur une carte.

### Affichage des annonces

- **Liste des annonces** : Les utilisateurs peuvent parcourir toutes les annonces disponibles.
- **Filtres** : Les annonces peuvent être filtrées par catégorie.
- **Détails d'une annonce** : Affichage détaillé incluant le titre, la description, le prix, la localisation et une image.

### Interface utilisateur

- Barre de navigation intuitive avec accès conditionnel (boutons affichés en fonction de l'état connecté ou non).
- Animation de fond sur la page de connexion.

---

## 3. Technologies Utilisées

### Frontend

- **React.js** : Pour la création des composants d'interface utilisateur.
- **Bootstrap** : Pour le style et les mises en page réactives.
- **React-Leaflet** : Pour l'intégration des cartes interactives.
- **Axios** : Pour les requêtes HTTP.

### Backend

- **Node.js et Express.js** : Pour la gestion des API RESTful.
- **Multer** : Pour la gestion des téléchargements de fichiers (images).
- **JWT** : Pour l'authentification sécurisée.
- **Mongoose** : Pour l'interaction avec la base de données MongoDB.

### Base de données

- **MongoDB** : Stockage des utilisateurs et des annonces.

---

## 4. Structure du Projet

### Frontend

Contient les composants React pour la gestion de l'interface utilisateur.

- **src/components** :
  - **Login.js** : Page de connexion avec animation de fond.
  - **Register.js** : Page d'inscription avec validation des données.
  - **Navbar.js** : Barre de navigation conditionnelle.
  - **AddAd.js** : Formulaire de création d'annonces avec carte interactive.
  - **AdDetails.js** : Page d'affichage détaillé d'une annonce.
  - **Ads.js** : Liste des annonces avec filtres et actions.

### Backend

API RESTful pour la gestion des utilisateurs et des annonces.

- **routes.js** : Définit les routes principales pour les utilisateurs et les annonces.
- **controllers** :
  - **userController.js** : Gestion des utilisateurs.
  - **adController.js** : Gestion des annonces.
- **models** :
  - **userModel.js** : Modèle pour les utilisateurs.
  - **adModel.js** : Modèle pour les annonces avec champ géolocalisation.
- **middlewares** :
  - **authMiddleware.js** : Vérification des jetons JWT.
  - **upload.js** : Gestion des téléchargements d'images.

---

## 5. Points Techniques

### Géolocalisation

- Intégration d'une carte interactive via React-Leaflet.
- Les utilisateurs sélectionnent un point sur la carte pour définir la localisation de leur annonce.

### Téléchargement et gestion des images

- Les images sont stockées dans un dossier `uploads` et associées aux annonces.

### Authentification

- Utilisation de JWT pour sécuriser les routes sensibles.

### Validation des données

- Validation des champs côté client et serveur pour s'assurer de la cohérence des données.

---

## 6. Instructions d'Exécution

### Backend

1. Naviguez dans le dossier **backend**.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur :
   ```bash
   npm start
   ```

### Frontend

1. Naviguez dans le dossier **frontend**.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez l'application :
   ```bash
   npm start
   ```

### Base de données

- Assurez-vous que MongoDB est en cours d'exécution.
- Les collections nécessaires (**users**, **ads**) seront créées automatiquement.

---

## 7. Démo Vidéo

- La vidéo attachée montre le fonctionnement global du site, y compris la gestion des utilisateurs, la création et l'affichage des annonces avec géolocalisation et images.

---

## 8. Améliorations Futures

- Ajouter une recherche avancée par mots-clés.
- Permettre le tri des annonces par prix ou date.
- Ajouter un tableau de bord pour la gestion des annonces par l'utilisateur.
- Améliorer la sécurité avec une validation encore plus stricte des fichiers et des données.

---

Fin du rapport.
