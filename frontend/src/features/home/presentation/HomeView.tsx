// src/views/home/HomeView.tsx
import HomeViewCategories from "./components/HomeViewCategories";
import HeroSlider from "./components/HeroSlider";
import FeaturedProducts from "./components/FeaturedProducts";
import WelcomeSection from "./components/WelcomeSection";

const HomeView = () => {
  return (
    // Note: NavBar is usually part of a main layout, not directly in HomeView
    // <NavBar />
<div>
<div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-4">
      {" "}
      {/* Use max-width and center */}
      {/* Hero Slider Section */}
      <HeroSlider />
      {/* Categories Section */}
      <HomeViewCategories />
      {/* Welcome Text Section */}
      <WelcomeSection />
      {/* Featured Products Section */}
      <section className="my-8 md:my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Featured Products
        </h2>
        <FeaturedProducts />
      </section>
      {/* Brands Slider Section
         <section className="my-8 md:my-12">
             <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
                Our Brands
             </h2>
            <BrandsSlider />
         </section> */}
    </div>
</div>
  );
};

export default HomeView;
