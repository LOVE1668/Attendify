import "../Login/LoginPage.css";
import { useState , useEffect } from "react";
import {db} from "../../config/firebase";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import {  ref , onValue , push} from "firebase/database";

const StaffCred = () => {
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
  const onSubmit = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      const userExists = registeredUser.some(user => user.ID === formData.ID && user.EMAIL === formData.EMAIL);
    if (userExists) {
      alert("User already exists!");
      return; // Exit the function without pushing data if user already exists
    }
      await pushDataToFirebase(formData);
      alert("Registered Successfully");
      navigate("/"); // Redirect to login page or any other page
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
  const navigate = useNavigate();

  const pushDataToFirebase = async (formData) => {
    try {
      const usersRef = ref(db, 'staff'); // Create a reference to the "users" node
      await push(usersRef, formData); // Push data to the "users" node
      console.log("Data pushed to Firebase successfully");
    } catch (error) {
      console.error("Error pushing data to Firebase:", error);
      throw error; // Rethrow the error to handle it at the component level if needed
    }
  };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     schema.validate(formData, { abortEarly: false })
//       .then(() => {
//         console.log(formData);
//         // Simulate login process - replace this with actual authentication logic
//         // Redirect user to dashboard based on role
//         const userExists = registeredUser.find(user=> user.ID === formData.ID && user.EMAIL === formData.EMAIL && user.PASSWORD === formData.PASSWORD)
//         if(userExists){
//           console.log("User Exists");
//           if(formData.ID === "31010921000" ){
//             console.log("yetohadminkiidhai")

//           }
//           else{
//             // navigate("/student")

//           }
          
//         }else{
//           // setErrors({message: "User not found!, Register First!."})
//           alert("User not found!, Register First!.")
//         }
        
//       })
//       .catch((err) => {
//         const validationErrors = {};
//         err.inner.forEach((error) => {
//           validationErrors[error.path] = error.message;
//         });
//         setErrors(validationErrors);
//       });
//   };

  
  const backButton = () => {
    
  }

  useEffect(() => {
    const usersRef = ref(db, 'staff');
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      if(users){
        const usersArray = Object.keys(users).map(key => ({
          ID:users[key].ID,
          EMAIL:users[key].EMAIL,
          PASSWORD:users[key].PASSWORD,
        }))
        setRegisteredUser(usersArray);
      }
    })
}
  , [])

  return (
    <div className="Login">
      <div>
        <div className="studentlogin">
          <h2 className="welcome">CREATE FACULTY</h2>
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
            <input className="button" type="submit" value="Create" />
          </div>
        </form>
      </div>
      <div>
        <button onClick={backButton} className="button">Back</button>
      </div>
    </div>
  );
};

export default StaffCred;
