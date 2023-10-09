import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

export default function ChangePassword({ title }) {
  let navigate = useNavigate();
  let baseURl = "https://ecommerce.routemisr.com";
  const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
  let [isLoading, setLoading] = useState(false);
  async function submitResetMail(values) {
    setLoading(true);
    let { data } = await axios
      .put(`${baseURl}/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
    if (data.token) {
      setLoading(false);
      toast.success("Successfully Updated", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      navigate("/login");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email Field is required."),
    newPassword: Yup.string()
      .matches(
        passReg,
        " minimum password length of 8 characters, including at least one lowercase letter, one uppercase letter, and one digit."
      )
      .required("Password Field is required."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submitResetMail,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="row vh-100  justify-content-center align-items-center">
        <div className=" col-md-8 px-md-5 mx-auto  position-relative">
          <h2>Change Password</h2>

          <form
            onSubmit={formik.handleSubmit}
            className="d-flex justify-content-center flex-column gap-2"
          >
            <label htmlFor="email">Enter Your Email:</label>
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
            <label htmlFor="newPassword">Enter New Password:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              className="form-control mb-3"
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="form-text text-danger ps-2 mb-3">
                <strong>{formik.errors.newPassword}</strong>
              </p>
            )}
            {isLoading ? (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn btn-success align-self-md-start"
              >
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn btn-success align-self-md-start"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
