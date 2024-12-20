import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
  });

  const [passwordError, setPasswordError] = useState("");

  // Valider le mot de passe (au moins 8 caractères, 1 majuscule, 1 chiffre)
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre."
      );
      return;
    }
    if (form.password !== form.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    setPasswordError("");

    try {
      await axios.post("http://localhost:8080/register", form);
      alert("Inscription réussie !");
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        location: "",
      }); // Réinitialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Inscription</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Entrez votre nom d'utilisateur"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Entrez votre email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Téléphone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Entrez votre numéro de téléphone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Localisation
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Entrez votre localisation"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Entrez votre mot de passe"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </div>
            {passwordError && (
              <div className="alert alert-danger" role="alert">
                {passwordError}
              </div>
            )}
            <button type="submit" className="btn btn-success w-100">
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
