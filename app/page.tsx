'use client'

import FoodLister from "@/components/ui/body/FoodLister";
import PremiumFloatingButton from "@/components/ui/PremiumFloatingButton";
import { useSession } from "next-auth/react";
import { CategoryButton } from '@/components/ui/sidenav/CategoryBtn';

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  console.log(session?.access_expiration)
  return (
    <div> 

      <div className="block md:hidden">
        {/* <h1 className="text-xl font-bold">Mobil Dashboard</h1> */}
              <div className="flex px-4 py-2   overflow-x-auto scrollbar-hide z-0 ">
                <div className='flex h-8 shrink-0 items-center justify-center z-0'>
                    <CategoryButton
                    // onCategorySelect={handleCategorySelect}
                    // activeCategory={activeCategory}
                    />
                </div>
            </div>
        
            <div className="flex-1 z-0">
                <div className="flex  w-full justify-center items-center">
                    {/* <MainContent
                        contentRef={contentRef}
                        categoryRefs={categoryRefs}
                        activeCategory={activeCategory}
                    /> */}
                    <FoodLister />
                </div>
            </div>
{/*         <FoodLister /> */}

      </div>

      <div className="hidden md:block ">
        {/* <h1 className="text-2xl font-bold">Desktop Dashboard</h1> */}

        <FoodLister />
        </div>
      <PremiumFloatingButton />
    </div>
  );
}
