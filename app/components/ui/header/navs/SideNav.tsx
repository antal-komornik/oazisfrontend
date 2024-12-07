// 'use client'
// import React, { useState } from "react";
// import { CategoryButton } from "@/app/components/ui/CategoryBtn";
// import { DaySelector } from "@/app/components/ui/DaySelector";
// import { WeeklyMenu } from "@/app/components/ui/WeeklyMenu";
// import { Category } from "@/app/lib/data";
// import { useCategory } from "@/app/context/CategoryContext";

// interface SideMenuProps {
//     // activeCategory: string;
//     onCategorySelect: (category: Category) => void;
// }

// const SideMenu: React.FC<SideMenuProps> = ({
//     // activeCategory,
//     onCategorySelect
// }) => {
//     const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
//     const [activeDay, setActiveDay] = useState<string>('');
//     const { activeCategory } = useCategory();

//     const handleDayClick = (day: string) => {
//         setActiveDay(day);
//     };

//     return (
//         <div className=" flex flex-col h-[calc(100vh-headerHeight)]  border-r-2  border-gray-700 dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
//             <h6 className="text-xl font-bold  dark:border-dark-border px-1 py-3">
//                 Étlap
//             </h6>


//             <div className="flex flex-wrap justify-start gap-2.5 max-w-md p-4">
//                 <CategoryButton
//                 // onCategorySelect={(category: Category) => onCategorySelect(category)}
//                 // activeCategory={activeCategory}
//                 />

//             </div>


//             <h6 className="text-xl font-bold  dark:border-dark-border px-1 py-3">
//                 Heti Menü
//             </h6>
//             <div className="flex flex-wrap justify-start gap-2.5 max-w-md p-4">
//                 <DaySelector
//                     days={days}
//                     activeDay={activeDay}
//                     onDayClick={handleDayClick}
//                     className=""
//                 />
//             </div>
//             {/* Scrollozható WeeklyMenu konténer */}
//             <div className="flex-1 overflow-y-auto">
//                 <div className="p-4">
//                     <WeeklyMenu activeDay={activeDay} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SideMenu;


'use client'
import React, { useState } from "react";
import { CategoryButton } from "@/app/components/ui/sidenav/CategoryBtn";
import { DaySelector } from "@/app/components/ui/sidenav/DaySelector";
import { WeeklyMenu } from "@/app/components/ui/weekly/WeeklyMenu";

const SideMenu = () => {
    const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
    const [activeDay, setActiveDay] = useState<string>('');

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
                    days={days}
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