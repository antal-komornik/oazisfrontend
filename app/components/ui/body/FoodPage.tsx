'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { MenuItem } from '@/app/lib/data';

interface FoodPageProps {
  selectedFood?: MenuItem;
  onClose: () => void;
  isModal?: boolean;
}

const FoodPage: React.FC<FoodPageProps> = ({ selectedFood, onClose, isModal = false }) => {
  const [selectedSize, setSelectedSize] = useState<number>(32);
  const pizzaPrices = selectedFood?.prices || [];
  const [valuePizza, setValuePizza] = useState(Object.values(pizzaPrices)[0])


  if (!selectedFood) return null;


  // setValuePizza(Object.values(pizzaPrices)[0])

  // console.log(pizzaPrices) //Object { 32: 2690, 40: 3890, 60: 6390 }
  // console.log(typeof Object.keys(pizzaPrices)) //object
  // console.log(Object.keys(pizzaPrices)) //Array(3) [ "32", "40", "60" ]
  // console.log(Object.entries(pizzaPrices).map((size) => {
  //   console.log(size)
  //   console.log(size[0])
  //   console.log(size[1])

  // }))

  const content = (
    <div className='flex items-center justify-center w-full z-50 pb-13'>
      <div className={`bg-base-100 ${isModal ? 'rounded-lg overflow-hidden' : ''}`}>
        <div className="sticky top-0 z-10 bg-base-100 shadow-md">
          <div className="navbar">
            <div className="navbar-start">
              <button onClick={onClose} className="btn btn-ghost btn-circle" aria-label="Vissza">
                <ArrowLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="navbar-center">
              <h1 className="text-2xl font-bold">{selectedFood.name}</h1>
            </div>
            <div className="navbar-end" />
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="card bg-base-100">
            <div className="card-body">

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
              {/* <div>
                <p className="text-base-content/80">{selectedFood.description}</p>
              </div> */}
              <div className="max-w-lg"> {/* vagy max-w-lg, max-w-xl stb. a kívánt szélesség szerint */}
                <p className="text-base-content/80 break-words">
                  {selectedFood.description}
                </p>
              </div>
              <div>

                {selectedFood.is_pizza && pizzaPrices && (
                  <>
                    <div className="space-y-4 ">
                      <div className='flex w-full items-center justify-center'>

                        <div className="join join-horizontal    gap-2">
                          {Object.entries(pizzaPrices).map((size) => (

                            < button
                              key={size[0]}
                              className={`btn join-item ${selectedSize === Number(size[0])
                                ? 'btn-active bg-emerald-500 hover:bg-emerald-500 text-black'
                                : 'hover:bg-emerald-500 hover:text-black'
                                }`}
                              onClick={() => {
                                setSelectedSize(Number(size[0]) as 32 | 40 | 60)
                                setValuePizza(size[1])
                                // console.log(Number(size) + " " + size)
                                // setPriceOfPizza(Number(size))
                              }
                              }
                            >
                              {size[0]} cm
                            </button>

                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='px-2 py-4'>
                      <span className="text-2xl font-bold">
                        {/* {pizzaPrices[selectedSize]} Ft */}
                        {valuePizza} Ft
                      </span>
                    </div>
                  </>
                )}
              </div>




              {!selectedFood.is_pizza && (
              <div className="mt-4">
                {selectedFood.is_on_discount ? (
                  <div className="flex gap-2 items-center">
                    <span className="line-through text-base-content/50">
                      {selectedFood.price} Ft
                    </span>
                    <span className="text-error font-bold">
                      {selectedFood.discount_price} Ft
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold">
                        {selectedFood.price} Ft
                  </span>
                )}
              </div>
              )}

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
    </div >
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto ">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default FoodPage;