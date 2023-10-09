import React from "react";
import Slider from "react-slick";
import slider1 from "../../Assets/Sliderassets/slider-image-4.jpg";
import slider2 from "../../Assets/Sliderassets/slider-image-5.png";
import slider3 from "../../Assets/Sliderassets/slider-image-3.png";
import banner1 from "../../Assets/Sliderassets/slider-image-2.jpeg";
import banner2 from "../../Assets/Sliderassets/slider-image-3.jpeg";
export default function MainSlider() {
  let settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 7000,
    arrows: false,
  };
  return (
    <>
      <div className="row g-0  rounded-3 overflow-hidden">
        <div className="col-md-8">
          <Slider {...settings} >
            <img src={slider1} alt="slider1" className="w-100 slide"/>
            <img src={slider2} alt="slider2" className="w-100 slide"/>
            <img src={slider3} alt="slider3" className="w-100 slide"/>
          </Slider>
        </div>
        <div className="col-md-4">
          <img src={banner2} alt="slider2" className="w-100" height={300} />
          <img src={banner1} alt="slider1" className="w-100" height={300} />
        </div>
      </div>
    </>
  );
}
