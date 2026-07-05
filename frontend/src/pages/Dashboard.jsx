import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
    FaLeaf,
    FaUserCircle,
    FaEnvelope,
    FaUserTag,
    FaCheckCircle,
    FaTimesCircle,
    FaSignOutAlt,
    FaArrowRight,
    FaExclamationTriangle
} from "react-icons/fa";

import "./Dashboard.css";

export default function Dashboard() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {

        if (!user)
            navigate("/login");

    }, [user, navigate]);

    if (!user)
        return null;

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    const dashboardRoute = {

        admin: "/admin",

        farmer: "/farmer",

        mill_owner: "/mill-owner",

        inspector: "/inspector"

    };

    return (

        <div className="dashboard-page">

            <nav className="dashboard-navbar">

                <div className="logo">

                    <FaLeaf/>

                    AgroConnect

                </div>

                <div className="profile">

                    <FaUserCircle/>

                    <span>

                        {user.name}

                    </span>

                </div>

            </nav>

            <div className="dashboard-wrapper">

                <div className="welcome-card">

                    <h1>

                        Welcome back,

                        {user.name}

                        👋

                    </h1>

                    <p>

                        Smart Agriculture Marketplace

                    </p>

                </div>

                <div className="info-grid">

                    <div className="info-card">

                        <FaUserTag className="card-icon"/>

                        <h3>

                            Role

                        </h3>

                        <p>

                            {user.role}

                        </p>

                    </div>

                    <div className="info-card">

                        {

                            user.isVerified ?

                            <FaCheckCircle
                                className="verified"
                            />

                            :

                            <FaTimesCircle
                                className="not-verified"
                            />

                        }

                        <h3>

                            Verification

                        </h3>

                        <p>

                            {

                                user.isVerified ?

                                "Verified"

                                :

                                "Pending"

                            }

                        </p>

                    </div>

                </div>

                <div className="email-card">

                    <FaEnvelope/>

                    <span>

                        {user.email}

                    </span>

                </div>

                {

                    (user.role==="mill_owner" ||
                    user.role==="inspector")
                    &&

                    !user.isVerified &&

                    <div className="warning-card">

                        <FaExclamationTriangle/>

                        <div>

                            <h3>

                                Verification Pending

                            </h3>

                            <p>

                                Your account is awaiting admin approval.

                            </p>

                        </div>

                    </div>

                }

                <button

                    className="dashboard-btn"

                    onClick={() =>
                        navigate(
                            dashboardRoute[user.role]
                        )
                    }

                >

                    Open Dashboard

                    <FaArrowRight/>

                </button>

                <button

                    className="logout-btn"

                    onClick={handleLogout}

                >

                    <FaSignOutAlt/>

                    Logout

                </button>

            </div>

        </div>

    );

}