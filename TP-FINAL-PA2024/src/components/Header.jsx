// src/components/Header.jsx
import React, { useState } from "react";

const Header = ({ onSearch }) => {
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

    return (
        <header style={{ padding: "20px", textAlign: "center", backgroundColor: "#333", color: "white" }}>
            <h1>Buscador de Películas</h1>
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
        </header>
    );
};

export default Header;
