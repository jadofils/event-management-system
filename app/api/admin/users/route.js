import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Adjust path as necessary

// Handle POST and GET requests for users
export async function POST(request) {
  const userData = await request.json();

  try {
    const newUser = await prisma.user.create({
      data: userData,
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

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    
    // Assuming you want to calculate the sum of a field named 'amount'
    const sum = await prisma.user.aggregate({
      _sum: {
        amount: true, // Replace 'amount' with the field you want to sum
      },
    });

    return NextResponse.json({ users, sum: sum._sum.amount }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching users' },
      { status: 500 }
    );
  }
}
