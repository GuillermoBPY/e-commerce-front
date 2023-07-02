import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartPages/CartItem";
import LoadingPage from "../components/shared/LoadingPage";
import "./styles/CartPage.css";
import { purchaseCartThunk } from "../utils/purchaseCartThunk";

const CartPage = () => {
  const [totalAmount, settotalAmount] = useState(0);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart?.length >= 1) {
      settotalAmount(
        cart.reduce(
          (acc, cv) =>
            acc + cv.quantity * Number(cv.product.price),
          0
        )
      );
    }
  }, [cart]);

  const handlePurchase = () => {
    dispatch(purchaseCartThunk());
  };

  if (!cart) {
    return <LoadingPage />;
  } else {
    if (cart?.length === 0) {
      return (
        <div className="cartpage__emptybox">
          <img src="../img/empty.png" alt="empty" />
          <h2>
            Oops... <br />
            Your cart is empty
          </h2>
          <p>
            Looks like you have not added anything to you
            cart. Go ahead & explore top categories
          </p>
        </div>
      );
    } else {
      return (
        <div className="cartpagecontainer">
          <div className="carditemList">
            {cart?.map((prodCart) => (
              <CartItem
                key={prodCart.id}
                prodCart={prodCart}
              />
            ))}
          </div>
          <footer className="cartapage__footer">
            <h2>
              <span>Total: </span>
              <span>$ {totalAmount}</span>
            </h2>
            <button
              onClick={handlePurchase}
              className="cartpage__checkout--btn"
            >
              <span>Check Out</span>
              <i className="bx bxs-shopping-bags bx-tada"></i>
            </button>
          </footer>
        </div>
      );
    }
  }
};

export default CartPage;
