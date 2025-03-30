// src/views/home/components/BrandsSlider.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { AppDispatch, RootState } from "../../../../redux/store";
import { BrandsService } from "../../../admin/data/services/BranderService";
import LoadingSpinner from "../../../../utils/components/LoadingSpinner";
import ErrorMessage from "../../../../utils/components/ErroMessage";
// Adjust path

// Assume a Brand interface exists, e.g.:
interface Brand {
  _id: string;
  name: string;
  image: string; // Assuming brand logo URL is in 'image' field
}

// Assume brandsSlice exists and provides this state structure
interface BrandsState {
  brandsList: Brand[];
  loading: boolean;
  error: string | null;
}

const BrandsSlider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Adjust 'state.brands' to match your actual slice name in the store
  const { brandsList, loading, error } = useSelector(
    (state: RootState) => state.brands as BrandsState,
  );

  useEffect(() => {
    // Fetch brands only if the list is empty
    if (brandsList.length === 0) {
      dispatch(BrandsService.fetchAllBrands({})); // Fetch all brands (or paginate if needed)
    }
  }, [dispatch, brandsList.length]);

  const settings = {
    dots: false,
    infinite: brandsList.length > 5, // Only loop if enough items
    speed: 500,
    slidesToShow: 6, // Show multiple logos
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false, // Hide default arrows for logo sliders often
    responsive: [
      {
        breakpoint: 1024, // Medium screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640, // Small screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480, // Extra small screens
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (loading && brandsList.length === 0) {
    return (
      <div className="flex justify-center items-center h-[15vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={`Could not load brands: ${error}`} />;
  }

  if (!loading && brandsList.length === 0) {
    return null; // Don't show the section if no brands
  }

  return (
    <div className="py-6 my-6 bg-gray-50 rounded-lg px-4">
      {" "}
      {/* Added padding and background */}
      <style>{`
        .brand-slide img {
          max-height: 60px; /* Control logo height */
          width: auto; /* Maintain aspect ratio */
          margin: 0 auto; /* Center logo */
          filter: grayscale(80%); /* Optional: make logos grayscale */
          opacity: 0.8;
          transition: all 0.3s ease;
        }
        .brand-slide:hover img {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>
      <Slider {...settings}>
        {brandsList.map((brand) => (
          <div key={brand._id} className="px-2 brand-slide">
            {" "}
            {/* Add padding between logos */}
            {/* Assuming brand object has an 'image' property with the logo URL */}
            <img src={brand.image} alt={`${brand.name} logo`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandsSlider;
