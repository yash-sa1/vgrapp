"use client"

import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoGames = async () => {
      try {
        const data = await getAllVideoGames();
        setGames(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video games:', error);
        setError('Failed to fetch video games');
        setLoading(false);
      }
    };
    fetchVideoGames();
  }, []);

  if (loading) {
    return <div>Loading games...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {games.map(game => (
        <div key={game.gameID}>
          <p>Title: {game.title}</p>
          <p>Genre: {game.genre}</p>
          <p>Price: ${game.price.toFixed(2)}</p>
          <p>Stock: {game.current_stock}</p>
          <p>Image URL: {game.imageUrl}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
