import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import AdminPage from './components/Admin/AdminPage';
import StudentPage from './components/Student/StudentPage';
import StaffCred from './components/Admin/StaffCred';
import StaffPage from './components/Faculty/StaffPage';
import AttendancePage from './components/Faculty/AttendancePage';
import ProfilePage from './components/Student/SettingPage';
import TimeTableForm from './components/Admin/TimeTableForm';
import TimeTable from './components/Admin/TimeTable';
import ViewTimeTable from './components/Student/ViewTimeTable';
import CreateNotification from './components/Admin/CreateNotification';
import ViewNotification from './components/Student/ViewNotification';
import ViewProfile from './components/Student/ViewProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage}/>
          <Route path ="/admin" Component={AdminPage}/>
          <Route path ="/staffcred" Component={StaffCred}/> 
          <Route path ="/student" Component={StudentPage}/>
          <Route path ="/staff" Component={StaffPage}/>
          <Route path ="/attendance" Component={AttendancePage}/>
          <Route path ="/profile" Component={ProfilePage}/>
          <Route path ="/timetableform" Component={TimeTableForm}/>
          <Route path ="/tt" Component={TimeTable}/>
          <Route path ="/viewtt" Component={ViewTimeTable}/>
          <Route path ="/createnotification" Component={CreateNotification}/>
          <Route path ="/viewnotification" Component={ViewNotification}/>
          <Route path ="/viewprofile" Component={ViewProfile}/>
          </Routes>
      </div>
      </Router>
      );
}

export default App;