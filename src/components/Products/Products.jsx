import React from "react";
import { Helmet } from "react-helmet";
import FeaturedProducts from "./../FeaturedProducts/FeaturedProducts";

export default function Products({ title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="py-5">
        <FeaturedProducts products={"All Products"} />
      </div>
    </>
  );
}
