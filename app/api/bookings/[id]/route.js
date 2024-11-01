import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET: Retrieve all bookings for a specific user
export async function GET(request, { params }) {
  try {
    const { id } = params; // Directly destructure id from params

    // Log the id to ensure it's being received correctly
    console.log("User ID:", id);

    // Fetch bookings for the specified user, converting id to a number if needed
    const bookings = await prisma.booking.findMany({
      where: {
        userId: Number(id), // Ensure id is a number
      },
    });

    // Check if bookings were found
    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No bookings found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Error retrieving bookings' },
      { status: 500 }
    );
  }
}


