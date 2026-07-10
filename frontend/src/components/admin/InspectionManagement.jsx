import React, {

    useEffect,

    useMemo,

    useState

} from "react";

import {

    FaSearch,

    FaClipboardCheck,

    FaUser,

    FaSeedling,

    FaIndustry,

    FaCheckCircle,

    FaClock,

    FaTasks,

    FaFilter

} from "react-icons/fa";

import {

    getAllInspections

} from "../../services/api";

import "./InspectionManagement.css";

export default function InspectionManagement(){

    /* =====================================
       STATES
    ===================================== */

    const [inspections,setInspections]=useState([]);

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");

    const [search,setSearch]=useState("");

    const [filter,setFilter]=useState("all");

    /* =====================================
       LOAD DATA
    ===================================== */

    useEffect(()=>{

        loadInspections();

    },[]);

    const loadInspections=async()=>{

        try{

            setLoading(true);

            const response=await getAllInspections();

            setInspections(response.data);

        }

        catch{

            setError("Failed to load inspections");

        }

        finally{

            setLoading(false);

        }

    };


    /* =====================================
       FILTER + SEARCH
    ===================================== */

    const filteredInspections=useMemo(()=>{

        const keyword=search.toLowerCase();

        return inspections.filter((inspection)=>{

            const farmer=

                inspection.offerId?.farmerId?.name ||

                "";

            const crop=

                inspection.offerId?.requirementId?.cropId?.name||

                "";

            const mill=

                inspection.offerId?.requirementId?.millOwnerId?.millName ||

                "";

            const inspector=

                inspection.inspectorId?.name ||

                "";

            const matchesSearch=

                farmer.toLowerCase().includes(keyword)

                ||

                crop.toLowerCase().includes(keyword)

                ||

                mill.toLowerCase().includes(keyword)

                ||

                inspector.toLowerCase().includes(keyword);

            const matchesFilter=

                filter==="all"

                ||

                inspection.status===filter;

            return matchesSearch && matchesFilter;

        });

    },[inspections,search,filter]);

    /* =====================================
       STATISTICS
    ===================================== */

    const total=

        inspections.length;

    const pending=

        inspections.filter(

            item=>item.status==="pending"

        ).length;

    const assigned=

        inspections.filter(

            item=>item.status==="assigned"

        ).length;

    const completed=

        inspections.filter(

            item=>item.status==="completed"

        ).length;

    /* =====================================
       ASSIGN INSPECTOR
       (Implemented in Part 2)
    ===================================== */

    return (

<div className="inspection-management">

    {/* Header */}

    <div className="inspection-header">

        <div>

            <h2>Assigned Inspections</h2>

<p className="inspection-count">

    {filteredInspections.length} of {inspections.length} Assigned Inspections

</p>

        </div>

        <div className="search-box-inspection">

            <FaSearch/>

            <input

                type="text"

                placeholder="Search farmer, crop, mill..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

        </div>

    </div>

    {/* Statistics */}

    <div className="inspection-stats">

        <div className="inspection-stat-card">

            <FaTasks/>

            <div>

                <h3>{total}</h3>

                <span>Total</span>

            </div>

        </div>

        <div className="inspection-stat-card">

            <FaClock/>

            <div>

                <h3>{pending}</h3>

                <span>Pending</span>

            </div>

        </div>

        <div className="inspection-stat-card">

            <FaClipboardCheck/>

            <div>

                <h3>{assigned}</h3>

                <span>Assigned</span>

            </div>

        </div>

        <div className="inspection-stat-card">

            <FaCheckCircle/>

            <div>

                <h3>{completed}</h3>

                <span>Completed</span>

            </div>

        </div>

    </div>

    {/* Filter */}

    <div className="filter-row">

        <FaFilter/>

        <button

            className={filter==="all" ? "active-filter" : ""}

            onClick={()=>setFilter("all")}

        >

            All

        </button>

        <button

            className={filter==="pending" ? "active-filter" : ""}

            onClick={()=>setFilter("pending")}

        >

            Pending

        </button>

        <button

            className={filter==="assigned" ? "active-filter" : ""}

            onClick={()=>setFilter("assigned")}

        >

            Assigned

        </button>

        <button

            className={filter==="completed" ? "active-filter" : ""}

            onClick={()=>setFilter("completed")}

        >

            Completed

        </button>

    </div>

    {error &&

        <div className="error-box">

            {error}

        </div>

    }

    {/* Table */}

    <div className="inspection-table-card">

        <table className="inspection-table">

            <thead>

                <tr>

                    <th>Farmer</th>

                    <th>Crop</th>

                    <th>Mill</th>

                    <th>Quantity</th>

                    <th>Inspector</th>

                    <th>Status</th>

                    <th>Transaction</th>

                </tr>

            </thead>

            <tbody>

            {

                loading ?

                (

                    <tr>

                        <td

                            colSpan="7"

                            className="empty"

                        >

                            Loading...

                        </td>

                    </tr>

                )

                :

                filteredInspections.length===0 ?

                (

                    <tr>

                        <td

                            colSpan="7"

                            className="empty"

                        >

                            No Inspections Found

                        </td>

                    </tr>

                )

                :

                (

                    filteredInspections.map((inspection)=>(

<tr key={inspection._id}>

<td>

    <div className="farmer-cell">

        <div className="avatar">

            <FaUser/>

        </div>

        {inspection.farmerId?.name || "-"}

    </div>

</td>

<td>

    <div className="crop-cell">

        <FaSeedling/>

        {inspection.requirementId?.cropId?.name || "-"}

    </div>

</td>

<td>

    <div className="crop-cell">

        <FaIndustry/>

        {inspection.requirementId?.millOwnerId?.millName || "-"}

    </div>

</td>

<td>

    {inspection.requirementId?.requiredTotalQuantity || 0} Kg

</td>

<td>

<span className="assigned-name">

    {

        inspection.inspectorId?.name ||

        "-"

    }

</span>

</td>

<td>

<span className={`status ${inspection.status}`}>

{

inspection.status

}

</span>

</td>

<td>

<span
className={`transaction ${inspection.transactionStatus}`}
>

{

inspection.transactionStatus

?

inspection.transactionStatus

:

"Pending"

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