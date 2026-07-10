import React, { useEffect, useState } from "react";

import {
    FaLeaf,
    FaBoxes,
    FaMoneyBillWave,
    FaStar,
    FaPlusCircle
} from "react-icons/fa";

import {
    getAllCrops,
    createMillRequirement
} from "../../services/api";

import "./CreateRequirement.css";

export default function CreateRequirement({

    loadRequirements

}){

    const [crops,setCrops]=useState([]);

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");

    const [formData,setFormData]=useState({

        cropId:"",

        quality:"",

        requiredTotalQuantity:"",

        expectedRate:""

    });

    useEffect(()=>{

        loadCrops();

    },[]);

    const loadCrops=async()=>{

        try{

            const response=await getAllCrops();

            setCrops(response.data);

        }

        catch{

            setError("Failed to load crops");

        }

    };

    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            setLoading(true);

            setError("");

            await createMillRequirement(formData);

            setFormData({

                cropId:"",

                quality:"",

                requiredTotalQuantity:"",

                expectedRate:""

            });

            loadRequirements();

        }

        catch(err){

            setError(

                err.response?.data?.error ||

                "Failed to create requirement"

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

<div className="create-container">

    <div className="create-header">

        <div>

            <h2>

                Create Requirement

            </h2>

            <p>

                Publish a new crop requirement.

            </p>

        </div>

    </div>

    {

        error &&

        <div className="error-box">

            {error}

        </div>

    }

    <div className="create-card">

        <form

            className="create-form"

            onSubmit={handleSubmit}

        >

            {/* Crop */}

            <div className="input-group">

                <FaLeaf/>

                <select

                    name="cropId"

                    value={formData.cropId}

                    onChange={handleChange}

                    required

                >

                    <option value="">

                        Select Crop

                    </option>

                    {

                        crops.map((crop)=>(

                            <option

                                key={crop._id}

                                value={crop._id}

                            >

                                {crop.name}

                            </option>

                        ))

                    }

                </select>

            </div>

            {/* Quality */}

            <div className="input-group">

                <FaStar/>

                <input

                    type="number"

                    name="quality"

                    placeholder="Quality"

                    value={formData.quality}

                    onChange={handleChange}

                    required

                />

            </div>

            {/* Quantity */}

            <div className="input-group">

                <FaBoxes/>

                <input

                    type="number"

                    name="requiredTotalQuantity"

                    placeholder="Quantity (Kg)"

                    value={formData.requiredTotalQuantity}

                    onChange={handleChange}

                    required

                />

            </div>

            {/* Rate */}

            <div className="input-group">

                <FaMoneyBillWave/>

                <input

                    type="number"

                    name="expectedRate"

                    placeholder="Expected Rate"

                    value={formData.expectedRate}

                    onChange={handleChange}

                    required

                />

            </div>

            <button

                type="submit"

                className="create-requirement-btn"

                disabled={loading}

            >

                <FaPlusCircle/>

                {

                    loading

                    ?

                    "Creating..."

                    :

                    "Create Requirement"

                }

            </button>

        </form>

    </div>

</div>

    );

}