const mongoose = require("mongoose");
const Ad = require("./models/adModel");
const User = require("./models/userModel");

// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/leboncoin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Exemples d'annonces
const adsData = [
  {
    title: "Appartement à louer",
    description: "Bel appartement spacieux au centre-ville.",
    category: "Immobilier",
    price: 800,
  },
  {
    title: "Voiture d'occasion",
    description: "Voiture bien entretenue, faible kilométrage.",
    category: "Véhicules",
    price: 10000,
  },
  {
    title: "Ordinateur portable",
    description: "Ordinateur performant pour le travail ou les études.",
    category: "Électronique",
    price: 600,
  },
];

const seedDatabase = async () => {
  try {
    // Supprime toutes les annonces existantes
    await Ad.deleteMany();

    // Récupère un utilisateur existant pour associer les annonces
    const user = await User.findOne();
    if (!user) {
      console.error("Aucun utilisateur trouvé. Créez un utilisateur d'abord.");
      process.exit(1);
    }

    // Ajoute l'ID de l'utilisateur aux annonces
    const adsWithUser = adsData.map((ad) => ({ ...ad, author: user._id }));

    // Ajoute les annonces à la base de données
    await Ad.insertMany(adsWithUser);

    console.log("Base de données remplie avec succès !");
    process.exit();
  } catch (error) {
    console.error("Erreur lors du remplissage de la base de données :", error);
    process.exit(1);
  }
};

seedDatabase();
