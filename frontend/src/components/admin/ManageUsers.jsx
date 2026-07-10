import React, { useMemo, useState } from "react";
import {
    FaUser,
    FaSearch,
    FaCheckCircle,
    FaTimesCircle,
    FaUserShield,
    FaTractor,
    FaIndustry,
    FaClipboardCheck
} from "react-icons/fa";

import "./ManageUsers.css";

export default function ManageUsers({
    users = [],
    handleVerify
}) {

    const [search, setSearch] = useState("");
    const [loadingId, setLoadingId] = useState(null);

    const filteredUsers = useMemo(() => {

        const keyword = search.toLowerCase();

        return users.filter((user) =>

            (user.name || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (user.email || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (user.role || "")
                .toLowerCase()
                .includes(keyword)

        );

    }, [users, search]);

    const roleIcon = (role) => {

        switch (role) {

            case "admin":
                return <FaUserShield />;

            case "farmer":
                return <FaTractor />;

            case "mill_owner":
                return <FaIndustry />;

            case "inspector":
                return <FaClipboardCheck />;

            default:
                return <FaUser />;
        }

    };

    const getInitials = (name = "") => {

        const words = name.trim().split(" ");

        if (words.length === 1)
            return words[0][0]?.toUpperCase();

        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();

    };

    const onVerify = async (user) => {

        try {

            setLoadingId(user._id);

            await handleVerify(
                user._id,
                !user.isVerified
            );

        } finally {

            setLoadingId(null);

        }

    };

    return (

        <div className="users-container">

            <div className="users-header">

                <div>

                    <h2>

                        Manage Users

                    </h2>

                    <p className="users-count">

                        {filteredUsers.length} of {users.length} Users

                    </p>

                </div>

                <div className="search-box-user">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search by name, email or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <table className="users-table">

                <thead>

                    <tr>

                        <th>User</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredUsers.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="empty"
                                    >

                                        No users found.

                                    </td>

                                </tr>

                            )

                            :

                            (

                                filteredUsers.map((user) => (

                                    <tr
                                        key={user._id}
                                    >

                                        <td>

                                            <div className="user-info">

                                                <div className="avatar">

                                                    {getInitials(user.name)}

                                                </div>

                                                <div>

                                                    <strong>

                                                        {user.name}

                                                    </strong>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            {user.email}

                                        </td>

                                        <td>

                                            <span className={`role ${user.role}`}>

                                                {roleIcon(user.role)}

                                                {

                                                    user.role
                                                        .replace("_", " ")

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                user.isVerified ?

                                                    (

                                                        <span className="verified">

                                                            <FaCheckCircle />

                                                            Verified

                                                        </span>

                                                    )

                                                    :

                                                    (

                                                        <span className="pending">

                                                            <FaTimesCircle />

                                                            Pending

                                                        </span>

                                                    )

                                            }

                                        </td>

                                        <td>

                                            {

                                                user.role !== "admin"

                                                &&

                                                user.role !== "farmer"

                                                &&

                                                <button

                                                    className="verify-btn"

                                                    disabled={
                                                        loadingId === user._id
                                                    }

                                                    onClick={() => onVerify(user)}

                                                >

                                                    {

                                                        loadingId === user._id

                                                            ?

                                                            "Please wait..."

                                                            :

                                                            user.isVerified

                                                                ?

                                                                "Unverify"

                                                                :

                                                                "Verify"

                                                    }

                                                </button>

                                            }

                                        </td>

                                    </tr>

                                ))

                            )

                    }

                </tbody>

            </table>

        </div>

    );

}