import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjust this if necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching users' },
      { status: 500 }
    );
  }
}

// Create a new user
export async function POST(request) {
  try {
    const { firstname, lastname, email, password, role } = await request.json();

    // Validate input
    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Normalize role to uppercase and validate
    const normalizedRole = role ? role.toUpperCase() : null;
    const validRoles = ['ADMIN', 'USER'];

    if (!validRoles.includes(normalizedRole)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role. Must be ADMIN or USER.' },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already in use' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: { firstname, lastname, email, password: hashedPassword, role: normalizedRole },
    });

    // Create JWT token with structured payload
    const tokenPayload = { id: newUser.id, role: normalizedRole };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || "YOUR_SECRET_CODE_WORD", { expiresIn: '1h' });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: newUser,
      token,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating user' },
      { status: 500 }
    );
  }
}