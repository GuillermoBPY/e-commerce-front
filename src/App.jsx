import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import "./styles/App.css";
import { getAllProductsThunk } from "./store/slices/products.slice";
import { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getCartThunk } from "./store/slices/cart.slice";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import CartPage from "./pages/CartPage";
import Purchases from "./pages/Purchases";
import Footer from "./components/shared/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsThunk());
    dispatch(getCartThunk());
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:id"
          element={<ProductPage />}
        />
        <Route path="/user">
          <Route
            path="register"
            element={<RegisterPage />}
          />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/purchases"
            element={<Purchases />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
