import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { customerName } = await request.json()
  
  // In a real application, you would call your Java backend to register the customer
  // For now, we'll just return a mock customer ID
  const customerId = Math.floor(Math.random() * 1000) + 1

  return NextResponse.json({ customerId })
}

