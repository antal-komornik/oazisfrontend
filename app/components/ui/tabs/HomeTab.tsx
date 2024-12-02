import React from 'react';
import { CategoryButton } from '@/app/components/ui/sidenav/CategoryBtn';
// import MainContent from '@/app/components/ui/body/FoodLister';
import FoodLister from '@/app/components/ui/body/FoodLister';


// interface Category {
//     id: number;
//     name: string;
// }


const HomeTab = () => {
    // const [activeCategory, setActiveCategory] = useState<string>('');
    // const contentRef = useRef<HTMLDivElement>(null);
    // const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // const handleCategorySelect = (category: Category) => {
    //     setActiveCategory(category.name);
    // };

    return (
        <>

            <div className="flex px-4 py-2   overflow-x-auto scrollbar-hide z-0">
                <div className='flex h-8 shrink-0 items-center justify-center z-0'>
                    <CategoryButton
                    // onCategorySelect={handleCategorySelect}
                    // activeCategory={activeCategory}
                    />
                </div>
            </div>

            <div className="flex-1 z-0">
                <div className="flex  w-full justify-center items-center">
                    {/* <MainContent
                        contentRef={contentRef}
                        categoryRefs={categoryRefs}
                        activeCategory={activeCategory}
                    /> */}
                    <FoodLister />
                </div>
            </div>
        </>
    );
};

export default HomeTab;