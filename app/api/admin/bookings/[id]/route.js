// app/api/admin/bookings/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust path as necessary

// Get a specific booking by ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
      include: {
        user: { select: { id: true, lastname: true } }, // Include user's lastname
        event: { select: { id: true, title: true } }, // Include event title
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching booking' },
      { status: 500 }
    );
  }
}

// Update the status of a specific booking by ID
export async function PUT(request, { params }) {
      const { id } = await params; // Await params
    
      try {
        const { status } = await request.json();
    
        // Validate status
        if (!status || !['APPROVED', 'REJECTED'].includes(status)) {
          return NextResponse.json(
            { success: false, message: 'Invalid status' },
            { status: 400 }
          );
        }
    
        const updatedBooking = await prisma.booking.update({
          where: { id: Number(id) },
          data: { status },
        });
    
        return NextResponse.json(updatedBooking, { status: 200 });
      } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json(
          { success: false, message: 'Error updating booking' },
          { status: 500 }
        );
      }
    }
    
   // Delete a specific booking by ID
export async function DELETE(request, { params }) {
      const { id } = await params;
    
      try {
        await prisma.booking.delete({
          where: { id: Number(id) },
        });
        
        // Return response with status 200 and a success message
        return NextResponse.json(
          { success: true, message: 'Booking deleted successfully' }, 
          { status: 200 }
        );
      } catch (error) {
        console.error('Error deleting booking:', error);
        return NextResponse.json(
          { success: false, message: 'Error deleting booking' },
          { status: 500 }
        );
      }
    }
    