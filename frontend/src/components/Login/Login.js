import React, { useState } from "react";
import { Link,Outlet } from "react-router-dom";
import "./login.css";
export default function Login() {
    const handleClick=(event)=>{
        event.preventDefault();
    }
  return (
    <div
      className="text_area container my-3"
      style={{
        height: "500px",
        width: "600px",
        borderWidth: "2px",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="my-2">
        <h4 className="h4-login">Login</h4>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <form action="" style={{ alignItems: "center" }}>
            <input
              type="text"
              className="text_area text_input"
              placeholder="Name"
            />
            <input
              type="text"
              className="text_area text_input"
              placeholder="Password"
            />
            <div>
              <button type="submit"  onClick={handleClick} className="btn mx-3">
                Login
              </button>
              <Link to='/signup' className="btn"  style={{padding:"13px"}}>
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
