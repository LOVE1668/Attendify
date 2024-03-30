import './App.css';
// import Axios from "axios";
// import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import AdminPage from './components/Admin/AdminPage';
import StudentPage from './components/Student/StudentPage';
import StaffCred from './components/Admin/StaffCred';
import StaffPage from './components/Faculty/StaffPage';
import AttendancePage from './components/Faculty/AttendancePage';
// import TimeTablePage from './components/Admin/TimeTablePage';

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
          
          {/* <Route path ="/TimeTablePage" Component={TimeTablePage}/> */}
          </Routes>
      </div>
      </Router>
      );
}

export default App;