'use client'
import React, { useState } from 'react';
import { Search, MapPin, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ThemeController from '@/components/ThemeController';
import InfoModal from '@/components/ui/info/InfoModal';
import FoodSearch from '@/components/ui/FoodSearch';
import ShoppingCartComponent from '@/components/ui/shoppingCart/ShoppingCart';
import LoginForm from '@/components/ui/profile/LoginForm';
import RegisterForm from '@/components/ui/profile/RegisterForm';
import ProfileNav from '../ProfileNav';


const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const { data: session } = useSession();

    // Screen size monitoring
    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Click handler for dropdown
    const handleClick = () => {
        if (!isMobile) {
            setIsOpen(!isOpen);
        }
    };

    // Mobile view
    if (isMobile) {
        return (
            <div className="tab flex flex-col items-center gap-1 p-4">
                <User className="h-6 w-6" />
                <span className="text-sm">Profil</span>
            </div>
        );
    }

    // Desktop view
    return (
        <>
            <div className="dropdown dropdown-end">
                <div
                    className="flex flex-col items-center gap-1 p-4 cursor-pointer"
                    onClick={handleClick}
                    tabIndex={0}
                    role="button"
                >
                    <User className="w-7 h-7" />
                </div>

                {isOpen && (
                    <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                        {!session ? (
                            <>
                                <div className="gap-2 flex flex-col">
                                    <button
                                        onClick={() => {
                                            setShowLoginModal(true);
                                            setIsOpen(false);
                                        }}
                                        className="btn btn-outline"
                                    >
                                        Bejelentkezés
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowRegisterModal(true);
                                            setIsOpen(false);
                                        }}
                                        className="btn btn-outline"
                                    >
                                        Regisztráció
                                    </button>
                                </div>
                            </>
                        ) : (
                                <>
                                    <ProfileNav />

                                </>

                        )}
                    </div>
                )}
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box relative">
                        <button
                            className="btn btn-circle btn-ghost absolute left-2 top-2"
                            onClick={() => setShowLoginModal(false)}
                        >
                            <ArrowLeft />
                        </button>
                        <div className="mt-8"  >
                            <LoginForm setShowLoginModal={setShowLoginModal} />
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setShowLoginModal(false)}>close</button>
                    </form>
                </dialog>
            )}

            {/* Register Modal */}
            {showRegisterModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box relative">
                        <button
                            className="btn btn-circle btn-ghost absolute left-2 top-2"
                            onClick={() => setShowRegisterModal(false)}
                        >
                            <ArrowLeft />
                        </button>
                        <div className="mt-8">
                            <RegisterForm setShowRegisterModal={setShowRegisterModal} />
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setShowRegisterModal(false)}>close</button>
                    </form>
                </dialog>
            )}
        </>
    );
};




const Logo = () => (
    // <div className="flex items-center justify-between md:justify-around ">
    <div className="flex items-center  justify-start md:justify-around lg:justify-between  ">
        <div className="w-[50px]">
            <Image
                src={'/logo.png'}
                alt={'oazis'}
                width={50}
                height={50}
                quality={100}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true} // LCP (Largest Contentful Paint) képekhez
                loading="eager"

            />
        </div>
        <Link href='/'>
            <h1 className="text-lg  font-bold leading-tight tracking-[-0.015em]">
                OÁZIS ÉTTEREM
            </h1>
        </Link>
    </div >
);

const InfoButton = () => {
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
            <InfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

const SearchBar = () => (
    <label className="flex flex-col min-w-40  max-w-64 px-2">
        <div className="flex w-full flex-1 items-center rounded-xl h-full">

            <FoodSearch />
        </div>
    </label>
);


const Header = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    return (
        <nav className="flex flex-col w-full ">
            <div className="relativ block md:hidden  z-50">
                <div className=" md:hidden navbar bg-base-100  w-full">
                    <div className="flex flex-col w-full">
                        <div className="navbar bg-base-100">
                            <div className="flex w-full justify-between items-center">
                                <Logo />
                                <div className="flex items-center gap-2">
                                    <button
                                        className="btn btn-ghost btn-circle"
                                        onClick={() => setIsSearchVisible(prev => !prev)}
                                    >
                                        <Search />
                                    </button>
                                    <ThemeController />
                                </div>
                            </div>
                        </div>
                        {isSearchVisible && (
                            <div className="flex justify-center w-full px-4 py-2 bg-base-100 border-t border-base-200">
                                <SearchBar />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-col ">
                <header className="flex navbar bg-base-100 items-center justify-between whitespace-nowrap border-b border-solid border-gray-700 px-0 py-0">
                    <SearchBar />
                    <Logo />
                    <div className="flex items-center justify-around gap-8 px-5">
                        <ThemeController />
                        <InfoButton />
                        <ProfileMenu />
                        <ShoppingCartComponent />
                    </div>
                </header>
            </div>
        </nav >
    )
}

export default Header