// app/api/events/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjusted path for Prisma client

// Get all available events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        availableSeats: {
          gt: 0, // Only fetch events with available seats
        },
      },
    });
    
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching events' },
      { status: 500 }
    );
  }
}



