// src/views/home/components/HeroSlider.tsx
import React from 'react';
import Slider from 'react-slick';

// Import slick carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero1 from "../../../../assets/hero1.png"; // Adjust path if needed
import hero2 from "../../../../assets/hero2.png"; // Adjust path if needed
import hero3 from "../../../../assets/hero3.png"; // Adjust path if needed
 // Adjust path if needed

// Sample images (replace with your actual image URLs or dynamic data)
const sliderImages = [
  hero1,
  hero2,
  hero3
];

const HeroSlider: React.FC = () => {
  const settings = {
    dots: true, // Show dots navigation
    infinite: true, // Loop continuously
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Delay between slides in ms
    pauseOnHover: true, // Pause autoplay on hover
    fade: true, // Use fade effect instead of slide
    cssEase: 'linear',
    appendDots: (dots: React.ReactNode) => ( // Custom dots positioning
      <div style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
        <ul style={{ margin: "0px", padding: '0', textAlign: 'center' }}> {dots} </ul>
      </div>
    ),
    customPaging: () => ( // Custom dot style
        <div className="w-3 h-3 bg-white rounded-full opacity-50 slick-dots-custom"></div>
    ),
  };

  return (
    <div className="relative h-[40vh] md:h-[50vh] overflow-hidden rounded-lg shadow-lg mb-8"> {/* Adjust height and add margin */}
      <style>{`
        .slick-dots-custom { transition: opacity 0.3s ease; }
        .slick-active .slick-dots-custom { opacity: 1; background-color: #2553D3; /* Active dot color */ }
        .slick-prev:before, .slick-next:before { color: #333; font-size: 25px; opacity: 0.5; } /* Arrow styling */
        .slick-prev { left: 15px; z-index: 1; }
        .slick-next { right: 15px; z-index: 1; }
      `}</style>
      <Slider {...settings}>
        {sliderImages.map((imgUrl, index) => (
          <div key={index} className="h-[50vh] md:h-[50vh]"> {/* Match container height */}
            <img
              src={imgUrl}
              alt={`Slider image ${index + 1}`}
              className="w-full h-full object-contain" // Ensure image covers the slide area
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;