import React, { useEffect, useState } from "react";
import { WeeklyMenuProps } from "@/lib/types/types";
import { getDailyMenu } from "@/lib/services/services";
import { ImageCard } from "@/components/ui/body/ImageCard";
import { useModal, MenuItem } from "@/lib/hooks/ModalContext";
// import type { MenuItem } from "@/app/context/ModalContext";
// import Loading from "@/app/loading";
import { useSelectedFood } from "@/lib/hooks/SelectedFoodContext";
import FoodPage from "../body/FoodPage";
import { useLoading } from "@/lib/hooks/LoadingContext";

interface MenuData {
    // id: number;
    date: string;
    menu_items: MenuItem[];
}

interface MenuData {
    date: string;
    menu_items: MenuItem[];
}

const MenuItemCard: React.FC<{
    food: MenuItem;
    title: string;
}> = ({ food, title }) => {
    const { openModal } = useModal();
    // const rounded = food?.price.split('.')[0]
    const rounded = food?.price

    return (
        <div
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => openModal(food)}
        >
            <h3 className="text-lg mb-3 font-semibold">{title}</h3>
            <ImageCard
                imageSrc={food.image || ''}
                altText={food.name}
                caption={food.name}
                price={rounded}
                pizzas={food.prices}

            />
        </div>
    );
};

export const WeeklyMenu: React.FC<WeeklyMenuProps> = ({ activeDay }) => {
    const { selectedFood, setSelectedFood, setSource } = useSelectedFood();
    const [currentDay, setCurrentDay] = useState<string>(activeDay);
    const [menuData, setMenuData] = useState<MenuData[]>([]);
    const [error, setError] = useState<string | null>(null);
    // const [isLoading,] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        // Ha specifikus betöltési logikát szeretnénk a főoldalra
        const initializePage = async () => {
            // Itt lehet inicializálni az oldal-specifikus dolgokat
            setIsLoading(false);
        };

        initializePage();
    }, [setIsLoading]);


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
        const fetchDailyMenu = async () => {
            try {
                setIsLoading(true);
                const data = await getDailyMenu();
                setMenuData(data as unknown as MenuData[]);
            } catch (err) {
                setError('Nem sikerült betölteni a napi menüt');
                console.error('Error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDailyMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCurrentDay(activeDay);
    }, [activeDay]);

    const handleFoodClick = (food: MenuItem) => {
        setSelectedFood(food);
        setSource('weekly');
        if (isMobile) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFood(null);
        setSelectedFood(null);
        setSource(null);
    };

    // if (!isMobile && selectedFood) {
    //     return <FoodPage selectedFood={selectedFood} onClose={() => setSelectedFood(null)} />;
    // }
    // if (!isMobile && selectedFood && source === 'weekly') {
    //     return <FoodPage selectedFood={selectedFood} onClose={() => {
    //         setSelectedFood(null);
    //         setSource(null);
    //     }} />;
    // }

    // if (isLoading) {
    //     return (
    //         <Loading size={"loading-lg"} />
    //     );
    // }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    const currentMenu = menuData.find(menu => {
        const menuDate = new Date(menu.date).toLocaleDateString('hu-HU', { weekday: 'long' });
        return menuDate.toLowerCase() === currentDay.toLowerCase();
    });

    if (!currentMenu) {
        return <div className="p-2 text-error font-bold">Erre a napra nincs elérhető menü</div>;
    }

    const getSectionItems = (type: 'soup' | 'main_course1' | 'main_course2') => {
        return currentMenu.menu_items.find(item => item.type === type);
    };

    const soupItem = getSectionItems('soup');
    const mainCourse1 = getSectionItems('main_course1');
    const mainCourse2 = getSectionItems('main_course2');

    return (
        <div className="space-y-8  pb-20  min-h-screen">
            {soupItem && (
                <div
                    onClick={() => handleFoodClick(soupItem)}
                >
                    <MenuItemCard
                        food={soupItem}
                        title="Leves"
                    />
                </div>
            )}
            {mainCourse1 && (
                <div
                    onClick={() => handleFoodClick(mainCourse1)}
                >
                    <MenuItemCard
                        food={mainCourse1}
                        title="Menü A"
                    />
                </div>
            )}

            {mainCourse2 && (
                <div
                    onClick={() => handleFoodClick(mainCourse2)}
                >
                    <MenuItemCard
                        food={mainCourse2}
                        title="Menü B"
                    />
                </div>
            )}



            {isMobile && isModalOpen && selectedFood && (
                <div className="fixed inset-0 z-0">
                    <FoodPage
                        selectedFood={selectedFood}
                        onClose={handleCloseModal}
                        isModal={true}
                    />
                </div>
            )}
        </div>

    );
};