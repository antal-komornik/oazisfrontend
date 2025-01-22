'use client';
import { SessionProvider } from 'next-auth/react';
// import { ModalProvider } from '@/app/context/ModalContext'
import { CategoryProvider } from '@/lib/hooks/CategoryContext'
import { LoadingProvider } from '@/lib/hooks/LoadingContext';
// import { SelectedFoodProvider } from '@/app/context/SelectedFoodContext'
// import FoodPage from './ui/body/FoodPage';
import { CartProvider } from '@/lib/hooks/CartContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SessionProvider>
                <LoadingProvider >
                    <CartProvider>
                        <CategoryProvider>
                            {children}
                        </CategoryProvider>
                    </CartProvider>
                </LoadingProvider>
            </SessionProvider>
        </div>


    )
}