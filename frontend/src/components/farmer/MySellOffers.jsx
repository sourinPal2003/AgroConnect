import React, { useMemo, useState } from "react";

import {
    FaSearch,
    FaSeedling,
    FaIndustry,
    FaWeightHanging,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaMapMarkerAlt,
    FaLeaf
} from "react-icons/fa";

import "./MySellOffers.css";

export default function MySellOffers({

    offers = []

}){

    const [search,setSearch]=useState("");

    const filteredOffers=useMemo(()=>{

        const keyword=search.toLowerCase();

        return offers.filter((offer)=>

            (offer.requirementId?.cropId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (offer.requirementId?.millOwnerId?.millName || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (offer.status || "")
                .toLowerCase()
                .includes(keyword)

        );

    },[offers,search]);

    const statusIcon=(status)=>{

        switch(status){

            case "approved":

                return <FaCheckCircle/>;

            case "pending":

                return <FaClock/>;

            case "rejected":

                return <FaTimesCircle/>;

            default:

                return <FaClock/>;

        }

    };

    return(

        <div className="offers-container">

            {/* Header */}

            <div className="offers-header">

                <div>

                    <h2>

                        My Sell Offers

                    </h2>

                    <p className="offer-count">

                        {filteredOffers.length} of {offers.length} Offers

                    </p>

                </div>

                <div className="search-box-offer">

                    <FaSearch/>

                    <input

                        type="text"

                        placeholder="Search offers..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

            </div>

            {/* Table */}

            <div className="offers-table-card">

                <table className="offers-table">

                    <thead>

                        <tr>

                            <th>Crop</th>

                            <th>Season</th>

                            <th>Mill</th>

                            <th>Location</th>

                            <th>Quantity</th>

                            <th>Status</th>
                            <th>OTP</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredOffers.length===0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="7"

                                        className="empty"

                                    >

                                        No Sell Offers Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                filteredOffers.map((offer)=>(

                                    <tr

                                        key={offer._id}

                                    >

                                        {/* Crop */}

                                        <td>

                                            <div className="crop-name">

                                                <div className="crop-avatar">

                                                    <FaSeedling/>

                                                </div>

                                                <strong>

                                                    {

                                                        offer.requirementId?.cropId?.name ||

                                                        "-"

                                                    }

                                                </strong>

                                            </div>

                                        </td>

                                        {/* Season */}

                                        <td>

                                            <span className="season">

                                                <FaLeaf/>

                                                {

                                                    offer.requirementId?.cropId?.season ||

                                                    "-"

                                                }

                                            </span>

                                        </td>

                                        {/* Mill */}

                                        <td>

                                            <div className="mill-info">

                                                <FaIndustry/>

                                                {

                                                    offer.requirementId?.millOwnerId?.millName ||

                                                    "-"

                                                }

                                            </div>

                                        </td>

                                        {/* Location */}

                                        <td>

                                            <div className="location">

                                                <FaMapMarkerAlt/>

                                                {

                                                    offer.requirementId?.millOwnerId?.millLocation ||

                                                    "-"

                                                }

                                            </div>

                                        </td>

                                        {/* Quantity */}

                                        <td>

                                            <div className="quantity">

                                                <FaWeightHanging/>

                                                {

                                                    offer.approxQuantitySell

                                                } kg

                                            </div>

                                        </td>

                                        {/* Status */}
<td>

<span className={`status ${offer.status}`}>

    {statusIcon(offer.status)}

    {

        offer.status==="pending"

        ? "Pending"

        : offer.status==="assignedToInspector"

        ? "Assigned"

        : offer.status==="accept"

        ? "Accepted"

        : offer.status==="reject"

        ? "Rejected"

        : offer.status

    }

</span>

</td>

{/* OTP */}

<td>

{
    offer.status === "accept" ||
    offer.status === "reject"

    ?

    <span className="otp-hidden">

        Used

    </span>

    :

    <div className="otp-box">

        <span className="otp-value">

            {offer.otp}

        </span>

    </div>
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