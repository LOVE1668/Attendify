import React, { useEffect, useState } from 'react';
import { db } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import "./ViewTimeTable.css";

const ViewTimeTable = () => {
  const [timeTableData, setTimeTableData] = useState(null);
  const [classroom, setClassroom] = useState('');
  const [year, setYear] = useState('');
  const [stream, setStream] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeTableRef = ref(db, 'timetable');
        onValue(timeTableRef, (snapshot) => {
          const data = snapshot.val();
          setTimeTableData(data);

          // Extract class information from the timetable data
          if (data) {
            const classInfo = Object.values(data)[0]; // Assuming class info is stored in the first entry
            if (classInfo) {
              setClassroom(classInfo.classroom);
              setYear(classInfo.year);
              setStream(classInfo.stream);
            }
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderTime = (time) => {
    return time;
  };

  const renderRows = () => {
    if (!timeTableData) return null;

    const rows = Object.entries(timeTableData).map(([key, value], index) => {
      return (
        <tr key={index}>
        <td>{renderTime(value.time)}</td>
        <td>
          <div>
            {value.monday.subject}
            <div className="faculty">{value.monday.faculty}</div>
          </div>
        </td>
        <td>
          <div>
            {value.tuesday.subject}
            <div className="faculty">{value.tuesday.faculty}</div>
          </div>
        </td>
        <td>
          <div>
            {value.wednesday.subject}
            <div className="faculty">{value.wednesday.faculty}</div>
          </div>
        </td>
        <td>
          <div>
            {value.thursday.subject}
            <div className="faculty">{value.thursday.faculty}</div>
          </div>
        </td>
        <td>
          <div>
            {value.friday.subject}
            <div className="faculty">{value.friday.faculty}</div>
          </div>
        </td>
      </tr>
      );
    });
    console.log(classroom,year,stream)
    return rows;
    
  };

  return (
    <div>
      <h2 className="tt">Time Table Schedule</h2>
      <div className='class-details'>
        <p className='class'>Classroom: {classroom}</p>
        <p className='class'>Year: {year}</p>
        <p className='class'>Stream: {stream}</p>
      </div>
      <table className="timetable-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default ViewTimeTable;
