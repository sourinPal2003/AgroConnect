import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
    assignInspection,
    getVerifiedInspectors
} from "../services/api";
import "./AssignInspector.css";

export default function AssignInspectorPage() {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const { offerId } = useParams();

    const [inspectors, setInspectors] = useState([]);
    const [selectedInspector, setSelectedInspector] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadInspectors();
    }, []);

    const loadInspectors = async () => {

    try {

        const response = await getVerifiedInspectors();

        console.log(response.data);

        setInspectors(response.data);

    }

    catch(err){

        console.log(err.response);

        setError(

            err.response?.data?.error ||

            "Failed to load inspectors"

        );

    }

};

    const handleAssign = async () => {

    if (!selectedInspector) {

        setError("Please select an inspector");

        return;

    }

    try {

        setLoading(true);

        setError("");

       await assignInspection({

    offerId,

    inspectorId:selectedInspector

});

        alert("Inspector assigned successfully!");

        navigate("/admin");

    }

    catch(err){

        setError(

            err.response?.data?.error ||

            "Failed to assign inspector"

        );

    }

    finally{

        setLoading(false);

    }

};
    return (
    <div className="assign-modal-overlay">

        <div className="assign-modal">

            <div className="assign-header">

                <h2>Assign Inspector</h2>

                <p>
                    Assign a verified inspector to inspect this transaction.
                </p>

            </div>

            {
                error && (

                    <div className="assign-error">

                        ⚠ {error}

                    </div>

                )
            }

            <div className="assign-body">

                <label>

                    Verified Inspector

                </label>

                <div className="assign-select-box">

                    <select

                        value={selectedInspector}

                        onChange={(e) =>
                            setSelectedInspector(e.target.value)
                        }

                    >

                        <option value="">
                            Select Verified Inspector
                        </option>

                        {
                            inspectors.map((inspector) => (

                                <option

                                    key={inspector._id}

                                    value={inspector._id}

                                >

                                    {inspector.name}

                                </option>

                            ))
                        }

                    </select>

                </div>

                <p className="assign-note">

                    Only verified inspectors are available for assignment.

                </p>

            </div>

            <div className="assign-footer">

               <button

    className="cancel-btn"

    onClick={() => navigate("/admin")}

    disabled={loading}

>

    Cancel

</button>

                <button

                    className="assign-btn"

                    onClick={handleAssign}

                    disabled={loading || !selectedInspector}

                >

                    {

                        loading

                        ?

                        "Assigning..."

                        :

                        "Assign Inspector"

                    }

                </button>

            </div>

        </div>

    </div>
);
}