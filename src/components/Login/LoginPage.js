import "./LoginPage.css";
import { useState , useEffect } from "react";
import {db} from "../../config/firebase";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { ref } from "firebase/database";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    ID: "",
    EMAIL: "",
    PASSWORD: ""
  });

  const [errors, setErrors] = useState({});

  const [registeredUser, setRegisteredUser] = useState([]);

  const schema = Yup.object().shape({
    ID: Yup.number().required().positive().integer().max(99999999999,"Must be exactly 11 digits").min(10000000000, "Must be exactly 11 digits"),
    EMAIL: Yup.string().email().required().matches(/@somaiya\.edu$/,"Must end with @Somaiya.edu"),
    PASSWORD: Yup.string().required().min(8).max(12),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    schema.validate(formData, { abortEarly: false })
      .then(() => {
        console.log(formData);
        // Simulate login process - replace this with actual authentication logic
        // Redirect user to dashboard based on role
        const userExists = registeredUser.find(user=> user.ID === formData.ID && user.EMAIL === formData.EMAIL && user.PASSWORD === formData.PASSWORD)
        if(userExists){
          console.log("User Exists");
          // navigate("/dashboard");
        }else{
          setErrors({message: "User not found!, Register First!."})
        }
        
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  const navigate = useNavigate();
  
  const navigateToRegisterPage = () => {
    navigate("./RegisterPage");
  }

  useEffect(() => {
    const userRef = db.collection("users");
    userRef.on("value", (snapshot) => {
      const users = snapshot.val();
      if(users){
        const usersArray = Object.key(users).map(key => ({
          ID:users[key].ID,
          EMAIL:users[key].EMAIL,
          PASSWORD:users[key].PASSWORD,
        }))
        setRegisteredUser(usersArray);
      }
    })
    return () => {
      userRef.off("value");
    }
  }, [])

  return (
    <div className="Login">
      <div>
        <div className="welcome">
          <h2 className="welcometext">Welcome to Attendify</h2>
        </div>
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
            <input className="btn" type="submit" value="Login" />
          </div>
        </form>
      </div>
      <div>
        <button onClick={navigateToRegisterPage} className="btn">Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
