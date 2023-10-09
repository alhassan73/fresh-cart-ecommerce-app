import React, { useContext, useEffect, useState } from "react";
// import style from "./Navbar.module.css";
import logo from "../../Assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { CounterContext } from "../CounterContextProvider/CounterContextProvider";
import { UserContext } from "../UserContextProvider/UserContextProvider";
import { useQuery } from "react-query";
import { CartContext } from "../CartContextProvider/CartContextProvider";
export default function Navbar() {
  let headers = { token: localStorage.getItem("userToken") };
  let { counter, setCounter } = useContext(CounterContext);
  let { getCartInfo } = useContext(CartContext);
  const { data: cartData } = useQuery(
    "cartData",
    () => getCartInfo("cart", headers),
    {
      enabled: localStorage.getItem("userToken") !== null,
    }
  );

  useEffect(() => {
    cartData ? setCounter(cartData?.data?.numOfCartItems) : setCounter(0);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let [active, setActive] = useState("home");
  let [padding, setPadding] = useState("25px");
  const handleScroll = () => {
    let newPadding = window.scrollY > 100 ? "15px" : "25px";
    setPadding(newPadding);
  };

  let { userToken, setUserToken, userName } = useContext(UserContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow"
        style={{ paddingBlock: padding, transition: "0.5s" }}
      >
        <div className="container-fluid px-5 ">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => setActive(false)}
          >
            <img src={logo} alt="site logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none p-2 border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i
              className="fa-solid fa-bars fa-lg"
              style={{ color: "#46C046" }}
            ></i>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              {userToken === null ? (
                ""
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link active ${
                        active === "home" ? "text-success" : ""
                      }`}
                      to="/"
                      aria-current="page"
                      onClick={() => setActive("home")}
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        active === "products" ? "text-success" : ""
                      }`}
                      to="/products"
                      onClick={() => setActive("products")}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        active === "categories" ? "text-success" : ""
                      }`}
                      to="/categories"
                      onClick={() => setActive("categories")}
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        active === "brands" ? "text-success" : ""
                      }`}
                      to="/brands"
                      onClick={() => setActive("brands")}
                    >
                      Brands
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto mt-2  mt-lg-0 d-flex justify-content-center align-items-lg-center gap-2">
              <li className="nav-item d-flex justify-content-lg-center align-items-center gap-3 me-3">
                <i className="fab fa-instagram fs-5"></i>
                <i className="fab fa-facebook fs-5"></i>
                <i className="fab fa-tiktok fs-5"></i>
                <i className="fab fa-twitter fs-5"></i>
                <i className="fab fa-linkedin fs-5"></i>
                <i className="fab fa-youtube fs-5"></i>
              </li>

              {userToken === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link d-flex justify-content-lg-center align-items-lg-center gap-2 text-success ${
                        active === "cart" ? "text-green" : ""
                      }`}
                      to="/cart"
                      onClick={() => setActive("cart")}
                    >
                      <div className="cart position-relative d-block overflow-hidden h-auto">
                        <i
                          className={`fa-solid fa-cart-shopping position-relative z-1 `}
                        ></i>
                        <span className="count position-absolute z-2 top-0 end-0 bg-black d-block rounded-circle text-center text-white fw-bold">
                          {counter}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link d-flex justify-content-lg-center align-items-lg-center gap-1 ${
                        active === "wishlist" ? "text-success" : ""
                      }`}
                      to="/wishlist"
                      onClick={() => setActive("wishlist")}
                    >
                      <i className="fa-heart fa-regular fs-5 me-1 text-green"></i>
                      Favorites
                    </Link>
                  </li>
                  <li className="nav-item dropdown  d-flex align-items-center shadow-sm bg-white cursor-pointer p-1 rounded-4">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="text-success me-2">{userName}</span>
                    </Link>
                    <ul className="dropdown-menu border-0 rounded-2 p-2  shadow ">
                      <li>
                        <Link
                          className="dropdown-item  rounded-2"
                          to={"/profile"}
                        >
                          Your Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item  rounded-2"
                          to={"/allorders"}
                        >
                          Orders
                        </Link>
                      </li>

                      <li className="nav-item">
                        <span
                          className="dropdown-item rounded-2 cursor-pointer"
                          onClick={function () {
                            logOut();
                          }}
                        >
                          SignOut
                        </span>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
