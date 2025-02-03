// 'use client'
// import React, { useState } from 'react';
// import { useCart } from '@/lib/hooks/CartContext';
// import { useSession } from 'next-auth/react';
// import { toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { AlertCircle } from 'lucide-react';
// import Link from 'next/link';

// const OrderConfirmationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
//                 <div className="text-center">
//                     <h3 className="text-lg font-bold mb-2">Rendelés sikeresen leadva!</h3>
//                     <p className="text-gray-600 mb-4">
//                         Köszönjük a rendelését! A visszaigazolást emailben küldjük el.
//                     </p>
//                     <button
//                         onClick={onClose}
//                         className="btn btn-primary w-full"
//                     >
//                         Rendben
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Checkout = () => {
//     const router = useRouter();
//     const { data: session } = useSession();
//     const { items, submitOrder, totalAmount, totalPackagingPrice } = useCart();
//     const [note, setNote] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [showConfirmation, setShowConfirmation] = useState(false);

//     const subtotal = items.reduce((sum, item) => sum + Number(item.subtotal), 0);

//     // Ellenőrizzük, hogy a felhasználó beállította-e a kötelező adatokat
//     const hasRequiredInfo = session?.user?.profile?.phone_number && session?.user?.profile?.address;

//     const handleSubmitOrder = async () => {
//         if (!hasRequiredInfo) {
//             toast.error('Kérjük, adja meg a szállítási címet és telefonszámot a profiljában!');
//             return;
//         }

//         setIsLoading(true);
//         try {
//             await submitOrder(note);
//             setShowConfirmation(true);
//         } catch (error) {
//             let errorMessage = 'Hiba történt a rendelés során';
//             if (error instanceof Error) {
//                 errorMessage = error.message;
//             }
//             toast.error(errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleConfirmationClose = () => {
//         setShowConfirmation(false);
//         router.push('/'); // Visszairányítás a főoldalra
//     };

//     if (items.length === 0) {
//         return (
//             <div className="container mx-auto p-4 text-center">
//                 <p className="text-lg">A kosár üres</p>
//                 <button
//                     onClick={() => router.push('/')}
//                     className="btn btn-primary mt-4"
//                 >
//                     Vissza a főoldalra
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-4 max-w-4xl">
//             <h1 className="text-2xl font-bold mb-6">Rendelés véglegesítése</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Bal oldal: Rendelési adatok */}
//                 <div className="space-y-6">
//                     <div className="card bg-base-100 shadow">
//                         <div className="card-body">
//                             <h2 className="card-title">Szállítási adatok</h2>
//                             {session?.user ? (
//                                 <div className="space-y-2">
//                                     <p><strong>Név:</strong> {session.user.name}</p>
//                                     <p><strong>Email:</strong> {session.user.email}</p>
//                                     <p className={!session.user.profile?.phone_number ? 'text-error' : ''}>
//                                         <strong>Telefon:</strong> {session.user.profile?.phone_number || 'Nincs megadva'}
//                                     </p>
//                                     <p className={!session.user.profile?.address ? 'text-error' : ''}>
//                                         <strong>Cím:</strong> {session.user.profile?.address || 'Nincs megadva'}
//                                     </p>

//                                     {!hasRequiredInfo && (
//                                         <div className="alert alert-warning mt-4">
//                                             <AlertCircle className="h-5 w-5" />
//                                             <div className="flex flex-col">
//                                                 <span>A rendeléshez szükséges a telefonszám és szállítási cím megadása!</span>
//                                                 <Link href="/profile" className="link link-primary">
//                                                     Profil adatok szerkesztése
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 <div className="alert alert-error">
//                                     <p>Kérjük, jelentkezzen be a rendelés leadásához!</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="card bg-base-100 shadow">
//                         <div className="card-body">
//                             <h2 className="card-title">Megjegyzés a rendeléshez</h2>
//                             <textarea
//                                 value={note}
//                                 onChange={(e) => setNote(e.target.value)}
//                                 className="textarea textarea-bordered w-full"
//                                 placeholder="Pl. kapucsengő, emelet, speciális kérések..."
//                                 rows={3}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Jobb oldal: Rendelés összesítő */}
//                 <div className="card bg-base-100 shadow">
//                     <div className="card-body">
//                         <h2 className="card-title mb-4">Rendelés összesítő</h2>

//                         <div className="max-h-[40vh] overflow-y-auto mb-4">
//                             {items.map((item, index) => (
//                                 <div key={index} className="flex flex-col gap-1 border-b py-2">
//                                     <div className="flex justify-between">
//                                         <div>
//                                             <p className="font-medium">{item.menu_item_name}</p>
//                                             <p className="text-sm text-base-content/70">
//                                                 {item.quantity} db × {Number(item.unit_price).toLocaleString()} Ft
//                                                 {item.pizza_size && ` (${item.pizza_size} cm)`}
//                                             </p>
//                                         </div>
//                                         <div className="text-right">
//                                             <p>{Number(item.subtotal).toLocaleString()} Ft</p>
//                                             <p className="text-sm text-base-content/70">
//                                                 +{item.total_packaging_price.toLocaleString()} Ft csomagolás
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="space-y-2">
//                             <div className="flex justify-between text-base-content/70">
//                                 <span>Ételek összesen:</span>
//                                 <span>{subtotal.toLocaleString()} Ft</span>
//                             </div>
//                             <div className="flex justify-between text-base-content/70">
//                                 <span>Csomagolás összesen:</span>
//                                 <span>{totalPackagingPrice.toLocaleString()} Ft</span>
//                             </div>
//                             <div className="flex justify-between font-bold text-lg">
//                                 <span>Végösszeg:</span>
//                                 <span>{totalAmount.toLocaleString()} Ft</span>
//                             </div>
//                         </div>

//                         <button
//                             onClick={handleSubmitOrder}
//                             disabled={!session?.user || !hasRequiredInfo || isLoading}
//                             className={`btn btn-primary w-full mt-4 ${isLoading ? 'loading' : ''}`}
//                         >
//                             {isLoading
//                                 ? 'Rendelés feldolgozása...'
//                                 : !session?.user
//                                     ? 'Jelentkezz be a rendeléshez'
//                                     : !hasRequiredInfo
//                                         ? 'Hiányzó szállítási adatok'
//                                         : 'Rendelés leadása'
//                             }
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <OrderConfirmationModal
//                 isOpen={showConfirmation}
//                 onClose={handleConfirmationClose}
//             />
//         </div>
//     );
// };

// export default Checkout;



'use client'
import React, { useState } from 'react';
import { useCart } from '@/lib/hooks/CartContext';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

const OrderConfirmationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="text-center">
                    <h3 className="text-lg font-bold mb-2">Rendelés sikeresen leadva!</h3>
                    <p className="text-gray-600 mb-4">
                        Köszönjük a rendelését! A visszaigazolást emailben küldjük el.
                    </p>
                    <button
                        onClick={onClose}
                        className="btn btn-primary w-full"
                    >
                        Rendben
                    </button>
                </div>
            </div>
        </div>
    );
};

const Checkout = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const {
        items,
        submitOrder,
        totalAmount,
        totalPackagingPrice,
        originalAmount,
        discountAmount,
        isPremiumUser
    } = useCart();
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const subtotal = items.reduce((sum, item) => sum + Number(item.subtotal), 0);

    // Ellenőrizzük, hogy a felhasználó beállította-e a kötelező adatokat
    const hasRequiredInfo = session?.user?.profile?.phone_number && session?.user?.profile?.address;

    const handleSubmitOrder = async () => {
        if (!hasRequiredInfo) {
            toast.error('Kérjük, adja meg a szállítási címet és telefonszámot a profiljában!');
            return;
        }

        setIsLoading(true);
        try {
            await submitOrder(note);
            setShowConfirmation(true);
        } catch (error) {
            let errorMessage = 'Hiba történt a rendelés során';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmationClose = () => {
        setShowConfirmation(false);
        router.push('/'); // Visszairányítás a főoldalra
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-lg">A kosár üres</p>
                <button
                    onClick={() => router.push('/')}
                    className="btn btn-primary mt-4"
                >
                    Vissza a főoldalra
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">Rendelés véglegesítése</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bal oldal: Rendelési adatok */}
                <div className="space-y-6">
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">Szállítási adatok</h2>
                            {session?.user ? (
                                <div className="space-y-2">
                                    <p><strong>Név:</strong> {session.user.name}</p>
                                    <p><strong>Email:</strong> {session.user.email}</p>
                                    <p className={!session.user.profile?.phone_number ? 'text-error' : ''}>
                                        <strong>Telefon:</strong> {session.user.profile?.phone_number || 'Nincs megadva'}
                                    </p>
                                    <p className={!session.user.profile?.address ? 'text-error' : ''}>
                                        <strong>Cím:</strong> {session.user.profile?.address || 'Nincs megadva'}
                                    </p>

                                    {isPremiumUser && (
                                        <div className="alert alert-success mt-4">
                                            <span>Prémium felhasználóként 10% kedvezményt kap!</span>
                                        </div>
                                    )}

                                    {!hasRequiredInfo && (
                                        <div className="alert alert-warning mt-4">
                                            <AlertCircle className="h-5 w-5" />
                                            <div className="flex flex-col">
                                                <span>A rendeléshez szükséges a telefonszám és szállítási cím megadása!</span>
                                                <Link href="/profile" className="link link-primary">
                                                    Profil adatok szerkesztése
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="alert alert-error">
                                    <p>Kérjük, jelentkezzen be a rendelés leadásához!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title">Megjegyzés a rendeléshez</h2>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="textarea textarea-bordered w-full"
                                placeholder="Pl. kapucsengő, emelet, speciális kérések..."
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                {/* Jobb oldal: Rendelés összesítő */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Rendelés összesítő</h2>

                        <div className="max-h-[40vh] overflow-y-auto mb-4">
                            {items.map((item, index) => (
                                <div key={index} className="flex flex-col gap-1 border-b py-2">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-medium">{item.menu_item_name}</p>
                                            <p className="text-sm text-base-content/70">
                                                {item.quantity} db × {Number(item.unit_price).toLocaleString()} Ft
                                                {item.pizza_size && ` (${item.pizza_size} cm)`}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p>{Number(item.subtotal).toLocaleString()} Ft</p>
                                            <p className="text-sm text-base-content/70">
                                                +{item.total_packaging_price.toLocaleString()} Ft csomagolás
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-base-content/70">
                                <span>Ételek összesen:</span>
                                <span>{subtotal.toLocaleString()} Ft</span>
                            </div>
                            <div className="flex justify-between text-base-content/70">
                                <span>Csomagolás összesen:</span>
                                <span>{totalPackagingPrice.toLocaleString()} Ft</span>
                            </div>
                            {isPremiumUser && (
                                <>
                                    <div className="flex justify-between text-base-content/70">
                                        <span>Eredeti végösszeg:</span>
                                        <span>{originalAmount.toLocaleString()} Ft</span>
                                    </div>
                                    <div className="flex justify-between text-success font-medium">
                                        <span>Prémium kedvezmény (10%):</span>
                                        <span>-{discountAmount.toLocaleString()} Ft</span>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between font-bold text-lg mt-2">
                                <span>Végösszeg:</span>
                                <span>{totalAmount.toLocaleString()} Ft</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmitOrder}
                            disabled={!session?.user || !hasRequiredInfo || isLoading}
                            className={`btn btn-primary w-full mt-4 ${isLoading ? 'loading' : ''}`}
                        >
                            {isLoading
                                ? 'Rendelés feldolgozása...'
                                : !session?.user
                                    ? 'Jelentkezz be a rendeléshez'
                                    : !hasRequiredInfo
                                        ? 'Hiányzó szállítási adatok'
                                        : 'Rendelés leadása'
                            }
                        </button>
                    </div>
                </div>
            </div>

            <OrderConfirmationModal
                isOpen={showConfirmation}
                onClose={handleConfirmationClose}
            />
        </div>
    );
};

export default Checkout;