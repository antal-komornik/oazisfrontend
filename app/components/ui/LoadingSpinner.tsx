'use client'
import React from 'react';
import Image from 'next/image';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 bg-base-100 flex flex-col items-center justify-center z-[9999]">
            <div className="flex flex-col items-center gap-8">
                <div className="relative w-48 h-48">
                    <Image
                        src="/images/oazis.png" // Helyettesítsd a logó tényleges útvonalával
                        alt="OAZIS ÉTTEREM LOGO"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    {/* <span className="loading loading-spinner loading-lg text-primary"></span> */}
                    <p className="text-lg font-medium">Betöltés...</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;