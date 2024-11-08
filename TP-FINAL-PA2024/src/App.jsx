// src/App.jsx
import React, { useState } from "react";
import ListaPeliculas from "./components/ListaPeliculas";
import Header from "./components/Header";

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Función para manejar la búsqueda
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <ListaPeliculas searchQuery={searchQuery} /> {/* Pasamos el searchQuery a ListaPeliculas */}
        </div>
    );
};

export default App;
