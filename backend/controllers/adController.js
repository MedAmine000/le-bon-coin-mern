const Ad = require("../models/adModel");

// Récupérer toutes les annonces
const getAds = async (req, res) => {
    try {
        const ads = await Ad.find().populate("author", "username email");
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la récupération des annonces", error });
    }
};

// Récupérer une annonce par ID
const getAdById = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id).populate("author", "username email");
        if (!ad) {
            return res.status(404).json({ message: "Annonce non trouvée" });
        }
        res.status(200).json(ad);
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la récupération de l'annonce", error });
    }
};

// Créer une annonce
const createAd = async (req, res) => {
    try {
        const { title, description, category, price } = req.body;

        // Vérification des champs obligatoires
        if (!title || !description || !category || !price) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        // Gestion de l'image
        const image = req.file ? req.file.filename : null;

        // Création de l'annonce
        const newAd = await Ad.create({
            ...req.body,
            image,
            author: req.user.id,
        });

        res.status(201).json({ message: "Annonce créée avec succès", ad: newAd });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'annonce", error });
    }
};

// Mettre à jour une annonce
const updateAd = async (req, res) => {
    try {
        const { title, description, category, price } = req.body;

        // Gestion de l'image
        const image = req.file ? req.file.filename : undefined;

        // Mise à jour de l'annonce
        const updatedAd = await Ad.findByIdAndUpdate(
            req.params.id,
            { title, description, category, price, ...(image && { image }) },
            { new: true }
        );

        if (!updatedAd) {
            return res.status(404).json({ message: "Annonce introuvable" });
        }

        res.status(200).json({ message: "Annonce mise à jour avec succès", ad: updatedAd });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'annonce", error });
    }
};

// Supprimer une annonce
const deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findByIdAndDelete(req.params.id);

        if (!ad) {
            return res.status(404).json({ message: "Annonce introuvable" });
        }

        res.status(200).json({ message: "Annonce supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'annonce", error });
    }
};

module.exports = { getAds, createAd, getAdById, updateAd, deleteAd };
