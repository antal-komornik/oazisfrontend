import React, { useEffect, useState } from "react";
import { WeeklyMenuProps } from "@/app/lib/definitions";
import { getDailyMenu } from "@/app/lib/data";
import { ImageCard } from "@/app/components/ui/ImageCard";
import { useModal } from "@/app/context/ModalContext";
import type { MenuItem } from "@/app/context/ModalContext";
import Loading from "@/app/loading";

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
    const rounded = food?.price.split('.')[0]

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

            />
        </div>
    );
};

export const WeeklyMenu: React.FC<WeeklyMenuProps> = ({ activeDay }) => {
    const [currentDay, setCurrentDay] = useState<string>(activeDay);
    const [menuData, setMenuData] = useState<MenuData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        <div className="space-y-8 ">
            {soupItem && (
                <MenuItemCard
                    food={soupItem}
                    title="Leves"
                />
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
        </div>
    );
};