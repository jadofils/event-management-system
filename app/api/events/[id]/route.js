// app/api/events/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjusted path for Prisma client

// Get an event by ID
export async function GET(request, { params }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(params.id) },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: event },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching event' },
      { status: 500 }
    );
  }
}

// // Update an event by ID
// export async function PUT(request, { params }) {
//   try {
//     const { title, description, date, availableSeats } = await request.json();

//     // Validate input
//     if (!title || !description || !date || availableSeats < 0) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid input data' },
//         { status: 400 }
//       );
//     }

//     const updatedEvent = await prisma.event.update({
//       where: { id: Number(params.id) },
//       data: {
//         title,
//         description,
//         date: new Date(date), // Ensure date is a Date object
//         availableSeats,
//       },
//     });

//     return NextResponse.json(
//       { success: true, data: updatedEvent },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating event:', error);
//     return NextResponse.json(
//       { success: false, message: 'Error updating event' },
//       { status: 500 }
//     );
//   }
// }

// // Delete an event by ID
// export async function DELETE(request, { params }) {
//   try {
//     // Await params to access params.id
//     const { id } = await params;

//     // Check if the event exists
//     const event = await prisma.event.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!event) {
//       return NextResponse.json(
//         { success: false, message: 'Event not found' },
//         { status: 404 }
//       );
//     }

//     // Proceed to delete the event
//     await prisma.event.delete({
//       where: { id: Number(id) },
//     });

//     // Return a 204 No Content response without a body
//     return NextResponse.json(
//       null, // No content in the response body
//       { status: 204 } // No Content status
//     );
//   } catch (error) {
//     console.error('Error deleting event:', error);
//     return NextResponse.json(
//       { success: false, message: 'Error deleting event' },
//       { status: 500 } // Internal Server Error status
//     );
//   }
// }
