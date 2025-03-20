import React from "react";
import TitleAndButton from "../../../../../utils/components/TitleAndButton";
import HomeViewProductsContainerItem from "./HomeViewProductsContainerItem";
interface HomeViewProductsContainer { 
  title:string 
}
const HomeViewProductsContainer:React.FC<HomeViewProductsContainer> = ({title}) => {
  return (
    <div className="mt-5">
      <TitleAndButton title={title} pathName="/products" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
        <HomeViewProductsContainerItem />
        <HomeViewProductsContainerItem />
        <HomeViewProductsContainerItem />
        <HomeViewProductsContainerItem />
        <HomeViewProductsContainerItem />
        
      </div>
    </div>
  );
};

export default HomeViewProductsContainer;
