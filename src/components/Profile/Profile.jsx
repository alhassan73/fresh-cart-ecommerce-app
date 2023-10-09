import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContextProvider/UserContextProvider";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
export default function Profile({ title }) {
  let [isLoading, setLoading] = useState(false);
  let [address, setAddress] = useState([]);
  let header = { token: localStorage.getItem("userToken") };
  let { getUserAddress, addAddress, deleteUserAddress } =
    useContext(UserContext);
  let info = jwtDecode(header.token);
  //get user Address data
  async function getAddress() {
    setLoading(true);
    let { data } = await getUserAddress(header);
    setAddress(data?.data);
    setLoading(false);
  }
  //handle deletion
  async function deleteAddress() {
    let { data: userAddress } = await getUserAddress(header);
    let data = await deleteUserAddress(header, userAddress?.data[0]._id);
    if (data?.status === "success") {
      toast.success(data?.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      toast.error(data?.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    getAddress();
  }

  async function submitAddress(values) {
    let data = await addAddress(header, values);
    if (data?.status === "success") {
      toast.success(data?.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      toast.error(data?.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      getAddress();
    }
  }
  const phoneReg =
    /^(\+\d{1,3}[-.\s]?)?(\d{1,4}[-.\s]?)(\(\d{1,4}\)[-.\s]?)?(\d{1,10}[-.\s]?){1,5}\d{1,10}$/;
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
    getAddress();
  }, []);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-5 py-5 d-flex justify-content-start flex-column min-vh-100">
          <i className="fa-regular fa-user wishlist-header  my-5  text-center fa-lg"></i>
          <h2 className="text-center my-4">Profile</h2>
          <div className="row my-4 justify-content-center align-items-center g-5 g-md-4">
            <div className="col-md-4 border border-0 border-3 border-place   d-flex justify-content-center align-items-center ">
              <div
                style={{ width: "250px", height: "250px" }}
                className="rounded-circle shadow bg-success-subtle text-center d-flex justify-content-center align-items-center mb-4"
              >
                <h1>{info.name}</h1>
              </div>
            </div>
            <div className="col-md-4 ps-md-5 ">
              {address.length !== 0 ? (
                address.map((info, i) => (
                  <div key={i}>
                    {address.length === 1 ? (
                      <h2 className="mb-3"> Primary Address</h2>
                    ) : (
                      <></>
                    )}
                    <p className="shadow-sm bg-secondary-subtle rounded-5 mb-4 p-3">
                      Details : {info.details}
                    </p>
                    <p className="shadow-sm bg-secondary-subtle rounded-5 mb-4 p-3">
                      City : {info.city}
                    </p>
                    <div className="d-flex justify-content-start align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger rounded-5"
                        onClick={() => deleteAddress()}
                      >
                        Remove Address
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex justify-content-center flex-column gap-1"
                  >
                    <label htmlFor="details">Name : </label>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      name="name"
                      id="name"
                      value={formik.values.name}
                      className="form-control mb-3"
                    />
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
                      Add Address
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
