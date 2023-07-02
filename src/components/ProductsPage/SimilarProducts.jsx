import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "../Home/CardProduct";
import "./styles/SimilarProducts.css";

const SimilarProducts = ({ category, productId }) => {
  const [filterProducts, setfilterProducts] = useState();
  const { products } = useSelector((state) => state);

  useEffect(() => {
    if (products && category) {
      setfilterProducts(
        products.filter(
          (product) =>
            product.category.id === category.id && product.id !== productId
        )
      );
    }
  }, [products, category]);
  return (
    <div className="similarproducts">
      <h2>Discover Similar Products</h2>
      <div className="similarproducts__grid">
        {filterProducts?.map((prod) => (
          <CardProduct key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
