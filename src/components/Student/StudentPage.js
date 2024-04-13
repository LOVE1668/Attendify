import logo from "../logos/attendify-high-name-white-transparent.png";
import desgin from "../logos/attendify-favicon-color.png";
import { useNavigate } from "react-router-dom";

const StudentPage = ({ studentName }) => {
    console.log(studentName)
    const navigate = useNavigate();

    const toProfile = () => {
        window.location.href = ("http://localhost:3000/profile");
    }

    const attedanceView = () => {
        navigate("");
    }

    const notificationPage = () => {
        window.location.href = ("http://localhost:3000/viewnotification");
    }

    const ttPage = () => {
        window.location.href = ("http://localhost:3000/viewtt");
    }

    return (
        <div>
            <div className="img">
                <img src={desgin} alt="logo" width={90} height={85} />
                <img src={logo} alt="logo" width={230} height={70} />
            </div>
            <div className="btn-container">
                <div className="wlc">
                    <h5>WELCOME BACK {studentName}</h5>
                </div>
                <button className="btn" onClick={toProfile} >Settings</button>
                <button className="btn" onClick={attedanceView} >View Attendance</button>
                <button className="btn" onClick={notificationPage} >Notifications</button>
                <button className="btn" onClick={ttPage} >View Time Table</button>
            </div>
        </div>
    );
}

export default StudentPage;
