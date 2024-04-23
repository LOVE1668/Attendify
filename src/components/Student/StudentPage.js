import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook
import logo from "../logos/attendify-high-name-white-transparent.png";
import desgin from "../logos/attendify-favicon-color.png";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const { isAuthenticated, user } = useAuth0(); // Get authentication state and user profile
  const [studentName, setStudentName] = useState(""); // State to store student name
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setStudentName(user.name); // Set student name from user profile
    }
  }, [isAuthenticated, user]);

  const toProfile = () => {
    navigate("/viewprofile");
  };

  const attedanceView = () => {
    navigate("/viewattendance");
  };

  const notificationPage = () => {
    navigate("/viewnotification");
  };

  const ttPage = () => {
    navigate("/viewtt");
  };

  return (
    <div>
      <div className="img">
        <img src={desgin} alt="logo" width={90} height={85} />
        <img src={logo} alt="logo" width={230} height={70} />
      </div>
      <div className="btn-container">
        <div className="wlc">
          {isAuthenticated ? (
            <h5>WELCOME BACK {studentName}</h5>
          ) : (
            <h5>WELCOME BACK</h5>
          )}
        </div>
        <button className="btn" onClick={toProfile}>
          Profile
        </button>
        <button className="btn" onClick={attedanceView}>
          View Attendance
        </button>
        <button className="btn" onClick={notificationPage}>
          Notifications
        </button>
        <button className="btn" onClick={ttPage}>
          View Time Table
        </button>
      </div>
    </div>
  );
};

export default StudentPage;
