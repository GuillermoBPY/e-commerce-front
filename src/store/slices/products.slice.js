import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
require("dotenv").config();

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
  const url = `${process.env.BASE_URL}/products`;

  axios
    .get(url)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => err);
};
