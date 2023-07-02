import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: null,
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const getAllProductsThunk = () => (dispatch) => {
  const url = "http://localhost:8080/api/v1/products";

  axios
    .get(url)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => err);
};
