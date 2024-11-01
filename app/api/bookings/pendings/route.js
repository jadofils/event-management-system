import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        user: { select: { firstname: true, lastname: true } },
        event: { select: { title: true } },
      },
    });

    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No pending bookings found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching pending bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
