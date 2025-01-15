"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { registerCustomer, rentGame, returnGame, getMyRentals } from '@/lib/api'

export default function CustomerPanel() {
  const [customerName, setCustomerName] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [gameTitle, setGameTitle] = useState('')
  const [rentalId, setRentalId] = useState('')
  const [message, setMessage] = useState('')
  const [rentals, setRentals] = useState<string[]>([])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await registerCustomer(customerName)
      setMessage(`Customer registered successfully! ID: ${result}`)
    } catch (error) {
      setMessage('Failed to register customer. Please try again.')
    }
  }

  const handleRent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await rentGame(parseInt(customerId), gameTitle)
      setMessage(result.message)
    } catch (error) {
      setMessage('Failed to rent game. Please try again.')
    }
  }

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await returnGame(customerName, parseInt(customerId), gameTitle, rentalId)
      setMessage(result.message)
    } catch (error) {
      setMessage('Failed to return game. Please try again.')
    }
  }

  const handleViewRentals = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await getMyRentals(customerId)
      setRentals(result)
      setMessage('Rentals fetched successfully!')
    } catch (error) {
      setMessage('Failed to fetch rentals. Please try again.')
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md text-white">
      <CardHeader>
        <CardTitle>Customer Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="register">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="rent">Rent</TabsTrigger>
            <TabsTrigger value="return">Return</TabsTrigger>
            <TabsTrigger value="view">View Rentals</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="bg-white/20 text-white placeholder-white/50"
              />
              <Button type="submit" className="w-full">Register</Button>
            </form>
          </TabsContent>
          <TabsContent value="rent">
            <form onSubmit={handleRent} className="space-y-4">
              <Input
                type="number"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter customer ID"
                className="bg-white/20 text-white placeholder-white/50"
              />
              <Input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                placeholder="Enter game title"
                className="bg-white/20 text-white placeholder-white/50"
              />
              <Button type="submit" className="w-full">Rent Game</Button>
            </form>
          </TabsContent>
          <TabsContent value="return">
            <form onSubmit={handleReturn} className="space-y-4">
              <Input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="bg-white/20 text-white placeholder-white/50"
              />
              <Input
                type="number"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter customer ID"
                className="bg-white/20 text-white placeholder-white/50"
              />
              <Input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                placeholder="Enter game title"
                className="bg-white/20 text-white placeholder-white/50"
              />
              <Input
                type="text"
                value={rentalId}
                onChange={(e) => setRentalId(e.target.value)}
                placeholder="Enter rental ID"
                className="bg-white/20 text-white placeholder-white/50"
              />
              <Button type="submit" className="w-full">Return Game</Button>
            </form>
          </TabsContent>
          <TabsContent value="view">
            <form onSubmit={handleViewRentals} className="space-y-4">
              <Input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter customer ID"
                className="bg-white/20 text-white placeholder-white/50"
              />
              <Button type="submit" className="w-full">View Rentals</Button>
            </form>
            {rentals.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Your Rentals:</h3>
                <ul className="list-disc pl-5">
                  {rentals.map((rental, index) => (
                    <li key={index}>{rental}</li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>
        {message && (
          <p className="mt-4 text-center">{message}</p>
        )}
      </CardContent>
    </Card>
  )
}

