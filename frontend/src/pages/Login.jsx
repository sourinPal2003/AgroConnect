import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaLeaf
} from "react-icons/fa";

import "./Login.css";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await loginUser(credentials);

            login(response.data.user, response.data.token);

            navigate("/dashboard");

        } catch (err) {

            setError(err.response?.data?.error || "Login Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="left-panel">

                <div className="brand">

                    <FaLeaf className="brand-icon"/>

                    <h1>AgroConnect</h1>

                    <p>

                        Smart Agriculture Marketplace connecting
                        Farmers, Mill Owners and Inspectors
                        on one secure platform.

                    </p>

                </div>

            </div>

            <div className="right-panel">

                <div className="login-card">

                    <h2>Welcome Back 👋</h2>

                    <span>Login to continue</span>

                    {error && (

                        <div className="error-box">

                            {error}

                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="input-box">

                            <FaEnvelope className="icon"/>

                            <input

                                type="email"

                                name="email"

                                placeholder="Email Address"

                                value={credentials.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="input-box">

                            <FaLock className="icon"/>

                            <input

                                type={showPassword ? "text" : "password"}

                                name="password"

                                placeholder="Password"

                                value={credentials.password}

                                onChange={handleChange}

                                required

                            />

                            <span
                                className="eye"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >

                                {

                                    showPassword ?

                                    <FaEyeSlash/> :

                                    <FaEye/>

                                }

                            </span>

                        </div>

                        <button
                            className="login-btn"
                            disabled={loading}
                        >

                            {

                                loading ?

                                "Logging In..." :

                                "Login"

                            }

                        </button>

                    </form>

                    <div className="bottom-text">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}