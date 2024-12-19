import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [userId, setUserId] = useState(""); // ID de l'utilisateur connecté
  const [newAd, setNewAd] = useState({ title: "", description: "", category: "", price: "", image: null });
  const [categoryFilter, setCategoryFilter] = useState(""); // Filtrage par catégorie

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT
      setUserId(decodedToken.id); // Récupérer l'ID de l'utilisateur
    }
  }, []);

  // Récupère les annonces
  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ads");
      setAds(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  // Crée une nouvelle annonce avec image
  const createAd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newAd.title);
    formData.append("description", newAd.description);
    formData.append("category", newAd.category);
    formData.append("price", newAd.price);
    if (newAd.image) {
      formData.append("image", newAd.image);
    }

    try {
      await axios.post("http://localhost:8080/ads", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNewAd({ title: "", description: "", category: "", price: "", image: null });
      fetchAds();
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce :", error);
    }
  };

  // Supprime une annonce
  const deleteAd = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/ads/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAds(); // Recharge les annonces après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Filtre les annonces par catégorie
  const filteredAds = ads.filter((ad) =>
    categoryFilter ? ad.category === categoryFilter : true
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Liste des annonces</h1>

      {/* Formulaire de création d'annonce */}
      <form className="mb-5" onSubmit={createAd}>
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
        <button type="submit" className="btn btn-primary w-100">
          Créer une annonce
        </button>
      </form>

      {/* Filtrage par catégorie */}
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="form-label">
          Filtrer par catégorie :
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          <option value="Immobilier">Immobilier</option>
          <option value="Véhicules">Véhicules</option>
          <option value="Électronique">Électronique</option>
        </select>
      </div>

      {/* Liste des annonces */}
      <ul className="list-group">
        {filteredAds.map((ad) => (
          <li className="list-group-item d-flex justify-content-between align-items-start" key={ad._id}>
            <div>
              <Link to={`/ads/${ad._id}`} className="text-decoration-none text-dark">
                <h5>{ad.title}</h5>
              </Link>
              <p>{ad.price} €</p>
              <p className="text-muted">Catégorie : {ad.category}</p>
              {ad.image && (
                <img
                  src={`http://localhost:8080/uploads/${ad.image}`}
                  alt={ad.title}
                  className="img-fluid"
                  style={{ maxWidth: "200px", maxHeight: "150px" }}
                />
              )}
            </div>
            {ad.author && ad.author._id === userId && (
              <div>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteAd(ad._id)}
                >
                  Supprimer
                </button>
                <Link to={`/ads/${ad._id}/edit`} className="btn btn-secondary">
                  Modifier
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ads;
