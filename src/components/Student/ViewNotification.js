import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { db } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import "./ViewNotification.css";

const ViewNotification = () => {
    const [notifications, setNotifications] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notificationsRef = ref(db, "notifications");
                onValue(notificationsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const notificationList = Object.entries(data).map(([key, value]) => ({
                            id: key,
                            timestamp: convertTimestamp(value.timestamp),
                            message: value.message
                        }));
                        setNotifications(notificationList);
                    }
                });
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    useLayoutEffect(() => {
        // Scroll to the bottom of the page on component mount
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [notifications]);

    // Function to convert timestamp to formatted date and time
    const convertTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <div className="notification-list">
            <h2 className="notification-heading">Notifications</h2>
            <ul className="notification-items">
                {notifications.map((notification) => (
                    <li key={notification.id} className="notification-item">
                        <span className="timestamp">{notification.timestamp}</span>
                        <p className="message">{notification.message}</p>
                    </li>
                ))}
            </ul>
            {/* Empty div used as a reference to scroll to */}
            <div ref={bottomRef}></div>
        </div>
    );
};

export default ViewNotification;
