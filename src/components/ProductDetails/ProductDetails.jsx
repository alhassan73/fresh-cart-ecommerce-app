import {  useParams } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";
import { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../CartContextProvider/CartContextProvider";
import { Helmet } from "react-helmet";
import { CounterContext } from "./../CounterContextProvider/CounterContextProvider";

export default function ProductDetails({ title }) {
  let headers = { token: localStorage.getItem("userToken") };
  let { addToCart } = useContext(CartContext);
  let { setCounter } = useContext(CounterContext);
  async function addProductToCart(id) {
    let response = await addToCart(id, "cart", headers);
    if (response?.data.status === "success") {
      toast.success(response?.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setCounter(response?.data.numOfCartItems);
    } else {
      toast.error(response?.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }
  let settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    fade: true,
    autoplaySpeed: 7000,
  };

  let params = useParams();
  function getProductdetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data, isLoading } = useQuery("productdetails", () =>
    getProductdetails(params.id)
  );
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoading ? (
        <>
          <div className="loader position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center z-3 bg-white">
            <i className="fa-solid fa-spinner fa-spin text-success fs-1"></i>
          </div>
        </>
      ) : data?.data.data ? (
        <>
          <div className="pt-5 ">
            <div className=" row pt-5">
              <div className=" col-md-4 mb-md-0 mb-sm-4">
                <Slider {...settings}>
                  {data?.data.data.images.map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2 shadow-sm"
                    >
                      <img
                        src={img}
                        className="w-100"
                        alt={data?.data.data.title}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="col-md-8  d-flex justify-content-center align-items-start flex-column gap-2 position-relative">
                <h2 className="h5">{data?.data.data.title}</h2>
                <p style={{ color: "gray" }}>{data?.data.data.description}</p>
                <span>{data?.data.data.category.name}</span>
                <span className="text-success fw-bold">
                  {data?.data.data.brand.name}
                </span>
                <div className="w-100 d-flex justify-content-between align-items-center ">
                  <span className="">Price : {data?.data.data.price} EGP</span>
                  <span>
                    {data?.data.data.ratingsAverage}
                    <i className="fa-solid fa-star text-warning"></i>
                  </span>
                </div>

                <button
                  className="btn btn-success  w-100"
                  onClick={() => addProductToCart(params.id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
