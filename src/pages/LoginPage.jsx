import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import defaultValues from "../utils/defaultValues";
import "./styles/LoginPage.css";
import Swal from "sweetalert2";
require("dotenv").config();
const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [userdata, setuserdata] = useState();
  const [userRegisterDate, setuserRegisterDate] =
    useState();

  const submit = (data) => {
    const url = `${process.env.BASE_URL}/users/login`;
    axios
      .post(url, data)
      .then((res) => {
        res;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
        location.reload();
        reset(defaultValues);
      })
      .catch((err) => {
        err;
        Swal.fire({
          scrollbarPadding: false,
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please make sure that the data entered is correct.",
        });
        localStorage.clear();
      });
  };

  const getDate = () => {
    const dateStr = "2023-02-24T13:57:07.376Z";
    const dateObj = new Date(dateStr);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(dateObj);
    setuserRegisterDate(formattedDate);
  };

  const handleclick = () => {
    localStorage.clear();
    reset();
    location.reload();
  };

  useEffect(() => {
    setuserdata(JSON.parse(localStorage.getItem("user")));
  }, [localStorage.getItem("token")]);

  useEffect(getDate, [userdata]);

  if (localStorage.getItem("token")) {
    if (!userdata) {
      return (
        <div className="loginpage__container">
          <img src="../../img/loading.gif" alt="" />
        </div>
      );
    } else
      return (
        <div className="loginpage__container">
          <div className="loginpage__login">
            <img src="../../img/userlogin.png" alt="" />
            <h2>{` Welcome ${userdata?.firstName}!`}</h2>
            <ul>
              <li>
                <span>
                  <i className="bx bx-id-card"></i>:
                </span>
                <span>#{userdata?.id}</span>
              </li>
              <li>
                <span>
                  <i className="bx bx-user-circle"></i>:
                </span>
                <span>{`${userdata?.firstName} ${userdata?.lastName}`}</span>
              </li>
              <li>
                <span>
                  <i className="bx bx-envelope"></i>:
                </span>
                <span>{userdata?.email}</span>
              </li>
              <li>
                <span>
                  <i className="bx bx-phone"></i>:
                </span>
                <span>{userdata?.phone}</span>
              </li>
              <li>
                <span>
                  <i className="bx bx-calendar-check"></i>:{" "}
                </span>
                <span>{userRegisterDate}</span>
              </li>
            </ul>
            <button
              className="loginpage_btn"
              onClick={handleclick}
            >
              Log Out
            </button>
          </div>
        </div>
      );
  } else {
    return (
      <div className="loginpage__userlogin">
        <form onSubmit={handleSubmit(submit)}>
          <h2>User Login</h2>
          <div className="testeruser">
            <p>Tester User</p>
            <p>luciablack@gmail.com</p>
            <p>g061552101</p>
          </div>
          <div className="inputbox">
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="email"
              required
            ></input>
          </div>
          <div className="inputbox">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              required
            ></input>
          </div>
          <div className="btn__box">
            <button>Log In!</button>
            <Link to="/user/register">
              <button>Or go to register!</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
};
export default LoginPage;
