import React, { useState } from "react";
import { db } from "../../config/firebase";
import "./CreateNotification.css";
import { ref, push } from "firebase/database";

const CreateNotification = () => {
    const [message, setMessage] = useState("");

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendNotification = async () => {
        if (message.trim() === "") {
            alert("Please enter a message.");
            return;
        }

        try {
            const notificationsRef = ref(db, "notifications"); // Reference to the "notifications" node
            await push(notificationsRef, {
                timestamp: {
                    ".sv": "timestamp"
                },
                message
            });
            setMessage("");
            alert("Notification sent successfully.");
        } catch (error) {
            console.error("Error sending notification:", error);
            alert("Error sending notification. Please try again.");
        }
    };

    return (
        <div className="notification-container">
            <h2 className="heading">Create Notification</h2>
            <textarea
                placeholder="Enter your message..."
                className="message-input"
                value={message}
                onChange={handleMessageChange}
            />
            <button className="button" onClick={handleSendNotification}>Send Notification</button>
        </div>
    );
};

export default CreateNotification;
