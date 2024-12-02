'use client'
import { useState } from 'react';
import FoodPage from '@/app/components/ui/body/FoodPage';
import { MenuItem } from '@/app/lib/data';

// export default function Page({ params }: { params: { id: string } }) {
export default function Page() {
    const [food] = useState<MenuItem | null>(null);

    // useEffect(() => {
    //     // Itt kell lekérned az ételt az ID alapján
    //     const fetchFood = async () => {
    //         try {
    //             const response = await fetch(`/api/food/${params.slug}`);
    //             const data = await response.json();
    //             setFood(data);
    //         } catch (error) {
    //             console.error('Error fetching food:', error);
    //         }
    //     };

    //     fetchFood();
    // }, [params.id]);

    if (!food) return null;

    return <FoodPage selectedFood={food} onClose={function (): void {
        throw new Error('Function not implemented.');
    }} />;
}