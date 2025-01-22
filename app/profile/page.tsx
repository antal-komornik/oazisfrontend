'use client'
import UserData from "@/components/ui/profile/UserData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const { status } = useSession();
    const router = useRouter();

    // Ha nincs bejelentkezve a felhasználó
    if (status === "unauthenticated") {
        router.push("/");
        return null;
    }

    // Betöltés alatt
    if (status === "loading") {
        return <div>Betöltés...</div>;
    }

    // const handleLogout = async () => {
    //     await signOut({ redirect: true, callbackUrl: "/" });
    // };

    return (
        // <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        //     <h2 className="text-2xl font-bold mb-6">Felhasználói Profil</h2>

        //     <div className="space-y-4">
        //         <div>
        //             <label className="font-semibold">Felhasználónév:</label>
        //             <p>{session?.user?.username}</p>
        //         </div>

        //         <div>
        //             <label className="font-semibold">First Name:</label>
        //             <p>{session?.user?.firstName}</p>
        //         </div>

        //         <div>
        //             <label className="font-semibold">Access:</label>
        //             <p>{session?.accessToken}</p>
        //         </div>

        //         <div>
        //             <label className="font-semibold">First Name:</label>
        //             <p>{session?.user?.lastName}</p>
        //         </div>

        //         <div>
        //             <label className="font-semibold">Email:</label>
        //             <p>{session?.user?.email}</p>
        //         </div>

        //         <div>
        //             <label className="font-semibold">Teljes név:</label>
        //             <p>{session?.user?.first_name} {session?.user?.last_name}</p>
        //         </div>

        //         <div>
        //             <label className="font-semibold">Cím:</label>
        //             <p>{session?.user?.profile?.address}</p>
        //         </div>

        //         <div>
        //             <label className="font-semibold">Telefonszám:</label>
        //             <p>{session?.user?.profile?.phone_number}</p>
        //         </div>

        //         <button
        //             onClick={handleLogout}
        //             className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        //         >
        //             Kijelentkezés
        //         </button>
        //     </div>
        // </div>
        <UserData />
    );
}