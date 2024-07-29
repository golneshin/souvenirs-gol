import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
    <FaArrowRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
    <FaArrowLeft size={24} />
  </div>
);

const ProductCarousel = ({ products }) => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="mb-8">
      <Slider {...carouselSettings}>
        {products?.map((product) => (
          <div key={product._id} className="relative ">
          {/* Container for the image and overlay */}
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className=" max-h-80 object-cover " 
            />
            {/* Overlay with product name */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black bg-opacity-50 text-white text-center p-4">
              <h3 className="text-xl font-bold">{product.name}</h3>
            </div>
          </div>
        </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
