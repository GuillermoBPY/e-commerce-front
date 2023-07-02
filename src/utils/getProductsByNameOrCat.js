import axios from "axios";

export const getProductsByNameOrCat =
  (data = "title=") =>
  (dispatch) => {
    const url = `https://e-commerce-api-zove.onrender.com/api/v1/products?${data}`;

    axios
      .get(url)
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => err);
  };
