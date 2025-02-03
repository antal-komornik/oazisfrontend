'use client'

import FoodLister from "@/components/ui/body/FoodLister";
import PremiumFloatingButton from "@/components/ui/PremiumFloatingButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  console.log(session?.access_expiration)
  return (
    <div> 

      <div className="block md:hidden">
        {/* <h1 className="text-xl font-bold">Mobil Dashboard</h1> */}
        <FoodLister />

      </div>

      <div className="hidden md:block ">
        {/* <h1 className="text-2xl font-bold">Desktop Dashboard</h1> */}

        <FoodLister />
        </div>
      <PremiumFloatingButton />
    </div>
  );
}
