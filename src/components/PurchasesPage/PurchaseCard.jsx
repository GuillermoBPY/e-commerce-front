import React from "react";
import { Link } from "react-router-dom";
import "./styles/PurchaseCard.css";

const PurchaseCard = ({ purchase }) => {
  const { quantity, product } = purchase;

  return (
    <Link to={`/product/${product.id}`}>
      <article className="purchasecard">
        <header>
          <img src={product.productImgs[0].url} alt="" />
        </header>
        <div className="purchasecard__data">
          <h3>{product.title}</h3>
          <div>{quantity}UNT </div>
          <div className="purchasecard__data--price">
            $ {quantity * Number(product.price)}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PurchaseCard;
