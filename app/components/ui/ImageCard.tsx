// import React from 'react';
// import Image from 'next/image'
// import { ImageCardProps } from '@/app/lib/definitions';

// export const ImageCard: React.FC<ImageCardProps> = ({
//     imageSrc, altText, caption, className = '', price }) => {
//     return (
//         <div className={`rounded-lg overflow-hidden shadow-md ${className}`}>
//             <div className="relative aspect-video">
//                 <Image
//                     src={imageSrc || '/placeholder.png'}
//                     className="w-full h-32 object-cover bg-opacity-60 p-1 rounded-xl"
//                     // width={100}
//                     // height={100}
//                     fill
//                     sizes="(max-width: 640px) 160px, 200px" // Responsive méretezés
//                     alt={altText}
//                     priority={false} // LCP (Largest Contentful Paint) képekhez
//                     loading="lazy"
//                     quality={75}
//                 />
//             </div>
//             <div className="p-2 flex items-center justify-between">
//                 <p className="text-sm font-medium">{caption}</p>
//                 <p className="text-sm font-medium">{price} Ft</p>
//             </div>
//         </div>
//     );
// };

// ImageCard.tsx
import React from 'react';
import Image from 'next/image'
import { ImageCardProps } from '@/app/lib/definitions';
// import Link from 'next/link';

export const ImageCard: React.FC<ImageCardProps> = ({
    imageSrc, altText, caption, className = '', price, pizzas }) => {
    return (
        <div className={`rounded-lg overflow-hidden shadow-md ${className}`}>
            <div className="relative aspect-video"> {/* Fix képarány */}
                <Image
                    src={imageSrc || '/placeholder.png'}
                    className="object-cover rounded-xl"
                    alt={altText}
                    fill // Használj fill-t a width/height helyett
                    sizes="(max-width: 640px) 160px, 200px" // Responsive méretezés
                    priority={false} // Csak a viewport-ban lévő képeknek legyen priority
                    loading="lazy" // Lazy loading a viewport alatt lévő képeknek
                    quality={75}
                    placeholder="blur" // Blur effekt betöltés közben
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
            </div>

            <div className="p-2 flex items-center justify-between">
                {/* Szöveg konténer fix mérettel */}
                <div className="w-2/3 overflow-hidden whitespace-nowrap">
                    <p className="text-sm font-medium text-overflow-scale">{caption}</p>
                </div>
                {
                    pizzas ?
                        null
                        // <p className="text-sm font-medium whitespace-nowrap">{pizzas["32"]} </p>
                        :
                        <p className="text-sm font-medium whitespace-nowrap">{price} Ft</p>
                }
            </div>
        </div>
    );
};

// Shimmer effekt betöltés közben
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);