import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjusted path
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import JSON Web Token

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your environment variables

// Helper function to validate user input
const validateUserInput = (data) => {
  const { firstname, lastname, email, password } = data;
  if (!firstname || !lastname || !email || !password) {
    return { valid: false, message: 'All fields are required' };
  }
  // Further validation can be added here (e.g., email format, password strength)
  return { valid: true };
};
// Get a user by ID
export async function GET(request, { params }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
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
  try {
    const inputData = await request.json();
    const validation = validateUserInput(inputData);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400 }
      );
    }

    const { firstname, lastname, email, password } = inputData;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: { firstname, lastname, email, password: hashedPassword }, // Use hashed password
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



export async function DELETE(req, context) {
  const { id } = context.params; // Directly access `id` from context.params (no need to await)
  try {
    const result = await deleteUserById(id); // Call the delete function

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'User deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message || 'User not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting user' },
      { status: 500 }
    );
  }
}
