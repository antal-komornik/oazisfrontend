'use client'
import React, { useEffect } from "react";
import FoodLister from "./components/ui/body/FoodLister";
import MobileNav from "./components/ui/header/navs/MobilNav";
import { useLoading } from "./context/LoadingContext";
import { useSelectedFood } from "./context/SelectedFoodContext";
import FoodPage from "./components/ui/body/FoodPage";


export default function Home() {
  const { setIsLoading } = useLoading();
  const { selectedFood, source, setSource, setSelectedFood } = useSelectedFood();

  useEffect(() => {
    // Ha specifikus betöltési logikát szeretnénk a főoldalra
    const initializePage = async () => {
      // Itt lehet inicializálni az oldal-specifikus dolgokat
      setIsLoading(false);
    };

    initializePage();
  }, [setIsLoading]);

  return (
    <>
      {/* <div className="hidden lg:flex z-0">

        <FoodLister />
      </div>
      <div className="lg:hidden ">
        <MobileNav />
      </div> */}
      <div className="hidden lg:flex z-0">
        {/* <SideMenu /> */}
        {selectedFood && source === 'main' ? (
          <FoodPage
            selectedFood={selectedFood}
            onClose={() => {
              setSelectedFood(null);
              setSource(null);
            }}
          />
        ) : (
          <FoodLister />
        )}
      </div>
      <div className="lg:hidden ">
        <MobileNav />
      </div> 
    </>
  );
}

