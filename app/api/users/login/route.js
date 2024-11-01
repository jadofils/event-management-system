import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjusted path
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import JSON Web Token

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your environment variables

// Login function
export async function POST(request) {
  try {
    const { email, password, role: postedRole } = await request.json();
    console.log('Incoming login request:', { email, postedRole });

    // Normalize email before querying
    const normalizedEmail = email.toLowerCase();

    // Validate input
    if (!normalizedEmail || !password) {
      console.error('Validation failed: Email and password are required');
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find the user by normalized email
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }, // Use normalized email
    });

    if (!user) {
      console.error('Login failed: User not found for email:', normalizedEmail);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password using bcryptjs
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Login failed: Invalid password for user:', normalizedEmail);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare user role with posted role
    const dbRole = user.role.toUpperCase(); // Normalize role from DB
    const normalizedPostedRole = postedRole?.toUpperCase(); // Normalize posted role

    if (normalizedPostedRole && dbRole !== normalizedPostedRole) {
      console.error(`Login failed: Role mismatch for user ${user.id}. Expected: ${normalizedPostedRole}, Found: ${dbRole}`);
      return NextResponse.json(
        { success: false, message: 'Role mismatch' },
        { status: 403 } // Forbidden status
      );
    }

    // Generate a JWT for the authenticated user
    const token = jwt.sign(
      { id: user.id, email: user.email, role: dbRole }, // Include role in token payload
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send success response with user details and token
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token, // Send the token back in the response
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
