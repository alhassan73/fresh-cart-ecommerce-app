import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { CartContext } from "../CartContextProvider/CartContextProvider";
import { CounterContext } from "../CounterContextProvider/CounterContextProvider";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
export default function CategoryProducts({ title }) {
  let headers = { token: localStorage.getItem("userToken") };
  let { setCounter } = useContext(CounterContext);
  let { addToCart } = useContext(CartContext);

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    fade: true,
    pauseOnHover: true,
  };

  async function addProductToCart(id, endPoint) {
    let response = await addToCart(id, endPoint, headers);
    if (endPoint === "cart") {
      if (response?.data.status === "success") {
        toast.success(response?.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error(response?.data.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
    setCounter(response?.data.numOfCartItems);
  }

  let param = useParams();
  let { isLoading, data } = useQuery("categoryProducts", getProducts);
  // filter data to get the products of the category
  function getCategoryProducts() {
    const filteredProducts = data?.data.data.filter(
      (product) => product.category.name === param.name
    );
    return filteredProducts;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : getCategoryProducts()?.length !== 0 ? (
        <div className="min-vh-100 mt-5 py-4 px-md-4">
          <h2 className="text-center my-4">{param.name}</h2>
          <div className="row g-5 g-md-4  my-4 justify-content-center ">
            {getCategoryProducts()?.map((product, i) => (
              <div
                key={product.id}
                className="col-sm-6 col-md-4 col-lg-3  col-xl-2 "
              >
                <div className="product-container  h-100  bg-white p-3 shadow-sm rounded-4 overflow-hidden  ">
                  <Link to={`/productdetails/${product.id}`}>
                    <div className="img-container">
                      <Slider {...settings}>
                        {product.images.map((img, i) => (
                          <div key={i} className="overflow-hidden rounded-2">
                            <img
                              src={img}
                              className="w-100"
                              alt={data?.data.data.title}
                            />
                          </div>
                        ))}
                      </Slider>

                      <h4 className="text-center h6 fw-light text-success">
                        {product.category.name}
                      </h4>
                      <h3 className="h6 text-center mb-3">
                        {product.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between align-items-center  mb-2">
                        <span>{product.price} EGP</span>
                        <span className="d-flex justify-content-center align-items-baseline gap-1">
                          {product.ratingsAverage}
                          <i className="fa-solid fa-star text-warning"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="btn btn-success add-cart w-75 "
                    onClick={() => addProductToCart(product.id, "cart")}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-vh-100  px-md-4 d-flex justify-content-center align-items-center flex-column">
          <h2 className="text-success h1">
            No Available Products in This Category
          </h2>
        </div>
      )}
    </>
  );
}
