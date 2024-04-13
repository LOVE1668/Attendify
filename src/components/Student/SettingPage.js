import React from "react";
import desgin from "../logos/attendify-favicon-color.png"
import logo from "../logos/attendify-high-name-white-transparent.png";
// import "./ProfilePage.css";  

const ProfilePage = () => {
  const toProfilePage = () => {
    window.location.href = ("http://localhost:3000/viewprofile")
  }
  return (
    <div>
            <div className="img">
            <img src={desgin} alt="logo" width={90} height={85}/>
            <img src={logo} alt="logo" width={230} height={70}/>
            </div>
            <div className="btn-container">
                <div>
                <p className="wlc"></p>
            </div>
                <button className="btn" onClick={toProfilePage} >View Profile</button>
                <button className="btn" >Extra Details</button>
                <button className="btn" >Update Profile</button>
                <button className="btn" >Update Password</button>
            </div>
        </div>
  )
}

export default ProfilePage;
