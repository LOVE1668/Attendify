import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
//   const [id, setId] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

  const schema = Yup.object().shape({
    ID: Yup.number().required().positive().integer().max(99999999999,"Must be exactly 11 digits").min(10000000000, "Must be exactly 11 digits"),
    EMAIL: Yup.string().email().required().matches(/@somaiya\.edu$/,"Must end with @Somaiya.edu"),
    PASSWORD: Yup.string().required().min(8).max(12),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

//   const getId = (event) => {
//     setId(event.target.value);
//   };

//   const getEmail = (event) => {
//     setEmail(event.target.value);
//   };

//   const getPassword = (event) => {
//     setPassword(event.target.value);
//   };

  const onSubmit = (data) => {
    console.log(data);
  };
  const navigate = useNavigate();
  
  const navigateToRegisterPage = () => {
    navigate("./RegisterPage");
  }

  return (
    <div className="Login">
      <div>
        <div className="welcome">
          <h2 className="welcometext">Welcome to Attendify</h2>
        </div>
        <div className="studentlogin">
          <h2 className="welcometext">Student Login</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="number"
            //   onChange={(event) => getId(event)}
              className="textbox"
              placeholder="Enter Your ID no.:"
              {...register("ID")}
            />
            {errors.ID && <p>{errors.ID.message}</p>}
          </div>
          <div>
            <input
              type="email"
            //   onChange={(event) => getEmail(event)}
              className="textbox"
              placeholder="Enter Your Email.:"
              {...register("EMAIL")}
            />
            {errors.EMAIL && <p>{errors.EMAIL.message}</p>}
          </div>
          <div>
            <input
              type="password"
            //   onChange={(event) => getPassword(event)}
              className="textbox"
              placeholder="Enter Your Password.:"
              {...register("PASSWORD")}
            />
            {errors.PASSWORD && <p>{errors.PASSWORD.message}</p>}
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
