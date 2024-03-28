import "./TimeTablePage.css";
import { useState } from "react";
const TimeTablePage = () => {
    const Days = ["DAY","Monday","Tuesday", "Wednesday" , "Thursday" , "Friday"]
    const [selectedYear , setSelectedYear] = useState("");
    const [selectedStream , setSelectedStream] = useState("");

    const handleChange = (event) =>{
      setSelectedYear(event.target.value)
    }

    const handleChange2 = (event) => {
      setSelectedStream(event.target.value)
    }


    return (
        <div>
        <div>
            <h1>TimeTable Form</h1>
        </div>
        <div>
          <div className="display">
            <h3>Enter the Classroom to be Assigned :</h3>
            <input type="number" className="input" />
          </div>
          <div className="display">
            <h3>Select Year :</h3>
            <select id="dropdown" className="input" value={selectedYear} onChange={handleChange} >
        <option value="FY">FY</option>
        <option value="SY">SY</option>
        <option value="TY">TY</option>
      </select>
          </div>
          <div className="display">
            <h3>Select Stream :</h3>
            <select id="dropdown2" className="input" value={selectedStream} onChange={handleChange2} >
            <option value="IT">IT</option>
              <option value="IT Hons">IT Hons</option>
              <option value="CS">CS</option>
              <option value="CS Hons">CS Hons</option>
              <option value="BBA">BBA</option>
              <option value="BBA Hons">BBA Hons</option>
              <option value="BCA">BCA</option>
      </select>
          </div>
          <div className="display">
            <h3>Select no. of lectures</h3>
            <input type="number" className="input" />
          </div>
        </div>
        {/* <div className="container">
          {array.map((array) => {
            return(
                <div className="days"><h3>{array}</h3></div>
            )
          })}
        </div> */}

        </div>
        
        

    )

}
export default TimeTablePage