'use client'
import React, { useState } from 'react';
import { DaySelector } from '@/components/ui/sidenav/DaySelector';
import { WeeklyMenu } from '@/components/ui/weekly/WeeklyMenu';

const WeeklyTab = () => {
    // const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
    const [activeDay, setActiveDay] = useState<string>('');

    const handleDayClick = (day: string) => {
        setActiveDay(day);
    };

    return (
        <div className="flex flex-col    h-full ">
            <div className="flex py-3 justify-center items-center">
                <DaySelector
                    // days={days}
                    activeDay={activeDay}
                    onDayClick={handleDayClick}
                    className=""
                />

            </div>
            <div className='flex-1 px-3 mx-3'>
                <WeeklyMenu activeDay={activeDay} />
            </div>
        </div>
    );
};

export default WeeklyTab;