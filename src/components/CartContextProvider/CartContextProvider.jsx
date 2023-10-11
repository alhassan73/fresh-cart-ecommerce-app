import axios from "axios";
import React, { createContext } from "react";

export let CartContext = createContext();

function addToCart(id, endPoint, allheaders) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/${endPoint}`,
      {
        productId: id,
      },
      {
        headers: allheaders,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

function getCartInfo(endPoint, allheaders) {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`, {
      headers: allheaders,
    })
    .then((response) => response)
    .catch((error) => error);
}
function updateQuantity(id, count, allheaders) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      { headers: allheaders }
    )
    .then((response) => response)
    .catch((error) => error);
}
function deleteProduct(id, endPoint, allheaders) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/${endPoint}/${id}`, {
      headers: allheaders,
    })
    .then((response) => response)
    .catch((error) => error);
}
function clearAll(allheaders) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: allheaders,
    })
    .then((response) => response)
    .catch((error) => error);
}

function payOnline(cartId, allheaders, addressValues,url) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      { shippingAddress: addressValues },
      { headers: allheaders }
    )
    .then((response) => response)
    .catch((error) => error);
}
function payCash(cartId, allheaders, addressValues) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress: addressValues },
      { headers: allheaders }
    )
    .then((response) => response)
    .catch((error) => error);
}
function getAllorders(id) {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    .then((response) => response)
    .catch((error) => error);
}

export default function CartContextProvider(props) {
  return (
    <CartContext.Provider
      value={{
        getAllorders,
        addToCart,
        getCartInfo,
        updateQuantity,
        deleteProduct,
        clearAll,
        payOnline,
        payCash,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
