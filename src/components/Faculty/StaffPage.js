import React from "react";
import logo from "../logos/attendify-high-name-white-transparent.png";
const StaffPage = () => {
const toAttendancePage = () => {
    window.location.href = "http://localhost:3000/attendance";

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
                <button className="btn" >View Attendance</button>
                <button className="btn" >Notifications</button>
                <button className="btn" >time Table</button>
        </div>
        
    </div>
  )
}

export default StaffPage;
