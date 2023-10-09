import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function Categories({ title }) {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery("allCategories", getCategories);
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
          <h2 className="text-center my-4">Categories</h2>
          <div className="row g-4 my-4 justify-content-center ">
            {data?.data.data.map((category) => (
              <div key={category._id} className="col-md-6 col-lg-4 col-xl-2">
                <Link to={`/category/${category.name}`}>
                  <div className="category-container transition position-relative cursor-pointer">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="shadow rounded-4 w-100"
                      height={300}
                    />
                    <h3 className="p-3  w-100  text-center fs-3">
                      {category.name}
                    </h3>
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
