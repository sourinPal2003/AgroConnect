import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
    getMyInspections
} from "../services/api";

import MyInspections from "../components/inspector/MyInspections";

import {
    FaLeaf,
    FaClipboardCheck,
    FaCheckCircle,
     FaTimesCircle,
    FaHourglassHalf,
    FaTasks,
    FaBell,
    FaUserCircle,
    FaBars,
    FaTimes,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/Dashboard.css";

export default function InspectorDashboard(){

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [sidebarOpen,setSidebarOpen]=useState(true);

    const [inspections,setInspections]=useState([]);

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");

    useEffect(()=>{

        if(!user){

            navigate("/login");

            return;

        }

        loadInspections();

    },[]);

    const loadInspections=async()=>{

        try{

            setLoading(true);

            const response=await getMyInspections();

            setInspections(response.data);

        }

        catch{

            setError("Failed to load inspections");

        }

        finally{

            setLoading(false);

        }

    };

    const handleLogout=()=>{

        logout();

        navigate("/login");

    };

    if(!user){

        return <div className="loading-screen">Loading...</div>;

    }

   const pending =
    inspections.filter(
        i => !i.isTransactionCompleted
    ).length;

const completed =
    inspections.filter(
        i => i.isTransactionCompleted
    ).length;

    return(

<div className="inspector-page">

    <aside className={`sidebar ${sidebarOpen ? "open":"collapsed"}`}>

        <div className="sidebar-header">

            <div className="logo">

                <FaLeaf/>

                {sidebarOpen && <span>AgroConnect</span>}

            </div>

            <button

                className="menu-btn"

                onClick={()=>setSidebarOpen(!sidebarOpen)}

            >

                {sidebarOpen ? <FaTimes/> : <FaBars/>}

            </button>

        </div>

        <nav>

            <button className="active">

                <FaClipboardCheck/>

                {sidebarOpen && <span>My Inspections</span>}

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

    <main className="main-content">

        <div className="topbar">

            <h2 className="page-title">

                Inspector Dashboard

            </h2>

            <div className="top-right">

                <FaBell className="bell"/>

                <div className="profile">

                    <FaUserCircle/>

                    <span>{user.name}</span>

                </div>

            </div>

        </div>

                        {

                    !user.isVerified &&

                    <div className="warning-card">

                        <h3>

                            ⚠ Account Verification Pending

                        </h3>

                        <p>

                            Your account is waiting for administrator approval.
                            You cannot access the inspection management features until your account is verified.

                        </p>

                    </div>

                }

        <div className="hero-card">

            <h1>

                Welcome Back, {user.name} 👋

            </h1>

            <p>

                Manage all assigned crop inspections from one place.

            </p>

        </div>

        <div className="stats">

            <div className="stat-card">

                <FaTasks/>

                <h2>{inspections.length}</h2>

                <span>Total Assigned</span>

            </div>

            <div className="stat-card">

                <FaHourglassHalf/>

                <h2>{pending}</h2>

                <span>Pending</span>

            </div>

            <div className="stat-card">

                <FaCheckCircle/>

                <h2>{completed}</h2>

                <span>Completed</span>

            </div>

            <div className="stat-card">

    <FaClipboardCheck/>

    <h2>

        {

            inspections.filter(

                i => i.transactionStatus === "accept"

            ).length

        }

    </h2>

    <span>

        Accepted

    </span>

</div>
<div className="stat-card">

    <FaTimesCircle/>

    <h2>

        {

            inspections.filter(

                i => i.transactionStatus === "reject"

            ).length

        }

    </h2>

    <span>

        Rejected

    </span>

</div>

        </div>

        {user.isVerified &&  <div className="content-card">

            {loading && <p>Loading...</p>}

            {error &&

                <div className="error-box">

                    {error}

                </div>

            }

            <MyInspections

                inspections={inspections}

            />

        </div>}

    </main>

</div>

    );

}