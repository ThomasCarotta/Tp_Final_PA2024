// src/components/TrailerPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import getData from "../utils/getData";
import "../styles/TarjetaPelicula.css"; // Asegúrate de tener un archivo de estilos

const TrailerPage = () => {
  const { id } = useParams();
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailersResponse = await getData(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=es-ES`
      );
      const trailers = trailersResponse.results;
      const youtubeTrailer = trailers.find(
        (trailer) => trailer.site === "YouTube" && trailer.type === "Trailer"
      );
      if (youtubeTrailer) {
        setTrailerId(youtubeTrailer.key);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className="trailer-page">
      {trailerId ? (
        <div>
          <iframe
            title="YouTube Trailer"
            src={`https://www.youtube.com/embed/${trailerId}`}
            width="100%"
            height="400"
            allowFullScreen
          />
        </div>
      ) : (
        <p>No trailer available</p>
      )}
      <Link to="/">
        <button className="back-button">Regresar al inicio</button>
      </Link>
    </div>
  );
};

export default TrailerPage;
