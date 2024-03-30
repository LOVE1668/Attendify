import logo from "./attendify-high-resolution-logo-black.png";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
const AdminPage = () => {

    const navigate = useNavigate();

    const toTimeTablePage = () => {
        navigate("./TimeTablePage");
    }
    const toCreateStaffCred =() => {
        // navigate("./staffcred");
        window.location.href = "http://localhost:3000/staffcred";
    }

    return(
        <div>
            <div>
                <img src={logo} alt="logo" width={400} height={300}/>
            </div>
            <div>
                <p className="wlc">Welcome Back Admin</p>
            </div>
            <div className="btn-container">
                <button className="btn" onClick={toCreateStaffCred}>Create Staff Credentails</button>
                <button className="btn" >View Attendance</button>
                <button className="btn" >Send Notifications</button>
                <button className="btn" onClick={toTimeTablePage}>Create time Table</button>
            </div>
        </div>
    )

}
export default AdminPage