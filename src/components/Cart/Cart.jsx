import React, { useContext, useEffect, useState } from "react";
import cartImg from "../../Assets/EmptyCart.png";
import { CartContext } from "../CartContextProvider/CartContextProvider";
import { Helmet } from "react-helmet";
import { CounterContext } from "../CounterContextProvider/CounterContextProvider";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({ title }) {
  let headers = { token: localStorage.getItem("userToken") };
  let { setCounter } = useContext(CounterContext);
  let [isLoading, setLoading] = useState(false);
  let { getCartInfo, updateQuantity, deleteProduct, clearAll } =
    useContext(CartContext);
  let [productsDetails, setProductsDetails] = useState(null);
  async function getCart() {
    setLoading(true);
    let { data } = await getCartInfo("cart", headers);
    if (data) {
      setProductsDetails(data);
      setCounter(data?.numOfCartItems);
    } else {
      setProductsDetails(null);
      setCounter(0);
    }
    setLoading(false);
  }

  async function updateCartQuantity(id, count) {
    if (count <= 0) {
      deleteCartItem(id);
    } else {
      let { data } = await updateQuantity(id, count, headers);
      setProductsDetails(data);
      setCounter(data?.numOfCartItems);
    }
  }

  async function deleteCartItem(id) {
    let { data } = await deleteProduct(id, "cart", headers);
    setProductsDetails(data);
    setCounter(data?.numOfCartItems);
  }
  async function clearCart() {
    let res = await clearAll(headers);
    toast.success(res?.data.message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    getCart();
  }
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : productsDetails !== null && productsDetails.numOfCartItems !== 0 ? (
        <div className="min-vh-100 mt-5 py-4 px-md-4">
          <div className="p-5 shadow  rounded-4 bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-green">Your Cart</h2>
              <button className="btn bg-success-subtle" onClick={clearCart}>
                Clear All
              </button>
            </div>
            <h5 className="text-green">
              Items : {productsDetails.numOfCartItems}
            </h5>

            <div className="row mt-5 flex-wrap-reverse">
              <div className="col-lg-4">
                <div className="border border-1 border-success border-opacity-25 shadow-sm rounded-4 p-4">
                  <h3 className="text-center">Place Order</h3>
                  <div className="row justify-content-center gap-2 my-3 ">
                    <button className="btn bg-green-light col-10 col-lg-8 ">
                      <Link to="/address/online" className="text-white">
                        Debit/Creaditcard
                      </Link>
                    </button>
                    <button className="btn bg-green-light col-10 col-lg-8">
                      <Link to="/address/cash" className="text-white">
                        Cash on Delivery
                      </Link>
                    </button>
                  </div>
                  <br />
                  <h5 className="fw-semibold text-center d-flex justify-content-between">
                    Total:
                    <span className="text-green fw-bold">
                      {" "}
                      {productsDetails.data.totalCartPrice} EGP
                    </span>
                  </h5>
                </div>
              </div>

              <div className=" offset-xl-1 col-lg-8 col-xl-7">
                {productsDetails.data.products.map((product) => (
                  <div
                    key={product.product.id}
                    className="row g-4 border border-0 border-bottom py-4"
                  >
                    <div className="col-md-4 col-lg-1">
                      <img
                        className="w-100 rounded-3"
                        src={product.product.imageCover}
                        alt=""
                      />
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                      <div className="d-flex flex-column gap-1 text-center justify-content-between">
                        <h4>
                          {product.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h4>
                        <p>{product.product.brand.name === null && "Unknown"}</p>
                        <span className="text-green h6 fw-bold">
                          {product.price} EGP
                        </span>
                        <button
                          className="btn btn-outline-success  align-self-md-start d-flex gap-1 align-items-center mx-auto"
                          onClick={() => deleteCartItem(product.product.id)}
                        >
                          Remove
                          <i className="fas fa-trash "></i>
                        </button>
                      </div>
                    </div>
                    <div className=" col-sm-6 col-md-4 col-lg-4 d-flex   justify-content-lg-start align-items-center flex-column gap-3">
                      <h4 className="h5">Item Total Price :</h4>
                      <h5 className="text-green fw-bold">
                        {product.price * product.count}EGP
                      </h5>
                    </div>
                    <div className="col-md-12 col-lg-4 d-flex justify-content-center justify-content-sm-evenly justify-content-lg-end align-items-center">
                      <div className="d-flex justify-content-md-evenly justify-content-between align-items-center">
                        <button
                          className="btn btn-success fs-5"
                          onClick={() =>
                            updateCartQuantity(
                              product.product.id,
                              product.count + 1,
                              headers
                            )
                          }
                        >
                          +
                        </button>
                        <span className="mx-2 fs-4">{product.count}</span>
                        <button
                          className="btn btn-success fs-5"
                          onClick={() =>
                            updateCartQuantity(
                              product.product.id,
                              product.count - 1,
                              headers
                            )
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-vh-100  px-md-4 d-flex justify-content-center align-items-center flex-column">
          <img src={cartImg} alt="Empty-Cart" className="w-50" />
          <h2 className="text-success h1">Your Cart is Empty</h2>
        </div>
      )}
    </>
  );
}
