import axios from "axios";
require("dotenv").config();

export const getProductsByNameOrCat =
  (data = "title=") =>
  (dispatch) => {
    const url = `${process.env.BASE_URL}/products?${data}`;

    axios
      .get(url)
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => err);
  };
