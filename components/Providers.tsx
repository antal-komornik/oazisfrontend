'use client';
import { SessionProvider } from 'next-auth/react';
// import { ModalProvider } from '@/app/context/ModalContext'
import { CategoryProvider } from '@/lib/hooks/CategoryContext'
import { LoadingProvider } from '@/lib/hooks/LoadingContext';
import { SelectedFoodProvider } from '@/lib/hooks/SelectedFoodContext'
// import FoodPage from './ui/body/FoodPage';
import { CartProvider } from '@/lib/hooks/CartContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SessionProvider>

                <LoadingProvider >
                    <CartProvider>
                        <CategoryProvider>
                            <SelectedFoodProvider >

                            {children}
                            </SelectedFoodProvider>
                        </CategoryProvider>
                    </CartProvider>
                </LoadingProvider>
            </SessionProvider>
        </div>


    )
}