'use client'
import React, { useState, useEffect } from 'react';
import { ImageCard } from '@/app/components/ui/ImageCard';
import { getFormattedMenu, MenuItem } from '@/app/lib/data';
import Loading from '@/app/loading';
import { useCategory } from '@/app/context/CategoryContext';
import FoodPage from '@/app/components/ui/body/FoodPage';
import { useSelectedFood } from '@/app/context/SelectedFoodContext';

interface CategoryMenuItems {
    [category: string]: MenuItem[];
}

const FoodLister = () => {
    const { selectedFood, setSelectedFood, setSource } = useSelectedFood();
    const [menuItems, setMenuItems] = useState<CategoryMenuItems>({});
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { activeCategory, categoryRefs, scrollToCategory } = useCategory();
    const [isMobile, setIsMobile] = useState(false);
    // const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Képernyőméret figyelése
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setIsLoading(true);
                const data = await getFormattedMenu();
                setMenuItems(data);
                setCategories(Object.keys(data));
            } catch (error) {
                setError('Hiba történt a menü betöltése közben ' + error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        if (activeCategory) {
            scrollToCategory(activeCategory);
        }
    }, [activeCategory, scrollToCategory]);

    const handleFoodClick = (food: MenuItem) => {
        setSelectedFood(food);
        setSource('main');
        if (isMobile) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFood(null);
    };

    if (isLoading) return <Loading size={'loading-lg'} />;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    // Desktop nézet - teljes oldal megjelenítés
    if (!isMobile && selectedFood) {
        return <FoodPage selectedFood={selectedFood} onClose={() => setSelectedFood(null)} />;
    }

    return (
        <>
            <div className="w-full pb-24 overflow-y-auto h-screen z-0">
                {categories.map((category) => (
                    <div
                        key={category}
                        ref={(el) => {
                            categoryRefs.current[category] = el;
                        }}
                        className={`mb-8 px-4 scroll-mt-24 ${category === activeCategory
                            ? 'bg-zinc-900/50 py-4 rounded-lg transition-colors duration-300'
                            : ''
                            }`}
                    >
                        <h2 className="text-2xl font-bold mb-4">{category}</h2>
                        <div className="relative">
                            <div className={`
                                flex gap-4
                                md:flex-wrap md:justify-start
                                ${isMobile ? 'overflow-x-auto pb-4 no-scrollbar' : ''}
                            `}>
                                {menuItems[category]?.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleFoodClick(item)}
                                        className={`
                                            flex-none w-[160px] sm:w-[200px]
                                            hover:scale-105 transition-transform duration-300 cursor-pointer
                                            ${!isMobile ? 'md:flex-initial md:max-w-[200px]' : ''}
                                        `}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        {item.is_pizza ? (
                                            <ImageCard
                                                imageSrc={item.image || ''}
                                                altText={item.name}
                                                caption={item.name}
                                                pizzas={item.prices}
                                            />
                                        ) : (
                                            <ImageCard
                                                imageSrc={item.image || ''}
                                                altText={item.name}
                                                caption={item.name}
                                                price={item.price}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="w-full pb-24 overflow-y-auto h-screen z-0">
                {categories.map((category) => (
                    <div
                        key={category}
                        ref={(el) => {
                            categoryRefs.current[category] = el;
                        }}
                        className={`mb-8 px-4 scroll-mt-24 ${category === activeCategory
                            ? 'bg-zinc-900/50 py-4 rounded-lg transition-colors duration-300'
                            : ''
                            }`}
                    >
                        <h2 className="text-2xl font-bold mb-4">{category}</h2>
                        <div className="relative">
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {menuItems[category]?.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleFoodClick(item)}
                                        className="flex-none w-[160px] sm:w-[200px] hover:scale-105 transition-transform duration-300 cursor-pointer"
                                        role="button"
                                        tabIndex={0}
                                    >
                                        {item.is_pizza ?
                                            <ImageCard
                                                imageSrc={item.image || ''}
                                                altText={item.name}
                                                caption={item.name}
                                                // price={item.price}
                                                pizzas={item.prices}
                                            />
                                            :
                                            <ImageCard
                                                imageSrc={item.image || ''}
                                                altText={item.name}
                                                caption={item.name}
                                                price={item.price}
                                            />
                                        }

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

            {/* Modal mobil nézethez */}
            {isMobile && isModalOpen && selectedFood && (
                <div className="fixed inset-0 z-0">
                    <FoodPage
                        selectedFood={selectedFood}
                        onClose={handleCloseModal}
                        isModal={true}
                    />
                </div>
            )}
        </>
    );
};

export default FoodLister

