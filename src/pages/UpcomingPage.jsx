import React, { useEffect, useState } from 'react';
import { getUpcomingMovies, IMAGE_BASE_URL } from '../services/movieService';
import '../styles/HomePage.css'; // Reusing the same CSS

function UpcomingPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // State to track the current page

  useEffect(() => {
    const fetchMovies = async () => {
      const upcomingMovies = await getUpcomingMovies(page);
      setMovies(upcomingMovies);
    };
    fetchMovies();
  }, [page]); // Re-run useEffect when page changes

  // Handler for the Next button
  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Handler for the Previous button, with a condition to prevent going below page 1
  const handlePreviousPage = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Upcoming Movies</h1>
      <div className="row">
        {movies.map(movie => (
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
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={page === 1} // Disable button on the first page
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button className="btn btn-secondary" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default UpcomingPage;
