/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react'
import { baseURL } from '../services/services';

interface CartItemType {
    menu_item: number;
    menu_item_name: string;
    quantity: number;
    unit_price: string;
    packaging_price: string;
    total_packaging_price: number;
    subtotal: string;
    pizza_size?: "32" | "40" | "60";
    is_pizza: boolean;
}

interface CartContextValue {
    items: CartItemType[];
    setItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
    addToCart: (item: CartItemType) => void;
    removeFromCart: (index: number) => void;
    submitOrder: (note: string) => Promise<void>;
    totalAmount: number;
    totalPackagingPrice: number;
    originalAmount: number;
    discountAmount: number;
    isPremiumUser: boolean;
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    async (config) => {
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
    const [items, setItems] = useState<CartItemType[]>([]);
    const { data: session } = useSession();
    const [isPremiumUser, setIsPremiumUser] = useState(false);

    useEffect(() => {
        const checkPremiumStatus = async () => {
            if (session?.accessToken) {
                try {
                    const userResponse = await axiosInstance.get('/auth/user');
                    setIsPremiumUser(userResponse.data.is_premium || false);
                } catch (error) {
                    console.error('Error fetching premium status:', error);
                    setIsPremiumUser(false);
                }
            }
        };

        checkPremiumStatus();
    }, [session?.accessToken]);

    // Calculate original amount without discount
    const originalAmount = items.reduce((sum, item) => {
        const itemTotal = Number(item.subtotal) + item.total_packaging_price;
        return sum + itemTotal;
    }, 0);

    // Calculate discount amount (10% if premium user)
    const discountAmount = isPremiumUser ? originalAmount * 0.1 : 0;

    // Calculate final total amount after discount
    const totalAmount = originalAmount - discountAmount;

    const totalPackagingPrice = items.reduce((sum, item) => {
        return sum + item.total_packaging_price;
    }, 0);

    useEffect(() => {
        if (session?.accessToken) {
            (window as any).__NEXT_AUTH_TOKEN__ = session.accessToken;
        }
    }, [session?.accessToken]);

    const addToCart = (item: CartItemType) => {
        setItems(prev => [...prev, item]);
    };

    const removeFromCart = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const submitOrder = async (note: string) => {
        if (items.length === 0) {
            throw new Error('A kosár üres');
        }

        try {
            const userResponse = await axiosInstance.get('/auth/user', {
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`
                }
            });
            const userData = userResponse.data;

            const orderData = {
                submitted_items: items,
                total_amount: String(totalAmount),
                original_total_amount: originalAmount,
                discount_amount: discountAmount,
                is_premium_order: isPremiumUser,
                total_packaging_price: String(totalPackagingPrice),
                note: note,
                user_email: userData.email,
                user_first_name: userData.first_name,
                user_last_name: userData.last_name,
                user_phone: userData.profile?.phone_number,
                user_address: userData.profile?.address,
            };

            const response = await axiosInstance.post(`/orders/`, orderData);

            if (response.status === 201) {
                setItems([]);
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
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
            items,
            setItems,
            addToCart,
            removeFromCart,
            submitOrder,
            totalAmount,
            totalPackagingPrice,
            originalAmount,
            discountAmount,
            isPremiumUser
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