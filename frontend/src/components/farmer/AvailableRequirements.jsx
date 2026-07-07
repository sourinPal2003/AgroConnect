import React, { useMemo, useState } from "react";

import {
    FaSearch,
    FaSeedling,
    FaIndustry,
    FaMapMarkerAlt,
    FaBoxes,
    FaLeaf,
    FaPlusCircle
} from "react-icons/fa";

import "./AvailableRequirements.css";

export default function AvailableRequirements({

    requirements = [],

    handleCreateOffer

}){

    const [search,setSearch]=useState("");

    const filteredRequirements=useMemo(()=>{

        const keyword=search.toLowerCase();

        return requirements.filter((requirement)=>

            (requirement.cropId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (requirement.cropId?.season || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (requirement.cropId?.type || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (requirement.millOwnerId?.millName || "")
                .toLowerCase()
                .includes(keyword)

        );

    },[requirements,search]);

    return(

        <div className="requirements-container">

            {/* Header */}

            <div className="requirements-header">

                <div>

                    <h2>

                        Available Requirements

                    </h2>

                    <p className="requirements-count">

                        {filteredRequirements.length} of {requirements.length} Requirements

                    </p>

                </div>

                <div className="search-box-requirement">

                    <FaSearch/>

                    <input

                        type="text"

                        placeholder="Search requirements..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

            </div>

            {/* Table */}

            <div className="requirements-table-card">

                <table className="requirements-table">

                    <thead>

                        <tr>

                            <th>Crop</th>

                            <th>Season</th>

                            <th>Category</th>

                            <th>Mill</th>

                            <th>Location</th>

                            <th>Required Quantity</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredRequirements.length===0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="empty"
                                    >

                                        No Active Requirements

                                    </td>

                                </tr>

                            )

                            :

                            (

                                filteredRequirements.map((requirement)=>(

                                    <tr
                                        key={requirement._id}
                                    >

                                        <td>

                                            <div className="crop-name">

                                                <div className="crop-avatar">

                                                    <FaSeedling/>

                                                </div>

                                                <strong>

                                                    {requirement.cropId?.name}

                                                </strong>

                                            </div>

                                        </td>

                                        <td>

                                            <span className="season">

                                                <FaLeaf/>

                                                {requirement.cropId?.season}

                                            </span>

                                        </td>

                                        <td>

                                            <span className="crop-type">

                                                {requirement.cropId?.type}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="mill-info">

                                                <FaIndustry/>

                                                {requirement.millOwnerId?.millName}

                                            </div>

                                        </td>

                                        <td>

                                            <div className="location">

                                                <FaMapMarkerAlt/>

                                                {requirement.millOwnerId?.millLocation}

                                            </div>

                                        </td>

                                        <td>

                                            <div className="quantity">

                                                <FaBoxes/>

                                                {requirement.requiredTotalQuantity} kg

                                            </div>

                                        </td>

                                        <td>

                                            <button

                                                className="offer-btn"

                                                onClick={()=>

                                                    handleCreateOffer(requirement)

                                                }

                                            >

                                                <FaPlusCircle/>

                                                Sell Offer

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}