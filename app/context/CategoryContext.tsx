'use client'
import { createContext, useContext, useRef, useState } from 'react'
import { Category } from '@/app/lib/data'

interface CategoryContextType {
    activeCategory: string
    categoryRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
    setActiveCategory: (category: Category) => void
    scrollToCategory: (categoryName: string) => void
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [activeCategory, setActiveCategory] = useState('')
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    const handleCategorySelect = (category: Category) => {
        const categoryName = typeof category === 'object' ? category.name : category
        setActiveCategory(categoryName)
    }

    const scrollToCategory = (categoryName: string) => {
        if (categoryRefs.current[categoryName]) {
            categoryRefs.current[categoryName]?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <CategoryContext.Provider value={{
            activeCategory,
            categoryRefs,
            setActiveCategory: handleCategorySelect,
            scrollToCategory
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => {
    const context = useContext(CategoryContext)
    if (!context) throw new Error('useCategory must be used within CategoryProvider')
    return context
}