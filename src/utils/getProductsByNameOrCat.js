import axios from "axios";

export const getProductsByNameOrCat =
  (data = "title=") =>
  (dispatch) => {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/products?${data}`;

    axios
      .get(url)
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => err);
  };
