// AddAd.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: `${process.env.PUBLIC_URL}/goupille-de-localisation.png`,
  iconSize: [25, 41], // Taille de l'icône
  iconAnchor: [12, 41], // Point de l'icône qui correspondra aux coordonnées
  popupAnchor: [1, -34], // Point où la bulle apparaîtra
});
const AddAd = () => {
  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
    latitude: 48.8566, // Par défaut : Paris
    longitude: 2.3522,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newAd.title);
    formData.append("description", newAd.description);
    formData.append("category", newAd.category);
    formData.append("price", newAd.price);
    formData.append("latitude", newAd.latitude);
    formData.append("longitude", newAd.longitude);
    if (newAd.image) {
      formData.append("image", newAd.image);
    }

    try {
      await axios.post("http://localhost:8080/ads", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Annonce créée avec succès !");
      setNewAd({
        title: "",
        description: "",
        category: "",
        price: "",
        image: null,
        latitude: 48.8566,
        longitude: 2.3522,
      });
      navigate("/ads");
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce :", error);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setNewAd({ ...newAd, latitude: e.latlng.lat, longitude: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Créer une Annonce</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Titre"
            value={newAd.title}
            onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={newAd.description}
            onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Catégorie"
            value={newAd.category}
            onChange={(e) => setNewAd({ ...newAd, category: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Prix"
            value={newAd.price}
            onChange={(e) => setNewAd({ ...newAd, price: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setNewAd({ ...newAd, image: e.target.files[0] })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Localisation (Cliquez sur la carte)</label>
          <MapContainer
            center={[newAd.latitude, newAd.longitude]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[newAd.latitude, newAd.longitude]} icon={customIcon} />
            <MapClickHandler />
          </MapContainer>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Créer une annonce
        </button>
      </form>
    </div>
  );
};

export default AddAd;
