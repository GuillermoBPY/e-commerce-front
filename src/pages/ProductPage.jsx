import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductsPage/ProductInfo";
import SimilarProducts from "../components/ProductsPage/SimilarProducts";
import SliderImgs from "../components/ProductsPage/SliderImgs";
import LoadingPage from "../components/shared/LoadingPage";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const [product, setproduct] = useState();
  const { id } = useParams();
  const url = `https://e-commerce-api-zove.onrender.com/api/v1/products/${id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setproduct(res.data))
      .catch((err) => err);
  }, [id]);
  if (!product) {
    return <LoadingPage />;
  } else {
    return (
      <div className="productpage">
        <SliderImgs product={product} />
        <ProductInfo product={product} />
        <SimilarProducts
          category={product?.category}
          productId={product?.id}
        />
      </div>
    );
  }
};

export default ProductPage;
