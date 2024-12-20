import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/corner.png" // Remplacez par le chemin de votre logo
                        // alt="Logo"
                        style={{ height: "40px", marginRight: "10px" }}
                    />
                    <span
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "bold",
                            fontSize: "24px",
                            color: "#170676",
                        }}
                    >
                        Le Coin
                    </span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated() ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ads">
                                        Annonces
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ads/add">
                                        Ajouter une annonce
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-danger nav-link"
                                        onClick={handleLogout}
                                        style={{ border: "none", background: "none" }}
                                    >
                                        Déconnexion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Inscription
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Connexion
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
