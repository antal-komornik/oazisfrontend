import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useValidSession } from '@/lib/hooks/useValidSession'
const ProfileNav = () => {
    // const { data: session } = useSession()
    const session = useValidSession();
    if (!session) return null;

    return (
        <>
            {session ?
                <div className="gap-2 flex flex-col">

                    <Link href="/profile/your_order/"
                        onClick={() => console.log('Rendelések')}
                        className="btn btn-outline"
                    >
                        Rendelések
                    </Link>
                    <Link href="/profile/user_data/"
                        className="btn btn-outline"
                    >
                        Adatok
                    </Link>
                    <Link href="/"
                        onClick={() => signOut()}
                        className="btn btn-outline"
                    >
                        Kijelentkezés
                    </Link>
                </div>
                : null}
        </>
    )
}

export default ProfileNav