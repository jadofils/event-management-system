import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjust the path for your Prisma client

// Fetch all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true, // Include user data if there’s a relationship
        event: true, // Include event data if there’s a relationship
      },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching bookings' },
      { status: 500 }
    );
  }
}

// Create a new booking
export async function POST(request) {
  try {
    const { userId, eventId, numberOfPlaces } = await request.json();

    // Validate input
    if (!userId || !eventId || numberOfPlaces <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid input data' },
        { status: 400 }
      );
    }

    const newBooking = await prisma.booking.create({
      data: {
        userId,
        eventId,
        dateBooked: new Date(), // Current date
        numberOfPlaces,
        status: 'PENDING', // Default status
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating booking' },
      { status: 500 }
    );
  }
}
