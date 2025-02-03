
// Típusdefiníciók az API válaszhoz
export interface Category {
    id: number;
    name: string;
}

export interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface Ingredient {
    map(arg0: (ingredient: string, index: number) => import("react").JSX.Element): import("react").ReactNode;
    length: number;
    id:number;
    name: string
}


// type PizzaSize = "32" | "40" | "60";

export interface PizzaPrices {
    [key: number]: number;  // Ez megengedi a számokat mint kulcsokat
}

export interface MenuItem {
    type: string;
    // map(arg0: (item: any) => void): import("react").ReactNode;
    id: number;
    name: string;
    description: string;
    price: string;
    category: Category;
    ingredients: Ingredient;
    discount_price: string | null;
    discount_start: string | null;
    discount_end: string | null;
    is_on_discount: boolean;
    current_price: string;
    is_hidden: boolean;
    image: string | null;
    slug: string
    is_pizza: boolean
    prices?: PizzaPrices ;  // Opcionális, csak pizzáknál jelenik meg
    packaging_price: string
    // category: string 

}


export interface DailyMenu {
    id: number;
    date: string;
    soup: MenuItem;
    main_course1: MenuItem;
    main_course2: MenuItem;
}


export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
}

export interface LoginFormProps {
    setShowLoginModal?: (show: boolean) => void;
}

export interface RegisterFormProps {
    setShowRegisterModal?: (show: boolean) => void;
}

export interface RegisterFormData {
    email: string;
    username: string;
    password1: string;
    password2: string;
}

export interface RegisterFormErrors {
    email?: string;
    username?: string;
    password1?: string;
    password2?: string;
    general?: string;

}


export interface AlertStatus {
    type: 'error' | 'success';
    message: string;
}



export interface Profile {
    address: string;
    phone_number: string;
}

export interface UserDataProps {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile: Profile;
}

export interface sFormErrorsProps {
    email?: string;
    'profile.phone_number'?: string;
}





// export interface LoginResponse {
//     access: string;
//     refresh: string;
//     user: {
//         email: string;
//         username: string;
//         firstName: string;
//         lastName: string;
//         profile:{
//             address: string;
//             phone_number: string;
//         };
//     };
//     access_expiration?: string;
//     refresh_expiration?: string;
// }

export interface LoginResponse {
    access: string;
    refresh: string;
    user: {
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        profile: {
            address: string;
            phone_number: string;
        };
    };
}

export interface AuthError {
    detail?: string;
    non_field_errors?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}




export interface CustomTextProps {
    content: string;
    style?: 'normal' | 'glitch';
    className?: string;
}

export interface CategoryButtonProps {
    text: string;
    onClick: () => void;
    isActive?: boolean;
    className?: string;
}


export interface ImageCardProps {
    imageSrc: string;
    altText: string;
    caption: string;
    className?: string;
    price?:string;
    priority?: undefined | boolean
    pizzas?: PizzaPrices
    
}

export interface WeeklyMenuProps {
    activeDay: string;

}

export interface Food {
    id: number;
    name: string;
    description: string;
    image: string;
    price?: string;
    ingredients?: string[];
}
  
export interface FoodModalProps {
    food: Food;
    onClose: () => void;
  }


export  interface SideMenuProps {
    categories: string[];
    days: string[];
    activeCategory: string;
    activeDay: string;
    onCategoryClick: (category: string) => void;
    onDayClick: (day: string) => void;
}

export interface CategoryRefs {
    [key: string]: HTMLDivElement | null;
}

// export interface MainContentProps {
//     categories: string[];
//     contentRef: React.RefObject<HTMLDivElement>;
//     categoryRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
// }

// export interface MainContentProps {
//     categories: string[];
//     contentRef: RefObject<HTMLDivElement>;
//     categoryRefs: RefObject<CategoryRefs>;
// }

export interface MenuItems {
    [category: string]: Food[];
}

export interface MainContentProps {
    categories: string[];
    menuItems: MenuItems;
    contentRef: React.RefObject<HTMLDivElement>;
    categoryRefs: React.MutableRefObject<CategoryRefs>;
}

