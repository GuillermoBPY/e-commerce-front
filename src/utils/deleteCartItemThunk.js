import axios from "axios";
import Swal from "sweetalert2";
import { getCartThunk } from "../store/slices/cart.slice";
import config from "../store/slices/getConfig";

export const deleteCartItemThunk = (id) => (dispatch) => {
  Swal.fire({
    scrollbarPadding: false,
    title: "Are you sure?",
    text: "Do you want to remove this product from your cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = `http://localhost:8080/api/v1/cart/${id}`;
      axios
        .delete(url, config)
        .then((res) => {
          res;
          Swal.fire(
            "Removed!",
            "The product has been removed from the cart.",
            "success"
          );
          dispatch(getCartThunk());
        })
        .catch((err) => err);
    }
  });
};
