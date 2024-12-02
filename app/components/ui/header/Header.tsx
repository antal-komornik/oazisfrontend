'use client'
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import ThemeController from '@/app/components/ui/ThemeController';
import LocationModal from '@/app/components/ui/info/LocationModal';
import FoodSearch from '../searchFood';
import Link from 'next/link';


const Logo = () => (
    // <div className="flex items-center justify-between md:justify-around ">
    <div className="flex items-center  justify-start md:justify-around lg:justify-between  ">
        {/* <div className="w-[50px]">
            <Image
                src={'/images/oazis.png'}
                alt={'oazis'}
                width={50}
                height={50}
                quality={100}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true} // LCP (Largest Contentful Paint) képekhez
                loading="eager"

            />
        </div> */}
        <Link href='/'>
            <h1 className="text-lg  font-bold leading-tight tracking-[-0.015em]">
                OÁZIS ÉTTEREM
            </h1>
        </Link>
    </div >
);

const LocationButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center rounded-xl h-10 bg-light-button dark:bg-dark-button text-light-text dark:text-dark-text gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-2.5"
                aria-label="Location"
            >
                <MapPin className="w-7 h-7  " />
            </button>
            <LocationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

const SearchBar = () => (
    <label className="flex flex-col min-w-40  max-w-64 px-2">
        <div className="flex w-full flex-1 items-center rounded-xl h-full">
            {/* <div
                className="  text-gray-400  border-none bg-light-input dark:bg-dark-input items-center justify-center pl-4 rounded-l-xl border-r-0"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
            </div> */}
            <FoodSearch />
        </div>
    </label>
);


const Header = () => {
    {/* <div className="hidden md:block">
        <WebNav />
        </div>
        <div className="block lg:hidden">
        <MobileNav />
        </div> */}
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    return (
        <nav className="flex flex-col w-full ">
            {/* Mobile header */}
            <div className="block lg:hidden  ">
                <div className="lg:hidden navbar bg-base-100">
                    <div className="flex flex-col w-full">
                        <div className="navbar bg-base-100">
                            <div className="navbar-start">
                                <Logo />
                            </div>
                            <div className="navbar-end gap-2">
                                <button className=" btn btn-ghost btn-circle" onClick={() => setIsSearchVisible(!isSearchVisible)}>
                                    <Search />
                                </button>
                                <ThemeController />
                            </div>
                        </div>
                        {isSearchVisible && (
                            <div className="flex justify-center w-full px-4 py-2 bg-base-100 border-t border-base-200">
                                <SearchBar />
                            </div>
                        )}
                    </div>
                </div>
                {/* <MobileNav /> */}
            </div>

            {/* Desktop header */}
            <div className="hidden lg:flex flex-col ">
                <header className="flex navbar bg-base-100 items-center justify-between whitespace-nowrap border-b border-solid border-gray-700 px-0 py-0">
                    <SearchBar />
                    <Logo />
                    <div className="flex items-center justify-around gap-8 px-5">
                        <LocationButton />
                        <ThemeController />
                    </div>
                </header>
            </div>
        </nav >
    )
}

export default Header