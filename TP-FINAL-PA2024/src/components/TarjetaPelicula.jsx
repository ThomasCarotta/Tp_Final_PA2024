// src/components/TarjetaPelicula.jsx
import React from "react";
import "../styles/TarjetaPelicula.css";

const TarjetaPelicula = ({ title, poster_path }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

    return (
        <div className="tarjeta-pelicula">
            <img className="poster-pelicula" src={imageUrl} alt={title} />
            <div className="info-pelicula">
                <p className="titulo-pelicula">{title}</p>
                <button className="btn-ver-mas">Ver más</button>
            </div>
        </div>
    );
};

export default TarjetaPelicula;
