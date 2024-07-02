import React from "react";
import Hero from "../components/Hero/Hero";
import Category from "../components/Categories/Category";
import Category2 from "../components/Categories/Category2";
import Services from "../components/Services/Services";
import Banner from "../components/Banner/Banner";
import headphone from "../assets/hero/headphone.png";
import speaker from "../assets/category/smartwatch2-removebg-preview.png";
import Products from "../components/Products/Products";
import Footer from "../components/Footer/Footer";
import Partner from "../components/Partners/Partner";

const BannerData = {
  discount: "30% oFF",
  title: "Fine Smile",
  date: "10 june to 28 june",
  image: headphone,
  title2: "Air Solo Base",
  title3: "Eid Sale",
  title4:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quidem!",
  bgColor: "#f42c37",
};
const BannerData2 = {
  discount: "25% oFF",
  title: "Fine Smile",
  date: "10 june to 28 june",
  image: speaker,
  title2: "Smart Watch Pro",
  title3: "Eid Sale",
  title4:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quidem!",
  bgColor: "#2dcc6f",
};

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Hero />
      <Category />
      <Category2 />
      <Services />
      <Banner data={BannerData} />
      <Products />
      <Banner data={BannerData2} />
      <Partner />
      <Footer />
    </div>
  );
};

export default Home;
