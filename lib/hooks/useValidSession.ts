// hooks/useValidSession.ts
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export const useValidSession = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (session?.access_expiration) {
        const expirationDate = new Date(session.access_expiration);
        const currentDate = new Date();
        
        if (currentDate > expirationDate) {
          signOut({ callbackUrl: '/auth' });
          return null;
        }
      }
    };

    checkTokenExpiration();
    // Ellenőrzés minden percben
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, [session]);

  // Ha nincs session vagy lejárt a token, null-t adunk vissza
  if (!session?.access_expiration) return null;
  
  const expirationDate = new Date(session.access_expiration);
  const currentDate = new Date();
  
  if (currentDate > expirationDate) return null;

  return session;
};