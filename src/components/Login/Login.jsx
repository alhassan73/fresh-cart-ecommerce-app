import React, { useContext, useState } from "react";
import cartImg from "../../Assets/Sliderassets/Cart.webp";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContextProvider/UserContextProvider";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

export default function Login({ title }) {
  let [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { setUserToken } = useContext(UserContext);
  let { setuserName } = useContext(UserContext);
  async function submitLogin(values) {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
    if (data?.message === "success") {
      setLoading(false);
      localStorage.setItem("userToken", data?.token);
      setUserToken(data?.token);
      setuserName(jwt_decode(data?.token).name);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email Field is required."),

    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/,
        "Minimum password length of 8 characters, including at least one lowercase letter, one uppercase letter, and one digit."
      )
      .required("Password Field is required."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="row justify-content-center align-items-center">
          <div className=" col-md-12 col-lg-6 px-md-4 mx-auto  position-relative">
            <h2>Login</h2>

            <form
              onSubmit={formik.handleSubmit}
              className="d-flex justify-content-center flex-column gap-1"
            >
              <label htmlFor="name">Email : </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                className="form-control mb-3"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="form-text text-danger ps-2 mb-3">
                  <strong>{formik.errors.email}</strong>
                </p>
              )}
              <label htmlFor="password">Password : </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                className="form-control mb-3"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="form-text text-danger ps-2 mb-3">
                  <strong>{formik.errors.password}</strong>
                </p>
              )}
              <div className="row flex-column justify-content-center align-items-center  px-4  gap-2 flex-wrap">
                {isLoading ? (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-success col-md-10 col-lg-5"
                  >
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-success col-md-10 col-lg-5"
                  >
                    Submit
                  </button>
                )}
                <span className="text-center col-md-10 col-lg-5">
                  Forgotten Password ?
                  <Link
                    className="text-success  text-decoration-underline ms-2"
                    to={"/resetpassword"}
                  >
                    Reset Password
                  </Link>
                </span>
                <span className="text-center">Or</span>

                <Link
                  className="btn btn-success text-white col-md-10 col-lg-5"
                  to={"/register"}
                >
                  Register Now
                </Link>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-sm-none d-lg-block d-none">
            <img src={cartImg} alt="cart-img" className="w-100" />
          </div>
        </div>
      </div>
    </>
  );
}
