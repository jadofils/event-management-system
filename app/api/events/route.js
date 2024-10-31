// app/api/events/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjusted path for Prisma client

// Create a new event
export async function POST(request) {
  try {
    const { title, description, date, availableSeats } = await request.json();

    // Validate input
    if (!title || !description || !date || availableSeats < 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid input data' },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date), // Ensure date is a Date object
        availableSeats,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating event' },
      { status: 500 }
    );
  }
}

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



