import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { ref, get, child } from "firebase/database";
import "./ViewProfile.css";

const ViewProfile = ({ userId }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userRef = ref(db, `users/${userId}`);
                const snapshot = await get(child(userRef, userId));
                if (snapshot.exists()) {
                    setUserDetails(snapshot.val());
                } else {
                    console.log("No data available for user with ID:", userId);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    return (
        <div>
            <h2>User Profile</h2>
            {userDetails && (
                <div>
                    <p>Name: {userDetails.NAME}</p>
                    <p>ID: {userDetails.ID}</p>
                    <p>Email: {userDetails.EMAIL}</p>
                    <p>Year: {userDetails.YEAR}</p>
                    <p>Stream: {userDetails.STREAM}</p>
                </div>
            )}
        </div>
    );
};

export default ViewProfile;
