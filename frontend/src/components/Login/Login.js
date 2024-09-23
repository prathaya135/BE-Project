import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./login.css";

export default function Login({onlogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

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
                onlogin(result.token)
                navigate('/');
            } else {
                console.log('Login error', result.message);
            }
        } catch (error) {
            console.log('Error sending login request:', error);
        }
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
                            <button type="submit" className="btn mx-3">
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
