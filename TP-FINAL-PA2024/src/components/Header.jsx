// src/components/Header.jsx
import React, { useState, useEffect } from "react";

const Header = ({ onSearch, onViewChange, viewMode }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch(searchQuery);
        }
    };

    const handleViewChange = (event) => {
        const newView = event.target.value;
        onViewChange(newView);  // Notificar a App.js para cambiar la vista
    };

    return (
        <header style={{ padding: "20px", textAlign: "center", backgroundColor: "#333", color: "white" }}>
            <h1>Buscador de Películas</h1>
            
            {/* Mostrar el buscador solo cuando no estamos en el modo de ver trailers */}
            {viewMode !== "trailers" && (
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Buscar película por título"
                        style={{
                            padding: "10px",
                            width: "300px",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            marginRight: "10px",
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Buscar
                    </button>
                </div>
            )}

            {/* Selector para cambiar entre "Películas" y "Trailers" */}
            <div>
                <select 
                    onChange={handleViewChange} 
                    value={viewMode} 
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        backgroundColor: "#fff",
                    }}
                >
                    <option value="peliculas">Ver Películas</option>
                    <option value="trailers">Ver Trailers</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
