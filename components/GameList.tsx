"use client"

import { useState, useEffect } from 'react';
import { getAllVideoGames } from '@/lib/api';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input, Button } from '@/components/ui/form';
import Image from 'next/image';
import CustomerPanel from '@/components/CustomerPanel';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>('ALL');

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

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
  };

  const genres = ['ALL', ...Array.from(new Set(games.map(game => game.genre)))];
  const filteredGames = selectedGenre && selectedGenre !== 'ALL' ? games.filter(game => game.genre === selectedGenre) : games;

  const genreCounts = games.reduce((acc, game) => {
    acc[game.genre] = (acc[game.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = {
    labels: Object.keys(genreCounts),
    datasets: [
      {
        data: Object.values(genreCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  if (loading) {
    return <div>Loading games...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex">
      <div className="flex-grow p-4">
        <div className="mb-4">
          <Select onValueChange={handleGenreChange} value={selectedGenre}>
            <SelectTrigger className="w-[180px] bg-black text-white rounded-lg">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white rounded-lg">
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-8">
          <Card className="bg-black w-full">
            <CardHeader>
              <CardTitle>Genre Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Pie data={pieData} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map(game => (
            <Card key={game.gameID} className="bg-black rounded-lg">
              <CardHeader>
                <Image src={game.imageUrl} alt={game.title} width={300} height={400} className=" w-full h-64 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <CardTitle>{game.title}</CardTitle>
                <p>Genre: {game.genre}</p>
                <p>Price: ${game.price.toFixed(2)}</p>
                <p>Stock: {game.current_stock}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-1/4 p-4">
        
      </div>
    </div>
  );
}