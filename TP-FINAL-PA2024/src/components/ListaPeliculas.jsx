// src/components/ListaPeliculas.jsx
import React, { useEffect, useState } from "react";
import TarjetaPelicula from "./TarjetaPelicula";
import getData from "../utils/getData";

const ITEMS_PER_PAGE = 4;

const ListaPeliculas = ({ searchQuery, viewMode }) => {
    const [peliculas, setPeliculas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    // Función para obtener las películas o trailers
    const obtenerPeliculas = async () => {
        try {
            let url = "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1";
            if (searchQuery) {
                url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=es-ES&page=1`;
            }

            const data = await getData(url);
            setPeliculas(data.results);
            setTotalPaginas(Math.ceil(data.results.length / ITEMS_PER_PAGE));
        } catch (error) {
            console.error("Error al obtener las películas:", error);
        }
    };

    // Función para obtener trailers por película
    const obtenerTrailers = async () => {
        const peliculasConTrailer = await Promise.all(
            peliculas.map(async (pelicula) => {
                const url = `https://api.themoviedb.org/3/movie/${pelicula.id}/videos?language=es-ES`;
                const data = await getData(url);
                const trailer = data.results.find(
                    (video) => video.site === "YouTube" && video.type === "Trailer"
                );
                return { ...pelicula, trailerId: trailer ? trailer.key : null };
            })
        );
        setPeliculas(peliculasConTrailer);
    };

    // Efecto para obtener películas al cambiar el searchQuery o viewMode
    useEffect(() => {
        obtenerPeliculas();
    }, [searchQuery, viewMode]);

    // Efecto para obtener trailers cuando estamos en el modo "trailers"
    useEffect(() => {
        if (viewMode === "trailers") {
            obtenerTrailers();
        }
    }, [viewMode, peliculas]);

    // Calcular el índice de las películas que deben mostrarse
    const indexOfLastPelicula = paginaActual * ITEMS_PER_PAGE;
    const indexOfFirstPelicula = indexOfLastPelicula - ITEMS_PER_PAGE;
    const peliculasActuales = peliculas.slice(indexOfFirstPelicula, indexOfLastPelicula);

    // Funciones para cambiar de página
    const siguientePagina = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    return (
        <div>
            <div className="grilla-peliculas">
                {peliculasActuales.map((pelicula) => (
                    viewMode === "peliculas" ? (
                        <TarjetaPelicula
                            key={pelicula.id}
                            id={pelicula.id}
                            title={pelicula.title}
                            poster_path={pelicula.poster_path}
                        />
                    ) : (
                        pelicula.trailerId && (
                            <div key={pelicula.id} className="trailer-container">
                                <h4>{pelicula.title}</h4>
                                <iframe
                                    title={`Trailer ${pelicula.title}`}
                                    src={`https://www.youtube.com/embed/${pelicula.trailerId}`}
                                    width="100%"
                                    height="400"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </div>
                        )
                    )
                ))}
            </div>

            <div className="paginacion">
                <button onClick={paginaAnterior} disabled={paginaActual === 1}>
                    Anterior
                </button>
                <span>
                    Página {paginaActual} de {totalPaginas}
                </span>
                <button onClick={siguientePagina} disabled={paginaActual === totalPaginas}>
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ListaPeliculas;
