import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjusted path for Prisma client

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
