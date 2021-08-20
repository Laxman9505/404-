import React, { useEffect, useRef } from "react";
import homeImage from "../../images/home.jpg";
import "./Home.css";
import { init } from "ityped";
import Login from "../Login/Login";
import { Link } from "react-router-dom";
import homeOverlay from "../../images/home2.jpg";
export default function Home() {
  const spanRef = useRef();

  useEffect(() => {
    const myElement = spanRef.current;
    init(myElement, {
      showCursor: true,
      strings: ["parking slot booking", "authentication with number plate"],
    });
  }, []);
  return (
    <div>
      <div className="home">
        <img src={homeOverlay} alt="" className="home-overlay" />
        <div className="home-content">
          <div
            className="home-inner"
            style={{ zIndex: "1000000", opacity: "1" }}
          >
            <h1>Smart Parking sytem</h1>
            <p>
              This is smart parking created by first year students of{" "}
              <span>SOFTWARICA COLLEGE OF IT AND E-COMMERCE.</span>
              It is just a prototype which really solves parking problem if
              scaled in proper way. It contains basic functionality such as
              <span ref={spanRef}> parking slot booking</span>
            </p>
            <Link to="/book" className="button">
              <button type="button">Book</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
