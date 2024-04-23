import logo from "../logos/attendify-high-name-white-transparent.png";
import desgin from "../logos/attendify-favicon-color.png";
import "./AdminPage.css";
const AdminPage = () => {


    const toTimeTablePage = () => {
        window.location.href = ("http://localhost:3000/timetableform");
    }
    const toCreateStaffCred =() => {
        // navigate("./staffcred");
        window.location.href = "http://localhost:3000/staffcred";
    }
    const toCreateNotification = () => {
        window.location.href = ("http://localhost:3000/createnotification");
    }
    const toViewAttendance = () => {
        window.location.href = ("http://localhost:3000/viewattendance");
    }

    return(
        <div>
            <div className="img">
            <img src={desgin} alt="logo" width={90} height={85}/>
            <img src={logo} alt="logo" width={230} height={70}/>
            </div>
            <div className="btn-container">
                <div>
                <p className="wlc">Welcome Back Admin</p>
            </div>
                <button className="btn" onClick={toCreateStaffCred}>Create Staff Credentails</button>
                <button className="btn" onClick={toViewAttendance}>View Attendance</button>
                <button className="btn" onClick={toCreateNotification} >Send Notifications</button>
                <button className="btn" onClick={toTimeTablePage}>Create time Table</button>
            </div>
        </div>
    )

}
export default AdminPage