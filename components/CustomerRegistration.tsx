"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomerRegistration() {
  const [customerName, setCustomerName] = useState('')
  const [customerId, setCustomerId] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/register-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerName }),
    })
    const data = await response.json()
    setCustomerId(data.customerId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="mb-4"
          />
          <Button type="submit">Register</Button>
        </form>
        {customerId && (
          <p className="mt-4">Customer registered with ID: {customerId}</p>
        )}
      </CardContent>
    </Card>
  )
}

