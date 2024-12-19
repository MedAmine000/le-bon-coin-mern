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
