import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

import {
    FaLeaf,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUserTag,
    FaIdCard,
    FaIndustry,
    FaMapPin
} from "react-icons/fa";

import "./Register.css";

export default function Register() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: "farmer",
        licenseNo: "",
        millName: "",
        millLocation: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await registerUser(formData);

            login(response.data.user, response.data.token);

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.error ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page">

            {/* LEFT PANEL */}

            <div className="left-panel">

                <div className="brand">

                    <FaLeaf className="brand-icon"/>

                    <h1>AgroConnect</h1>

                    <p>

                        Join India's smart agricultural marketplace.
                        Connect Farmers, Mill Owners and Inspectors
                        through one secure platform.

                    </p>

                </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="right-panel">

                <div className="register-card">

                    <h2>Create Account 🌱</h2>

                    <span>

                        Register to continue

                    </span>

                    {

                        error &&

                        <div className="error-box">

                            {error}

                        </div>

                    }

                    <form
                        onSubmit={handleSubmit}
                        className="register-form"
                    >

                        <div className="input-box">

                            <FaUser className="icon"/>

                            <input

                                type="text"

                                name="name"

                                placeholder="Full Name"

                                value={formData.name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="input-box">

                            <FaEnvelope className="icon"/>

                            <input

                                type="email"

                                name="email"

                                placeholder="Email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="input-box">

                            <FaPhone className="icon"/>

                            <input

                                type="tel"

                                name="phone"

                                placeholder="Phone Number"

                                value={formData.phone}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="input-box">

                            <FaMapMarkerAlt className="icon"/>

                            <input

                                type="text"

                                name="address"

                                placeholder="Address"

                                value={formData.address}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="input-box">

                            <FaLock className="icon"/>

                            <input

                                type={
                                    showPassword
                                    ? "text"
                                    : "password"
                                }

                                name="password"

                                placeholder="Password"

                                value={formData.password}

                                onChange={handleChange}

                                required

                            />

                            <span
                                className="eye"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {

                                    showPassword ?

                                    <FaEyeSlash/>

                                    :

                                    <FaEye/>

                                }

                            </span>

                        </div>

                        <div className="input-box">

                            <FaUserTag className="icon"/>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >

                                <option value="farmer">
                                    🌾 Farmer
                                </option>

                                <option value="mill_owner">
                                    🏭 Mill Owner
                                </option>

                                <option value="inspector">
                                    🛡 Inspector
                                </option>

                            </select>

                        </div>

                        {

                            formData.role === "mill_owner" && (

                                <div className="mill-section">

                                    <h3>

                                        Mill Details

                                    </h3>

                                    <div className="input-box">

                                        <FaIdCard className="icon"/>

                                        <input

                                            type="text"

                                            name="licenseNo"

                                            placeholder="License Number"

                                            value={formData.licenseNo}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="input-box">

                                        <FaIndustry className="icon"/>

                                        <input

                                            type="text"

                                            name="millName"

                                            placeholder="Mill Name"

                                            value={formData.millName}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                    <div className="input-box">

                                        <FaMapPin className="icon"/>

                                        <input

                                            type="text"

                                            name="millLocation"

                                            placeholder="Mill Location"

                                            value={formData.millLocation}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>

                                </div>

                            )

                        }

                        <button
                            className="register-btn"
                            disabled={loading}
                        >

                            {

                                loading ?

                                "Creating Account..."

                                :

                                "Create Account"

                            }

                        </button>

                    </form>

                    <div className="bottom-text">

                        Already have an account?

                        <Link to="/login">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}