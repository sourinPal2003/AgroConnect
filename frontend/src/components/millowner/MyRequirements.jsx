import React, { useMemo, useState } from "react";

import {
    FaSearch,
    FaSeedling,
    FaBoxes,
    FaMoneyBillWave,
    FaStar,
    FaCheckCircle,
    FaTimesCircle,
    FaLock
} from "react-icons/fa";

import "./MyRequirements.css";

export default function MyRequirements({

    requirements = [],

    handleCloseRequirement

}){

    const [search,setSearch]=useState("");

    const filteredRequirements=useMemo(()=>{

        const keyword=search.toLowerCase();

        return requirements.filter((req)=>

            (req.cropId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (req.cropId?.season || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (req.cropId?.type || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (req.status || "")
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

                My Requirements

            </h2>

            <p className="requirements-count">

                {

                    filteredRequirements.length

                }

                {" "}of{" "}

                {

                    requirements.length

                }

                {" "}Requirements

            </p>

        </div>

        <div className="search-box-requirement">

            <FaSearch/>

            <input

                type="text"

                placeholder="Search..."

                value={search}

                onChange={(e)=>

                    setSearch(

                        e.target.value

                    )

                }

            />

        </div>

    </div>

    {/* Table */}

    <div className="requirements-table-card">

        <table className="requirements-table">

            <thead>

                <tr>

                    <th>Crop</th>

                    <th>Quality</th>

                    <th>Quantity</th>

                    <th>Expected Rate</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    filteredRequirements.length===0 ?

                    (

                        <tr>

                            <td

                                colSpan="6"

                                className="empty"

                            >

                                No Requirements Found

                            </td>

                        </tr>

                    )

                    :

                    (

                        filteredRequirements.map((req)=>(

                            <tr

                                key={req._id}

                            >

                                {/* Crop */}

                                <td>

                                    <div className="crop-name">

                                        <div className="crop-avatar">

                                            <FaSeedling/>

                                        </div>

                                        <strong>

                                            {

                                                req.cropId?.name

                                            }

                                        </strong>

                                    </div>

                                </td>

                                {/* Quality */}

                                <td>

                                    <div className="quality">

                                        <FaStar/>

                                        {

                                            req.quality

                                        }

                                    </div>

                                </td>

                                {/* Quantity */}

                                <td>

                                    <div className="quantity">

                                        <FaBoxes/>

                                        {

                                            req.requiredTotalQuantity

                                        } kg

                                    </div>

                                </td>

                                {/* Rate */}

                                <td>

                                    <div className="rate">

                                        <FaMoneyBillWave/>

                                        ₹{

                                            req.expectedRate

                                        }

                                    </div>

                                </td>

                                {/* Status */}

                                <td>

                                    <span

                                        className={`status ${req.status}`}

                                    >

                                        {

                                            req.status==="active"

                                            ?

                                            <FaCheckCircle/>

                                            :

                                            <FaTimesCircle/>

                                        }

                                        {

                                            req.status

                                        }

                                    </span>

                                </td>

                                {/* Action */}

                                <td>

                                    {

                                        req.status==="active"

                                        ?

                                        <button

                                            className="close-btn"

                                            onClick={()=>

                                                handleCloseRequirement(

                                                    req._id

                                                )

                                            }

                                        >

                                            <FaLock/>

                                            Close

                                        </button>

                                        :

                                        <span className="closed-text">

                                            Closed

                                        </span>

                                    }

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