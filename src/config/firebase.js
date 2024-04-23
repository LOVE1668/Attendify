import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database"; // Import Firebase Realtime Database
  // const { SerialPort } = require('serialport');
  // const Readline = require('@serialport/parser-readline');

const firebaseConfig = {
  apiKey: "AIzaSyBtc-YtKjymXiE7azGTZYOcXRc5YfRdkPw",
  authDomain: "attendify-4f644.firebaseapp.com",
  projectId: "attendify-4f644",
  storageBucket: "attendify-4f644.appspot.com",
  messagingSenderId: "1049213415593",
  appId: "1:1049213415593:web:c1cc57ed955ef9f36cb9b8",
  measurementId: "G-SSS9ZXLHK7"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
// document.getElementById("submit")?.addEventListener("click", window.onload=function(e){
//   set(ref(db, "user/"+ document.getElementById("seatnum").value),
//   {
//     name: document.getElementById("name").value,
//     middlename: document.getElementById("middlename").value,
//     lastname: document.getElementById("lastname").value,
//     seatnum: document.getElementById("seatnum").value,
//     email: document.getElementById("email").value,
//     dropdown: document.getElementById("dropdown").value,
//     dropdown2: document.getElementById("dropdown2").value,
//     password: document.getElementById("password").value,
//   })
// })