import React, { useState } from "react";
// import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

export default function Register({ title }) {
  let [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function submitRegister(values) {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
    if (data?.message === "success") {
      setLoading(false);

      navigate("/Login");
    }
  }

  const phoneReg =
    /^(\+\d{1,3}[-.\s]?)?(\d{1,4}[-.\s]?)(\(\d{1,4}\)[-.\s]?)?(\d{1,10}[-.\s]?){1,5}\d{1,10}$/;
  const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min length is 3 chars.")
      .max(20, "max length is 10 chars.")
      .required("Name Field is required."),
    email: Yup.string()
      .email("Email is invalid")
      .required("Email Field is required."),
    phone: Yup.string()
      .matches(phoneReg, "Please enter a valid phone number.")
      .required("Phone Number Field is required."),
    password: Yup.string()
      .matches(
        passReg,
        " minimum password length of 8 characters, including at least one lowercase letter, one uppercase letter, and one digit."
      )
      .required("Password Field is required."),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and rePassword  does not match.")
      .required("rePassword field is required."),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div>
        <div className="row min-vh-100 justify-content-center align-items-center">

          <div className=" col-lg-6 px-md-5 mx-auto  position-relative">
            <h2>Register Now </h2>

            <form
              onSubmit={formik.handleSubmit}
              className="d-flex justify-content-center flex-column gap-1"
            >
              <label htmlFor="name">Name : </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                className="form-control mb-3 "
              />
              {formik.errors.name && formik.touched.name && (
                <p className="form-text text-danger ps-2 mb-3 fw-bold">
                  {formik.errors.name}
                </p>
              )}

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
                className="form-control mb-3 "
              />
              {formik.errors.password && formik.touched.password && (
                <p className="form-text text-danger ps-2 mb-3">
                  <strong>{formik.errors.password}</strong>
                </p>
              )}
              <label htmlFor="rePassword">rePassword : </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                className="form-control mb-3"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="form-text text-danger ps-2 mb-3">
                  <strong>{formik.errors.rePassword}</strong>
                </p>
              )}

              <div className="row justify-content-center align-items-center flex-column px-4 gap-3">
                {isLoading ? (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-success col-md-10 col-lg-4"
                  >
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-success col-md-10 col-lg-4"
                  >
                    Submit
                  </button>
                )}
                <span className="col-lg-5 text-center ">Or</span>

                <Link
                  className="text-white btn btn-success col-md-10 col-lg-4"
                  to={"/login"}
                >
                  Sign-in Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
