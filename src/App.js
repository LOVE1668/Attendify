import './App.css';
// import Axios from "axios";
// import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
// import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={LoginPage} />
          </Routes>
      </div>
      </Router>
      );
}

export default App;