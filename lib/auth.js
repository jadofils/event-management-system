import { serialize } from 'cookie'; // Cookie library to set cookies
import { NextResponse } from 'next/server'; // Make sure to import NextResponse

export async function setLoginSession(session) {
  const cookie = serialize('auth_token', JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 60 * 60, // 1 hour
    path: '/',
  });

  // Create a new NextResponse object
  const response = NextResponse.next();

  // Set the cookie on the response
  response.headers.set('Set-Cookie', cookie);

  return response; // Return the response object with the cookie set
}
