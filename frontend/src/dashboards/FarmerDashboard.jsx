import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
    getAllActiveRequirements,
    getMyOffers
} from "../services/api";

import AvailableRequirements from "../components/farmer/AvailableRequirements";
import MySellOffers from "../components/farmer/MySellOffers";

import {
    FaLeaf,
    FaBars,
    FaTimes,
    FaClipboardList,
    FaShoppingBasket,
    FaBell,
    FaUserCircle,
    FaSignOutAlt,
    FaChartBar
} from "react-icons/fa";

import "../styles/Dashboard.css";

export default function FarmerDashboard() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [tab, setTab] = useState("requirements");

    const [requirements, setRequirements] = useState([]);

    const [offers, setOffers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!user) {

            navigate("/login");

            return;

        }

        loadRequirements();

        loadOffers();

    }, []);
    const handleCreateOffer = (requirement) => {

    navigate("/create-offer", {

        state: {

            requirement

        }

    });

};
    const loadRequirements = async () => {

        try{

            setLoading(true);

            const response = await getAllActiveRequirements();

            setRequirements(response.data);

        }

        catch{

            setError("Failed to load requirements");

        }

        finally{

            setLoading(false);

        }

    };

    const loadOffers = async () => {

        try{

            const response = await getMyOffers();

            setOffers(response.data);

        }

        catch{

            setError("Failed to load offers");

        }

    };

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    if(!user){

        return <div className="loading-screen">Loading...</div>;

    }

    return(

<div className="farmer-page">

    {/* Sidebar */}

    <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>

        <div className="sidebar-header">

            <div className="logo">

                <FaLeaf/>

                {sidebarOpen && <span>AgroConnect</span>}

            </div>

            <button
                className="menu-btn"
                onClick={()=>setSidebarOpen(!sidebarOpen)}
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

                className={tab==="requirements" ? "active" : ""}

                onClick={()=>setTab("requirements")}

            >

                <FaClipboardList/>

                {

                    sidebarOpen &&

                    <span>

                        Requirements

                    </span>

                }

            </button>

            <button

                className={tab==="offers" ? "active" : ""}

                onClick={()=>setTab("offers")}

            >

                <FaShoppingBasket/>

                {

                    sidebarOpen &&

                    <span>

                        My Offers

                    </span>

                }

            </button>

        </nav>

        <button

            className="logout-side"

            onClick={handleLogout}

        >

            <FaSignOutAlt/>

            {

                sidebarOpen &&

                <span>

                    Logout

                </span>

            }

        </button>

    </aside>

    {/* Main */}

    <main className="main-content">

        {/* Topbar */}

        <div className="topbar">

            <h2 className="page-title">

                Farmer Dashboard

            </h2>

            <div className="top-right">

                <FaBell className="bell"/>

                <div className="profile">

                    <FaUserCircle/>

                    <span>

                        {user.name}

                    </span>

                </div>

            </div>

        </div>

        {/* Hero */}

        <div className="hero-card">

            <h1>

                Welcome Back,

                {" "}

                {user.name}

                🌾

            </h1>

            <p>

                Manage crop requirements and monitor your offers.

            </p>

        </div>

        {/* Statistics */}

        <div className="stats">

            <div className="stat-card">

                <FaClipboardList/>

                <h2>

                    {requirements.length}

                </h2>

                <span>

                    Active Requirements

                </span>

            </div>

            <div className="stat-card">

                <FaShoppingBasket/>

                <h2>

                    {offers.length}

                </h2>

                <span>

                    Total Offers

                </span>

            </div>

            <div className="stat-card">

                <FaChartBar/>

                <h2>

                    {

                        offers.filter(

                            o=>o.status==="approved"

                        ).length

                    }

                </h2>

                <span>

                    Approved

                </span>

            </div>

            <div className="stat-card">

                <FaLeaf/>

                <h2>

                    {

                        offers.filter(

                            o=>o.status==="pending"

                        ).length

                    }

                </h2>

                <span>

                    Pending

                </span>

            </div>

        </div>

        {/* Content */}

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

            {

                tab==="requirements" &&

                <AvailableRequirements

                    requirements={requirements}

                     handleCreateOffer={handleCreateOffer}

                />

            }

            {

                tab==="offers" &&

                <MySellOffers

                    offers={offers}

                />

            }

        </div>

    </main>

</div>

    );

}