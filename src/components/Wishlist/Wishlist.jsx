import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContextProvider/CartContextProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CounterContext } from "../CounterContextProvider/CounterContextProvider";
import Loader from "../Loader/Loader";
export default function Wishlist() {
  let headers = { token: localStorage.getItem("userToken") };
  let [isLoading, setLoading] = useState(false);
  let { setCounter } = useContext(CounterContext);
  let { getCartInfo, deleteProduct, addToCart } = useContext(CartContext);
  let [favorites, setFavorites] = useState(null);

  async function getWishlist() {
    setLoading(true);
    let { data } = await getCartInfo("wishlist", headers);
    setFavorites(data);
    setLoading(false);
  }

  async function deleteWishlistItem(id, endPoint) {
    await deleteProduct(id, endPoint, headers);
    let { data } = await getCartInfo("wishlist", headers);
    setFavorites(data);
  }

  async function addProductToCart(id, endPoint) {
    let response = await addToCart(id, endPoint, headers);
    if (response.data.status === "success") {
      toast.success(response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      if (endPoint === "cart") {
        setCounter(response.data.numOfCartItems);
      }
    } else {
      toast.error(response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <>
      {isLoading ? (
        <>
           <Loader />
        </>
      ) : favorites?.data && favorites?.count !== 0 ? (
        <div className="mt-5 py-5 d-flex justify-content-center flex-column min-vh-100">
          <i className="fa-regular fa-heart wishlist-header  my-4  text-center fa-lg"></i>
          <h2 className="text-center my-4">Your Favorites</h2>
          <div className="row my-4 justify-content-center g-5 g-md-4">
            {favorites?.data?.map((favorite) => (
              <div
                key={favorite.id}
                className="col-sm-6 col-md-4 col-lg-3  col-xl-2 "
              >
                <div className="product-container  h-100  bg-white p-3 shadow-sm rounded-4 overflow-hidden position-relative">
                  <Link to={`/productdetails/${favorite.id}`}>
                    <div className="img-container">
                      <img
                        src={favorite.imageCover}
                        className="w-100"
                        alt={favorite.title}
                      />

                      <h3 className="h6 text-center mt-3">
                        {favorite.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between align-items-center  mb-2">
                        <span>{favorite.price} EGP</span>
                        <span className="d-flex justify-content-center align-items-baseline gap-1">
                          {favorite.ratingsAverage}
                          <i className="fa-solid fa-star text-warning"></i>
                        </span>
                      </div>
                      <span> Sold : {favorite.sold}</span>
                    </div>
                  </Link>
                  <button
                    className="btn btn-outline-danger wishlist-delete position-absolute shadow-sm"
                    onClick={() => deleteWishlistItem(favorite.id, "wishlist")}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className="btn btn-outline-success wishlist-add position-absolute shadow-sm"
                    onClick={() => addProductToCart(favorite.id, "cart")}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 py-5 d-flex justify-content-center flex-column min-vh-100">
            <i className="fa-regular fa-heart wishlist-header my-4 text-center fa-lg"></i>
            <h2 className="text-center my-4">You Have No Favorites</h2>
          </div>
        </>
      )}
    </>
  );
}
