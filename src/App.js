import './App.css';
// import Axios from "axios";
// import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" Component={LoginPage} /> */}
          <Route path='/' Component={RegisterPage}/>
          </Routes>
      </div>
      </Router>
      );
}

export default App;