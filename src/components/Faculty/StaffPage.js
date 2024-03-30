import React from "react";
import logo from "./attendify-high-resolution-logo-black.png";
const StaffPage = () => {
const toAttendancePage = () => {
    window.location.href = "http://localhost:3000/attendance";

  }
  return (
    <div>
       <div>
         <img src={logo} alt="logo" width={400} height={300}/>
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
