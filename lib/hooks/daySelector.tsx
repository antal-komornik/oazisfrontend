'use client'

import { useState, useEffect } from 'react';

type DayOfWeek = 'Hétfő' | 'Kedd' | 'Szerda' | 'Csütörtök' | 'Péntek' | 'Szombat' | 'Vasárnap';

export const useCurrentDay = () => {
    const [currentDay, setCurrentDay] = useState<DayOfWeek>('Hétfő');

    useEffect(() => {
        const days: DayOfWeek[] = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];

        const updateCurrentDay = () => {
            const date = new Date();
            const dayIndex = date.getDay();
            setCurrentDay(days[dayIndex]);
        };

        // Kezdeti beállítás
        updateCurrentDay();

        // Frissítés éjfélkor
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilMidnight = tomorrow.getTime() - now.getTime();

        const midnightTimeout = setTimeout(() => {
            updateCurrentDay();
            // Következő napok frissítése
            setInterval(updateCurrentDay, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);

        // Cleanup
        return () => {
            clearTimeout(midnightTimeout);
        };
    }, []);

    return currentDay;
};