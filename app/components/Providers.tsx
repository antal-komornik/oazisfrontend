// 'use client';

// import { ModalProvider } from '@/app/context/ModalContext'
// import { CategoryProvider } from '@/app/context/CategoryContext'
// import FoodModal from './ui/body/FoodPage'

// export default function Providers({ children }: { children: React.ReactNode }) {
//     return (
//         <CategoryProvider>
//             <ModalProvider>
//                 {children}
//                 <FoodModal />
//             </ModalProvider>
//         </CategoryProvider>
//     )
// // }


'use client';
import { ModalProvider } from '@/app/context/ModalContext'
import { CategoryProvider } from '@/app/context/CategoryContext'
import { SelectedFoodProvider } from '@/app/context/SelectedFoodContext'
import FoodPage from './ui/body/FoodPage';
import { LoadingProvider } from '../context/LoadingContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <SelectedFoodProvider>
                <CategoryProvider>
                    <ModalProvider>
                        {children}
                        <FoodPage onClose={function (): void {
                            throw new Error('Function not implemented.');
                        }} />
                    </ModalProvider>
                </CategoryProvider>
            </SelectedFoodProvider >
        </LoadingProvider>
    )
}