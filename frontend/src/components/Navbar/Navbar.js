import React from "react";
import {Link,Outlet } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function ColorSchemesExample({onlogout}) {
  return (
    <>
      <nav  style={{justifyContent:"space-around"}} className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div>
            <Link className="navbar-brand" to="/">
              <HiAcademicCap/> SignHelpers
            </Link>
          </div>
          <div className="mx-3">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active ">
                  <Link className="nav-link" to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" onClick={onlogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
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
