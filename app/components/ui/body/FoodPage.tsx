'use client'
import React from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react'; // X helyett ArrowLeft importálása
import { MenuItem } from '@/app/lib/data';

interface FoodPageProps {
  selectedFood: MenuItem;
  onClose: () => void;
  isModal?: boolean;
}

const FoodPage: React.FC<FoodPageProps> = ({ selectedFood, onClose, isModal = false }) => {
  if (!selectedFood) return null;

  const content = (
    <div className='flex items-center justify-center w-full z-50'>

      <div className={`bg-base-100 ${isModal ? 'rounded-lg overflow-hidden' : ''}`}>
        <div className="sticky top-0 z-10 bg-base-100 shadow-md">
          <div className="navbar">
            <div className="navbar-start">
              <button
                onClick={onClose}
                className="btn btn-ghost btn-circle"
                aria-label="Vissza"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="navbar-center">
              <h1 className="text-2xl font-bold">{selectedFood.name}</h1>
            </div>
            <div className="navbar-end" />
          </div>
        </div>

        {/* A komponens többi része változatlan marad */}
        <div className="container mx-auto p-4">
          <div className="card bg-base-100">
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

            <div className="card-body">

              <p className="text-base-content/80">
                {selectedFood.description}
              </p>

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
                    {selectedFood.current_price || selectedFood.price} Ft
                  </span>
                )}
              </div>

              {selectedFood.ingredients.length > 0 && (
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



// 'use client'
// import React from 'react';
// import Image from 'next/image';
// import { ArrowLeft } from 'lucide-react';

// interface FoodPageProps {
//   selectedFood: any;
//   onClose: () => void;
//   isModal?: boolean;
// }

// const FoodPage: React.FC<FoodPageProps> = ({ selectedFood, onClose, isModal = false }) => {
//   if (!selectedFood) return null;

//   const content = (
//     <div className={`bg-base-100 ${isModal ? 'rounded-lg overflow-hidden' : 'max-w-4xl mx-auto shadow-xl'}`}>
//       <div className="sticky top-0 z-10 bg-base-100 shadow-md">
//         <div className="navbar">
//           <div className="navbar-start">
//             <button
//               onClick={onClose}
//               className="btn btn-ghost btn-circle"
//               aria-label="Vissza"
//             >
//               <ArrowLeft className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="navbar-center">
//             <h1 className="text-xl font-bold">{selectedFood.name}</h1>
//           </div>
//           <div className="navbar-end" />
//         </div>
//       </div>

//       <div className="container mx-auto p-4">
//         <div className="card bg-base-100">
//           <figure className="w-full h-[300px] relative">
//             <Image
//               src={selectedFood.image || "/placeholder.png"}
//               alt={selectedFood.name}
//               className="object-cover w-full h-full"
//               width={500}
//               height={500}
//               quality={100}
//               priority={true}
//               loading="eager"
//             />
//           </figure>

//           <div className="card-body">
//             <p className="text-base-content/80">
//               {selectedFood.description}
//             </p>

//             <div className="mt-4">
//               {selectedFood.is_on_discount ? (
//                 <div className="flex gap-2 items-center">
//                   <span className="line-through text-base-content/50">
//                     {selectedFood.price} Ft
//                   </span>
//                   <span className="text-error font-bold">
//                     {selectedFood.discount_price} Ft
//                   </span>
//                 </div>
//               ) : (
//                 <span className="text-success font-bold">
//                   {selectedFood.current_price || selectedFood.price} Ft
//                 </span>
//               )}
//             </div>

//             {selectedFood.ingredients.length > 0 && (
//               <div className="mt-6">
//                 <div className="divider">Összetevők</div>
//                 <ul className="menu bg-base-200 rounded-box">
//                   {selectedFood.ingredients.map((ingredient: string, index: number) => (
//                     <li key={index}>
//                       <span>{ingredient}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (isModal) {
//     return (
//       <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4">
//         <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           {content}
//         </div>
//       </div>
//     );
//   }

//   // Desktop nézet - középre igazított konténer
//   return (
//     <div className="min-h-screen flex items-start justify-center p-4 bg-base-200">
//       {content}
//     </div>
//   );
// };

// export default FoodPage;