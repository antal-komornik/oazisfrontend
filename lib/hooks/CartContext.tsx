/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react'
import { baseURL } from '@/lib/services/services';

interface CartContextType {
    menu_item: number;
    menu_item_name: string;
    quantity: number;
    unit_price: string;
    subtotal: string;
    pizza_size?: "32" | "40" | "60";
    is_pizza: boolean;
}

interface CartContextValue {
    items: CartContextType[];
    setItems: React.Dispatch<React.SetStateAction<CartContextType[]>>;
    addToCart: (item: CartContextType) => void;
    removeFromCart: (index: number) => void;
    submitOrder: () => Promise<void>;
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Cookie-k küldése
});

axiosInstance.interceptors.request.use(
    async (config) => {
        // Session token megszerzése
        // Ezt majd a CartProvider-ben állítjuk be
        const token = (window as any).__NEXT_AUTH_TOKEN__;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartContextType[]>([]);
    const { data: session } = useSession()

    useEffect(() => {
        if (session?.accessToken) {
            (window as any).__NEXT_AUTH_TOKEN__ = session.accessToken;
        }
    }, [session?.accessToken]);

    const addToCart = (item: CartContextType) => {
        setItems(prev => [...prev, item]);
    };

    const removeFromCart = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const submitOrder = async () => {
        if (items.length === 0) {
            throw new Error('A kosár üres');
        }

        try {
            // Először lekérjük a user adatokat
            const userResponse = await axiosInstance.get('/auth/user', {
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`
                }
            }); const userData = userResponse.data;

            // Rendelés összeállítása a user adatokkal
            const orderData = {
                items: items.map(item => ({
                    menu_item: item.menu_item,
                    quantity: item.quantity,
                    pizza_size: item.pizza_size
                })),
                note: '', // Opcionális megjegyzés
                delivery_info: {
                    name: `${userData.first_name} ${userData.last_name}`,
                    email: userData.email,
                    phone: userData.profile?.phone_number,
                    address: userData.profile?.address,
                }
            };

            // Rendelés küldése
            const response = await axiosInstance.post(`/orders/`, orderData);

            if (response.status === 201) {
                // Siker esetén ürítjük a kosarat
                setItems([]);
                return response.data;
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Axios specifikus hibák kezelése
                const errorMessage = error.response?.data?.message
                    || error.message
                    || 'Hiba történt a rendelés leadása során';
                throw new Error(errorMessage);
            }
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{
            items, setItems,
            addToCart,
            removeFromCart,
            submitOrder
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};

