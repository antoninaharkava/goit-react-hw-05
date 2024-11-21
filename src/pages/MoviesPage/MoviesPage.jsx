import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import searchMovies from "../../searchMovies";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("query") || ""; 
  const [searchMovie, setSearchMovie] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();
    if (newQuery === "") return;

    setSearchParams({ query: newQuery }); 
  };

  useEffect(() => {
    if (!queryFromUrl) return;

    const fetchMoviesSearch = async () => {
      try {
        const searchResults = await searchMovies("search", queryFromUrl);
        setSearchMovie(searchResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchMoviesSearch();
  }, [queryFromUrl]); 

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          defaultValue={queryFromUrl} 
        />
        <button type="submit">Search</button>
      </form>
      <MovieList listMovie={searchMovie} query={queryFromUrl} />
    </div>
  );
};

export default MoviesPage;
