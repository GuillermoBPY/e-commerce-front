import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import defaultValues from "../utils/defaultValues";
import { Link, useNavigate } from "react-router-dom";
import "./styles/RegisterPage.css";
const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submit = (data) => {
    const url = "http://localhost:8080/api/v1/users";
    axios
      .post(url, data)
      .then((res) => {
        res.data;
        Swal.fire({
          scrollbarPadding: false,
          icon: "success",
          title: `User ${res.data.firstName} ${res.data.lastName} was created successfully. Please login to continue`,
        });
        navigate("/user/login");
      })
      .catch((err) => err);
    reset(defaultValues);
  };

  return (
    <div className="register__container">
      <form onSubmit={handleSubmit(submit)}>
        <div className="input__boxform">
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName", {
              required: {
                value: true,
                message: "This field is required.",
              },
              pattern: {
                value: /[A-Za-z]/,
                message:
                  "Please enter only alphabetical letters without spaces.",
              },
              maxLength: {
                value: 25,
                message:
                  "The maximum length is 25 characters.",
              },
            })}
            type="text"
            id="firstName"
          />
          <div className="error__box">
            {errors.firstName && (
              <span className="usersform__error">
                <i className="bx bx-error"></i>
                {errors.firstName.message}
              </span>
            )}
          </div>
        </div>
        <div className="input__boxform">
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register("lastName", {
              required: {
                value: true,
                message: "This field is required.",
              },
              pattern: {
                value: /[A-Za-z]/,
                message:
                  "Please enter only alphabetical letters without spaces.",
              },
              maxLength: {
                value: 25,
                message:
                  "The maximum length is 25 characters.",
              },
            })}
            type="text"
            id="lastName"
          />
          <div className="error__box">
            {errors.lastName && (
              <span className="usersform__error">
                <i className="bx bx-error"></i>
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
        <div className="input__boxform">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "This field is required.",
              },
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email.",
              },
              maxLength: {
                value: 150,
                message:
                  "The maximum length is 150 characters.",
              },
            })}
            type="email"
            id="email"
          />
          <div className="error__box">
            {errors.email && (
              <span className="usersform__error">
                <i className="bx bx-error"></i>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="input__boxform">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "This field is required.",
              },
              pattern: {
                value: /^(?=.{8,})(?!\s).*$/,
                message:
                  "Please enter a valid password without spaces.",
              },
              maxLength: {
                value: 25,
                message:
                  "The maximum length is 25 characters.",
              },
              minLength: {
                value: 8,
                message:
                  "The minimum length is 8 characters.",
              },
            })}
            type="password"
            id="password"
          />
          <div className="error__box">
            {errors.password && (
              <span className="usersform__error">
                <i className="bx bx-error"></i>
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div className="input__boxform">
          <label htmlFor="phone">Phone</label>
          <input
            {...register("phone", {
              required: {
                value: true,
                message: "This field is required.",
              },
            })}
            type="number"
            id="phone"
          />
          <div className="error__box">
            {errors.password && (
              <span className="usersform__error">
                <i className="bx bx-error"></i>
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div className="registerbtn__box">
          <button>Register</button>
          <div>
            <span>Already have an account? </span>
            <Link to="/user/login">
              <button> Log In</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
