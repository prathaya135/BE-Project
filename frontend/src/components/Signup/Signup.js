import React, { useState } from "react";
import { Link,Outlet } from "react-router-dom";
import './Signup.css'
export default function Login() {
    const handleClick=(event)=>{
        event.preventDefault();
    }
  return (
    <div
      className="text_area container my-3"
      style={{
        height: "600px",
        width: "600px",
        borderWidth: "2px",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="my-3">
        <h4 className="h4-sign">Signup</h4>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <form action="" style={{ alignItems: "center" }}>
            <input
              type="text"
              className="text_area text_input"
              placeholder="Email"
            />
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
              <button type="submit" onClick={handleClick} className="btn mx-3">
                Submit
              </button>
              <Link to='/' className="btn"  style={{padding:"13px"}}>
                Login
              </Link>
            </div>
          </form>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
