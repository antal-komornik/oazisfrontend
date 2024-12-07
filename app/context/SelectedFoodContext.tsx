// SelectedFoodContext.tsx
'use client'
import { createContext, useContext, useState } from 'react';
import { MenuItem } from '@/app/lib/data';

interface SelectedFoodContextType {
    selectedFood: MenuItem | null;
    setSelectedFood: (food: MenuItem | null) => void;
}

const SelectedFoodContext = createContext<SelectedFoodContextType | undefined>(undefined);

export const SelectedFoodProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
    return (
        <SelectedFoodContext.Provider value={{ selectedFood, setSelectedFood }}>
            {children}
        </SelectedFoodContext.Provider>
    );
};

export const useSelectedFood = () => {
    const context = useContext(SelectedFoodContext);
    if (!context) throw new Error('useSelectedFood must be used within SelectedFoodProvider');
    return context;
};