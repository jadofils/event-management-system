// app/api/admin/bookings/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust path as necessary

// Create a new booking
export async function POST(request) {
  try {
    const { userId, eventId, numberOfPlaces } = await request.json();

    // Validate input
    if (!userId || !eventId || !numberOfPlaces) {
      return NextResponse.json(
        { success: false, message: 'Invalid input data' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        eventId,
        dateBooked: new Date(), // Automatically set to current date
        numberOfPlaces,
        status: 'PENDING', // Set default status
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating booking' },
      { status: 500 }
    );
  }
}

// Get all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: { select: { id: true, lastname: true } }, // Include user's lastname
        event: { select: { id: true, title: true } }, // Include event title
      },
    });

    const formattedBookings = bookings.map((booking) => ({
      id: booking.id,
      userId: booking.userId,
      lastname: booking.user.lastname,
      eventId: booking.eventId,
      eventTitle: booking.event.title,
      dateBooked: booking.dateBooked,
      numberOfPlaces: booking.numberOfPlaces,
      status: booking.status,
    }));

    return NextResponse.json(formattedBookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching bookings' },
      { status: 500 }
    );
  }
}
