// src/components/TarjetaPelicula.jsx
import React from "react";
import { Link } from "react-router-dom";
import '../styles/TarjetaPelicula.css';

const TarjetaPelicula = ({ id, title, poster_path }) => {
    const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://via.placeholder.com/500x750?text=No+Image+Available";

    return (
        <div className="tarjeta-pelicula">
            <Link to={`/pelicula/${id}`}>
                <img className="poster-pelicula" src={posterUrl} alt={title} />
                <div className="info-pelicula">
                    <h4 className="titulo-pelicula">{title}</h4>
                </div>
            </Link>
        </div>
    );
};

export default TarjetaPelicula;
