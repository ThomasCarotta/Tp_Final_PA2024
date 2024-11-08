// src/components/ListaPeliculas.jsx
import React, { useEffect, useState } from "react";
import TarjetaPelicula from "./TarjetaPelicula";
import getData from "../utils/getData";

const ITEMS_PER_PAGE = 4; // Mostramos 4 películas por página

const ListaPeliculas = ({ searchQuery }) => {
    const [peliculas, setPeliculas] = useState([]); // Estado para almacenar las películas
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas disponibles

    // Función para obtener las películas
    const obtenerPeliculas = async () => {
        try {
            let url = "https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1";
            if (searchQuery) {
                url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=es-ES&page=1`;
            }

            const data = await getData(url);
            setPeliculas(data.results);
            setTotalPaginas(Math.ceil(data.results.length / ITEMS_PER_PAGE)); // Calculamos el número total de páginas
        } catch (error) {
            console.error("Error al obtener las películas:", error);
        }
    };

    // Llamamos a obtener las películas cada vez que el searchQuery cambie
    useEffect(() => {
        obtenerPeliculas();
    }, [searchQuery]); // Reaccionamos al cambio del query

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
                    <TarjetaPelicula
                        key={pelicula.id}
                        title={pelicula.title}
                        poster_path={pelicula.poster_path}
                    />
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
