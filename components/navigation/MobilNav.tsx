'use client'
import React, { useEffect, useState } from 'react';
import { House, MapPin, ShoppingBag, ShoppingCart, User } from 'lucide-react';
// import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



const NavItem = ({
    icon: Icon,
    label,
    active = false,
    onClick,
    path
}: {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
    path: string
}) => (
    <Link href={path} onClick={onClick} className=" flex z-50 bg-base-100 flex-1 flex-col items-center justify-center cursor-pointer min-w-[60px] px-1">

        <div
            className={`flex flex-col items-center justify-center w-full
        ${active
                    ? 'text-black bg-emerald-500 p-1 rounded-lg transition-colors duration-200'
                    : 'text-maintext hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-lg transition-colors duration-200'}`}
        >
            <Icon size={16} />
            <span className={`text-xs sm:text-sm mt-0.5 ${active ? 'text-maintext' : 'text-maintext'}`}>
                {label}
            </span>
        </div>

    </Link>
);

const MobileNav = () => {
    // const [activeTab, setActiveTab] = useState<'home' | 'location' | 'weekly' | 'profile'>('home');
    const [activeTab, setActiveTab] = useState<'home' | 'location' | 'weekly' | 'profile' | 'order'>('home');
    const pathname = usePathname();
    // const { data: session } = useSession()
    // const router = useRouter()

    // Pathname változásának követése
    // useEffect(() => {
    //     switch (pathname) {
    //         case '/weekly-menu':
    //             setActiveTab('weekly');
    //             break;
    //         case '/location':
    //             setActiveTab('location');
    //             break;
    //         case '/profile':
    //             setActiveTab('profile');
    //             break;
    //         case '/your_order':
    //             if (session?.accessToken) {
    //                 setActiveTab('order');
    //             } else {
    //                 router.push('/profile')
    //             }
    //             break;
    //         default:
    //             setActiveTab('home');
    //             break;
    //     }
    // }, [pathname]);


    useEffect(() => {
        if (pathname.startsWith('/profile') || pathname.startsWith('/auth')) {
            setActiveTab('profile');
        } else {
            switch (pathname) {
                case '/weekly-menu':
                    setActiveTab('weekly');
                    break;
                case '/location':
                    setActiveTab('location');
                    break;
                case '/cart':
                    setActiveTab('order');
                    break;
                // if (session?.accessToken) {
                //     setActiveTab('order');
                // } else {
                //     router.push('/auth');
                // }

                default:
                    setActiveTab('home');
                    break;
            }
        }

    }, [pathname]);

    return (
        <div className="relative flex flex-col justify-between group/design-root overflow-x-hidden lg:hidden z-50">
            <div className={`fixed bottom-0 left-0 right-0 border-t border-[#2E2E2E]
                           shadow-lg`}>
                <div className="flex w-full justify-between px-1 sm:px-4 py-2 z-50 bg-base-100 safe-area-bottom">

                    <NavItem
                        icon={MapPin}
                        label="Elérhetőség"
                        active={activeTab === 'location'}
                        // onClick={() => setActiveTab('location')}
                        path='/location'
                    />
                    <NavItem
                        icon={ShoppingBag}
                        label="Menü"
                        active={activeTab === 'weekly'}
                        // onClick={() => setActiveTab('weekly')}
                        path='/weekly-menu'
                    />
                    <NavItem
                        icon={House}
                        label="Főoldal"
                        active={activeTab === 'home'}
                        // onClick={() => setActiveTab('home')}
                        path='/'
                    />
                    <NavItem
                        icon={User}
                        label="Profil"
                        active={activeTab === 'profile'}
                        // onClick={() => setActiveTab('profile')}
                        path='/profile'
                    />
                    <NavItem
                        icon={ShoppingCart}
                        label="Kosár"
                        active={activeTab === 'order'}
                        // onClick={() => setActiveTab('profile')}
                        path='/cart'
                    />
                </div>
            </div>
        </div>
    );
};

export default MobileNav;