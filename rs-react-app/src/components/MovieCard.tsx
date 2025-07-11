import '../css/MovieCard.css';

export function MovieCard({
  movie,
}: {
  movie: { firstName: string; release_date: string; image?: string };
}) {
  function onFavClick() {
    alert('clicked');
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.image} alt={movie.firstName} />
        <div className="movie-overlay"></div>
        <button className="favorite-btn" onClick={onFavClick}>
          &hearts;
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.firstName}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
