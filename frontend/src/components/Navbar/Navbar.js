import React from "react";
import {Link,Outlet } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";

function ColorSchemesExample() {
  return (
    <>
      <nav  style={{justifyContent:"space-between"}} className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div>
            <Link className="navbar-brand mx-3" to="/">
              <HiAcademicCap/> SignHelpers
            </Link>
          </div>
          <div className="mx-3">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
      <Outlet />
    </>
  );
}

export default ColorSchemesExample;
