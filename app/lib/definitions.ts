// import { RefObject, MutableRefObject } from "react";

import { MenuItemPrices } from "./data";

export interface CustomTextProps {
    content: string;
    style?: 'normal' | 'glitch';
    className?: string;
}

export interface CategoryButtonProps {
    text: string;
    onClick: () => void;
    isActive?: boolean;
    className?: string;
}


export interface ImageCardProps {
    imageSrc: string;
    altText: string;
    caption: string;
    className?: string;
    price?:string;
    priority?: undefined | boolean
    pizzas?: MenuItemPrices
    
}

export interface WeeklyMenuProps {
    activeDay: string;

}

export interface Food {
    id: number;
    name: string;
    description: string;
    image: string;
    price?: string;
    ingredients?: string[];
}
  
export interface FoodModalProps {
    food: Food;
    onClose: () => void;
  }


export  interface SideMenuProps {
    categories: string[];
    days: string[];
    activeCategory: string;
    activeDay: string;
    onCategoryClick: (category: string) => void;
    onDayClick: (day: string) => void;
}

export interface CategoryRefs {
    [key: string]: HTMLDivElement | null;
}

// export interface MainContentProps {
//     categories: string[];
//     contentRef: React.RefObject<HTMLDivElement>;
//     categoryRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
// }

// export interface MainContentProps {
//     categories: string[];
//     contentRef: RefObject<HTMLDivElement>;
//     categoryRefs: RefObject<CategoryRefs>;
// }

export interface MenuItems {
    [category: string]: Food[];
}

export interface MainContentProps {
    categories: string[];
    menuItems: MenuItems;
    contentRef: React.RefObject<HTMLDivElement>;
    categoryRefs: React.MutableRefObject<CategoryRefs>;
}

