import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-container">
      <div className="Login">
        <h1>Login</h1>
        <form>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <button className="submit-button">Submit</button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
