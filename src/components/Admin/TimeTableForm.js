import React, { useState } from 'react';
import './TimeTableForm.css';

const TimeTableForm = () => {
  // State variables to store form data
  const [classroom, setClassroom] = useState('');
  const [year, setYear] = useState('');
  const [stream, setStream] = useState('');
  const [numLectures, setNumLectures] = useState('');
  const [numSubjects, setNumSubjects] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [lectureStartTime, setLectureStartTime] = useState('');
  const [lunchBreak, setLunchBreak] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, such as sending it to a server
    console.log({
      classroom,
      year,
      stream,
      numLectures,
      lectureDuration: '1', // Hardcoded to 1 hour
      subjects,
      lectureStartTime,
      lunchBreak
    });
    const data = {
      classroom,
      year,
      stream,
      numLectures,
      subjects,
      lectureStartTime,
      lunchBreak
    };
    localStorage.setItem('formData', JSON.stringify({ data }));
    window.location.href = ("http://localhost:3000/tt");
    return data;
  };

  // Function to handle changes in number of subjects
  const handleNumSubjectsChange = (e) => {
    let value = parseInt(e.target.value);
    value = Math.max(1, Math.min(6, value));
    setNumSubjects(value);

    // Initialize subjects array with correct length
    const initialSubjects =value > 0 ? Array(value).fill().map(() => ({ subjectName: '', facultyName: '' })):[];
    setSubjects(initialSubjects);
  };

  // Function to handle changes in classroom number
  const handleClassroomChange = (e) => {
    let value = parseInt(e.target.value);
    // Ensure that the value is non-negative
    value = Math.max(0, value);
    setClassroom(value);
  };

  // Function to handle changes in subject and faculty names
  const handleSubjectFacultyChange = (index, fieldName, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][fieldName] = value;
    setSubjects(updatedSubjects);
  };

  // Function to handle changes in the number of lectures
  const handleNumLecturesChange = (e) => {
    let value = parseInt(e.target.value);
    // Ensure that the value is between 1 and 6
    value = Math.max(1, Math.min(6, value));
    setNumLectures(value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <p className="wlc">TimeTable Form</p>
      </div>
      <div>
        <label>Classroom No.</label>
        <input
          type="number"
          value={classroom}
          onChange={handleClassroomChange}
          required
        />
      </div>
      <div>
        <label>Year</label>
        <select value={year} onChange={(e) => setYear(e.target.value)} required>
          <option value="" disabled>Select Year</option>
          <option value="FY">FY</option>
          <option value="SY">SY</option>
          <option value="TY">TY</option>
        </select>
      </div>
      <div>
        <label>Stream</label>
        <select value={stream} onChange={(e) => setStream(e.target.value)} required>
          <option value="" disabled>Select Stream</option>
          <option value="IT">IT</option>
          <option value="IT Hons">IT Hons</option>
        </select>
      </div>
      <div>
        <label>No. of Lectures</label>
        <input
          type="number"
          value={numLectures}
          onChange={handleNumLecturesChange}
          min="0" // Ensure the value is not negative
          max="6" // Set maximum limit to 6
          required
        />
      </div>
      <div>
        <label>No. of Subjects</label>
        <input
          type="number"
          value={numSubjects}
          onChange={handleNumSubjectsChange}
          required
        />
      </div>
      {subjects.map((subject, index) => (
        <div key={index} className="subject-row">
          <div className="subject-field">
            <input
              type="text"
              placeholder={`Subject ${index + 1}`}
              value={subject.subjectName}
              onChange={(e) => handleSubjectFacultyChange(index, 'subjectName', e.target.value)}
              required
            />
          </div>
          <div className="subject-field">
            <input
              type="text"
              placeholder={`Faculty ${index + 1}`}
              value={subject.facultyName}
              onChange={(e) => handleSubjectFacultyChange(index, 'facultyName', e.target.value)}
              required
            />
          </div>
        </div>
      ))}
      <div>
        <label>Lecture Start Time (hours)</label>
        <input
          type="number"
          value={lectureStartTime}
          onChange={(e) => setLectureStartTime(e.target.value)}
          min="6" // Set minimum limit to 6
          max="17" // Set maximum limit to 24
          required
        />
      </div>
      <div>
        <label>Lunch Break (hours/minutes)</label>
        <input
          type="text"
          value={lunchBreak}
          onChange={(e) => setLunchBreak(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TimeTableForm;
