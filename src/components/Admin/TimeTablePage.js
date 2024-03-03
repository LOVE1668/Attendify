import "./TimeTablePage.css";
const TimeTablePage = () => {
    const array = ["Monday","Tuesday", "Wednesday" , "Thursday" , "Friday"]
    return (
        <div>
        <div>
            <h1>TimeTable</h1>
        </div>
        <div className="container">
          {array.map((array) => {
            return(
                <div className="days"><h3>{array}</h3></div>
            )
          })}
        </div>
        </div>
        
        

    )

}
export default TimeTablePage