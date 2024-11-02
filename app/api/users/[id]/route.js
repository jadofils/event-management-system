import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjusted path
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import JSON Web Token

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your environment variables

const validateUserInput = (data) => {
  const { firstname, lastname, email } = data; // Removed password from required fields
  if (!firstname || !lastname || !email) {
    return { valid: false, message: 'All fields are required' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  return { valid: true };
};
// Get a user by ID
export async function GET(request, { params }) {
  // Await the params to ensure they are resolved
  const { id } = await params; // Ensure this line is present

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }, // Use the awaited id
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching user' },
      { status: 500 }
    );
  }
}

// Update a user by ID
export async function PUT(request, { params }) {
  // Await the params to ensure they are resolved
  const { id } = await params; // Ensure this line is present

  try {
    const inputData = await request.json();
    const validation = validateUserInput(inputData);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400 }
      );
    }

    const { firstname, lastname, email,role} = inputData;

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) }, // Use the awaited id
      data: { firstname, lastname, email,role}, // Use hashed password
    });

    // Generate a JWT for the updated user
    const token = jwt.sign({ id: updatedUser.id, email: updatedUser.email }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ user: updatedUser, token });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating user' },
      { status: 500 }
    );
  }
}

// Delete a user by ID
export async function DELETE(req, { params }) {
  // Await the params to ensure they are resolved
  const { id } = params; // Get the ID from the URL

  try {
    // Delete the user using Prisma
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) }, // Ensure the ID is a number
    });

    // If deletion is successful
    return NextResponse.json(
      { success: true, message: 'User deleted successfully', user: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    
    // Handle specific error cases
    if (error.code === 'P2025') { // Prisma specific error for "Record not found"
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Error deleting user' },
      { status: 500 }
    );
  }
}
