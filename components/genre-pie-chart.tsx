"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Game } from '@/lib/data'

interface GenreCount {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C'];

export function GenrePieChart({ games }: { games: Game[] }) {
  const genreCounts = games.reduce((acc, game) => {
    if (game && game.genre) {
      acc[game.genre] = (acc[game.genre] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const data: GenreCount[] = Object.entries(genreCounts).map(([name, value]) => ({ name, value }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Genre Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No data available</p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

