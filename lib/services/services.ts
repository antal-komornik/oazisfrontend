import axios from 'axios'
import { DailyMenu, MenuItem } from '../types/types';

export const baseURL = 'http://127.0.0.1:8000/api/data';

// export const baseURL = 'https://oazis.komornikantal.hu/api/data/';

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



