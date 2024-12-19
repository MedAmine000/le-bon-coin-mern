import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
                </div>
            </div>
            <ul>
                {filteredAds.map((ad) => (
                    <li key={ad._id}>
                        <h3>{ad.title}</h3>
                        <p>{ad.description}</p>
                        <p>{ad.price} €</p>
                        {ad.image && <img src={`http://localhost:8080/uploads/${ad.image}`} alt={ad.title} style={{ width: "200px" }} />}
                        <button onClick={() => deleteAd(ad._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default AdDetails;
