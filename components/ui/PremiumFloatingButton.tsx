// 'use client'
// import React, { useEffect, useState } from 'react';
// import { unknown } from 'zod';
// import { useValidSession } from '@/lib/hooks/useValidSession';

// const PremiumFloatingButton = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     // const { data: session } = useSession()
//     const [isPremiumUser, setIsPreiumUser] = useState<boolean | undefined | unknown>()
//     const session = useValidSession();

//     if (!session?.user?.is_premium) {
//         return null;
//     }

//     useEffect(() => {

//         if (session?.user.is_premium) {
//             setIsPreiumUser(session.user.is_premium)
//         }
//     }, [session?.user.is_premium])

//     if (!isPremiumUser || isPremiumUser === undefined || isPremiumUser === unknown) {
//         return null;
//     }

//     return (
//         <>
//             {/* Lebegő gomb */}
//             <button
//                 onClick={() => setIsOpen(true)}
//                 className="fixed bottom-20 right-6 bg-gradient-to-r from-lime-500 to-emerald-600 text-black rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
//             >
//                 <span>Prémium Kedvezmény</span>
//             </button>

//             {/* Modal/Popup */}
//             {isOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg p-6 max-w-md w-full">
//                         <div className="text-2xl font-bold text-white dark:text-black mb-4">
//                             Prémium Kedvezmény Aktiválva!
//                         </div>
//                         <div className="text-gray-600 mb-6">
//                             Gratulálunk! Prémium tagként 10% kedvezményt kap a teljes rendelés összegéből.
//                             Ez a kedvezmény automatikusan érvényesül a fizetésnél.
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 onClick={() => setIsOpen(false)}
//                                 className="bg-emerald-500 text-black px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
//                             >
//                                 Értem
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default PremiumFloatingButton
// // const PremiumBadge = () => {
// //     const { data: session } = useSession()
// //     const ispremium = session?.user.is_premium
// //     session?.user.is_premium ? <PremiumFloatingButton isPremiumUser={ispremium} /> : null

// // }

// // export default PremiumBadge




'use client'

import React, { useState } from 'react';
import { useValidSession } from '@/lib/hooks/useValidSession';

const PremiumFloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const session = useValidSession();

    // Ha nincs érvényes session vagy nem premium user, ne jelenjen meg
    if (!session?.user?.is_premium) {
        return null;
    }

    return (
        <>
            {/* Lebegő gomb */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-6 bg-gradient-to-r from-lime-500 to-emerald-600 text-black rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
                <span>Prémium Kedvezmény</span>
            </button>

            {/* Modal/Popup */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="text-2xl font-bold text-white dark:text-black mb-4">
                            Prémium Kedvezmény Aktiválva!
                        </div>
                        <div className="text-gray-600 mb-6">
                            Gratulálunk! Prémium tagként 10% kedvezményt kap a teljes rendelés összegéből.
                            Ez a kedvezmény automatikusan érvényesül a fizetésnél.
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-emerald-500 text-black px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
                            >
                                Értem
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PremiumFloatingButton;