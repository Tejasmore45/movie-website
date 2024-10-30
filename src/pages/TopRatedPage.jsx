import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopRatedMovies, IMAGE_BASE_URL } from '../services/movieService';
import '../styles/HomePage.css'; 

function TopRatedPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const topRatedMovies = await getTopRatedMovies(page);
      setMovies(topRatedMovies);
    };
    fetchMovies();
  }, [page]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Top-Rated Movies</h1>
      <div className="row">
        {movies.map(movie => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card shadow-sm">
              {movie.poster_path ? (
                <Link to={`/movie/${movie.id}`}>
                  <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                </Link>
              ) : (
                <div className="empty-card">
                  <p>No Image Available</p>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
}

export default TopRatedPage;
