'use client'
import React, { useState } from 'react';
import { Search, MapPin, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react'
import ThemeController from '@/components/ThemeController';
import InfoModal from '@/components/ui/info/InfoModal';
import FoodSearch from '@/components/ui/FoodSearch';
import ShoppingCartComponent from '@/components/ui/shoppingCart/ShoppingCart';
import LoginForm from '@/components/ui/profile/LoginForm';
import RegisterForm from '@/components/ui/profile/RegisterForm';


// const ProfileMenu = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//     const { data: session } = useSession()

//     // Képernyőméret figyelése
//     React.useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Modal kezelő függvények
//     // const handleLoginClick = () => {
//     //     setIsOpen(false); // Bezárjuk a dropdownt a gombra kattintáskor
//     // };

//     // const handleRegisterClick = () => {
//     //     setIsOpen(false); // Bezárjuk a dropdownt a gombra kattintáskor
//     // };

//     const handleLogin = async () => {
//         setIsOpen(false); // Bezárjuk a dropdownt a gombra kattintáskor

//         const email = prompt("Email:");
//         const password = prompt("Password:");

//         try {
//             const res = await axios.post(
//                 "http://127.0.0.1:8000/api/data/auth/login/",
//                 { email, password },
//                 { headers: { "Content-Type": "application/json" } }
//             );


//             const user = res.data;
//             console.log("User logged in:", user);
//             // Manually update session if needed
//             signIn("credentials", {
//                 redirect: false,
//                 email,
//                 password,
//                 token: user.key,
//             });
//         } catch (error) {
//             console.error("Login failed:", error.response?.data || error.message);
//             alert("Login failed: " + (error.response?.data?.non_field_errors || error.message));
//         }
//     };

//     const handleRegister = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setIsOpen(false); // Bezárjuk a dropdownt a gombra kattintáskor

//         const email = prompt("Email:");
//         const username = prompt("Username:");
//         const password1 = prompt("Password:");
//         const password2 = prompt("Password:");

//         if (password1 !== password2) {
//             alert('Passwords do not match');
//             return;
//         }

//         try {
//             const res = await fetch('http://127.0.0.1:8000/api/data/auth/registration/', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     email: email,
//                     username: username,
//                     password1: password1,
//                     password2: password2,
//                 }),
//             });

//             const data = await res.json();

//             if (res.ok) {
//                 // Sikeres regisztráció után azonnal bejelentkeztetjük
//                 const result = await signIn('credentials', {
//                     email: email,
//                     password: password1,
//                     redirect: false,
//                 });

//                 if (result?.ok) {
//                     return null
//                 } else {
//                     alert('Automatic login failed after registration');
//                 }
//             } else {
//                 alert(data.message || 'Registration failed');
//             }
//         } catch (error) {
//             alert('An error occurred during registration' + error);
//         }

//         // try {
//         //   const res = await axios.post(
//         //     "http://127.0.0.1:8000/api/data/auth/registration/",
//         //     { email, username, password1, password2 },
//         //     { headers: { "Content-Type": "application/json" } }
//         //   );


//         //   const user = res.data;
//         //   console.log("User logged in:", user);
//         //   // Manually update session if needed
//         //   signIn("credentials", {
//         //     redirect: false,
//         //     email,
//         //     password1,
//         //   });
//         // } catch (error) {
//         //   console.error("Login failed:", error.response?.data || error.message);
//         //   alert("Login failed: " + (error.response?.data?.non_field_errors || error.message));
//         // }
//     };


//     // Click esemény kezelése a dropdown megnyitásához/bezárásához
//     const handleClick = () => {
//         if (!isMobile) {
//             setIsOpen(!isOpen);
//         }
//     };

//     // Mobil nézet
//     if (isMobile) {
//         return (
//             <div className="tab flex flex-col items-center gap-1 p-4">
//                 <User className="h-6 w-6" />
//                 <span className="text-sm">Profil</span>
//             </div>
//         );
//     }

//     // Desktop nézet
//     return (
//         <div className="dropdown dropdown-end">
//             <div
//                 className="flex flex-col items-center gap-1 p-4 cursor-pointer"
//                 onClick={handleClick}
//                 tabIndex={0}
//                 role="button"
//             >
//                 <User className="w-7 h-7 " />
//                 {/* <span className="text-sm">Profil</span> */}
//             </div>

//             {isOpen && (
//                 <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
//                     {!session ?
//                         <>
//                             <div className='gap-2 flex flex-col'>

//                                 {/* <Link href='/profile/login/' */}
//                                 <div
//                                     onClick={handleLogin}
//                                     className="btn btn-outline"
//                                 >
//                                     Bejelentkezés
//                                     {/* </Link> */}
//                                 </div>
//                                 <Link href='/profile/register/'
//                                     onClick={handleRegister}
//                                     className="btn btn-outline "
//                                 >
//                                     Regisztráció
//                                 </Link>
//                             </div>
//                         </>
//                         :
//                         <>
//                             <div className='gap-2 flex flex-col'>
//                                 <Link href='/'

//                                     onClick={() => console.log('Rendelések')}
//                                     className="btn btn-outline"
//                                 >

//                                     Rendelések
//                                 </Link>
//                                 <Link href='/profile/'
//                                     // onClick={handleLoginClick}
//                                     className="btn btn-outline"
//                                 >
//                                     Adatok
//                                 </Link>
//                                 <Link href='/'
//                                     onClick={() => signOut()}
//                                     className="btn btn-outline"
//                                 >
//                                     Kijelentkezés
//                                 </Link>
//                             </div>
//                         </>
//                     }
//                 </div>
//             )
//             }



//         </div >
//     );
// };

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
                                <div className="gap-2 flex flex-col">
                                    <Link href="/"
                                        onClick={() => console.log('Rendelések')}
                                        className="btn btn-outline"
                                    >
                                        Rendelések
                                    </Link>
                                    <Link href="/profile/"
                                        className="btn btn-outline"
                                    >
                                        Adatok
                                    </Link>
                                    <Link href="/"
                                        onClick={() => signOut()}
                                        className="btn btn-outline"
                                    >
                                        Kijelentkezés
                                    </Link>
                                </div>
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
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    return (
        <nav className="flex flex-col w-full ">
            <div className="relativ block md:hidden  z-50">
                <div className=" md:hidden navbar bg-base-100">
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