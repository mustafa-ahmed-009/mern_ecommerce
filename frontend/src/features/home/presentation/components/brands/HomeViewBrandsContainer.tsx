import TitleAndButton from "../../../../../utils/components/TitleAndButton";
import HomeViewBrandsContainerItem from "./HomeViewBrandsContainerItem";

const HomeViewBrandsContainer = () => {
  return (
    <div className="mt-5">
      <TitleAndButton title="اشهر البرندات " pathName="/brands" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
        <HomeViewBrandsContainerItem image="https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/brand-elements-logo-primary-d.svg" />
        <HomeViewBrandsContainerItem image="https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/brand-elements-logo-primary-d.svg" />{" "}
        <HomeViewBrandsContainerItem image="https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/brand-elements-logo-primary-d.svg" />{" "}
        <HomeViewBrandsContainerItem image="https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/brand-elements-logo-primary-d.svg" />
      </div>
    </div>
  );
};

export default HomeViewBrandsContainer;
