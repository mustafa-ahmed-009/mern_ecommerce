import HomeViewCategoriesContainer from "./components/categories/HomeViewCategoriesContainer";
import HomeViewProductsContainer from "./components/produccts/HomeViewProductsContainer";
import HomeViewDiscountContainer from "./components/HomeViewDiscountContainer";
import HomeViewBrandsContainer from "./components/brands/HomeViewBrandsContainer";
const HomeView = () => {
  return (
    <>
      <div className="w-[85%]  m-auto ">
        <HomeViewCategoriesContainer />
        <HomeViewProductsContainer title="منتجات" />
        <HomeViewDiscountContainer />
        <HomeViewBrandsContainer/>
      </div>
    </>
  );
};

export default HomeView;
