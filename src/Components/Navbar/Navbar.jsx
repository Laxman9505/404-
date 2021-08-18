import React from "react";
import logo from "../../images/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import Home from "../Home/Home";
import "./Navbar.css";
import { useState } from "react";
import { useRef } from "react";
import Login from "../Login/Login";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Signup from "../Register/Signup";
import Book from "../Book/Book";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div>
        <div className="navigation">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className={isMenuOpen ? "nav-links active" : "nav-links"}>
            <ul>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <a href="">About</a>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/book">Book</Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/login">Logout</Link>
              </li>
            </ul>
          </div>
          {isMenuOpen ? (
            <div className="icon">
              <ClearIcon
                id="clearIcon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          ) : (
            <div className="icon">
              <MenuIcon
                id="menuIcon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          )}
        </div>
      </div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/book">
          <Book />
        </Route>
      </Switch>
    </Router>
  );
}
