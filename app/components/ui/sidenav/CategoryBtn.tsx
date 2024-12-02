'use client'
import React, { useEffect, useState } from 'react';
import { getCategories } from '@/app/lib/data';
import { Pizza, Coffee, Beer, IceCream, Soup, Salad } from 'lucide-react';
import Loading from '@/app/loading';
import { useCategory } from '@/app/context/CategoryContext';

interface Category {
    id: number;
    name: string;
}

const categoryIcons: { [key: string]: React.ElementType } = {
    'Pizza': Pizza,
    'Kávé': Coffee,
    'Sör': Beer,
    'Desszert': IceCream,
    'Leves': Soup,
    'Saláta': Salad,
    // További kategóriákhoz adj hozzá több ikont igény szerint
};


export const CategoryButton: React.FC = () => {
    const { activeCategory, setActiveCategory } = useCategory();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const isActiveCategory = (category: Category) => {
        if (!activeCategory) return false;
        return activeCategory === category.name;
    };

    if (isLoading) {
        return <Loading size={'loading-xs'} />;
    }

    const baseClasses = 'btn btn-sm text-base btn-outline transition-colors duration-200';

    return (
        <div className="flex flex-wrap gap-2 z-0">
            {categories.map((category) => {
                const Icon = categoryIcons[category.name] || Salad;

                return (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category)}
                        className={`
                            ${baseClasses}
                            ${isActiveCategory(category)
                                ? 'bg-emerald-500 text-black hover:bg-emerald-500'
                                : 'hover:bg-emerald-500 hover:text-black'}
                            flex items-center gap-2
                        `}
                    >
                        <Icon size={16} />
                        {category.name}
                    </button>
                );
            })}
        </div>
    );
};