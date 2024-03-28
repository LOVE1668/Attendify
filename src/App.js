import './App.css';
// import Axios from "axios";
// import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
// import AdminPage from './components/Admin/AdminPage';
// import TimeTablePage from './components/Admin/TimeTablePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="*" Component={RegisterPage}/>
          {/* <Route path ="/" Component={AdminPage}/> */}
          {/* <Route path ="/TimeTablePage" Component={TimeTablePage}/> */}
          </Routes>
      </div>
      </Router>
      );
}

export default App;