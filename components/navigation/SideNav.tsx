'use client'
import React, { useEffect, useState } from "react";
import { CategoryButton } from "@/components/ui/sidenav/CategoryBtn";
import { DaySelector } from "@/components/ui/sidenav/DaySelector";
import { useCurrentDay } from "@/lib/hooks/daySelector";
import { WeeklyMenu } from "@/components/ui/weekly/WeeklyMenu";

const SideMenu = () => {
    const currentDay = useCurrentDay();
    const [activeDay, setActiveDay] = useState<string>(currentDay);

    useEffect(() => {
        setActiveDay(currentDay);
    }, [currentDay]);

    return (
        <div className="w-64 flex flex-col h-[calc(100vh-4rem)]  bg-base-100">
            <h6 className="text-xl font-bold px-4 py-3">Étlap</h6>
            <div className="p-4">
                <CategoryButton />
            </div>

            <h6 className="text-xl font-bold px-4 py-3">Heti Menü</h6>
            {/* flex flex-wrap justify-start gap-2.5 max-w-md  */}
            <div className="p-4">
                <DaySelector
                    activeDay={activeDay}
                    onDayClick={setActiveDay}
                />
            </div>
            <div className="flex-1 overflow-y-auto p-4 min-h-screen">
                <WeeklyMenu activeDay={activeDay} />
            </div>
        </div>
    );
};

export default SideMenu;