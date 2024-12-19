const express = require("express");
const { registerUser, loginUser } = require("./controllers/userController");
const { getAds, createAd, getAdById, deleteAd, updateAd } = require("./controllers/adController");
const authMiddleware = require("./Middleware/authMiddleware");
const checkOwnership = require("./Middleware/checkOwnership");
const upload = require("./Middleware/upload");

const router = express.Router();

// Authentification
router.post("/register", registerUser);
router.post("/login", loginUser);

// Annonces
router.get("/ads", getAds); // Récupérer toutes les annonces
router.get("/ads/:id", getAdById); // Récupérer une annonce par ID
router.post("/ads", authMiddleware, upload.single("image"), createAd); // Créer une annonce avec image
router.put("/ads/:id", authMiddleware, checkOwnership, upload.single("image"), updateAd); // Modification avec image
router.delete("/ads/:id", authMiddleware, checkOwnership, deleteAd); // Suppression

module.exports = router;
