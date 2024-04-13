import "./LoginPage.css";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from "firebase/database";
import logo from "../logos/attendify-high-name-white-transparent.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    ID: "",
    EMAIL: "",
    PASSWORD: ""
  });

  const [errors, setErrors] = useState({});
  const [registeredUser, setRegisteredUser] = useState([]);
  const [registeredStaff, setRegisteredStaff] = useState([]);

  const schema = Yup.object().shape({
    ID: Yup.number().required().positive().integer().max(99999999999, "Must be exactly 11 digits").min(10000000000, "Must be exactly 11 digits"),
    EMAIL: Yup.string().email().required().matches(/@somaiya\.edu$/, "Must end with @Somaiya.edu"),
    PASSWORD: Yup.string().required().min(8).max(12),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });

      const userExists = registeredUser.find(user => user.ID === formData.ID && user.EMAIL === formData.EMAIL && user.PASSWORD === formData.PASSWORD);
      const staffExists = registeredStaff.find(staffs => staffs.ID === formData.ID && staffs.EMAIL === formData.EMAIL && staffs.PASSWORD === formData.PASSWORD);

      if (userExists) {
        if (formData.ID === "31010921000") {
          navigate("/admin");
        } else {
          navigate("/student", { state: { name: userExists.name } });
        }
      } else if (staffExists) {
        if (formData.ID === "31010920001") {
          window.location.href = "http://localhost:3000/staff";
        } else {
          alert("User not found! Register First!.");
        }
      } else {
        alert("User not found! Register First!.");
      }
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((validationError) => {
        validationErrors[validationError.path] = validationError.message;
      });
      setErrors(validationErrors);
    }
  };

  const navigateToRegisterPage = () => {
    navigate("./register");
  };

  useEffect(() => {
    const usersRef = ref(db, 'users');
    const staffRef = ref(db, 'staff');

    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      if (users) {
        const usersArray = Object.values(users);
        setRegisteredUser(usersArray);
      }
    });

    onValue(staffRef, (snap) => {
      const staff = snap.val();
      if (staff) {
        const staffArray = Object.values(staff);
        setRegisteredStaff(staffArray);
      }
    });
  }, []);

  return (
    <div className="Login">
      <div>
        <img src={logo} alt="logo" width={200} height={50} />
        <div className="studentlogin">
          <h2 className="welcometext">Student Login</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="number"
              className="textbox"
              placeholder="Enter Your ID no.:"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            />
            {errors.ID && <p>{errors.ID}</p>}
          </div>
          <div>
            <input
              type="email"
              className="textbox"
              placeholder="Enter Your Email.:"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleChange}
            />
            {errors.EMAIL && <p>{errors.EMAIL}</p>}
          </div>
          <div>
            <input
              type="password"
              className="textbox"
              placeholder="Enter Your Password.:"
              name="PASSWORD"
              value={formData.PASSWORD}
              onChange={handleChange}
            />
            {errors.PASSWORD && <p>{errors.PASSWORD}</p>}
          </div>
          <div>
            <input className="button" type="submit" value="Login" />
          </div>
        </form>
      </div>
      <div>
        <button onClick={navigateToRegisterPage} className="button">Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
