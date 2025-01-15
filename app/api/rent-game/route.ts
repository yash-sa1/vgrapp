import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { customerId, gameTitle } = await request.json()
  
  // In a real application, you would call your Java backend to rent the game
  // For now, we'll just return a mock response
  const success = Math.random() > 0.5

  return NextResponse.json({ 
    message: success ? `Successfully rented ${gameTitle} to customer ${customerId}` : "Failed to rent the game. Please try again."
  })
}

