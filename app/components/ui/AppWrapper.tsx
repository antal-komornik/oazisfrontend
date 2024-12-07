// app/components/AppWrapper.tsx
'use client'
import React, { useEffect, ReactNode } from 'react';
import { useLoading } from '@/app/context/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
    const { isLoading, setIsLoading } = useLoading();

    useEffect(() => {
        // Amikor az oldal betöltődik, minden erőforrást ellenőrzünk
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500); // Kis késleltetés a smooth átmenethez
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, [setIsLoading]);

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {children}
        </>
    );
};

export default AppWrapper;