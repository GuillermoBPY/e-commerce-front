import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/CardProduct.css";
import { addCartItemThunk } from "../../utils/addCartItemThunk";
import { updateCartQtyThunk } from "../../utils/updateCartQtyThunk";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ product }) => {
  const navigate = useNavigate();
  const [cartItemID, setcartItemID] = useState();
  const [cartItemQty, setcartItemQty] = useState();
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getCartId = () => {
    cart?.map((cartItem) => {
      if (cartItem.productId === product?.id) {
        setcartItemID(cartItem.id);
        setcartItemQty(cartItem.quantity);
      }
    });
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    if (
      !cartItemID &&
      cart &&
      localStorage.getItem("token")
    ) {
      dispatch(addCartItemThunk(product.id));
    } else if (cart && localStorage.getItem("token")) {
      dispatch(
        updateCartQtyThunk(cartItemID, 1, cartItemQty)
      );
    } else {
      return navigate("/user/login");
    }
  };

  useEffect(getCartId, [cart]);
  return (
    <Link to={`/product/${product.id}`}>
      <article className="cardProduct">
        <header className="cardProduct__header">
          <img
            className="cardProduct__header--img"
            src={product.productImgs[0].url}
            alt=""
          />
          <img
            className="cardProduct__header--img"
            src={product.productImgs[1].url}
            alt=""
          />
        </header>
        <section className="cardProduct__info">
          <header className="cardProduct__info--header">
            <h3 className="textgray">{product.brand}</h3>
            <h2 className="textdarkgrey">
              {product.title}
            </h2>
          </header>
          <div className="cardProduct__info--price">
            <div className="textgray">Price</div>
            <div className="textdarkgrey">
              $ {product.price.toFixed(2)}
            </div>
          </div>
          <button
            onClick={handleBtnClick}
            className="cardProduct__info--btn"
          >
            <i className="bx bx-cart-add"></i>
          </button>
        </section>
      </article>
    </Link>
  );
};

export default CardProduct;
