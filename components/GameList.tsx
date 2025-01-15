"use client"

import React, { useState, useEffect } from 'react';
import { getAllVideoGames } from '@/lib/api';

interface Game {
  title: string;
  genre: string;
  price: number;
  current_stock: number;
  gameID: number;
  imageUrl: string;
}

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoGames = async () => {
      const response = await getAllVideoGames();
      if (response == null) {
        console.error('Failed to fetch video games: response is null');
        setError('Failed to fetch video games');
      } else if (response.data) {
        console.log('Response data:', response.data);
        setGames(response.data);
        setFilteredGames(response.data);
      } else {
        console.warn('No data received in response');
      }
      setLoading(false);
    };
    fetchVideoGames();
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    if (genre === 'All') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => game.genre.toLowerCase() === genre.toLowerCase()));
    }
  };

  if (loading) {
    return <div>Loading games...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div style={{ margin: '20px' }}>
        <label htmlFor="genre-select" style={{ marginRight: '10px' }}>Filter by genre:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={handleGenreChange}
          style={{ padding: '10px', fontSize: '1em' }}
        >
          <option value="All">All</option>
          {Array.from(new Set(games.map((game) => game.genre))).map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      {filteredGames.map((game) => (
        <div
          key={game.gameID}
          style={{
            margin: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            display: 'inline-block',
            width: '200px'
          }}
        >
          <img src={game.imageUrl} alt={game.title} style={{ width: '100%', height: 'auto' }} />
          <h2 style={{ fontFamily: 'Arial', fontSize: '1.5em', margin: '10px 0' }}>{game.title}</h2>
          <p>Genre: {game.genre}</p>
          <p>Price: {game.price}</p>
          <p>Stock: {game.current_stock}</p>
          <button
            onClick={() => console.log(`Selected game: ${game.title}`)}
            disabled={game.current_stock === 0}
            style={{ padding: '10px 20px', fontSize: '1em' }}
          >
            Rent
          </button>
          {game.current_stock === 0 && <p style={{ color: 'red', margin: '10px 0' }}>Out of stock</p>}
        </div>
      ))}
    </div>
  );
}

