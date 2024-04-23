import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { ref, onValue } from 'firebase/database';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { CSVLink } from 'react-csv';
import './ViewAttendance.css';
import './row.css';

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [exportFormat, setExportFormat] = useState('csv');
  const [totalLectures, setTotalLectures] = useState(0);

  useEffect(() => {
    const attendanceRef = ref(db, 'attendance');

    onValue(attendanceRef, (snapshot) => {
      const attendance = snapshot.val();
      if (attendance) {
        const uniqueAttendanceData = removeDuplicates(Object.values(attendance), 'id');
        setAttendanceData(uniqueAttendanceData);
      }
    });

    const totalLecturesRef = ref(db, 'total/totalLectures'); // Correct path to fetch total lectures
    onValue(totalLecturesRef, (snapshot) => {
      const total = snapshot.val();
      if (total) {
        setTotalLectures(total);
      }
    });
  }, []);

  const removeDuplicates = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    worksheet.addRow(['Student ID', 'Name', 'Last Name', 'Subject', 'Attended Lectures', 'Total Lectures', 'Percentage', 'Defaulter']);

    attendanceData.forEach((attendance) => {
      const percentage = ((attendance.attendance / totalLectures) * 100).toFixed(2);
      const isDefaulter = percentage < 75 ? 'Yes' : 'No';
      worksheet.addRow([attendance.id, attendance.name, attendance.lastname, attendance.subject, attendance.attendance, totalLectures, percentage + '%', isDefaulter]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'attendance_data.xlsx');
  };

  const handleExportFormatChange = (event) => {
    setExportFormat(event.target.value);
  };

  const headers = [
    { label: 'Student ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Subject', key: 'subject' },
    { label: 'Attended Lectures', key: 'attendance' },
    { label: 'Total Lectures', key: 'totalLectures' },
    { label: 'Percentage', key: 'percentage' },
    { label: 'Defaulter', key: 'isDefaulter' }
  ];

  const formattedData = attendanceData.map((attendance) => ({
    id: attendance.id,
    name: attendance.name,
    lastname: attendance.lastname,
    subject: attendance.subject,
    attendance: attendance.attendance,
    totalLectures: totalLectures,
    percentage: ((attendance.attendance / totalLectures) * 100).toFixed(2) + '%',
    isDefaulter: ((attendance.attendance / totalLectures) * 100) < 75 ? 'Yes' : 'No'
  }));

  return (
    <div>
      <h2 className="report">Attendance Report</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Subject</th>
            <th>Attended Lectures</th>
            <th>Total Lectures</th>
            <th>Percentage</th>
            <th>Defaulter</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance, index) => (
            <tr className='trdata' key={index}>
              <td>{attendance.id}</td>
              <td>{attendance.name}</td>
              <td>{attendance.lastname}</td>
              <td>{attendance.subject}</td>
              <td>{attendance.attendance}</td>
              <td>{totalLectures.toString()}</td>
              <td>{((attendance.attendance / totalLectures) * 100).toFixed(2)}%</td>
              <td>{((attendance.attendance / totalLectures) * 100) < 75 ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <select className="dpexport" value={exportFormat} onChange={handleExportFormatChange}>
          <option value="csv">Export as CSV</option>
          <option value="excel">Export as Excel</option>
        </select>
        {exportFormat === 'csv' ? (
          <CSVLink data={formattedData} headers={headers} filename={"attendance_data.csv"}>
            <button>Export</button>
          </CSVLink>
        ) : (
          <button className="export-btn" onClick={exportToExcel}>Export</button>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
