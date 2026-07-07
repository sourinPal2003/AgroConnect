import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createSellOffer } from "../services/api";
import "./CreateSellOffer.css";

export default function CreateSellOffer() {

    const navigate = useNavigate();
    const { state } = useLocation();

    const requirement = state?.requirement;

    const [approxQuantitySell, setApproxQuantitySell] = useState("");
    const [expectedRate, setExpectedRate] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!requirement) {
        return (
            <div className="offer-page">
                <h2>Requirement not found.</h2>
            </div>
        );
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!approxQuantitySell || !expectedRate) {

            setError("Please fill all fields.");

            return;
        }

        try {

            setLoading(true);
            setError("");

            const response=await createSellOffer({

                requirementId: requirement._id,
                approxQuantitySell,
                expectedRate

            });

            alert(

`✅ Sell Offer Created Successfully!

Farmer OTP: ${response.data.otp}

Please share this OTP with the Inspector during inspection.`

);

            navigate("/farmer");

        }

        catch (err) {

            setError(
                err.response?.data?.error ||
                "Failed to create sell offer."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="offer-page">

            <div className="offer-card">

                <h1>Create Sell Offer</h1>

                <p>

                    Create an offer for

                    <strong> {requirement.cropId?.name}</strong>

                </p>

                {error &&

                    <div className="offer-error">

                        {error}

                    </div>

                }

                <form className="offer-form" onSubmit={handleSubmit}>

    <div className="offer-grid">

        <div className="form-group">

            <label>Crop</label>

            <input
                value={requirement.cropId?.name}
                disabled
            />

        </div>

        <div className="form-group">

            <label>Required Quantity</label>

            <input
                value={`${requirement.requiredTotalQuantity} kg`}
                disabled
            />

        </div>

        <div className="form-group">

            <label>Your Quantity (kg)</label>

            <input
                type="number"
                placeholder="Enter quantity"
                value={approxQuantitySell}
                onChange={(e)=>setApproxQuantitySell(e.target.value)}
            />

        </div>

        <div className="form-group">

            <label>Expected Rate (₹)</label>

            <input
                type="number"
                placeholder="Rate per Kg"
                value={expectedRate}
                onChange={(e)=>setExpectedRate(e.target.value)}
            />

        </div>

    </div>

    <div className="offer-buttons">

        <button
            type="button"
            className="cancel-btn"
            onClick={()=>navigate("/farmer")}
        >

            Cancel

        </button>

        <button
            type="submit"
            className="submit-btn"
            disabled={loading}
        >

            {loading ? "Creating..." : "Create Offer"}

        </button>

    </div>

</form>

            </div>

        </div>

    );

}