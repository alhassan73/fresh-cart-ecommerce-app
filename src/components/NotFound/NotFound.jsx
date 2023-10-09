import React from "react";
import img from "../../Assets/error.svg";
import { Helmet } from "react-helmet";
export default function NotFound({ title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="vh-100 d-flex justify-content-center align-items-center flex-column gap-2">
        <div className="d-flex justify-content-center align-items-center">
          <img src={img} alt="Not-found" className="w-100" />
        </div>
        <h2 className="h1 text-success">Page Not Found </h2>
      </div>
    </>
  );
}
