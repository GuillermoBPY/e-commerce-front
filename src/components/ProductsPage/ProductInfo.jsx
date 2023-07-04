import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItemThunk } from "../../utils/addCartItemThunk";
import { updateCartQtyThunk } from "../../utils/updateCartQtyThunk";
import { useNavigate } from "react-router-dom";
import "./styles/ProductInfo.css";

const ProductInfo = ({ product }) => {
  const { cart } = useSelector((state) => state);
  const [counter, setcounter] = useState(1);
  const [cartItemID, setcartItemID] = useState();
  const [cartItemQty, setcartItemQty] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCartId = () => {
    if (cart) {
      for (let item of cart) {
        if (item.productId === product?.id) {
          setcartItemID(item.id);
          setcartItemQty(item.quantity);
          break;
        } else {
          setcartItemID();
          setcartItemQty();
        }
      }
    }
  };

  const handleAdd = () => {
    setcounter(counter + 1);
  };

  const handleminus = () => {
    if (counter - 1 >= 1) setcounter(counter - 1);
  };

  const handleAddOrUpdate = () => {
    if (cartItemID) {
      dispatch(
        updateCartQtyThunk(cartItemID, counter, cartItemQty)
      );
    } else if (cart) {
      dispatch(addCartItemThunk(product.id, counter));
      setcounter(1);
    } else {
      return navigate("/user/login");
    }
  };
  useEffect(getCartId, [product.id, cart]);
  return (
    <article
      className="productinfo__container"
      key={product?.id}
    >
      <h3>{product?.brand}</h3>
      <h2>{product?.title}</h2>
      <p>{product?.description}</p>
      <footer>
        <section>
          <h4>Price</h4>
          <span>$ {product?.price}</span>
        </section>
        <section>
          <div className="handleopbox">
            <h4>Quantity</h4>
            <div className="bxbtn" onClick={handleminus}>
              <i className="bx bx-minus-circle"></i>
            </div>
            <div>{counter}</div>
            <div className="bxbtn" onClick={handleAdd}>
              <i className="bx bx-plus-circle"></i>
            </div>
          </div>
        </section>
        <button
          className="btnproduct"
          onClick={handleAddOrUpdate}
        >
          {cartItemID ? "Update Quantity" : "Add to Cart"}
          <i className="bx bx-cart-add"></i>
        </button>
      </footer>
    </article>
  );
};

export default ProductInfo;
