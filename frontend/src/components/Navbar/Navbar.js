import React from "react";
import { Link, Outlet } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function ColorSchemesExample({ onlogout }) {
  return (
    <>
      <nav style={{justifyContent:'space-around'}} className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <HiAcademicCap /> SignHelpers
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/SignDetection">
                  SignDetection
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedback">
                  FeedBacks
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
