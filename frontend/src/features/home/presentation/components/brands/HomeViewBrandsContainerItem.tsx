import React from "react";

interface BrandItemProps
 {
  image: string;
}
const HomeViewBrandsContainerItem:React.FC<BrandItemProps> = ({ image}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={image} alt="" className="rounded-full w-50 h-50 object-cover" />
    </div>
  );
};

export default HomeViewBrandsContainerItem;
