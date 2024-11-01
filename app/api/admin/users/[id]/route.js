import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust path as necessary

// GET method to fetch a specific user by ID
export async function GET(request, { params }) {
      const { id } = await params; // Extract the ID from the request parameters
      console.log('Fetching user with ID:', id); // Log the ID for debugging
    
      try {
        const user = await prisma.user.findUnique({
          where: { id: Number(id) },
        });
    
        console.log('Fetched user:', user); // Log the fetched user for debugging
    
        if (!user) {
          console.log('User not found'); // Log if user is not found
          return NextResponse.json(
            { success: false, message: 'User not found' },
            { status: 404 }
          );
        }
    
        return NextResponse.json(user, { status: 200 });
      } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
          { success: false, message: 'Error fetching user' },
          { status: 500 }
        );
      }
    }
// Handle PUT and DELETE requests for a specific user by ID
export async function PUT(request, { params }) {
  const { id } = params; // Get the user ID from parameters
  const updatedUserData = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedUserData,
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params; // Get the user ID from parameters

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { success: true, message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting user' },
      { status: 500 }
    );
  }
}
