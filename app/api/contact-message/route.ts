import { writeClient } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { naam, email, boodschap } = body

    if (!naam || !email || !boodschap) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create contact message document in Sanity
    const doc = {
      _type: 'contactMessage',
      name: naam,
      email: email,
      message: boodschap,
      submittedAt: new Date().toISOString(),
      read: false,
    }

    const result = await writeClient.create(doc)

    return NextResponse.json(
      { success: true, id: result._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error saving contact message:', error)
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    )
  }
}
