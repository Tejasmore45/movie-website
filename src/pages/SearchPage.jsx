import React, { useState } from 'react';
import { searchMovies, IMAGE_BASE_URL } from '../services/movieService';
import '../styles/HomePage.css'; // Reuse existing CSS

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // State to track the current page

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return;

    const results = await searchMovies(query, page); // Pass page to search function
    setMovies(results);
  };

  // Update the page and fetch new results
  const handlePageChange = async (newPage) => {
    setPage(newPage);
    const results = await searchMovies(query, newPage);
    setMovies(results);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Search Movies</h1>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card shadow-sm">
              {movie.poster_path ? (
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} className="card-img-top" alt={movie.title} />
              ) : (
                <div className="empty-card">
                  <p>No Image Available</p>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                <a href={`/movie/${movie.id}`} className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {movies.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1} // Disable button on the first page
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button className="btn btn-secondary" onClick={() => handlePageChange(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
