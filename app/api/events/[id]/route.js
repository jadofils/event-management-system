import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjusted path for Prisma client

export async function GET(request, { params }) {
  try {
    const id = await params.id;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Event ID is required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = await params.id;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { message: 'Event ID is required' },
        { status: 400 }
      );
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        availableSeats: parseInt(body.availableSeats),
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { message: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = await params.id;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Event ID is required' },
        { status: 400 }
      );
    }

    await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { message: 'Failed to delete event' },
      { status: 500 }
    );
  }
}