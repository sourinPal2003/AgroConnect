import React, { useMemo, useState } from "react";

import {
    FaSearch,
    FaClipboardCheck,
    FaUser,
    FaIndustry,
    FaSeedling,
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaTimesCircle
} from "react-icons/fa";

import "./Inspection.css";

export default function Inspection({

    inspections = []

}){

    const [search,setSearch]=useState("");

    const filteredInspections=useMemo(()=>{

        const keyword=search.toLowerCase();

        return inspections.filter((inspection)=>

            (inspection.farmerId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (inspection.inspectorId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (inspection.requirementId?.cropId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (inspection.status || "")
                .toLowerCase()
                .includes(keyword)

        );

    },[inspections,search]);

    const statusIcon=(status)=>{

        switch(status){

            case "completed":

                return <FaCheckCircle/>;

            case "pending":

                return <FaClock/>;

            default:

                return <FaTimesCircle/>;

        }

    };

    return(

        <div className="inspection-container">

            {/* Header */}

            <div className="inspection-header">

                <div>

                    <h2>

                        Inspection Status

                    </h2>

                    <p className="inspection-count">

                        {filteredInspections.length} of {inspections.length} Inspections

                    </p>

                </div>

                <div className="search-box-inspection">

                    <FaSearch/>

                    <input

                        type="text"

                        placeholder="Search inspection..."

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }

                    />

                </div>

            </div>

            {/* Table */}

            <div className="inspection-table-card">

                <table className="inspection-table">

                    <thead>

                        <tr>

                            <th>Farmer</th>

                            <th>Crop</th>

                            <th>Inspector</th>

                            <th>Mill</th>

                            <th>Date</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredInspections.length===0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="empty"
                                    >

                                        No Inspections Available

                                    </td>

                                </tr>

                            )

                            :

                            (

                                filteredInspections.map((inspection)=>(

                                    <tr
                                        key={inspection._id}
                                    >

                                        <td>

                                            <div className="farmer-info">

                                                <div className="avatar">

                                                    {

                                                        inspection.farmerId?.name

                                                        ?

                                                        inspection.farmerId.name
                                                            .charAt(0)
                                                            .toUpperCase()

                                                        :

                                                        <FaUser/>

                                                    }

                                                </div>

                                                <div>

                                                    <strong>

                                                        {

                                                            inspection.farmerId?.name ||

                                                            "-"

                                                        }

                                                    </strong>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <div className="crop-info">

                                                <FaSeedling/>

                                                {

                                                    inspection.requirementId?.cropId?.name ||

                                                    "-"

                                                }

                                            </div>

                                        </td>

                                        <td>

                                            {

                                                inspection.inspectorId?.name ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            <div className="crop-info">

                                                <FaIndustry/>

                                                {

                                                    inspection.requirementId?.millOwnerId?.millName ||

                                                    "-"

                                                }

                                            </div>

                                        </td>

                                        <td>

                                            <span className="date">

                                                <FaCalendarAlt/>

                                                {

                                                    inspection.createdAt

                                                    ?

                                                    new Date(

                                                        inspection.createdAt

                                                    ).toLocaleDateString()

                                                    :

                                                    "-"

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <span className={`status ${inspection.status}`}>

                                                {

                                                    statusIcon(

                                                        inspection.status

                                                    )

                                                }

                                                {

                                                    inspection.status

                                                }

                                            </span>

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