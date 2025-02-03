// app/api/auth/force-signout/route.ts
// import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

export async function POST() {
  // Munkamenet megszüntetése
  const cookieStore = cookies();
  
  // Az összes next-auth cookie törlése
  const cookiesToClear = [
    'next-auth.session-token',
    'next-auth.csrf-token',
    'next-auth.callback-url',
    '__Secure-next-auth.callback-url',
    '__Secure-next-auth.session-token',
    '__Host-next-auth.csrf-token'
  ];

  cookiesToClear.forEach(async cookieName => {
    (await cookieStore).delete(cookieName);
    console.log('TÖRLÉS')
    signOut()
  });

  return new Response(null, { status: 200 });
}