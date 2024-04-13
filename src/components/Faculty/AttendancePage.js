import React from "react";
import "./AttendancePage.css";
import { useState , useEffect } from "react";
import {db} from "../../config/firebase";
import { ref , onValue} from "firebase/database";

const AttendancePage = () => {
    const [attendanceStatus , setAttendanceStatus] = useState([])
    const [students , setStudents] = useState([])


    useEffect(()=>{
        const fetchData = async () => {
            try{
                const studentRef = ref(db , 'users')
                onValue(studentRef, (snapshot) => {
                    const student = snapshot.val();
                    const fetchedStudent = [];
                    const initialAttendanceStatus =[];
                    for(let key in student){
                        fetchedStudent.push({id:key , ...student[key]});
                        initialAttendanceStatus.push(false);
                    }
                    setStudents(fetchedStudent);
                    setAttendanceStatus(initialAttendanceStatus);
                });
            } catch (error) {
                console.log("Error Fetching Data :",error);
            }
            
        };
        fetchData();
    },[]);

    // const data = [
    //     {name:"Jaswant" ,surmame:"Rajput", Tagid:4256652659 , seatnum:31010921001},
    //     {name:"Bhaskar" ,surmame:"Kapri", Tagid:759311905 , seatnum:31010921002},
    //     {name:"Aditya" ,surmame:"Sakpal", Tagid:758777585 , seatnum:31010921003},
    //     {name:"Smit" ,surmame:"Kapani", Tagid:758033681 , seatnum:31010921004},
    //     {name:"Nishan" ,surmame:"Solanki", Tagid:1314786594 , seatnum:31010921005},
    //     {name:"Soham" ,surmame:"Palekar", Tagid:1314643858 , seatnum:31010921006},
    //     {name:"Love" ,surmame:"Jain", Tagid:1315488274 , seatnum:31010921007},
    //     {name:"Oliver" ,surmame:"Heldens", Tagid:761406273 , seatnum:31010921008},
    //     {name:"Dominic" ,surmame:"Toretto", Tagid:1316360690 , seatnum:31010921009},
    //     {name:"Lucy" ,surmame:"Heartfilia", Tagid:1315909122 , seatnum:31010921010},
    //     {name:"Hinata" ,surmame:"Hyuga", Tagid:1315817042 , seatnum:31010921011},
    // ]

    const handleAction = (index) =>{
        const newAttendanceStatus = [...attendanceStatus];
        newAttendanceStatus[index] = !newAttendanceStatus[index];
        setAttendanceStatus(newAttendanceStatus);
    }

    return (
        <div>
            <div>
            <p className="title">ATTENDANCE PAGE</p>
            </div>
            <div>
            <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Seat No.</th>
          <th>Attendance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.filter(data => data.ID !== '31010921000').map((data, index) =>(
        <tr key={index} style={{backgroundColor:attendanceStatus[index]? "green": "red"}}>
          <td>{data.NAME}</td>
          <td>{data.LASTNAME}</td>
          <td>{data.ID}</td>
          <td>{attendanceStatus[index] ? 'Present' : 'Absent'}</td>
          <td>
            <button onClick={() => handleAction(index)}>{attendanceStatus[index] ? "Mark Absent" : "Mark Present"}</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
            </div>
        </div>
           
    );
};

export default AttendancePage;

