import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
//Redux
import { Provider } from "react-redux";
import store from "./store";
//Router
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
