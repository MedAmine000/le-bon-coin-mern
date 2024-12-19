const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Inscription
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).send("Tous les champs sont requis");

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send("Cet email est déjà utilisé");

    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de l'inscription", error });
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
