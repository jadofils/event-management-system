import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req) {
  try {
    // Fetch all bookings with status APPROVED
    const bookings = await prisma.booking.findMany({
      where: {
        status: 'APPROVED', // Filter for bookings with status APPROVED
      },
      include: {
        user: { select: { firstname: true, lastname: true } }, // Include user details
        event: { select: { title: true } }, // Include event details
      },
    });

    // Check if bookings were found
    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No approved bookings found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
