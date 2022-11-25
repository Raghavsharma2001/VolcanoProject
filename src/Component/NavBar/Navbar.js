import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../NavBar/nav.css";
//import { useState } from "react";
import Logout from "../Logout/Logout";

import AuthContext from "../../store/auth-context";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>;

// navigation links
export default function Navbar() {
  const authCtx = useContext(AuthContext);

  const [isNavbarMax, setIsNavbarMax] = useState(false);

  const menu = require("./menu.png");

  return (
    <nav className="navigation">
      <h1 href as={Link} to="/" className="name">
        Volcanoes
      </h1>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavbarMax(!isNavbarMax);
        }}
      >
        <img src={menu} />
      </button>

      <div className={isNavbarMax ? "nav-menu expanded" : "nav-menu"}>
        <ul>
          <li>
            <Link exact to="/">
              Home
            </Link>
          </li>
          <li>
            <Link exact to="/volcano">
              Volcano List
            </Link>
          </li>
          {!authCtx.isLoggedIn && (
            <li>
              <Link exact to="/login">
                Login
              </Link>
            </li>
          )}
          {!authCtx.isLoggedIn && (
            <li>
              <Link exact to="/register">
                Sign Up
              </Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link exact to="/" onClick={() => authCtx.logout()}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
