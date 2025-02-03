'use client'
import ProfileNav from "@/components/navigation/ProfileNav";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function UserProfile() {
    const { data: session, status } = useSession()
    if (status === "loading") {
        return <div>Betöltés...</div>;
    }



    return (
        <div className="min-h-screen mb-20    flex items-start justify-center mt-30">
            <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-2xl  font bold pb-30">Hello {session?.user.name}</p>
                {/* {session?.user.is_premium ? <p className="text-warning">Korai regisztrációdnak köszönhetően minden rendelésednél -10% kedvezményben részesülsz</p> : null} */}
                <div>

                    <ProfileNav />
                </div>
                {/* <p>Session: {session}</p> */}
                {/* <p>{session.accessToken}</p>
                <p>{session.user.firstName}</p> */}
            </div>
        </div>
    );


}