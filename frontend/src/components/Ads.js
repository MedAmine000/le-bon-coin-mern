// Ads.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [userId, setUserId] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ads");
      setAds(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  const deleteAd = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/ads/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAds();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const filteredAds = ads.filter((ad) =>
    categoryFilter ? ad.category === categoryFilter : true
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center">Liste des Annonces</h1>
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
      <ul className="list-group">
        {filteredAds.map((ad) => (
          <li className="list-group-item" key={ad._id}>
            <div>
              <Link to={`/ads/${ad._id}`} className="text-decoration-none">
                <h5>{ad.title}</h5>
              </Link>
              <p>{ad.price} €</p>
              <p className="text-muted">Catégorie : {ad.category}</p>
              {ad.image && (
                <img
                  src={`http://localhost:8080/uploads/${ad.image}`}
                  alt={ad.title}
                  style={{ width: "150px" }}
                />
              )}
            </div>
            {ad.author && ad.author._id === userId && (
              <div>
                <button
                  className="btn btn-danger"
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
