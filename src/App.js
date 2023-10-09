import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import NotFound from "./components/NotFound/NotFound";
import Brands from "./components/Brands/Brands";
import CounterContextProvider from "./components/CounterContextProvider/CounterContextProvider";
import { UserContext } from "./components/UserContextProvider/UserContextProvider";
import { useContext, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import jwtDecode from "jwt-decode";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import CartContextProvider from "./components/CartContextProvider/CartContextProvider";
import Wishlist from "./components/Wishlist/Wishlist";
import Address from "./components/Address/Address";
import Orders from "./components/Orders/Orders";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import BrandProducts from "./components/BrandProducts/BrandProducts";
import Profile from "./components/Profile/Profile";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home title="Home" />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart title="Cart" />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist title="Wishlist" />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories title="Categories" />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login title="Login" /> },
      { path: "register", element: <Register title="Register" /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products title="Products" />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile title="Profile" />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails title="Product Details" />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:name",
        element: (
          <ProtectedRoute>
            <CategoryProducts title="Category Products" />
          </ProtectedRoute>
        ),
      },
      {
        path: "brand/:name",
        element: (
          <ProtectedRoute>
            <BrandProducts title="Brand Products" />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands title="Brands" />
          </ProtectedRoute>
        ),
      },
      {
        path: "address/:paymentmethod",
        element: (
          <ProtectedRoute>
            <Address title="Address" />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders title="Orders" />
          </ProtectedRoute>
        ),
      },
      {
        path: "changepassword",
        element: <ChangePassword title="Change Password" />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword title="Reset Password" />,
      },
      { path: "*", element: <NotFound title="Not Found" /> },
    ],
  },
]);

export default function App() {
  let { setUserToken, setuserName } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
      setuserName(jwtDecode(localStorage.getItem("userToken")).name);
    }
  }, []);
  return (
    <CounterContextProvider>
      <CartContextProvider>
        <RouterProvider router={routers} />
      </CartContextProvider>
    </CounterContextProvider>
  );
}
