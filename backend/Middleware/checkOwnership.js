const Ad = require("../models/adModel");

const checkOwnership = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: "Annonce introuvable" });
    }

    // Vérifie si l'utilisateur connecté est l'auteur
    if (ad.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès interdit : Vous n'êtes pas l'auteur de cette annonce." });
    }

    next(); // Passe au prochain middleware ou contrôleur
  } catch (error) {
    console.error("Erreur lors de la vérification des droits :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = checkOwnership;
