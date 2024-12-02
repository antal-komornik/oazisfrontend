import React from "react";
import FoodLister from "./components/ui/body/FoodLister";
import MobileNav from "./components/ui/header/navs/MobilNav";


export default function Home() {
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

