import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ads/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAd(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce :", error);
      }
    };

    fetchAd();
  }, [id]);

  if (!ad) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h1>{ad.title}</h1>
        </div>
        <div className="card-body">
          <p className="card-text">{ad.description}</p>
          <p className="card-text">
            <strong>Catégorie :</strong> {ad.category}
          </p>
          <p className="card-text">
            <strong>Prix :</strong> {ad.price} €
          </p>
          <p className="card-text">
            <strong>Posté par :</strong> {ad.author.username}
          </p>
          {ad.image && (
            <div className="text-center">
              <img
                src={`http://localhost:8080/uploads/${ad.image}`}
                alt={ad.title}
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </div>
          )}
        </div>
      </div>

      {ad.latitude && ad.longitude && (
        <div className="mt-4">
          <h3 className="text-center">Localisation</h3>
          <MapContainer
            center={[ad.latitude, ad.longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[ad.latitude, ad.longitude]}>
              <Popup>
                {ad.title} <br /> {ad.category}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default AdDetails;
