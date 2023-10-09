import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function ResetPassword({ title }) {
  let navigate = useNavigate();
  let baseURl = "https://ecommerce.routemisr.com";
  let [isLoading, setLoading] = useState(false);
  let [codeSent, setCodeSent] = useState(false);
  async function submitResetMail(values) {
    setLoading(true);
    let { data } = await axios
      .post(`${baseURl}/api/v1/auth/forgotPasswords`, values)
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setCodeSent(false);
      });

    if (data.statusMsg === "success") {
      setLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setCodeSent(true);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email Field is required."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submitResetMail,
  });
  //code submission logic
  async function verifyCode(values) {
    let { data } = await axios
      .post(`${baseURl}/api/v1/auth/verifyResetCode`, values)
      .catch((err) => {
        toast.error(err?.response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
    if (data.status === "Success") {
      toast.success(data?.status, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      navigate("/changepassword");
    }
  }

  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Field is required."),
  });

  let codeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema2,
    onSubmit: verifyCode,
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {codeSent ? (
        <>
          <div className="row py-5 vh-100 justify-content-center align-items-center">
            <div className=" col-md-8  px-md-5 mx-auto  position-relative">
              <form
                onSubmit={codeFormik.handleSubmit}
                className="d-flex  justify-content-center flex-column gap-2"
              >
                <h2>Enter Code Here : </h2>
                <input
                  onChange={codeFormik.handleChange}
                  onBlur={codeFormik.handleBlur}
                  type="text"
                  name="resetCode"
                  id="resetCode"
                  value={codeFormik.values.resetCode}
                  className="form-control mb-3"
                />
                {codeFormik.errors.resetCode &&
                  codeFormik.touched.resetCode && (
                    <p className="form-text text-danger ps-2 mb-3">
                      <strong>{codeFormik.errors.resetCode}</strong>
                    </p>
                  )}
                {isLoading ? (
                  <button
                    disabled={!(codeFormik.isValid && codeFormik.dirty)}
                    type="submit"
                    className="btn btn-success align-self-md-start"
                  >
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    disabled={!(codeFormik.isValid && codeFormik.dirty)}
                    type="submit"
                    className="btn btn-success align-self-md-start"
                  >
                    Verify
                  </button>
                )}
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="row vh-100  justify-content-center align-items-center">
            <div className=" col-md-8 px-md-5 mx-auto  position-relative">
              <h2>Reset Password</h2>

              <form
                onSubmit={formik.handleSubmit}
                className="d-flex justify-content-center flex-column gap-2"
              >
                <label htmlFor="email">
                  Enter Your Email To send a reset Code:
                </label>
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
                    Send
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
