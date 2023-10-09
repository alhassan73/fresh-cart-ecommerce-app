import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useState } from "react";
export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userName, setuserName] = useState(null);
  function getUserId() {
    let userID = jwtDecode(localStorage.getItem("userToken")).id;
    return userID;
  }
  function getUserAddress(header) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
      headers: header,
    });
  }
  function deleteUserAddress(header, addressID) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressID}`,
      {
        headers: header,
      }
    );
  }
  function addAddress(header, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        {
          name: values.name,
          details: values.details,
          phone: values.phone,
          city: values.city,
        },
        {
          headers: header,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <>
      <UserContext.Provider
        value={{
          userToken,
          setUserToken,
          userName,
          setuserName,
          getUserId,
          getUserAddress,
          addAddress,
          deleteUserAddress,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}
