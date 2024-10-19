import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login({ onlogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Login successful', result);
                onlogin(result.token);
                localStorage.setItem('token', result.token);
                setMessage('Login successful! Redirecting...'); 
                handleMessage();
                setTimeout(() => navigate('/'), 2000); 
            } else {
                setMessage(result.message || 'Login failed. Please try again.'); 
                handleMessage();
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.'); 
            handleMessage();
        }
    };

    const handleMessage = () => {
        setTimeout(() => {
            setMessage('');
        }, 3000); 
    };

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
            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}
            <div className="container">
                <div className="row justify-content-center">
                    <form onSubmit={handleSubmit} style={{ alignItems: "center" }}>
                        <input
                            type="email"
                            className="text_area text_input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="text_area text_input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div>
                            <button type="submit" className="btn mx-3" onClick={handleMessage}>
                                Login
                            </button>
                            <Link to='/signup' className="btn" style={{ padding: "13px" }}>
                                Signup
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
