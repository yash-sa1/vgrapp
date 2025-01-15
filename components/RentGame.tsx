"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RentGame() {
  const [customerId, setCustomerId] = useState('')
  const [gameTitle, setGameTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/rent-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerId: parseInt(customerId), gameTitle }),
    })
    const data = await response.json()
    setMessage(data.message)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rent a Game</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter customer ID"
            className="mb-4"
          />
          <Input
            type="text"
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            placeholder="Enter game title"
            className="mb-4"
          />
          <Button type="submit">Rent Game</Button>
        </form>
        {message && (
          <p className="mt-4">{message}</p>
        )}
      </CardContent>
    </Card>
  )
}

