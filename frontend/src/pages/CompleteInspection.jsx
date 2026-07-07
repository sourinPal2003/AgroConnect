import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getInspectionDetails,
    completeInspection
} from "../services/api";

import {
    FaArrowLeft,
    FaUser,
    FaSeedling,
    FaIndustry,
    FaWeightHanging,
    FaMoneyBillWave,
    FaKey,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

import "./CompleteInspection.css";

export default function CompleteInspection(){

    const { inspectionId } = useParams();

    const navigate = useNavigate();

    const [inspection,setInspection]=useState(null);

    const [loading,setLoading]=useState(true);

    const [saving,setSaving]=useState(false);

    const [error,setError]=useState("");

    const [form,setForm]=useState({

        quantityReal:"",

        finalRate:"",

        otpFromFarmer:"",

        transactionStatus:"accept",
         rejectReason:""


    });

    useEffect(()=>{

        loadInspection();

    },[]);

    const loadInspection=async()=>{

        try{

            const response=await getInspectionDetails(

                inspectionId

            );

            setInspection(response.data);

        }

        catch{

            setError(

                "Failed to load inspection."

            );

        }

        finally{

            setLoading(false);

        }

    };

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=async()=>{

        if(

    form.transactionStatus==="reject"

    &&

    !form.rejectReason.trim()

){

    setError("Please enter the reason for rejection.");

    return;

}

        try{

            setSaving(true);

            setError("");

            await completeInspection(

                inspectionId,

                form

            );

            alert(

                "Inspection completed successfully."

            );

            navigate("/inspector");

        }

        catch(err){

            setError(

                err.response?.data?.error ||

                "Failed to complete inspection."

            );

        }

        finally{

            setSaving(false);

        }

    };

    if(loading){

        return <div className="loading-screen">

            Loading...

        </div>;

    }

    return(

<div className="complete-page">

<div className="inspection-card">

<div className="inspection-title">

<button

className="back-btn"

onClick={()=>navigate("/inspector")}

>

<FaArrowLeft/>

Back

</button>

<h2>

Complete Inspection

</h2>

</div>

{error &&

<div className="error-box">

{error}

</div>

}

<div className="details-grid">

<div>

<label>

Farmer

</label>

<div className="detail-box">

<FaUser/>

{

inspection?.offerId?.farmerId?.name

}

</div>

</div>

<div>

<label>

Crop

</label>

<div className="detail-box">

<FaSeedling/>

{

inspection?.offerId?.requirementId?.cropId?.name

}

</div>

</div>

<div>

<label>

Mill

</label>

<div className="detail-box">

<FaIndustry/>

{

inspection?.offerId?.requirementId?.millOwnerId?.millName

}

</div>

</div>

<div>

<label>

Farmer Quantity

</label>

<div className="detail-box">

<FaWeightHanging/>

{

inspection?.offerId?.approxQuantitySell

} Kg

</div>

</div>

</div>

<div className="form-grid">

<div>

<label>

Actual Quantity Received

</label>

<input

type="number"

name="quantityReal"

value={form.quantityReal}

onChange={handleChange}

/>

</div>

<div>

<label>

Final Negotiated Rate

</label>

<div className="input-icon">

<FaMoneyBillWave/>

<input

type="number"

name="finalRate"

value={form.finalRate}

onChange={handleChange}

/>

</div>

</div>

<div>

<label>

Farmer OTP

</label>

<div className="input-icon">

<FaKey/>

<input

type="text"

name="otpFromFarmer"

value={form.otpFromFarmer}

onChange={handleChange}

/>

</div>

</div>

<div className="transaction-section">

    <label>

        Transaction

    </label>

    <select

        className="transaction-select"

        name="transactionStatus"

        value={form.transactionStatus}

        onChange={handleChange}

    >

        <option value="accept">

            ✅ Accept Transaction

        </option>

        <option value="reject">

            ❌ Reject Transaction

        </option>

    </select>

</div>

{

form.transactionStatus==="reject" && (

<div className="reject-box">

    <label>

        Reason for Rejection

    </label>

    <textarea

        className="reject-textarea"

        name="rejectReason"

        value={form.rejectReason}

        onChange={handleChange}

        placeholder="Example:
• Crop quality is poor.
• Moisture level exceeds the acceptable limit.
• Quantity does not match the offered quantity."

        rows="5"

    />

</div>

)

}

</div>

<div className="inspection-buttons">

<button

className="cancel-btn"

onClick={()=>navigate("/inspector")}

>

Cancel

</button>

<button

className="complete-btn"

onClick={handleSubmit}

disabled={saving}

>

{

saving

?

"Submitting..."

:

form.transactionStatus==="accept"

?

<>

<FaCheckCircle/>

Complete Inspection

</>

:

<>

<FaTimesCircle/>

Reject Transaction

</>

}

</button>

</div>

</div>

</div>

    );

}