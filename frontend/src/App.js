import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Ads from "./components/Ads";
import AdDetails from "./components/AdDetails";
import UpdateAd from "./components/UpdateAd";
import AddAd from "./components/AddAd";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes protégées */}
        <Route
          path="/ads"
          element={
            <ProtectedRoute>
              <Ads />
            </ProtectedRoute>
          }
        />
        <Route path="/ads/add" element={<AddAd />} />
        <Route
          path="/ads/:id"
          element={
            <ProtectedRoute>
              <AdDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ads/:id/edit"
          element={
            <ProtectedRoute>
              <UpdateAd />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
