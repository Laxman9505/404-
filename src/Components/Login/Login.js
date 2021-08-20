import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import loginOverlay from "../../images/loginnew.jpg";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";

export default function Login() {
  return (
    <div className="login-container">
      <img src={loginOverlay} alt="" className="login-overlay" />
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
          <div className="line"></div>
          <button className="sign-in-option" type="button">
            <EmailIcon style={{ color: "#dd4b39" }} />
            <p>Sign In With Google</p>
          </button>
          <button className="sign-in-option" type="button">
            <FacebookIcon style={{ color: "#3b5998" }} />
            <p>Sign In With Facebook</p>
          </button>
        </form>
      </div>
    </div>
  );
}
