import style from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";
import CategorySlider from "./../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home({ title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="pt-5 mt-5">
        <MainSlider/>
        <CategorySlider />
        <FeaturedProducts products="Featured Products" />
      </div>
    </>
  );
}
