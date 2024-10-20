import React, { useState } from "react";
import { Link,Outlet,useNavigate } from "react-router-dom";
import './Signup.css'
export default function Login() {
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  const [message, setMessage] = useState('');

    const handleClick=async (event)=>{

        event.preventDefault();
        const sign_up={
          name,
          email,
          password
        }
        try {
          const response=await fetch('http://localhost:3000/sign_in',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(sign_up),
          });
          if (response.ok) {
            setMessage('Confirmation email sent successfully');
            handleSubmit();
          }else{
            setMessage('Error SignUp');
            handleSubmit();
          }
        } catch (error) {
          setMessage(`Error sending sign request: ${error}`);
          handleSubmit();
        }
    }
    const handleSubmit = () => {
        setTimeout(() => {
            setMessage('');
        }, 3000); 
    };
  return (
    <div
      className="text_area container my-3"
      style={{
        height: "620px",
        width: "600px",
        borderWidth: "2px",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="my-3">
        <h4 className="h4-sign">Signup</h4>
      </div>
      {message && (
                <div className="alert alert-info my-3">
                    {message}
                </div>
      )}
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={handleClick} style={{ alignItems: "center" }}>
            <input
              type="text"
              className="text_area text_input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="text_area text_input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="text_area text_input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <button type="submit" className="btn mx-3" onClick={handleSubmit}>
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
