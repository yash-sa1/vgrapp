import GameList from '@/components/GameList'
import CustomerPanel from '@/components/CustomerPanel'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center py-4">Video Game Rental Store</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameList />
          </div>
          <div>
            <CustomerPanel />
          </div>
        </div>
      </div>
    </main>
  )
}

