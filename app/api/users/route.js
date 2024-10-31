import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjust this if necessary

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
    const { firstname, lastname, email, password } = await request.json();
    const newUser = await prisma.user.create({
      data: { firstname, lastname, email, password },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating user' },
      { status: 500 }
    );
  }
}
