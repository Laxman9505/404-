import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState("");

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
      console.log("resdata", resdata);
      {
        resdata.error.code == 400 && setError(resdata.error.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup">
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
          {error && <p className="error">{error}</p>}
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
    </div>
  );
}
