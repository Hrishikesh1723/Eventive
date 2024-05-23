import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import Logo from "../images/EventiveLogo.png";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Unavbar = () => {
  return (
    <>
      <nav class="navbar">
        <div>
          <img src={Logo} alt="Logo" className="logo1" />
        </div>
        <ul class="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label for="checkbox_toggle" class="hamburger">
            &#9776;
          </label>
          <div class="menu">
            <li type="none">
              <NavLink to="/userhome">Home</NavLink>
            </li>
            <li type="none">
              <NavLink to="/uevents">Events</NavLink>
            </li>
            <li type="none">
              <NavLink to="/myevents">Myevent</NavLink>
            </li>
            <li type="none">
              <NavLink to="/about">Profile</NavLink>
            </li>
            <li type="none">
              <NavLink to="/logout">
                <RiLogoutBoxRLine />
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Unavbar;
