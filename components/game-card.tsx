import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Game } from '@/lib/data'

export function GameCard({ game }: { game: Game }) {
  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <Image
          src={game.imageUrl || "/placeholder.svg"}
          alt={game.title}
          width={150}
          height={200}
          className="w-full h-auto object-cover rounded-md"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{game.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{game.genre}</p>
      </CardContent>
    </Card>
  )
}

