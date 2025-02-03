// 'use client'
// import React, { useState } from 'react';
// import { useCart } from '@/lib/hooks/CartContext';
// import { ShoppingCart, X } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import axios from 'axios';

// const SubmitBtn = () => {
//     const { items, submitOrder } = useCart();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [note, setNote] = useState("");

//     const handleOrder = async () => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             await submitOrder(note);
//             toast.success('Rendelés sikeresen leadva!');
//         } catch (error) {
//             let errorMessage = 'Hiba történt a rendelés során';
//             if (axios.isAxiosError(error)) {
//                 if (error.response?.status === 401) {
//                     errorMessage = 'Kérjük, jelentkezzen be a rendelés leadásához!';
//                 } else if (error.response?.status === 400) {
//                     errorMessage = error.response.data.message || 'Érvénytelen rendelési adatok';
//                 } else if (error.response?.status === 404) {
//                     errorMessage = 'A termék nem található vagy már nem elérhető';
//                 } else if (error.code === 'ERR_NETWORK') {
//                     errorMessage = 'Hálózati hiba történt, kérjük ellenőrizze internetkapcsolatát';
//                 }
//             }
//             setError(errorMessage);
//             toast.error(errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (items.length === 0) return null;

//     return (
//         <div className="flex flex-col gap-2 w-full">
//             {error && (
//                 <div className="text-error text-sm text-center">
//                     {error}
//                 </div>
//             )}
//             <textarea
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 placeholder="Megjegyzés a rendeléshez..."
//                 className="textarea textarea-bordered w-full"
//                 rows={2}
//             />
//             <button
//                 onClick={handleOrder}
//                 className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
//                 disabled={isLoading}
//             >
//                 {isLoading ? 'Rendelés folyamatban...' : `Rendelés leadása (${items.length} tétel)`}
//             </button>
//         </div>
//     );
// };

// const ShoppingCartComponent = () => {
//     const { items, removeFromCart, totalAmount, totalPackagingPrice } = useCart();
//     const [isOpen, setIsOpen] = useState(false);

//     // Az ételek összértéke a csomagolás nélkül
//     const subtotal = items.reduce((sum, item) => sum + Number(item.subtotal), 0);

//     return (
//         <div className="dropdown dropdown-end">
//             <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <div className="indicator">
//                     <ShoppingCart className="h-5 w-5" />
//                     {items.length > 0 && (
//                         <span className="badge badge-sm indicator-item">
//                             {items.length}
//                         </span>
//                     )}
//                 </div>
//             </div>

//             <div
//                 tabIndex={0}
//                 className={`mt-3 z-[1] card card-compact dropdown-content w-96 bg-base-100 shadow-xl ${isOpen ? '' : 'hidden'}`}
//             >
//                 <div className="card-body">
//                     <h3 className="font-bold text-lg">Kosár</h3>

//                     {items.length === 0 ? (
//                         <p className="text-center py-4 text-base-content/70">
//                             A kosár üres
//                         </p>
//                     ) : (
//                         <>
//                             <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
//                                 {items.map((item, index) => (
//                                     <div key={index} className="flex flex-col gap-1 border-b pb-2">
//                                         <div className="flex justify-between items-start">
//                                             <div className="flex-1">
//                                                 <h4 className="font-medium">{item.menu_item_name}</h4>
//                                                 <div className="text-sm text-base-content/70">
//                                                     {item.quantity} db × {Number(item.unit_price).toLocaleString()} Ft
//                                                     {item.pizza_size && ` (${item.pizza_size} cm)`}
//                                                 </div>
//                                             </div>
//                                             <button
//                                                 onClick={() => removeFromCart(index)}
//                                                 className="btn btn-ghost btn-xs text-error"
//                                             >
//                                                 <X className="h-4 w-4" />
//                                             </button>
//                                         </div>
//                                         <div className="flex flex-col text-sm text-base-content/70">
//                                             <div className="flex justify-between">
//                                                 <span>Étel ár:</span>
//                                                 <span>{Number(item.subtotal).toLocaleString()} Ft</span>
//                                             </div>
//                                             <div className="flex justify-between">
//                                                 <span>Csomagolás ({item.quantity} × {Number(item.packaging_price)} Ft):</span>
//                                                 <span>{item.total_packaging_price.toLocaleString()} Ft</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="divider my-2" />

//                                 <div className="flex flex-col gap-1">
//                                     <div className="flex justify-between items-center text-base-content/70">
//                                         <span>Ételek összesen:</span>
//                                         <span>{subtotal.toLocaleString()} Ft</span>
//                                     </div>
//                                     <div className="flex justify-between items-center text-base-content/70">
//                                         <span>Csomagolás összesen:</span>
//                                         <span>{totalPackagingPrice.toLocaleString()} Ft</span>
//                                     </div>
//                                     <div className="flex justify-between items-center font-bold text-lg mt-2">
//                                         <span>Végösszeg:</span>
//                                         <span>{totalAmount.toLocaleString()} Ft</span>
//                                     </div>
//                             </div>

//                             <SubmitBtn />
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShoppingCartComponent;




import React, { useState } from 'react';
import { useCart } from '@/lib/hooks/CartContext';
import { ShoppingCart, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ShoppingCartComponent = () => {
    const router = useRouter();
    const { items, removeFromCart, totalAmount, totalPackagingPrice } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    // Az ételek összértéke a csomagolás nélkül
    const subtotal = items.reduce((sum, item) => sum + Number(item.subtotal), 0);

    const handleCheckout = () => {
        setIsOpen(false); // Bezárjuk a kosár dropdown-t
        router.push('/checkout');
    };

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="indicator">
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="badge badge-sm indicator-item">
                            {items.length}
                        </span>
                    )}
                </div>
            </div>

            <div
                tabIndex={0}
                className={`mt-3 z-[1] card card-compact dropdown-content w-96 bg-base-100 shadow-xl ${isOpen ? '' : 'hidden'}`}
            >
                <div className="card-body">
                    <h3 className="font-bold text-lg">Kosár</h3>

                    {items.length === 0 ? (
                        <p className="text-center py-4 text-base-content/70">
                            A kosár üres
                        </p>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                                {items.map((item, index) => (
                                    <div key={index} className="flex flex-col gap-1 border-b pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-medium">{item.menu_item_name}</h4>
                                                <div className="text-sm text-base-content/70">
                                                    {item.quantity} db × {Number(item.unit_price).toLocaleString()} Ft
                                                    {item.pizza_size && ` (${item.pizza_size} cm)`}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="btn btn-ghost btn-xs text-error"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex flex-col text-sm text-base-content/70">
                                            <div className="flex justify-between">
                                                <span>Étel ár:</span>
                                                <span>{Number(item.subtotal).toLocaleString()} Ft</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Csomagolás ({item.quantity} × {Number(item.packaging_price)} Ft):</span>
                                                <span>{item.total_packaging_price.toLocaleString()} Ft</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="divider my-2" />

                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center text-base-content/70">
                                        <span>Ételek összesen:</span>
                                        <span>{subtotal.toLocaleString()} Ft</span>
                                    </div>
                                    <div className="flex justify-between items-center text-base-content/70">
                                        <span>Csomagolás összesen:</span>
                                        <span>{totalPackagingPrice.toLocaleString()} Ft</span>
                                    </div>
                                    <div className="flex justify-between items-center font-bold text-lg mt-2">
                                        <span>Végösszeg:</span>
                                        <span>{totalAmount.toLocaleString()} Ft</span>
                                    </div>
                            </div>

                                {items.length > 0 && (
                                    <button
                                        onClick={handleCheckout}
                                        className="btn btn-primary w-full mt-4"
                                    >
                                        Tovább a fizetéshez
                                    </button>
                                )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartComponent;