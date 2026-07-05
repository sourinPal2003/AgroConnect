import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ManageCrops from "../components/admin/ManageCrops";
import PendingOffers from "../components/admin/PendingOffers";
import Inspection from "../components/admin/Inspection";

import "./AdminDashboard.css";

import {
    FaLeaf,
    FaUsers,
    FaSeedling,
    FaClipboardList,
    FaUserCircle,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaBell,
    FaChartPie
} from "react-icons/fa";

import {

getAllUsers,

verifyUser,

createCrop,

getAllCrops,

deleteCrop,

getAllInspections,

getAllPendingOffers,

} from "../services/api";
import ManageUsers from "../components/admin/ManageUsers";
import "./AdminDashboard.css";

export default function AdminDashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tab, setTab] = useState("users");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const [crops, setCrops] = useState([]);
    const [inspections, setInspections] = useState([]);
    const [pendingOffers, setPendingOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newCrop, setNewCrop] = useState({ name: "", season: "", type: "" });

    // Load dashboard summary once
useEffect(() => {
    loadUsers();
    loadCrops();
    loadPendingOffers();
    loadInspections();
}, []);

// Optional: reload current tab when it changes
useEffect(() => {
    switch (tab) {
        case "users":
            loadUsers();
            break;
        case "crops":
            loadCrops();
            break;
        case "offers":
            loadPendingOffers();
            break;
        case "inspections":
            loadInspections();
            break;
        default:
            break;
    }
}, [tab]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (err) {
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const loadCrops = async () => {
        try {
            setLoading(true);
            const response = await getAllCrops();
            setCrops(response.data);
        } catch (err) {
            setError("Failed to load crops");
        } finally {
            setLoading(false);
        }
    };

    const loadInspections = async () => {
        try {
            setLoading(true);
            const response = await getAllInspections();
            setInspections(response.data);
        } catch (err) {
            setError("Failed to load inspections");
        } finally {
            setLoading(false);
        }
    };

    const loadPendingOffers = async () => {
        try {
            setLoading(true);
            const response = await getAllPendingOffers();
            setPendingOffers(response.data);
        } catch (err) {
            setError("Failed to load offers");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (userId, isVerified) => {
        try {
            await verifyUser(userId, isVerified);
            loadUsers();
        } catch (err) {
            setError("Failed to verify user");
        }
    };

    const handleAddCrop = async (e) => {
        e.preventDefault();
        try {
            await createCrop(newCrop);
            setNewCrop({ name: "", season: "", type: "" });
            loadCrops();
        } catch (err) {
            setError("Failed to create crop");
        }
    };

    const handleDeleteCrop = async (cropId) => {
        try {
            await deleteCrop(cropId);
            loadCrops();
        } catch (err) {
            setError("Failed to delete crop");
        }
    };
    const handleApproveOffer = async (offerId) => {
    try {
        await approveOffer(offerId);
        loadPendingOffers();
    } catch (err) {
        setError("Failed to approve offer");
    }
};

const handleRejectOffer = async (offerId) => {
    try {
        await rejectOffer(offerId);
        loadPendingOffers();
    } catch (err) {
        setError("Failed to reject offer");
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
   return (

<div className="admin-page">

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

                    <FaTimes/>

                    :

                    <FaBars/>

                }

            </button>

        </div>

        <nav>

            <button
                className={tab==="users" ? "active" : ""}
                onClick={() => setTab("users")}
            >

                <FaUsers/>

                {sidebarOpen && <span>Users</span>}

            </button>

            <button
                className={tab==="crops" ? "active" : ""}
                onClick={() => setTab("crops")}
            >

                <FaSeedling/>

               {sidebarOpen && <span>Crops</span>}

            </button>

            <button
                className={tab==="offers" ? "active" : ""}
                onClick={() => setTab("offers")}
            >

                <FaClipboardList/>

                {sidebarOpen && <span>Offers</span>}

            </button>

            <button
                className={tab==="inspections" ? "active" : ""}
                onClick={() => setTab("inspections")}
            >

                <FaChartPie/>

                {sidebarOpen && <span>Inspection</span>}

            </button>

        </nav>

        <button
            className="logout-side"
            onClick={handleLogout}
        >

            <FaSignOutAlt/>

            {sidebarOpen && <span>Logout</span>}

        </button>

    </aside>

    {/* Main */}

    <main className="main-content">

        {/* Topbar */}

      <div className="topbar">

    <h2 className="page-title">

        Admin Dashboard

    </h2>

    <div className="top-right">

        <FaBell className="bell"/>

        <div className="profile">

            <FaUserCircle/>

            <span>{user.name}</span>

        </div>

    </div>

</div>

        {/* Welcome */}

        <div className="hero-card">

            <h1>

                Welcome Back,

                {user.name}

                👋

            </h1>

            <p>

                AgroConnect Administration Panel

            </p>

        </div>

        {/* Stats */}

        <div className="stats">

            <div className="stat-card">

                <FaUsers/>

                <h2>

                    {users.length}

                </h2>

                <span>

                    Users

                </span>

            </div>

            <div className="stat-card">

                <FaSeedling/>

                <h2>

                    {crops.length}

                </h2>

                <span>

                    Crops

                </span>

            </div>

            <div className="stat-card">

                <FaClipboardList/>

                <h2>

                    {pendingOffers.length}

                </h2>

                <span>

                    Pending Offers

                </span>

            </div>

            <div className="stat-card">

                <FaChartPie/>

                <h2>

                    {inspections.length}

                </h2>

                <span>

                    Inspections

                </span>

            </div>

        </div>

        {/* Main Content */}

        <div className="content-card">

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

            {/* USERS */}

            {

                tab==="users" &&

                <ManageUsers

                    users={users}

                    handleVerify={handleVerify}

                />

            }

            {/* CROPS */}

           {
    tab === "crops" && (

        <ManageCrops
            crops={crops}
            newCrop={newCrop}
            setNewCrop={setNewCrop}
            handleAddCrop={handleAddCrop}
            handleDeleteCrop={handleDeleteCrop}
        />

    )
}

            {/* OFFERS */}

          {
    tab==="offers" &&

    <PendingOffers

        offers={pendingOffers}

    />

}
            {/* INSPECTIONS */}

            {
    tab==="inspections" &&

    <Inspection

        inspections={inspections}

    />

}
        </div>

    </main>

</div>

);
}
