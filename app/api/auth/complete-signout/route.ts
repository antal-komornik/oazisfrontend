// app/api/auth/complete-signout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Az összes auth cookie törlése
    const cookiesToClear = [
      'next-auth.session-token',
      'next-auth.csrf-token',
      'next-auth.callback-url',
      '__Secure-next-auth.callback-url',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.csrf-token',
      '__Secure-next-auth.csrf-token',
      'next-auth.pkce.code_verifier',
      'next-auth.pkce.state'
    ];

    cookiesToClear.forEach(cookieName => {
      response.cookies.delete({
        name: cookieName,
        path: '/',
        secure: true,
        httpOnly: true
      });
    });

    return response;
  } catch (error) {
    console.error('Error during complete sign out:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sign out' },
      { status: 500 }
    );
  }
}