const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String, default: null }, // Champ pour le chemin ou l'URL de l'image
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  createdAt: { type: Date, default: Date.now },
});

adSchema.index({ location: "2dsphere" }); // Pour activer les requêtes géographiques

module.exports = mongoose.model("Ad", adSchema);
