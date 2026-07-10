import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaSearch,
    FaUser,
    FaSeedling,
    FaIndustry,
    FaWeightHanging,
    FaClipboardCheck,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";

import "./MyInspections.css";

export default function MyInspections({

    inspections = []

}) {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const filteredInspections = useMemo(() => {

        const keyword = search.toLowerCase();

        return inspections.filter((inspection) =>

            (inspection.offerId?.farmerId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (inspection.offerId?.requirementId?.cropId?.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (inspection.offerId?.requirementId?.millOwnerId?.millName || "")
                .toLowerCase()
                .includes(keyword)

        );

    }, [inspections, search]);

    return (

        <div className="my-inspections-container">

            <div className="my-inspections-header">

                <div>

                    <h2>

                        My Assigned Inspections

                    </h2>

                    <p>

                        {filteredInspections.length} of {inspections.length} inspections

                    </p>

                </div>

                <div className="inspection-search">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search inspections..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

            </div>

            <div className="inspection-table-card">

                <table className="inspection-table">

                    <thead>

                        <tr>

                            <th>Farmer</th>

                            <th>Crop</th>

                            <th>Mill</th>

                            <th>Quantity</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredInspections.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="empty"
                                        >

                                            No Assigned Inspections

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredInspections.map((inspection) => (

                                        <tr key={inspection._id}>

                                            <td>

                                                <div className="table-user">

                                                    <FaUser />

                                                    {

                                                        inspection.offerId?.farmerId?.name ||

                                                        "-"

                                                    }

                                                </div>

                                            </td>

                                            <td>

                                                <div className="table-crop">

                                                    <FaSeedling />

                                                    {

                                                        inspection.offerId?.requirementId?.cropId?.name ||

                                                        "-"

                                                    }

                                                </div>

                                            </td>

                                            <td>

                                                <div className="table-mill">

                                                    <FaIndustry />

                                                    {

                                                        inspection.offerId?.requirementId?.millOwnerId?.millName ||

                                                        "-"

                                                    }

                                                </div>

                                            </td>

                                            <td>

                                                <div className="table-qty">

                                                    <FaWeightHanging />

                                                    {

                                                        inspection.offerId?.approxQuantitySell ||

                                                        0

                                                    } Kg

                                                </div>

                                            </td>
                                            <td>

                                                {

                                                    inspection.transactionStatus === "accept"

                                                        ?

                                                        (

                                                            <span className="accepted-status">

                                                                Accepted

                                                            </span>

                                                        )

                                                        :

                                                        inspection.transactionStatus === "reject"

                                                            ?

                                                            (

                                                                <div>

                                                                    <span className="rejected-status">

                                                                        Rejected

                                                                    </span>

                                                                    <p className="reject-reason">

                                                                        {

                                                                            inspection.rejectReason

                                                                        }

                                                                    </p>

                                                                </div>

                                                            )

                                                            :

                                                            (

                                                                <span className="pending-status">

                                                                    Pending

                                                                </span>

                                                            )

                                                }

                                            </td>
                                            <td>

                                                {

                                                    !inspection.isTransactionCompleted ?

                                                        (

                                                            <button

                                                                className="inspect-btn"

                                                                onClick={() =>

                                                                    navigate(

                                                                        `/inspection/${inspection._id}`

                                                                    )

                                                                }

                                                            >

                                                                <FaClipboardCheck />

                                                                Inspect

                                                            </button>

                                                        )

                                                        :

                                                        (

                                                            <button

                                                                className="view-btn"

                                                                onClick={() =>

                                                                    navigate(

                                                                        `/inspection/${inspection._id}`

                                                                    )

                                                                }

                                                            >

                                                                View

                                                            </button>

                                                        )

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