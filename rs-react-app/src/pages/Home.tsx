import MovieCard from '../components/MovieCard.tsx';
import { useState, useEffect } from 'react';
import '../css/Home.css';
import { getAll, searchAll } from '../services/api.ts';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getAll();
        setMovies(popularMovies);
      } catch (err) {
        setError('Failed to load Movies');
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  //const movies = getAll()

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResult = await searchAll(searchQuery);
      setMovies(searchResult);
      setError(null);
    } catch (err) {
      setError('Failed to load Movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="">
        <input
          type="text"
          placeholder="Enter Movie Name"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading"> Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
