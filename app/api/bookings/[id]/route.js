import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjusted path for Prisma client

// GET: Retrieve all bookings for a specific user
export async function GET(request, { params }) {
  try {
    const userId = params.userId; // Extract userId from the URL parameters

    // Fetch bookings for the specified user
    const bookings = await prisma.booking.findMany({
      where: {
        userId, // Assuming userId is the foreign key in bookings
      },
    });

    // Check if bookings were found
    if (bookings.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No bookings found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving bookings' },
      { status: 500 }
    );
  }
}
