import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PurchaseCard from "../components/PurchasesPage/PurchaseCard";
import LoadingPage from "../components/shared/LoadingPage";
import config from "../store/slices/getConfig";
import "./styles/Purchases.css";

const Purchases = () => {
  const { cart } = useSelector((state) => state);
  const [purchases, setpurchases] = useState();

  const getPurchases = () => {
    const url =
      "https://e-commerce-api-zove.onrender.com/api/v1/purchases";
    axios
      .get(url, config)
      .then((res) => setpurchases(res.data))
      .catch((err) => err);
  };
  useEffect(getPurchases, [cart]);
  if (!purchases) {
    return <LoadingPage />;
  } else {
    return (
      <div className="purchase__container">
        <div className="purchase__cardbox">
          {purchases?.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              purchase={purchase}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Purchases;
