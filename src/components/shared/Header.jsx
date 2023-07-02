import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/Header.css";

const Header = () => {
  const [totalQty, settotalQty] = useState(0);
  const { cart } = useSelector((state) => state);

  const gettotalQty = () => {
    settotalQty(cart?.reduce((acc, curr) => acc + curr.quantity, 0));
  };

  useEffect(gettotalQty, [cart]);
  return (
    <header className="mainheader">
      <h1>
        <Link to="/">e-commerce</Link>
      </h1>
      <nav className="mainheader__nav">
        <ul>
          <li>
            <Link to="/user/login">
              <i className="bx bx-user"></i>
            </Link>
          </li>
          <li>
            <Link to="/purchases">
              <i className="bx bx-box"></i>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="bx bx-cart"></i>
              {localStorage.getItem("token") && (
                <span className="bx-cart--span">{totalQty}</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
