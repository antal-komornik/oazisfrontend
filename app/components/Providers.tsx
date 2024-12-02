'use client';

import { ModalProvider } from '@/app/context/ModalContext'
import { CategoryProvider } from '@/app/context/CategoryContext'
import FoodModal from './ui/body/FoodPage'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CategoryProvider>
            <ModalProvider>
                {children}
                <FoodModal />
            </ModalProvider>
        </CategoryProvider>
    )
}