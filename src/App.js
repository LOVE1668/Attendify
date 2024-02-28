import './App.css';
// import Axios from "axios";
// import {useState, useEffect} from "react";
// import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import {useCounter} from "./useCounter";

function App() {
  const [makeCal , add , sub , reset] = useCounter();
  return (
    <div className="App">
      <button onClick={add}>Increase</button>
      <button onClick={sub}>Decrease</button>
      <button onClick={reset}>Reset</button>
      {makeCal}
    </div>
  );
}

export default App;
