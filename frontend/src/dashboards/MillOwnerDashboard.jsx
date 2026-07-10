import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
    getMyRequirements,
    updateRequirementStatus
} from "../services/api";

import CreateRequirement from "../components/millOwner/CreateRequirement";
import MyRequirements from "../components/millOwner/MyRequirements";

import {
    FaLeaf,
    FaClipboardList,
    FaWarehouse,
    FaTruckLoading,
    FaCheckCircle,
    FaBars,
    FaTimes,
    FaBell,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/Dashboard.css";

export default function MillOwnerDashboard() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [tab, setTab] = useState("create");

    const [requirements, setRequirements] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!user) {

            navigate("/login");

            return;

        }

        loadRequirements();

    }, []);

    const loadRequirements = async () => {

        try {

            setLoading(true);

            const response = await getMyRequirements();

            setRequirements(response.data);

        }

        catch {

            setError("Failed to load requirements");

        }

        finally {

            setLoading(false);

        }

    };
    const handleCloseRequirement = async (requirementId) => {

    try {

        await updateRequirementStatus(
            requirementId,
            "closed"
        );

        loadRequirements();

    }

    catch (err) {

        console.error(err);

        setError("Failed to close requirement");

    }

};
    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    if (!user) {

        return (

            <div className="loading-screen">

                Loading...

            </div>

        );

    }

    const activeRequirements =
        requirements.filter(r => r.status === "active").length;

    const closedRequirements =
        requirements.filter(r => r.status === "closed").length;

    const totalQuantity =
        requirements.reduce(
            (sum, r) => sum + Number(r.requiredTotalQuantity || 0),
            0
        );

    return (

        <div className="mill-page">

            {/* Sidebar */}

            <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>

                <div className="sidebar-header">

                    <div className="logo">

                        <FaLeaf />

                        {sidebarOpen && <span>AgroConnect</span>}

                    </div>

                    <button
                        className="menu-btn"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >

                        {

                            sidebarOpen ?

                                <FaTimes />

                                :

                                <FaBars />

                        }

                    </button>

                </div>

                <nav>

                    {user.isVerified && <button
                        className={tab === "create" ? "active" : ""}
                        onClick={() => setTab("create")}
                    >

                        <FaWarehouse />

                        {sidebarOpen && <span>Create Requirement</span>}

                    </button>}

                    <button
                        className={tab === "requirements" ? "active" : ""}
                        onClick={() => setTab("requirements")}
                    >

                        <FaClipboardList />

                        {sidebarOpen && <span>My Requirements</span>}

                    </button>

                </nav>

                <button
                    className="logout-side"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    {sidebarOpen && <span>Logout</span>}

                </button>

            </aside>

            {/* Main */}

            <main className="main-content">

                {/* Topbar */}

                <div className="topbar">

                    <h2 className="page-title">

                        Mill Owner Dashboard

                    </h2>

                    <div className="top-right">

                        <FaBell className="bell" />

                        <div className="profile">

                            <FaUserCircle />

                            <span>{user.name}</span>

                        </div>

                    </div>

                </div>

                {/* Verification */}

                {

                    !user.isVerified &&

                    <div className="warning-card">

                        <h3>

                            ⚠ Account Verification Pending

                        </h3>

                        <p>

                            Your account is waiting for administrator approval.
                            You cannot create crop requirements until your
                            account is verified.

                        </p>

                    </div>

                }

                {/* Hero */}

                <div className="hero-card">

                    <h1>

                        Welcome Back, {user.name} 👋

                    </h1>

                    <p>

                        Create crop requirements and manage all your
                        requirements from one place.

                    </p>

                </div>

                {/* Statistics */}

                <div className="stats">

                    <div className="stat-card">

                        <FaClipboardList />

                        <h2>

                            {requirements.length}

                        </h2>

                        <span>

                            Total Requirements

                        </span>

                    </div>

                    <div className="stat-card">

                        <FaCheckCircle />

                        <h2>

                            {activeRequirements}

                        </h2>

                        <span>

                            Active

                        </span>

                    </div>

                    <div className="stat-card">

                        <FaTruckLoading />

                        <h2>

                            {totalQuantity}

                        </h2>

                        <span>

                            Total Quantity

                        </span>

                    </div>

                    <div className="stat-card">

                        <FaWarehouse />

                        <h2>

                            {closedRequirements}

                        </h2>

                        <span>

                            Closed

                        </span>

                    </div>

                </div>

                {/* Content */}

                {user.isVerified && <div className="content-card">

                    {

                        loading &&

                        <p>

                            Loading...

                        </p>

                    }

                    {

                        error &&

                        <div className="error-box">

                            {error}

                        </div>

                    }

                    {

                        tab === "create" &&

                        <CreateRequirement
                            loadRequirements={loadRequirements}
                        />

                    }

                    {

                        tab === "requirements" &&

                        <MyRequirements
                            requirements={requirements}
                            handleCloseRequirement={handleCloseRequirement}
                        />

                    }

                </div>}

            </main>

        </div>

    );

}