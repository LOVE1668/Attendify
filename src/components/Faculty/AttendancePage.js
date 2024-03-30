import React from "react";
import "./AttendancePage.css";
const AttendancePage = () => {
    const data = [
        {name:"Jaswant" ,surmame:"Rajput", Tagid:4256652659 , seatnum:31010921001},
        {name:"Bhaskar" ,surmame:"Kapri", Tagid:759311905 , seatnum:31010921002},
        {name:"Aditya" ,surmame:"Sakpal", Tagid:758777585 , seatnum:31010921003},
        {name:"Smit" ,surmame:"Kapani", Tagid:758033681 , seatnum:31010921004},
        {name:"Nishan" ,surmame:"Solanki", Tagid:1314786594 , seatnum:31010921005},
        {name:"Soham" ,surmame:"Palekar", Tagid:1314643858 , seatnum:31010921006},
        {name:"Love" ,surmame:"Jain", Tagid:1315488274 , seatnum:31010921007},
        {name:"Oliver" ,surmame:"Heldens", Tagid:761406273 , seatnum:31010921008},
        {name:"Dominic" ,surmame:"Toretto", Tagid:1316360690 , seatnum:31010921009},
        {name:"Lucy" ,surmame:"Heartfilia", Tagid:1315909122 , seatnum:31010921010},
        {name:"Hinata" ,surmame:"Hyuga", Tagid:1315817042 , seatnum:31010921011},
    ]
    return (
        <div>
            <div>
            <p>Attendance Page</p>
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
        {data.map((data, index) =>(
        <tr key={index}>
          <td>{data.name}</td>
          <td>{data.surmame}</td>
          <td>{data.seatnum}</td>
          <td>{data.Tagid}</td>
          <td>
            <button>Take Action</button>
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
