import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  let settings = {
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategoryData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("CategorySlider", getCategoryData);

  return (
    <>
      <h2 className="my-4 h3">All Categories</h2>
      {data?.data.data ? (
        <Slider {...settings} className="rounded-3">
          {data?.data.data.map((category) => (
            <Link to={`/category/${category.name}`}  key={category._id}>
              <div className="mx-md-4 category-container transition">
              <img
                src={category.image}
                alt={category.name}
                height={200}
                className="w-100 rounded-3"
              />
              </div>
            </Link>
          ))}
        </Slider>
      ) : (
        ""
      )}
    </>
  );
}
