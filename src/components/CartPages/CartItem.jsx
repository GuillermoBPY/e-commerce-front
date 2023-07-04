import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartItemThunk } from "../../utils/deleteCartItemThunk";
import "./styles/CartItem.css";

const CartItem = ({ prodCart }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCartItemThunk(prodCart.id));
  };

  return (
    <Link to={`/product/${prodCart?.product.id}`}>
      <article className="cartitem">
        <header>
          <img
            src={prodCart.product.productImgs[0].url}
            alt={prodCart.product.title}
          />
          <div>
            <h4>{prodCart.product.brand}</h4>
            <h3>{prodCart.product.title}</h3>
          </div>
        </header>
        <footer>
          <ul>
            <li>
              <span>U/Price</span>
              <span>{prodCart.product.price}</span>
            </li>
            <li>
              <span>Quantity</span>
              <span>{prodCart.quantity}</span>
            </li>
            <li>
              <span>Amount</span>
              <span>
                {(
                  prodCart.quantity * prodCart.product.price
                ).toFixed(2)}
              </span>
            </li>
          </ul>
        </footer>
        <button
          className="deletebtn"
          onClick={handleDelete}
        >
          <i className="bx bxs-trash"></i>
        </button>
      </article>
    </Link>
  );
};

export default CartItem;
