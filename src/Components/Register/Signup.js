import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [data, setData] = useState({
    fullname: "",
    regno: "",
    username: "",
    password: "",
  });
  console.log(data);

  const nameChangeHandler = (e) => {
    setData((prevData) => ({
      ...prevData,
      fullname: e.target.value,
    }));
  };
  const usernameChangeHandler = (e) => {
    setData((prevData) => ({
      ...prevData,
      username: e.target.value,
    }));
  };
  const regChangeHandler = (e) => {
    setData((prevData) => ({
      ...prevData,
      regno: e.target.value,
    }));
  };
  const passwordChangeHandler = (e) => {
    setData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATlVRu40awxqPF1R-bXHRaiZT1IYiyyS4",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.username,
            password: data.password,
            returnSecureToken: true,
          }),
        }
      );
      const resdata = await response.json();
      console.log(resdata);
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div className="Login">
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          onChange={nameChangeHandler}
          required
        />
        <label>Vehicle Registration Number</label>
        <input
          type="text"
          placeholder="Registration-Number"
          onChange={regChangeHandler}
          className="input-field"
        />
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          onChange={usernameChangeHandler}
          className="input-field"
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={passwordChangeHandler}
          className="input-field"
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
