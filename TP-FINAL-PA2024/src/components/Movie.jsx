// src/components/Movie.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TarjetaPelicula from './TarjetaPelicula';
import getData from '../utils/getData';
import '../styles/TarjetaPelicula.css';

const Movie = () => {
    const { id } = useParams(); // Obtener el id de la película desde la URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerId, setTrailerId] = useState(null);
    const [showingTrailer, setShowingTrailer] = useState(false);

    useEffect(() => {
        console.log("Movie ID: ", id);  // Verificar si el id se obtiene correctamente
        if (!id) {
            console.error("No movie id found!");
            return;
        }

        const fetchMovieDetails = async () => {
            try {
                // Obtener los detalles de la película
                const movieData = await getData(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`);
                setMovie(movieData);

                // Obtener los trailers de la película
                const trailersResponse = await getData(`https://api.themoviedb.org/3/movie/${id}/videos?language=es-ES`);
                const trailers = trailersResponse.results;

                // Buscar un trailer de YouTube
                const youtubeTrailer = trailers.find(trailer => trailer.site === 'YouTube' && trailer.type === 'Trailer');
                if (youtubeTrailer) {
                    setTrailerId(youtubeTrailer.key);
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    // Si está cargando, mostramos un mensaje de carga
    if (loading) {
        return <div>Loading...</div>;
    }

    // Si no se encontró la película
    if (!movie) {
        return <div>No movie found.</div>;
    }

    // Función para mostrar u ocultar el trailer
    const handleShowTrailer = () => {
        setShowingTrailer(!showingTrailer);
    };

    return (
        <div className="movie-details">
            {/* Tarjeta con los detalles básicos de la película */}
            <TarjetaPelicula 
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
            />

            <article className="movie-extra-details">
                <Link to="/">Go back</Link>
                <h3>Summary: <span>{movie.overview || 'None'}</span></h3>
                <h3>Release date: <span>{movie.release_date || 'Unknown or TBA'}</span></h3>
                <h3>Rating: <span>{movie.vote_average || 'N/A'}</span></h3>

                {/* Muestra el trailer si está disponible y se ha solicitado */}
                {showingTrailer && trailerId && (
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginTop: '20px' }}>
                        <iframe
                            title="YouTube trailer"
                            src={`https://www.youtube.com/embed/${trailerId}`}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            allowFullScreen
                        />
                        <button 
                            onClick={handleShowTrailer}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'white',
                                border: 'none',
                                padding: '5px',
                                cursor: 'pointer'
                            }}>
                            Close
                        </button>
                    </div>
                )}

                {/* Si no se está mostrando el trailer, mostramos el botón para verlo */}
                {!showingTrailer && (
                    <button onClick={handleShowTrailer} className="movie-button">Watch trailer</button>
                )}
            </article>
        </div>
    );
};

export default Movie;
