import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AccordionCategories from "../components/Home/AccordionCategories";
import AccordionPrice from "../components/Home/AccordionPrice";
import CardProduct from "../components/Home/CardProduct";
import LoadingPage from "../components/shared/LoadingPage";
import "./styles/Home.css";

const Home = () => {
  const { products } = useSelector((state) => state);
  const [filteredProducts, setfilteredProducts] =
    useState();
  const [categories, setcategories] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isActivePrice, setIsActivePrice] = useState(false);
  const [fromto, setfromto] = useState({
    pricefrom: 0,
    priceto: Infinity,
  });

  const getProductsByName = (data = "title=") => {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/products?${data}`;

    axios
      .get(url)
      .then((res) => setfilteredProducts(res.data))
      .catch((err) => err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.searchinput.value
      .trim()
      .toLowerCase();
    getProductsByName(`title=${title}`);
    e.target.reset();
  };

  const productsToDisplay = () => {
    return filteredProducts
      ? filteredProducts
          .filter(
            (product) =>
              Number(product.price) >= fromto.pricefrom &&
              Number(product.price) <= fromto.priceto
          )
          .map((product) => (
            <CardProduct
              key={product.id}
              product={product}
            />
          ))
      : products
          ?.filter(
            (product) =>
              Number(product.price) >= fromto.pricefrom &&
              Number(product.price) <= fromto.priceto
          )
          .map((product) => (
            <CardProduct
              key={product.id}
              product={product}
            />
          ));
  };

  if (!products) {
    return <LoadingPage />;
  } else {
    return (
      <div className="homecont">
        <form
          className="hombecont__search"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Search product by name"
            id="searchinput"
            type="text"
          />
          <button>
            <i className="bx bx-search-alt-2"></i>
          </button>
        </form>
        <div className="acordion__section">
          <AccordionPrice
            setIsActivePrice={setIsActivePrice}
            isActivePrice={isActivePrice}
            setfromto={setfromto}
          />
          <AccordionCategories
            setfilteredProducts={setfilteredProducts}
            categories={categories}
            setcategories={setcategories}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>
        <div className="homecont__products">
          {productsToDisplay().length === 0 ? (
            <div className="nofoundbox">
              <img
                className="nofound"
                src="../../img/nofound.png"
              />
            </div>
          ) : (
            productsToDisplay()
          )}
        </div>
      </div>
    );
  }
};

export default Home;
