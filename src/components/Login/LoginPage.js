import "./LoginPage.css"
export const LoginPage = () => {
    return (
    <div className="Login">
        <div >
            <div className="welcome">
                <h2 className="welcometext">Welcome to Attendify</h2>
            </div>
            <div>
        <input className="textbox" placeholder="Enter Your ID no.:"/>
        </div>
        <div>
        <input className="textbox" placeholder="Enter Your Email.:"/>
        </div>
        <div>
        <input className="textbox"placeholder="Enter Your Password.:"/>
        </div>
        </div>
        <div>
        <button className="btn">Login </button>
        <button className="btn">Register</button>
        </div>
        
    </div>
    )
}