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