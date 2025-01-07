const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/test-upload", upload.single("image"), (req, res) => {
  res.status(200).send("Fichier téléversé avec succès");
});

app.listen(3000, () => {
  console.log("Serveur de test Multer démarré sur http://localhost:3000");
});


maitenet je veux ajouter la localisation de l annonces mais d une facon plus precise parceque cette localisation doit permeetre de point sur une carte geographique qu en va developpé apres. mon idee et d ajouter 


