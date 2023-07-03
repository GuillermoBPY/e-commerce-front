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
  const url = `${import.meta.env.VITE_BASE_URL}/products`;

  axios
    .get(url)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => err);
};
