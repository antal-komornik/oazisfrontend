import React, { useEffect, useState } from "react";
import { WeeklyMenuProps } from "@/app/lib/definitions";
import { getDailyMenu } from "@/app/lib/data";
import { ImageCard } from "@/app/components/ui/ImageCard";
import { useModal } from "@/app/context/ModalContext";
import type { MenuItem } from "@/app/context/ModalContext";
import Loading from "@/app/loading";
import { useSelectedFood } from "@/app/context/SelectedFoodContext";
import FoodPage from "../body/FoodPage";

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
    const { selectedFood, setSelectedFood } = useSelectedFood();
    const [currentDay, setCurrentDay] = useState<string>(activeDay);
    const [menuData, setMenuData] = useState<MenuData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState(false);
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
    }, []);

    useEffect(() => {
        setCurrentDay(activeDay);
    }, [activeDay]);

    const handleFoodClick = (food: MenuItem) => {
        setSelectedFood(food);
        if (isMobile) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFood(null);
    };

    if (!isMobile && selectedFood) {
        return <FoodPage selectedFood={selectedFood} onClose={() => setSelectedFood(null)} />;
    }

    if (isLoading) {
        return (
            <Loading size={"loading-lg"} />
        );
    }

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
                <MenuItemCard
                    food={mainCourse1}
                    title="Menü A"
                />
            )}

            {mainCourse2 && (
                <MenuItemCard
                    food={mainCourse2}
                    title="Menü B"
                />
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