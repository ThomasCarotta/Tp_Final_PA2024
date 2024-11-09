// src/components/Movie.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TarjetaPelicula from './TarjetaPelicula';
import getData from '../utils/getData';
import '../styles/TarjetaPelicula.css';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getData(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>No movie found.</div>;

  return (
    <div className="movie-details">
      <TarjetaPelicula 
        key={movie.id}
        id={movie.id}
        title={movie.title}
        poster_path={movie.poster_path}
      />

      <article className="movie-extra-details">
        <Link to="/">Go back</Link>
        <h3>Summary: <span>{movie.overview || 'None'}</span></h3>
        <h3>Release date: <span>{movie.release_date || 'Unknown'}</span></h3>
        <h3>Rating: <span>{movie.vote_average || 'N/A'}</span></h3>

        {/* Enlace para ver el trailer */}
        <Link to={`/pelicula/${movie.id}/trailer`}>
          <button className="movie-button">Watch trailer</button>
        </Link>
      </article>
    </div>
  );
};

export default Movie;
