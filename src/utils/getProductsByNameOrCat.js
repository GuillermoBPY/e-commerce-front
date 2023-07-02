import axios from "axios";

export const getProductsByNameOrCat =
  (data = "title=") =>
  (dispatch) => {
    const url = `http://localhost:8080/api/v1/products?${data}`;

    axios
      .get(url)
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => err);
  };
