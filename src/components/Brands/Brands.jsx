import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function Brands({ title }) {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading } = useQuery("allbrands", getBrands);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="min-vh-100 mt-5 py-4 px-md-4">
          <h2 className="text-center my-4">Brands</h2>
          <div className="row  my-4 justify-content-center g-5 g-md-4">
            {data?.data.data.map((brand) => (
              <div
                key={brand._id}
                className="col-sm-6 col-md-4 col-lg-3 col-xl-2"
              >
                <Link to={`/brand/${brand.name}`}>
                  <div className="brand-container h-100 position-relative cursor-pointer transition">
                    <img
                      src={brand.image}
                      alt=""
                      className="w-100 h-100 shadow-sm rounded-3"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
