import React, { useMemo, useState } from "react";
import {
    FaSeedling,
    FaSearch,
    FaPlus,
    FaTrashAlt,
    FaLeaf,
    FaCalendarAlt,
    FaTag
} from "react-icons/fa";

import "./ManageCrops.css";

export default function ManageCrops({

    crops = [],

    newCrop,

    setNewCrop,

    handleAddCrop,

    handleDeleteCrop

}) {

    const [search, setSearch] = useState("");

    const filteredCrops = useMemo(() => {

        const keyword = search.toLowerCase();

        return crops.filter((crop) =>

            (crop.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (crop.season || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (crop.type || "")
                .toLowerCase()
                .includes(keyword)

        );

    }, [search, crops]);

    return (

        <div className="crops-container">

            {/* Header */}

            <div className="crops-header">

                <div>

                    <h2>

                        Manage Crops

                    </h2>

                    <p className="crop-count">

                        {filteredCrops.length} of {crops.length} Crops

                    </p>

                </div>

                <div className="search-box-crop">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search crops..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

            </div>

            {/* Form */}

            <div className="crop-form-card">

                <form

                    className="crop-form"

                    onSubmit={handleAddCrop}

                >

                    <div className="input-group">

                        <FaLeaf />

                        <input

                            type="text"

                            placeholder="Crop Name"

                            value={newCrop.name}

                            onChange={(e)=>

                                setNewCrop({

                                    ...newCrop,

                                    name:e.target.value

                                })

                            }

                            required

                        />

                    </div>

                    <div className="input-group">

                        <FaCalendarAlt />

                        <input

                            type="text"

                            placeholder="Season"

                            value={newCrop.season}

                            onChange={(e)=>

                                setNewCrop({

                                    ...newCrop,

                                    season:e.target.value

                                })

                            }

                            required

                        />

                    </div>

                    <div className="input-group">

                        <FaTag />

                        <input

                            type="text"

                            placeholder="Type"

                            value={newCrop.type}

                            onChange={(e)=>

                                setNewCrop({

                                    ...newCrop,

                                    type:e.target.value

                                })

                            }

                            required

                        />

                    </div>

                    <button
                        type="submit"
                        className="add-btn"
                    >

                        <FaPlus />

                        Add Crop

                    </button>

                </form>

            </div>

            {/* Table */}

            <div className="crop-table-card">

                <table className="crop-table">

                    <thead>

                        <tr>

                            <th>Crop</th>

                            <th>Season</th>

                            <th>Category</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredCrops.length===0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="4"

                                        className="empty"

                                    >

                                        No Crops Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                filteredCrops.map((crop)=>(

                                    <tr
                                        key={crop._id}
                                    >

                                        <td>

                                            <div className="crop-name">

                                                <div className="crop-avatar">

                                                    <FaSeedling />

                                                </div>

                                                <strong>

                                                    {crop.name}

                                                </strong>

                                            </div>

                                        </td>

                                        <td>

                                            {crop.season}

                                        </td>

                                        <td>

                                            <span className="crop-type">

                                                {crop.type}

                                            </span>

                                        </td>

                                        <td>

                                            <button

                                                className="delete-btn"

                                                onClick={()=>

                                                    handleDeleteCrop(crop._id)

                                                }

                                            >

                                                <FaTrashAlt />

                                                Delete

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