'use client'
import React from 'react';
import { useCart } from '@/lib/hooks/CartContext';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const router = useRouter();
    const { items, removeFromCart, totalAmount, totalPackagingPrice } = useCart();

    // Az ételek összértéke a csomagolás nélkül
    const subtotal = items.reduce((sum, item) => sum + Number(item.subtotal), 0);

    const handleCheckout = () => {
        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Kosár</h2>
                        <p className="text-center py-8 text-base-content/70">
                            A kosár üres
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Kosár</h2>

                    <div className="flex flex-col gap-6">
                        {/* Cart Items */}
                        <div className="flex flex-col gap-4">
                            {items.map((item, index) => (
                                <div key={index} className="flex flex-col gap-2 border-b pb-4">
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

                        {/* Summary */}
                        <div className="flex flex-col gap-2 bg-base-200 p-4 rounded-lg">
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

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className="btn btn-primary w-full"
                        >
                            Tovább a fizetéshez
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;