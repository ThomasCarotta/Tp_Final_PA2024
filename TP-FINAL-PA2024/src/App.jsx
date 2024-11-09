// src/App.jsx
import React, { useState } from "react";
import ListaPeliculas from "./components/ListaPeliculas";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";
import TrailerPage from "./components/TrailerPage";  // Importar el componente TrailerPage

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("peliculas");  // Estado para controlar la vista (peliculas o trailers)

  // Función para manejar la búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Función para cambiar la vista
  const handleViewChange = (view) => {
    setViewMode(view);
  };

  return (
    <Router>
      <div>
        <Header onSearch={handleSearch} onViewChange={handleViewChange} viewMode={viewMode} />
        <Routes>
          <Route path="/" element={<ListaPeliculas searchQuery={searchQuery} viewMode={viewMode} />} />
          <Route path="/pelicula/:id" element={<Movie />} />
          <Route path="/pelicula/:id/trailer" element={<TrailerPage />} /> {/* Ruta para ver el trailer */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
