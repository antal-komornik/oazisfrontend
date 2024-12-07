'use client'
import React, { useEffect } from "react";
import FoodLister from "./components/ui/body/FoodLister";
import MobileNav from "./components/ui/header/navs/MobilNav";
import { useLoading } from "./context/LoadingContext";


export default function Home() {
  const { setIsLoading } = useLoading();

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
      <div className="hidden lg:flex z-0">

        <FoodLister />
      </div>
      <div className="lg:hidden ">
        <MobileNav />
      </div>

    </>
  );
}

