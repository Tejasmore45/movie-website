import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCast, IMAGE_BASE_URL } from '../services/movieService';
import '../styles/MovieDetailPage.css';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieDetails = await getMovieDetails(id);
      setMovie(movieDetails);
    };

    const fetchMovieCast = async () => {
      const movieCast = await getMovieCast(id);
      setCast(movieCast.slice(0, 5)); // Limit to top 5 cast members
    };

    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
      <div className="row">
        <div className="col-md-4">
          {movie.poster_path ? (
            <img 
              src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
              alt={movie.title} 
              className="img-fluid rounded shadow" 
            />
          ) : (
            <div className="card empty-card shadow">
              <div className="card-body">
                <p className="text-muted">No image available</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>

          <h3>Cast</h3>
          <div className="cast-list d-flex flex-wrap">
            {cast.map((actor) => (
              <div key={actor.cast_id} className="cast-member text-center m-2">
                {actor.profile_path ? (
                  <img 
                    src={`${IMAGE_BASE_URL}${actor.profile_path}`} 
                    alt={actor.name} 
                    className="cast-img rounded-circle mb-2" 
                  />
                ) : (
                  <div className="card empty-card rounded-circle">
                    <div className="card-body">
                      <p className="text-muted">No image available</p>
                    </div>
                  </div>
                )}
                <p className="mb-0"><strong>{actor.name}</strong></p>
                <p className="text-muted">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
