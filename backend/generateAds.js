const mongoose = require("mongoose");
const Ad = require("./models/adModel"); // Assurez-vous que le chemin est correct vers votre modèle d'annonce

// Connectez-vous à MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/leboncoin", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur de connexion à MongoDB :", err));

// Exemples de publicités à insérer
const ads = [
  {
    title: "Appartement à louer",
    description: "Bel appartement au centre-ville, proche des commodités.",
    category: "Immobilier",
    price: 1200,
    location: {
        coordinates: [2.3522, 48.8566], // Exemple : Lille (longitude, latitude)
      },
 
    image: "appartement.jpg",
    author: "6763dfad7b3f534e32e81c2d", // Remplacez par un ID utilisateur valide
  },
  {
    title: "Voiture d'occasion",
    description: "Voiture en bon état, révision récente.",
    category: "Véhicules",
    price: 8000,
    location: {
        coordinates: [2.2945, 48.8584], // Exemple : Lille (longitude, latitude)
      },
 
    image: "voiture.jpg",
    author: "6763dfad7b3f534e32e81c2d", // Remplacez par un ID utilisateur valide
  },
  {
    title: "Téléphone dernier cri",
    description: "Téléphone neuf, encore sous garantie.",
    category: "Électronique",
    price: 900,
    location: {
        coordinates: [5.3698, 43.2965], // Exemple : Lille (longitude, latitude)
      },

    image: "telephone.jpg",
    author: "6763dfad7b3f534e32e81c2d", // Remplacez par un ID utilisateur valide
  },
  {
    title: "Maison de campagne",
    description: "Maison spacieuse avec grand jardin.",
    category: "Immobilier",
    price: 250000,
    location: {
        coordinates: [4.8357, 45.764], // Exemple : Lille (longitude, latitude)
      },

    image: "maison.jpg",
    author: "6763dfad7b3f534e32e81c2d", //6763dfad7b3f534e32e81c2d Remplacez par un ID utilisateur valide
  },
];

// Insérer les publicités dans la base de données
const generateAds = async () => {
  try {
    await Ad.insertMany(ads);
    console.log("✅ Publicités générées avec succès !");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion des publicités :", error);
    mongoose.connection.close();
  }
};

generateAds();
