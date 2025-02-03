import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/types/types';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/hooks/CartContext';

interface FoodPageProps {
  selectedFood?: MenuItem;
  onClose: () => void;
  isModal?: boolean;
}

const FoodPage: React.FC<FoodPageProps> = ({ selectedFood, onClose, isModal = false }) => {
  const [selectedSize, setSelectedSize] = useState<number>(32);
  const pizzaPrices = selectedFood?.prices || {};
  // Konvertáljuk a kezdeti értéket number típusra
  const [valuePizza, setValuePizza] = useState<number>(Number(Object.values(pizzaPrices)[0]) || 0);
  const [quantity, setQuantity] = useState(1);
  // Biztosítsuk, hogy a packaging_price mindig szám legyen
  const [packagingPrice] = useState<number>(selectedFood?.packaging_price ? Number(selectedFood.packaging_price) : 0);
  const { addToCart } = useCart();

  if (!selectedFood) return null;

  const handleAddToCart = () => {
    const unitPrice = selectedFood.is_pizza ? String(valuePizza) : selectedFood.price;
    const subtotal = String(selectedFood.is_pizza
      ? valuePizza * quantity
      : Number(selectedFood.price) * quantity);

    const totalPackagingPrice = packagingPrice * quantity;
    const pizzaSize = selectedFood.is_pizza
      ? (String(selectedSize) as "32" | "40" | "60")
      : undefined;

    const itemToAdd = {
      menu_item: selectedFood.id,
      menu_item_name: selectedFood.name,
      quantity: quantity,
      unit_price: unitPrice,
      packaging_price: String(packagingPrice),
      total_packaging_price: totalPackagingPrice,
      subtotal: subtotal,
      pizza_size: pizzaSize,
      // pizza_size: selectedFood.is_pizza ? String(selectedSize) : undefined,
      is_pizza: selectedFood.is_pizza
    };

    addToCart(itemToAdd);
    setQuantity(1);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const content = (
    <div className='flex justify-center w-full z-50 pb-13'>
      <div className={`bg-base-100 ${isModal ? 'rounded-lg    mx-auto my-auto ' : ''}`}>
        <div className="sticky top-0 z-10 bg-base-100 shadow-md">
          <div className="navbar">
            <div className="navbar-start">
              <button onClick={onClose} className="btn btn-ghost btn-circle" aria-label="Vissza">
                <ArrowLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="navbar-center overflow-hidden whitespace-wrap">
              <h1 className="text-xl font-bold text-overflow-scale">{selectedFood.name}</h1>
            </div>
            <div className="navbar-end" />
          </div>
        </div>

        <div className="container mx-auto p-4 ">
          <div className="card bg-base-100">
            <div className="card-body p-0">
              <figure className="w-full h-[300px] relative">
                <Image
                  src={selectedFood.image || "/placeholder.png"}
                  alt={selectedFood.name}
                  className="object-cover w-full h-full"
                  width={500}
                  height={500}
                  quality={100}
                  priority={true}
                  loading="eager"
                />
              </figure>

              <div className="max-w-lg">
                <p className="text-base-content/80 break-words">
                  {selectedFood.description}
                </p>
              </div>

              {selectedFood.is_pizza && pizzaPrices && (
                <div className="space-y-4">
                  <div className='flex w-full items-center justify-center'>
                    <div className="join join-horizontal gap-2">
                      {Object.entries(pizzaPrices).map(([size, price]) => (
                        <button
                          key={size}
                          className={`btn join-item ${selectedSize === Number(size)
                            ? 'btn-active bg-emerald-500 hover:bg-emerald-500 text-black'
                            : 'hover:bg-emerald-500 hover:text-black'
                            }`}
                          onClick={() => {
                            setSelectedSize(Number(size));
                            setValuePizza(Number(price));
                          }}
                        >
                          {size} cm
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center justify-between px-4">
                  <span className="text-base-content/80">Csomagolás ára:</span>
                  <span className="font-bold">{packagingPrice} Ft</span>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={decreaseQuantity}
                    className="btn btn-circle btn-outline"
                    aria-label="Mennyiség csökkentése"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="text-xl font-bold min-w-[3ch] text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    className="btn btn-circle btn-outline"
                    aria-label="Mennyiség növelése"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn bg-emerald-500 text-black w-full gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Kosárba
                  <span className="font-bold">
                    {selectedFood.is_pizza
                      ? `${valuePizza * quantity} Ft`
                      : `${Number(selectedFood.price) * quantity} Ft`
                    }
                  </span>
                </button>
              </div>

              {selectedFood.ingredients && selectedFood.ingredients.length > 0 && (
                <div className="mt-6">
                  <div className="divider">Összetevők</div>
                  <ul className="menu bg-base-200 rounded-box">
                    {selectedFood.ingredients.map((ingredient: string, index: number) => (
                      <li key={index}>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default FoodPage;