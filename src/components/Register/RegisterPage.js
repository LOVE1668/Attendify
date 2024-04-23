import "./RegisterPage.css";
import { useState } from "react";
import * as Yup from "yup"; // Library for validation of input fields
import { useNavigate } from "react-router-dom";//library to help navigate between components/pages
import { db } from "../../config/firebase";
import { ref , push } from "firebase/database";
import logo from "../logos/attendify-high-name-white-transparent.png";


const RegisterPage = () => {

    const [formData, setFormData] = useState({
        NAME: "",
        MIDDLENAME: "",
        LASTNAME: "",
        ID: "",
        EMAIL: "",
        YEAR: "",
        STREAM:"",
        PASSWORD: "",
        CONFIRMPASSWORD: ""
    });

    const [errors, setErrors] = useState({});

    const schema = Yup.object().shape({
        NAME: Yup.string().required(),
        MIDDLENAME: Yup.string().required(),
        LASTNAME: Yup.string().required(),
        ID: Yup.number().required().positive().integer().max(99999999999,"Must be exactly 11 digits").min(10000000000,"Must be exactly 11 digits"),
        EMAIL: Yup.string().email().required().matches(/@somaiya\.edu$/,"Must end with @Somaiya.edu"),
        YEAR: Yup.string().required(),
        STREAM: Yup.string().required(),
        PASSWORD: Yup.string().required().min(8).max(12),
        CONFIRMPASSWORD: Yup.string().oneOf([Yup.ref("PASSWORD"), null]).required(),
    });

    const navigate = useNavigate();

    const navigateToLoginPage = () => {
        navigate("/");
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = async () => {
        try {
          await schema.validate(formData, { abortEarly: false });
          await pushDataToFirebase(formData);
          alert("Registered Successfully");
          navigate("/"); 
        } catch (error) {
          console.error("Validation Error:", error);
          const validationErrors = {};
          if (error.inner) {
            error.inner.forEach((validationError) => {
              validationErrors[validationError.path] = validationError.message;
            });
          }
          setErrors(validationErrors);
        }
      };
    
      const pushDataToFirebase = async (formData) => {
        try {
          const usersRef = ref(db, 'users'); // Create a reference to the "users" node
          await push(usersRef, formData); // Push data to the "users" node
          console.log("Data pushed to Firebase successfully");
        } catch (error) {
          console.error("Error pushing data to Firebase:", error);
          throw error; // Rethrow the error to handle it at the component level if needed
        }
      };
    return (
        <div className="Login">
            
            <div>
            <img src={logo} alt="logo" width={200} height={50}/>
            </div>
            <div className="studentlogin">
                <h3 className="welcometext">REGISTER</h3>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                <div>
                    <input
                        type="text"
                        className="textbox"
                        placeholder="Enter Your First Name."
                        name="NAME"
                        id="name"
                        value={formData.NAME}
                        onChange={handleChange}
                    />
                    {errors.NAME && <p>{errors.NAME}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        className="textbox"
                        placeholder="Enter Your Middle Name."
                        name="MIDDLENAME"
                        id="middlename"
                        value={formData.MIDDLENAME}
                        onChange={handleChange}
                    />
                    {errors.MIDDLENAME && <p>{errors.MIDDLENAME}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        className="textbox"
                        placeholder="Enter Your Last Name."
                        name="LASTNAME"
                        id="lastname"
                        value={formData.LASTNAME}
                        onChange={handleChange}
                    />
                    {errors.LASTNAME && <p>{errors.LASTNAME}</p>}
                </div>
                <div>
                    <input
                        type="number"
                        className="textbox"
                        placeholder="Enter Your ID no."
                        name="ID"
                        id="seatnum"
                        value={formData.ID}
                        onChange={handleChange}
                    />
                    {errors.ID && <p>{errors.ID}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        className="textbox"
                        placeholder="Enter Your Email."
                        name="EMAIL"
                        id="email"
                        value={formData.EMAIL}
                        onChange={handleChange}
                    />
                    {errors.EMAIL && <p>{errors.EMAIL}</p>}
                </div>
                <div className="div">
                    <select
                        id="dropdown"
                        className="input"
                        name="YEAR"
                        value={formData.YEAR}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Year</option>
                        <option value="FY">FY</option>
                        <option value="SY">SY</option>
                        <option value="TY">TY</option>
                    </select>
                    {errors.YEAR && <p>{errors.YEAR}</p>}
                </div>
                <div className="div">
                    <select
                        id="dropdown2"
                        className="input"
                        name="STREAM"
                        value={formData.STREAM} 
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Stream</option>
                        <option value="IT">IT</option>
                        <option value="IT Hons">IT Hons</option>
                        <option value="CS">CS</option>
                        <option value="CS Hons">CS Hons</option>
                        <option value="BBA">BBA</option>
                        <option value="BBA Hons">BBA Hons</option>
                        <option value="BCA">BCA</option>
                    </select>
                    {errors.selectedStream && <p>{errors.selectedStream}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        className="textbox"
                        placeholder="Enter Your Password."
                        name="PASSWORD"
                        value={formData.PASSWORD}
                        onChange={handleChange}
                    />
                    {errors.PASSWORD && <p>{errors.PASSWORD}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        className="textbox"
                        placeholder="Confirm Your Password."
                        name="CONFIRMPASSWORD"
                        id="password"
                        value={formData.CONFIRMPASSWORD}
                        onChange={handleChange}
                    />
                    {errors.CONFIRMPASSWORD && <p>{errors.CONFIRMPASSWORD}</p>}
                </div>
                <div>
                    <input
                        className="button"
                        type="submit"
                        value="Register"
                        id="submit"
                    />
                </div>
            </form>
            <div>
                <button onClick={navigateToLoginPage} className="button">Login</button>
            </div>
        </div>
    );
};

export default RegisterPage;
