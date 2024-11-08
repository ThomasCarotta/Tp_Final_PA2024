// src/App.jsx
import React, { useState } from "react";
import ListaPeliculas from "./components/ListaPeliculas";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";  // Asegúrate de que este componente es el correcto

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Función para manejar la búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<ListaPeliculas searchQuery={searchQuery} />} />
          <Route path="/pelicula/:id" element={<Movie />} /> {/* Ruta para los detalles de la película */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
