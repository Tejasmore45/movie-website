import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchMovies, getPopularMovies, IMAGE_BASE_URL, PLACEHOLDER_IMAGE } from '../services/movieService';
import '../styles/HomePage.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  
  const query = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        // Fetch search results
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
      } else {
        // Fetch popular movies by default
        const popularMovies = await getPopularMovies(page);
        setMovies(popularMovies);
      }
    };
    fetchMovies();
  }, [query, page]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{query ? `Results for "${query}"` : 'Popular Movies'}</h1>
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER_IMAGE}
                  className="card-img-top"
                  alt={movie.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {!query && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button className="btn btn-secondary" onClick={() => setPage(prevPage => prevPage + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
