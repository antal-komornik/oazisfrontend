'use client';
import React, { createContext, useContext, useState } from 'react';
import { MenuItem } from '@/app/lib/data';
// Explicit interface definíció
// interface MenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   category: {
//     id: number;
//     name: string;
//   };
//   ingredients: Array<{
//     id: number;
//     ingredientname: string;
//   }>;
//   discount_price: string | null;
//   discount_start: string | null;
//   discount_end: string | null;
//   is_on_discount: boolean;
//   current_price: string;
//   is_hidden: boolean;
//   image: string | null;
//   type: 'soup' | 'main_course1' | 'main_course2';
// }

type ModalContextType = {
  isModalOpen: boolean;
  selectedFood: MenuItem | null;
  openModal: (food: MenuItem) => void;
  closeModal: () => void;
};

const defaultContext: ModalContextType = {
  isModalOpen: false,
  selectedFood: null,
  openModal: () => { },
  closeModal: () => { }
};

const ModalContext = createContext<ModalContextType>(defaultContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);

  const openModal = (food: MenuItem) => {
    if (food && typeof food === 'object') {

      setSelectedFood(food);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        selectedFood,
        openModal,
        closeModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export type { MenuItem };  // Exportáljuk a típust