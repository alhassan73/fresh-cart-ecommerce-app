import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { CounterContext } from "../CounterContextProvider/CounterContextProvider";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContextProvider/CartContextProvider";
import Loader from "./../Loader/Loader";
export default function FeaturedProducts({ products }) {
  let headers = { token: localStorage.getItem("userToken") };
  let { setCounter } = useContext(CounterContext);
  let { addToCart, deleteProduct } = useContext(CartContext);
  const [checkedItems, setCheckedItems] = useState(() => {
    const savedItems = localStorage.getItem("checkedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  let settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    fade: true,
    pauseOnHover: true,
  };
  function handleCheck(id) {
    const productIndex = data?.data.data.findIndex(
      (product) => product.id === id
    );

    if (productIndex !== -1) {
      const updatedCheckedItems = [...checkedItems];
      updatedCheckedItems[productIndex] = !checkedItems[productIndex];
      setCheckedItems(updatedCheckedItems);

      if (!checkedItems[productIndex]) {
        addProductToCart(id, "wishlist");
      } else {
        deleteWishlistItem(id, "wishlist");
      }
    }
  }
  const [searchText, setSearchText] = useState("");

  function handleSearchInputChange(event) {
    setSearchText(event.target.value);
  }

  function searchProducts() {
    const filteredProducts = data?.data.data.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredProducts || data?.data.data;
  }

  async function deleteWishlistItem(id, endPoint) {
    await deleteProduct(id, endPoint, headers);
  }

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

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data } = useQuery("featuredproducts", getProducts);

  useEffect(() => {
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  }, [checkedItems]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row mt-4 g-5 g-md-4 justify-content-center">
          <div className="row my-3 justify-content-center justify-content-md-between align-items-center gap-md-0 gap-2">
            <div className="col-sm-10 col-md-6 col-lg-4 col-xl-3">
              <h2 className="h3 text-center text-md-start">{products}</h2>
            </div>
            <div className="col-sm-10 col-md-6 col-lg-4 col-xl-3">
              <div className="d-flex w-100 justify-content-between align-items-center fs-5 search-container p-3 rounded-5 shadow-sm ">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input
                  type="text"
                  placeholder="Search Products"
                  className="search-input w-75"
                  id="searchInput"
                  value={searchText}
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
          </div>

          {searchProducts().map((product, i) => (
            <div
              key={product.id}
              className="col-sm-6 col-md-4 col-lg-3  col-xl-2 "
            >
              <div className="product-container  h-100  bg-white p-3 shadow-sm rounded-4 overflow-hidden position-relative ">
                <div className="fav-container d-flex justify-content-center align-items-center position-absolute rounded-circle bg-white shadow">
                  <label className="container-fav">
                    <input
                      type="checkbox"
                      checked={checkedItems[i] || false}
                      onChange={() => handleCheck(product.id)}
                    />
                    <svg
                      id="Layer_1"
                      version="1.0"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                    </svg>
                  </label>
                </div>
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
      )}
    </>
  );
}
