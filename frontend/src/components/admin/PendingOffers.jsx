import React, { useMemo, useState } from "react";

import {
    FaSearch,
    FaUser,
    FaSeedling,
    FaWeightHanging,
    FaLeaf
} from "react-icons/fa";

import "./PendingOffers.css";

export default function PendingOffers({

    offers = []

}){

    const [search,setSearch]=useState("");

    const filteredOffers=useMemo(()=>{

        const keyword=search.toLowerCase();

        return offers.filter((offer)=>

            (offer.farmerId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (offer.requirementId?.cropId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (offer.status || "")
                .toLowerCase()
                .includes(keyword)

        );

    },[offers,search]);

    return(

        <div className="offers-container">

            <div className="offers-header">

                <div>

                    <h2>

                        Pending Offers

                    </h2>

                    <p className="offer-count">

                        {filteredOffers.length} of {offers.length} Pending Offers

                    </p>

                </div>

                <div className="search-box-offer">

                    <FaSearch/>

                    <input

                        type="text"

                        placeholder="Search by Farmer or Crop"

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }

                    />

                </div>

            </div>

            <div className="offers-table-card">

                <table className="offers-table">

                    <thead>

                        <tr>

                            <th>Farmer</th>

                            <th>Crop</th>

                            <th>Season</th>

                            <th>Quantity</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredOffers.length===0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="empty"
                                    >

                                        No Pending Offers Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                filteredOffers.map((offer)=>(

                                    <tr
                                        key={offer._id}
                                    >

                                        <td>

                                            <div className="farmer-info">

                                                <div className="avatar">

                                                    {

                                                        offer.farmerId?.name

                                                        ?

                                                        offer.farmerId.name
                                                            .charAt(0)
                                                            .toUpperCase()

                                                        :

                                                        "?"

                                                    }

                                                </div>

                                                <div>

                                                    <strong>

                                                        {

                                                            offer.farmerId?.name ||

                                                            "Unknown"

                                                        }

                                                    </strong>

                                                    <br/>

                                                    <small>

                                                        {

                                                            offer.farmerId?.email ||

                                                            ""

                                                        }

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <div className="crop-info">

                                                <FaSeedling/>

                                                {

                                                    offer.requirementId?.cropId?.name ||

                                                    "-"

                                                }

                                            </div>

                                        </td>

                                        <td>

                                            <span className="season-badge">

                                                <FaLeaf/>

                                                {

                                                    offer.requirementId?.cropId?.season ||

                                                    "-"

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <span className="quantity">

                                                <FaWeightHanging/>

                                                {

                                                    offer.approxQuantitySell

                                                } kg

                                            </span>

                                        </td>

                                        <td>

                                            <span className={`status ${offer.status}`}>

                                                {

                                                    offer.status

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