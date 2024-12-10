import axios from 'axios'

// export const baseURL = 'http://127.0.0.1:8000/api/data';
export const baseURL = 'https://oazis.komornikantal.hu/api/data/';

// Típusdefiníciók az API válaszhoz
export interface Category {
    id: number;
    name: string;
}

export interface Ingredient {
    map(arg0: (ingredient: string, index: number) => import("react").JSX.Element): import("react").ReactNode;
    length: number;
    id:number;
    name: string
}


// type PizzaSize = "32" | "40" | "60";

export interface PizzaPrices {
//   [key in PizzaSize]: number;
    size: number
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
 

}


export interface DailyMenu {
    id: number;
    date: string;
    soup: MenuItem;
    main_course1: MenuItem;
    main_course2: MenuItem;
}

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCategories = async () => {
    try {
        const response = await api.get('/categories/');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getDailyMenu = async () => {
    try {
        const response = await api.get<DailyMenu[]>('/daily-menu/');
        return response.data;
    } catch (error) {
        console.error('Error fetching daily menu:', error);
        throw error;
    }
};

export const getFormattedMenu = async () => {
    try {
        const response = await api.get('/formatted-menu/');
        return response.data;
    } catch (error) {
        console.error('Error fetching formatted menu:', error);
        throw error;
    }
};



export const searchMenuItems = async (searchTerm: string) => {
    try {
        const response = await api.get<MenuItem[]>(`/filter/menu-items/`, {
            params: {
                search: searchTerm
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching menu items:', error);
        throw error;
    }
};
