'use client'
import React, { useState } from 'react';
import { House, MapPin, ShoppingBag } from 'lucide-react';
import HomeTab from '@/app/components/ui/tabs/HomeTab';
import WeeklyTab from '@/app/components/ui/tabs/WeeklyTab';
import LocationTab from '@/app/components/ui/tabs/LocationTab';



const NavItem = ({
    icon: Icon,
    label,
    active = false,
    onClick
}: {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) => (
    <div
        onClick={onClick}
        className="flex z-50 bg-base-100 flex-1 flex-col items-center justify-center cursor-pointer min-w-[60px] px-1"
    >
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
    </div>
);

const MobileNav = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'location' | 'weekly'>('home');
    // const { scrollDirection } = useScroll();

    const renderContent = () => {
        switch (activeTab) {
            case 'weekly':
                return <WeeklyTab />;
            case 'location':
                return <LocationTab />;
            default:
                return <HomeTab />;
        }
    };
    return (
        <>
            <div className="relative flex flex-col justify-between group/design-root overflow-x-hidden lg:hidden z-50">
                {renderContent()}
                <div className={`fixed bottom-0 left-0 right-0 border-t border-[#2E2E2E]
                           shadow-lg`}>
                    <div className="flex w-full justify-between px-1 sm:px-4 py-2 z-50 bg-base-100 safe-area-bottom">
                        <NavItem
                            icon={House}
                            label="Főoldal"
                            active={activeTab === 'home'}
                            onClick={() => setActiveTab('home')}
                        />
                        <NavItem
                            icon={MapPin}
                            label="Elérhetőség"
                            active={activeTab === 'location'}
                            onClick={() => setActiveTab('location')}
                        />
                        <NavItem
                            icon={ShoppingBag}
                            label="Heti Menü"
                            active={activeTab === 'weekly'}
                            onClick={() => setActiveTab('weekly')}
                        />

                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileNav;


// 'use client'
// import React, { useState } from 'react';
// import { House, MapPin, ShoppingBag } from 'lucide-react';
// import HomeTab from '@/app/components/ui/tabs/HomeTab';
// import WeeklyTab from '@/app/components/ui/tabs/WeeklyTab';
// import LocationTab from '@/app/components/ui/tabs/LocationTab';

// const AnimatedContent = ({ children, isVisible }) => (
//     <div className={`
//     transition-all duration-300
//     ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
//   `}>
//         {children}
//     </div>
// );

// const TabContent = ({ id, isActive }) => {
//     const contents = {
//         home: <HomeTab />,
//         location: <LocationTab />,
//         weekly: <WeeklyTab />
//     };

//     return (
//         <AnimatedContent isVisible={isActive}>
//             {contents[id]}
//         </AnimatedContent>
//     );
// };

// const NavItem = ({
//     icon: Icon,
//     label,
//     active = false,
//     onClick
// }: {
//     icon: React.ElementType;
//     label: string;
//     active?: boolean;
//     onClick?: () => void;
// }) => (
//     <button
//         onClick={onClick}
//         className={`
//       flex flex-col items-center p-4 flex-1
//       transition-all duration-300
//       ${active
//                 ? 'text-emerald-500 scale-105'
//                 : 'text-gray-600 hover:text-gray-900'
//             }
//     `}
//     >
//         <Icon className="w-5 h-5 mb-1" />
//         <span className="text-xs">{label}</span>
//     </button>
// );

// const MobileNav = () => {
//     const [activeTab, setActiveTab] = useState('home');
//     const [isAnimating, setIsAnimating] = useState(false);

//     const handleTabChange = (tabId: string) => {
//         if (tabId === activeTab || isAnimating) return;

//         setIsAnimating(true);
//         setActiveTab(tabId);

//         setTimeout(() => {
//             setIsAnimating(false);
//         }, 300);
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-base-100">
//             <main className="flex-1 overflow-hidden">
//                 <div className="relative h-full">
//                     {['home', 'location', 'weekly'].map((tabId) => (
//                         <div
//                             key={tabId}
//                             className={`absolute w-full h-full transition-all duration-300
//                 ${activeTab === tabId ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                         >
//                             <TabContent id={tabId} isActive={activeTab === tabId} />
//                         </div>
//                     ))}
//                 </div>
//             </main>

//             <nav className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-[#2E2E2E] shadow-lg">
//                 <div className="flex justify-around safe-area-bottom">
//                     <NavItem
//                         icon={House}
//                         label="Főoldal"
//                         active={activeTab === 'home'}
//                         onClick={() => handleTabChange('home')}
//                     />
//                     <NavItem
//                         icon={MapPin}
//                         label="Elérhetőség"
//                         active={activeTab === 'location'}
//                         onClick={() => handleTabChange('location')}
//                     />
//                     <NavItem
//                         icon={ShoppingBag}
//                         label="Heti Menü"
//                         active={activeTab === 'weekly'}
//                         onClick={() => handleTabChange('weekly')}
//                     />
//                 </div>
//             </nav>
//         </div>
//     );
// };

// export default MobileNav;