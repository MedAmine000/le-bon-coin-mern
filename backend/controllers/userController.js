const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Inscription
const registerUser = async (req, res) => {
    const { username, email, password, phone, location } = req.body;

    if (!username || !email || !password || !phone || !location) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.",
        });
    }

    try {
        // Hachage et création de l'utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            phone,
            location,
        });

        res.status(201).json({ message: "Utilisateur inscrit avec succès", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
};

// Connexion
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("Tous les champs sont requis");

        const user = await User.findOne({ email });
        if (!user) return res.status(404).send("Utilisateur introuvable");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Mot de passe incorrect");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la connexion", error });
    }
};

module.exports = { registerUser, loginUser };
