import React from "react";
import logo from "../logos/attendify-high-name-white-transparent.png";
const StaffPage = () => {
const toAttendancePage = () => {
    window.location.href = "http://localhost:3000/attendance";

  }
  const toNotificationPage = () => {
    window.location.href = "http://localhost:3000/viewnotification";

  }
  const toTimeTablePage = () => {
    window.location.href = "http://localhost:3000/viewtt";

  }
  const toViewAttendancePage = () => {
    window.location.href = "http://localhost:3000/viewattendance";

  }
  return (
    <div>
       <div className="img">
       <img src={logo} alt="logo" width={200} height={50}/>
        </div>
        <div className="wlc">
        <p>staff page</p>
        </div>
        <div className="btn-container">
                <button className="btn" onClick={toAttendancePage}>Take Attendance</button>
                <button className="btn" onClick={toViewAttendancePage} >View Attendance</button>
                <button className="btn" onClick={toNotificationPage}>Notifications</button>
                <button className="btn" onClick={toTimeTablePage}>time Table</button>
        </div>
        
    </div>
  )
}

export default StaffPage;
