import React, { useEffect, useState } from 'react';
import './TimeTable.css';
import { db } from "../../config/firebase";
import { ref , push } from "firebase/database";

const TimeTable = () => {
  const [formData, setFormData] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [startTime, setStartTime] = useState(0);


  const handleUpload = async () => {
    try {
      await Promise.all([pushDataToFirebase(), pushClassroomYearStream()]); 
      alert("Data uploaded successfully");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data. Please try again.");
    }
  };
  
  const pushDataToFirebase = async () => {
    try {
      const timetableRef = ref(db, 'timetable'); // Reference to the "timetable" node
      selectedSubjects.forEach(async (row, index) => {
        const hour = (startTime + index) % 12 || 12;
        const ampm = (startTime + index) < 12 ? 'AM' : 'PM';
        const time = `${hour}:00 ${ampm}`;
        const rowData = {
          time: time, // Include time with AM or PM
          monday: {
            subject: row[0],
            faculty: formData.subjects.find(subject => subject.subjectName === row[0])?.facultyName || '',
          },
          tuesday: {
            subject: row[1],
            faculty: formData.subjects.find(subject => subject.subjectName === row[1])?.facultyName || '',
          },
          wednesday: {
            subject: row[2],
            faculty: formData.subjects.find(subject => subject.subjectName === row[2])?.facultyName || '',
          },
          thursday: {
            subject: row[3],
            faculty: formData.subjects.find(subject => subject.subjectName === row[3])?.facultyName || '',
          },
          friday: {
            subject: row[4],
            faculty: formData.subjects.find(subject => subject.subjectName === row[4])?.facultyName || '',
          },
          classroom: formData.classroom,
          year: formData.year,
          stream: formData.stream,
        };
        await push(timetableRef, rowData); // Push each row's data to Firebase
      });
      console.log("Data pushed to Firebase successfully");
    } catch (error) {
      console.error("Error pushing data to Firebase:", error);
      throw error;
    }
  };

  const pushClassroomYearStream = async () => {
    try {
      const classroomYearStreamRef = ref(db, 'classroomYearStream'); // Reference to the "classroomYearStream" node
      await push(classroomYearStreamRef, {
        classroom: formData.classroom,
        year: formData.year,
        stream: formData.stream,
      });
      console.log("Classroom, year, and stream pushed to Firebase successfully");
    } catch (error) {
      console.error("Error pushing classroom, year, and stream to Firebase:", error);
      throw error;
    }
  };


  useEffect(() => {
    // Retrieve form data from local storage
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setFormData(parsedFormData.data);
      // Initialize selected subjects array
      const initialSelectedSubjects = Array(parsedFormData.data.numLectures).fill('').map(() => new Array(5).fill(''));
      setSelectedSubjects(initialSelectedSubjects);
      // Define startTime based on lectureStartTime from formData
      const startTime = parseInt(parsedFormData.data.lectureStartTime);
      setStartTime(startTime);
    }
  }, []);


  const handleSubjectChange = (e, lectureIndex, dayIndex) => {
    const updatedSelectedSubjects = [...selectedSubjects];
    updatedSelectedSubjects[lectureIndex][dayIndex] = e.target.value;
    setSelectedSubjects(updatedSelectedSubjects);
  };

  const renderRows = () => {
    if (!formData) return null;

    const { lectureStartTime, numLectures } = formData;
    const rows = [];
    let startTime = parseInt(lectureStartTime);

    for (let i = 0; i < numLectures; i++) {
      const dayCells = [];

      // Loop through each day of the week (Monday to Friday)
      for (let j = 0; j < 5; j++) {
        dayCells.push(
          <td key={j}>
            <div className="select-container">
              <select className="subject-dropdown" onChange={(e) => handleSubjectChange(e, i, j)} value={selectedSubjects[i][j]}>
                <option value="" disabled>Select Subject</option>
                <option value="Break">Break</option>
                {formData.subjects.map((subject, index) => (
                  <option key={index} value={subject.subjectName}>
                    {subject.subjectName}
                  </option>       
                ))}
              </select>
              {selectedSubjects[i][j] && selectedSubjects[i][j] !== "Break" && (
                <div className="faculty-info">Faculty: {formData.subjects.find(subject => subject.subjectName === selectedSubjects[i][j]).facultyName}</div>
              )}
            </div>
          </td>
        );
      }

      rows.push(
        <tr key={i}>
          <td>{(startTime + i) % 12 || 12}:00 {(startTime + i) < 12 ? 'AM' : 'PM'}</td>
          {dayCells}
        </tr>
      );
    }

    return rows;
  };

  return (
    <div>
      <h2 className="tt">Time Table</h2>
      <div className="class-details">
        <p className='class'>CLASSROOM : {formData && formData.classroom}</p>
        <p className='class'>YEAR : {formData && formData.year}</p>
        <p className='class'>STREAM : {formData && formData.stream}</p>
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
      <button className="upload-button" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default TimeTable;
