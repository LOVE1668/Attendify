import React, { useState, useEffect } from "react";
import "./AttendancePage.css";
import "./row.css";
import { db } from "../../config/firebase";
import { ref, onValue, set, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendancePage = () => {
    const [attendanceStatus, setAttendanceStatus] = useState([]);
    const [students, setStudents] = useState([]);
    const [id, setId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentRef = ref(db, 'users');
                onValue(studentRef, (snapshot) => {
                    const student = snapshot.val();
                    const fetchedStudent = [];
                    const initialAttendanceStatus = [];
                    for (let key in student) {
                        fetchedStudent.push({ id: key, ...student[key] });
                        initialAttendanceStatus.push(false);
                    }
                    setStudents(fetchedStudent);
                    setAttendanceStatus(initialAttendanceStatus);
                    setFilteredStudents(fetchedStudent);
                });
            } catch (error) {
                console.log("Error Fetching Data :", error);
            }
        };
        fetchData();
    }, []);

    const handleAction = (index) => {
        const newAttendanceStatus = [...attendanceStatus];
        newAttendanceStatus[index] = !newAttendanceStatus[index];
        setAttendanceStatus(newAttendanceStatus);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted value:", id);
        setId("");

        // Check if student is recognized
        const temp = parseInt(id);
        const recognizedStudent = students.find(student => student.TAGID === temp);

        // Display toast message
        if (recognizedStudent) {
            toast.success(`Student ${recognizedStudent.NAME} recognized`, { className: 'toast-success' });
        } else {
            toast.error(`Unrecognized match: ${temp}`, { className: 'toast-error' });
        }

        // Marking student present if values match
        const updatedAttendanceStatus = attendanceStatus.map((status, index) => {
            if (students[index].TAGID === temp) {
                return true; // Mark student present
            }
            return status;
        });
        setAttendanceStatus(updatedAttendanceStatus);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Check if user has typed "present" or "absent"
        if (value === "present" || value === "absent") {
            const filteredByAttendance = students.filter((student, index) => {
                if (value === "present") {
                    return attendanceStatus[index];
                } else {
                    return !attendanceStatus[index];
                }
            });
            setFilteredStudents(filteredByAttendance);
        } else {
            // Perform normal search
            const filteredStudents = students.filter((student) => {
                const firstLetterFirstName = student.NAME.charAt(0).toLowerCase();
                const firstLetterLastName = student.LASTNAME.charAt(0).toLowerCase();
                const combinedLetters = firstLetterFirstName + firstLetterLastName;
                const lastTwoDigits = student.ID.slice(-2).toLowerCase(); // Get the last two digits of the ID

                const isDataMatch =
                    combinedLetters.includes(value) ||
                    student.NAME.toLowerCase().includes(value) ||
                    student.ID.toLowerCase().includes(value) ||
                    student.LASTNAME.toLowerCase().includes(value);

                return isDataMatch || lastTwoDigits === value;
            });
            setFilteredStudents(filteredStudents);
        }
    };

    const handleUpload = async () => {
        const subjectName = "Advanced Java"; // Replace with your subject name
        const currentDate = new Date().toISOString(); // Get current date and time
    
        try {
            // Increment total lectures
            const totalLecturesRef = ref(db, 'total/totalLectures');
            const totalLecturesSnapshot = await get(totalLecturesRef);
            const currentTotalLectures = totalLecturesSnapshot.val() || 0; // Default to 0 if no value exists
            const newTotalLectures = currentTotalLectures + 1;
            set(totalLecturesRef, newTotalLectures); // Convert to string
    
            // Fetch existing attendance records from Firebase
            const attendanceRef = ref(db, 'attendance');
            const snapshot = await get(attendanceRef);
            const existingAttendanceData = snapshot.val() || {};
    
            // Update attendance for each student
            const updatedAttendanceData = filteredStudents
                .filter(data => data.ID !== '31010921000')
                .reduce((accumulator, student, index) => {
                    const attendanceValue = attendanceStatus[index] ? 1 : 0;
                    const studentId = student.ID;
                    const existingAttendance = existingAttendanceData[studentId] || { attendance: 0 };
    
                    // Update attendance value for the student
                    const updatedAttendance = existingAttendance.attendance + attendanceValue;
    
                    // Update the student's record in the accumulator
                    accumulator[studentId] = {
                        name: student.NAME,
                        lastname: student.LASTNAME,
                        id: studentId,
                        attendance: updatedAttendance, // Update attendance value
                        subject: subjectName,
                        timestamp: currentDate
                    };
    
                    return accumulator;
                }, {});
    
            // Update attendance records in Firebase
            set(attendanceRef, updatedAttendanceData);

            // Reset attendance status to absent for all students
            setAttendanceStatus(Array(filteredStudents.length).fill(false));
    
            // Display success message
            toast.success("Attendance data uploaded successfully", { className: 'toast-success' });
    
            // Push total lectures with initial value of 1 if it doesn't exist
            if (!totalLecturesSnapshot.exists()) {
                set(totalLecturesRef, 1); // Convert to string
            }
        } catch (error) {
            console.error("Error uploading attendance data:", error);
            // Display error message
            toast.error("Failed to upload attendance data", { className: 'toast-error' });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault(); // Prevent default behavior of up and down arrow keys
        }
    };

    return (
        <div>
            <div>
                <p className="title">ATTENDANCE PAGE</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="number" 
                        className="taginput" 
                        value={id} 
                        placeholder="Click here and Start Scanning Cards" 
                        onChange={(e) => setId(e.target.value)} 
                        onKeyDown={handleKeyDown} // Add the onKeyDown event handler
                    />
                </form>
                <div>
                    <input className="searchbar" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for student" />
                </div>
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
                        {filteredStudents
                            .filter(data => data.ID !== '31010921000')
                            .map((data, index) => (
                                <tr 
                                key={index} 
                                style={{ backgroundColor: attendanceStatus[index] ? '#4CAF50' : '#4d3a56' }}
                            >
                                <td>{data.NAME}</td>
                                <td>{data.LASTNAME}</td>
                                <td>{data.ID}</td>
                                <td>{attendanceStatus[index] ? 'Present' : 'Absent'}</td>
                                <td>
                                    <button onClick={() => handleAction(index)}>
                                        {attendanceStatus[index] ? "Mark Absent" : "Mark Present"}
                                    </button>
                                </td>
                            </tr>

                            ))}
                    </tbody>
                </table>
                <div>
                    <button className="upload-button" onClick={handleUpload}>Upload Attendance</button>
                </div>
            </div>
            <ToastContainer 
                toastClassName={({ type }) => type === 'success' ? 'toast-success' : 'toast-error'} 
            />
        </div>
    );
};

export default AttendancePage;
