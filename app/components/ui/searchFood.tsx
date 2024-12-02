'use client'
import React, { useState, useEffect, useRef } from 'react';
import { searchMenuItems } from '@/app/lib/data';
import type { MenuItem } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import FoodPage from '@/app/components/ui/body/FoodPage';

interface MouseEvent {
    target: EventTarget | null;
}

const FoodSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filteredFoods, setFilteredFoods] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listboxId = "search-listbox";
    const router = useRouter();

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
        const searchFood = async () => {
            const trimmedSearch = searchTerm.trim();

            if (trimmedSearch === '') {
                setFilteredFoods([]);
                return;
            }

            setIsLoading(true);
            try {
                const results = await searchMenuItems(trimmedSearch);
                setFilteredFoods(results);
            } catch (error) {
                console.error('Error searching foods:', error);
                setFilteredFoods([]);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(searchFood, 300);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const handleSelect = (food: MenuItem) => {
        setSelectedFood(food);
        setSearchTerm('');
        setIsOpen(false);
        if (!isMobile) {
            router.push(`/food/${food.id}`);
        }
    };

    const handleCloseModal = () => {
        setSelectedFood(null);
    };

    return (
        <>
            {/* <div
                ref={wrapperRef}
                className="relative w-full"
                onKeyDown={handleKeyDown}
            >
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Keress ételt..."
                        className="w-full py-1 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-controls={listboxId}
                        aria-autocomplete="list"
                        aria-haspopup="listbox"
                    />
                    {searchTerm && (
                        <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-emerald-500"
                            onClick={() => {
                                setSearchTerm('');
                                inputRef.current?.focus();
                            }}
                            aria-label="Keresés törlése"
                        >
                            ✕
                        </button>
                    )}
                </div>
                {isOpen && searchTerm.trim() !== '' && (
                    <div
                        id={listboxId}
                        className="absolute z-50 w-full mt-1 bg-base-100 border rounded-lg shadow-lg"
                        role="listbox"
                    >
                        {isLoading ? (
                            <div className="px-4 py-2">
                                Keresés...
                            </div>
                        ) : filteredFoods.length > 0 ? (
                            <ul className="py-1 bg-base-100">
                                {filteredFoods.map((food: MenuItem) => (
                                    <li
                                        key={food.id}
                                        onClick={() => handleSelect(food)}
                                        className="px-4 py-2 cursor-pointer  hover:bg-emerald-400 hover:text-black"
                                        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                                        role="option"
                                    >
                                        <div className="font-medium">{food.name}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-2">
                                Nincs találat
                            </div>
                        )}
                    </div>
                )}
            </div> */}
            <div
                ref={wrapperRef}
                className="relative w-full"
                onKeyDown={handleKeyDown}
            >
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Keress ételt..."
                        className="w-full py-1 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-controls={listboxId}
                        aria-autocomplete="list"
                        aria-haspopup="listbox"
                    />
                    {searchTerm && (
                        <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-emerald-500"
                            onClick={() => {
                                setSearchTerm('');
                                inputRef.current?.focus();
                            }}
                            aria-label="Keresés törlése"
                        >
                            ✕
                        </button>
                    )}
                </div>
                {isOpen && searchTerm.trim() !== '' && (
                    <div
                        id={listboxId}
                        className="absolute z-50 w-full mt-1 bg-base-100 border rounded-lg shadow-lg"
                        role="listbox"
                        style={{
                            backgroundColor: 'var(--background)',  // vagy használd a theme színét
                            borderColor: 'var(--border)',         // vagy használd a theme színét
                        }}
                    >
                        {isLoading ? (
                            <div className="px-4 py-2 bg-base-100">
                                Keresés...
                            </div>
                        ) : filteredFoods.length > 0 ? (
                            <ul className="py-1 bg-base-100">
                                {filteredFoods.map((food: MenuItem) => (
                                    <li
                                        key={food.id}
                                        onClick={() => handleSelect(food)}
                                        className="px-4 py-2 cursor-pointer hover:bg-emerald-400 hover:text-black bg-base-100"
                                        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                                        role="option"
                                    >
                                        <div className="font-medium">{food.name}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-2 bg-base-100">
                                Nincs találat
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Modal megjelenítése mobilon */}
            {isMobile && selectedFood && (
                <div className="fixed inset-0 z-50">
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

export default FoodSearch;