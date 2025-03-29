import HomeViewCategories from "./components/HomeViewCategories";
import NavBar from "./components/NavBar";

const HomeView = () => {

  return (
    <>
      <div className="w-[85%]  m-auto p-2">
        <div className="h-[30vh] bg-blue-300">slider</div>
        <HomeViewCategories/>
        <p className="text-center my-2">Welcome to Paddle Palace
          Located in Portland, Oregon USA, we are the North American Distributor for the major brands of table tennis. Offering premium customer service, we are players and lovers of table tennis, dedicated to elevating the game</p>
        <p className="text-center my-2">Featured products</p>

        <div className="h-[40vh] bg-blue-300 my-2">featured products </div>
        <div className="h-[15vh] bg-blue-300 my-2">brands slider</div>
      </div>
    </>
  );
};

export default HomeView;
