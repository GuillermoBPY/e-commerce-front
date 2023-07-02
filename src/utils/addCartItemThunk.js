import axios from "axios";
import Swal from "sweetalert2";
import { getCartThunk } from "../store/slices/cart.slice";
import config from "../store/slices/getConfig";

export const addCartItemThunk =
  (id, counter) => (dispatch) => {
    const url =
      "https://e-commerce-api-zove.onrender.com/api/v1/cart";
    const data = {
      quantity: counter || 1,
      productId: id,
    };
    axios
      .post(url, data, config)
      .then((res) => {
        res;
        Swal.fire({
          scrollbarPadding: false,
          icon: "success",
          title: "The product has been added to the cart",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getCartThunk());
      })
      .catch((err) => err);
  };
