'use client'
import React, { useState } from 'react';
import { useCart } from '@/lib/hooks/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
    const { items, totalAmount, totalPackagingPrice, submitOrder, originalAmount } = useCart();
    const { data: session } = useSession();
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitOrder(note);
            router.push('/'); // You'll need to create this page
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Hiba történt a rendelés során. Kérjük próbálja újra.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!session) {
        return <div className="p-4">Kérjük jelentkezzen be a rendeléshez.</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Rendelés véglegesítése</h1>

            <div className="card bg-base-200 shadow-xl mb-6">
                <div className="card-body">
                    <h2 className="card-title mb-4">Szállítási adatok</h2>
                    <div className="space-y-2">
                        <p><strong>Név:</strong> {session.user?.name}</p>
                        <p><strong>Email:</strong> {session.user?.email}</p>
                        <p><strong>Telefon:</strong> {session.user?.profile?.phone_number}</p>
                        <p><strong>Cím:</strong> {session.user?.profile?.address}</p>
                    </div>
                </div>
            </div>

            <div className="card bg-base-200 shadow-xl mb-6">
                <div className="card-body">
                    <h2 className="card-title mb-4">Rendelés összesítő</h2>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="flex flex-col p-4 bg-base-100 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">{item.menu_item_name}</span>
                                    <span>{item.quantity} db</span>
                                </div>
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span>Egységár:</span>
                                        <span>{item.unit_price} Ft</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Csomagolás:</span>
                                        <span>{item.total_packaging_price} Ft</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        <span>Részösszeg:</span>
                                        <span>{Number(item.subtotal) + item.total_packaging_price} Ft</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="divider"></div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Csomagolás összesen:</span>
                                <span>{totalPackagingPrice} Ft</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Végösszeg:</span>
                                {session.user.is_premium ?
                                    <>
                                        <span className='line-through text-error'>{originalAmount} Ft</span>
                                        <span className='text-bold text-emerald-500'>{totalAmount} Ft</span>
                                    </>

                                    :
                                    <span >{totalAmount} Ft</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Megjegyzés a rendeléshez</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Pl.: Extra forró legyen a pizza"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting || items.length === 0}
                >
                    {isSubmitting ? 'Feldolgozás...' : 'Rendelés leadása'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage