// 'use client'
// import React, { useEffect } from 'react';

// interface DaySelectorProps {
//     days: string[];
//     activeDay: string;
//     onDayClick: (day: string) => void;
//     className?: string;
// }

// export const DaySelector: React.FC<DaySelectorProps> = ({
//     days,
//     activeDay,
//     onDayClick,
//     className = ''
// }) => {
//     // Az aktuális nap automatikus kiválasztása az első betöltésnél
//     useEffect(() => {
//         if (!activeDay) {
//             const dayMapping: { [key: number]: string } = {
//                 1: 'Hétfő',
//                 2: 'Kedd',
//                 3: 'Szerda',
//                 4: 'Csütörtök',
//                 5: 'Péntek',
//                 6: 'Péntek',
//                 0: 'Péntek'
//             };
//             const today = new Date().getDay();
//             const defaultDay = dayMapping[today];
//             onDayClick(defaultDay);
//         }
//     }, [activeDay, onDayClick]);

//     const baseClasses = 'btn btn-sm  text-base btn-outline btn-ghost transition-colors duration-200 hover:bg-emerald-500 hover:text-black ';

//     return (
//         <div className={className}>
//             <div className="flex flex-wrap   md:flex-nowrap lg:flex-col justify-center   gap-2.5">
//                 {days.map((day) => (
//                     // <button
//                     //     key={day}
//                     //     onClick={() => onDayClick(day)}
//                     //     className={`btn px-4 py-2 rounded-full text-base transition-colors duration-200 ${activeDay === day
//                     //         ? 'bg-emerald-400 text-black hover:bg-emerald-500 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600'
//                     //         : 'bg-gray-400 text-gray-800 hover:bg-emerald-400 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-emerald-500'
//                     //         }`}
//                     // >
//                     //     {day}
//                     // </button> 
//                     <button
//                         key={day}
//                         onClick={() => onDayClick(day)}

//                         className={` ${baseClasses}  ${activeDay === day
//                             ? 'bg-emerald-500    text-black'
//                             : ''
//                             }`}
//                     >
//                         {day}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };


'use client'
import React, { useEffect } from 'react';

export const DaySelector = ({
    activeDay,
    onDayClick,
    className = ''
}: {
    activeDay: string;
    onDayClick: (day: string) => void;
    className?: string;
}) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

    useEffect(() => {
        if (!activeDay) {
            const dayIndex = new Date().getDay();
            const mappedDay = days[dayIndex === 0 ? 6 : dayIndex - 1];
            onDayClick(mappedDay);
        }
    }, [activeDay, onDayClick, days]);

    return (
        <div className={className}>
            <div className="flex flex-wrap lg:flex-col justify-center  lg:items-start gap-2 ">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => onDayClick(day)}
                        className={`btn btn-sm btn-outline btn-ghost px-4 hover:bg-emerald-500 hover:text-black ${activeDay === day ? 'bg-emerald-500 text-black' : ''
                            }`}
                    // className={`min-w-0 h-8 px-4  rounded-lg border border-gray-600 hover:bg-emerald-500 hover:text-black ${activeDay === day ? 'bg-emerald-500 text-black' : ''
                    //     }`}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
};