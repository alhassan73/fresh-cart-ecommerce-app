import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContextProvider/CartContextProvider";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
export default function Address({ title }) {
  let [cartId, setCartId] = useState(0);
  let { payOnline, payCash, getCartInfo } = useContext(CartContext);
  let headers = { token: localStorage.getItem("userToken") };
  const phoneReg =
    /^(\+\d{1,3}[-.\s]?)?(\d{1,4}[-.\s]?)(\(\d{1,4}\)[-.\s]?)?(\d{1,10}[-.\s]?){1,5}\d{1,10}$/;
  let navigate = useNavigate();
  let param = useParams();
  async function getCartID() {
    let { data } = await getCartInfo("cart", headers);
    setCartId(data?.data._id);
  }
  async function submitAddress(values) {
    if (param.paymentmethod === "online") {
      const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      let response = await payOnline(cartId, headers, values, url);
      window.location.href = response.data.session.url;
    } else if (param.paymentmethod === "cash") {
      await payCash(cartId, headers, values);
      navigate("/allorders");
    }
  }

  let validationSchema = Yup.object({
    phone: Yup.string()
      .matches(phoneReg, "Please enter a valid phone number.")
      .required("This Field Is Required"),
  });
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: submitAddress,
  });
  useEffect(() => {
    getCartID();
  }, []);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="row min-vh-100  justify-content-center align-items-center">
        <div className="col-md-8 px-md-5 mx-auto">
          <h2 className="mb-2">Address Details</h2>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex justify-content-center flex-column gap-1"
          >
            <label htmlFor="details">Details : </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              className="form-control mb-3"
            />

            <label htmlFor="phone">Phone : </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              className="form-control mb-3"
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="form-text text-danger ps-2 mb-3">
                <strong>{formik.errors.phone}</strong>
              </p>
            )}
            <label htmlFor="city">City : </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-success">
              Proceed To Checkout
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
