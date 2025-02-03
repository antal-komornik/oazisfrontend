// // middleware.ts
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import type { NextRequest } from 'next/server';

// // Tokenek törlése és kijelentkeztetés
// const handleTokenExpiration = (req: NextRequest) => {
//   const response = NextResponse.redirect(new URL("/auth", req.url));
  
//   // Az összes next-auth cookie törlése
//   const cookiesToClear = [
//     'next-auth.session-token',
//     'next-auth.csrf-token',
//     'next-auth.callback-url',
//     '__Secure-next-auth.callback-url',
//     '__Secure-next-auth.session-token',
//     '__Host-next-auth.csrf-token'
//   ];

//   cookiesToClear.forEach(cookieName => {
//     response.cookies.delete(cookieName);
//   });

//   return response;
// };

// // Token lejárat ellenőrzése
// const isTokenExpired = (expirationString: string): boolean => {
//   const expirationDate = new Date(expirationString);
//   const currentDate = new Date();
//   return currentDate > expirationDate;
// };

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const path = req.nextUrl.pathname;
    
//     // Token lejárat ellenőrzése
//     if (token?.accessTokenExpires && isTokenExpired(token.accessTokenExpires as string)) {
//       return handleTokenExpiration(req);
//     }

//     const isProtectedPath = path.startsWith("/profile");

//     if (!req.nextauth.token && req.nextUrl.pathname === '/profile') {
//       return NextResponse.redirect(new URL("/auth", req.url));
//     }

//     if (!token && isProtectedPath) {
//       return NextResponse.redirect(new URL("/auth", req.url));
//     }

//     if (token && path === "/auth") {
//       return NextResponse.redirect(new URL("/profile/user_data", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         // Ellenőrizzük a token létezését és érvényességét
//         if (!token) return false;
        
//         // Ha van lejárati idő, ellenőrizzük
//         if (token.accessTokenExpires) {
//           return !isTokenExpired(token.accessTokenExpires as string);
//         }
        
//         return true;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/profile",
//     "/profile/:path*",
//     "/profile/your_order",
//     "/profile/user_data",
//     "/checkout"
//     // "/cart"
//     // "/auth"
//   ]
// };



// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

// Token lejárat és munkamenet megszüntetése
const handleTokenExpiration = async (req: NextRequest) => {
  try {
    // Munkamenet megszüntetése a force-signout API végponton keresztül
    await fetch(`${req.nextUrl.origin}/api/auth/force-signout`, {
      method: 'POST',
      credentials: 'include',
    });

    const response = NextResponse.redirect(new URL("/auth", req.url));
    
    // Cookie-k törlése a response-ból is
    const cookiesToClear = [
      'next-auth.session-token',
      'next-auth.csrf-token',
      'next-auth.callback-url',
      '__Secure-next-auth.callback-url',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.csrf-token'
    ];

    cookiesToClear.forEach(cookieName => {
      response.cookies.delete(cookieName);
    });

    // Cache-Control fejlécek beállítása
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error during token expiration handling:', error);
    // Hiba esetén is próbáljuk meg átirányítani a felhasználót
    return NextResponse.redirect(new URL("/auth", req.url));
  }
};

// Token lejárat ellenőrzése
const isTokenExpired = (expirationDate: string | undefined): boolean => {
  if (!expirationDate) return true;
  
  try {
    const expDate = new Date(expirationDate);
    const currentDate = new Date();
    return currentDate > expDate;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    
    // Token lejárat ellenőrzése és kezelése
    if (token && isTokenExpired(token.access_expiration as string)) {
      console.log(token)
      console.log(isTokenExpired)
      return handleTokenExpiration(req);
      
    }

    const isProtectedPath = [
      "/profile",
      "/checkout",
      "/profile/your_order",
      "/profile/user_data"
    ].some(protectedPath => path.startsWith(protectedPath));

    if (!token && isProtectedPath) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (token && path === "/auth") {
      return NextResponse.redirect(new URL("/profile/user_data", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) return false;
        
        if (token.access_expiration) {
          return !isTokenExpired(token.access_expiration as string);
        }
        
        return false;
      },
    },
  }
);

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/profile/your_order",
    "/profile/user_data",
    "/checkout",
    "/((?!auth|api|_next/static|_next/image|favicon.ico).*)",
  ]
};
