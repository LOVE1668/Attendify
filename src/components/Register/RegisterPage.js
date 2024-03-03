import "./RegisterPage.css";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
const RegisterPage = () => {

    const schema = Yup.object().shape({
    NAME: Yup.string().required(),
    MIDDLENAME: Yup.string().required(),
    LASTNAME: Yup.string().required(),
    ID: Yup.number().required().positive().integer().max(99999999999,"Must be exactly 11 digits").min(10000000000,"Must be exactly 11 digits"),
    EMAIL: Yup.string().email().required().matches(/@somaiya\.edu$/,"Must end with @Somaiya.edu"),
    PASSWORD: Yup.string().required().min(8).max(12),
    CONFIRMPASSWORD: Yup.string().oneOf([Yup.ref("PASSWORD"), null]).required(),
    })

const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver:yupResolver(schema)
})
const onSubmit = (data) => {
    console.log(data)
    alert("Registered Succesfully");
    reset();
}
const navigate = useNavigate();

const navigateToLoginPage = () => {
  navigate("");
}
const [selectedOption, setSelectedOption] = useState("");
const [selectedStream , setSelectedStream] = useState("");

const handleChange = (event) => {
  setSelectedOption(event.target.value);
}
const handleStream = (event) => {
    setSelectedStream(event.target.value);
}
    return(
    <div className="Login">
        <div>
        <div className="welcome">
          <h2 className="welcometext">Welcome to Attendify</h2>
        </div>
        <div className="studentlogin">
          <h2 className="welcometext">Student Register</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                type="text"
                className="textbox"
                placeholder="Enter Your First Name.:"
                {...register("NAME")}
                />
                {errors.NAME && <p>{errors.NAME.message}</p>}
            </div>
            <div>
                <input
                type="text"
                className="textbox"
                placeholder="Enter Your Middle Name.:"
                {...register("MIDDLENAME")}
                />
                {errors.MIDDLENAME && <p>{errors.MIDDLENAME.message}</p>}
            </div>
            <div>
                <input
                type="text"
                className="textbox"
                placeholder="Enter Your Last Name.:"
                {...register("LASTNAME")}
                />
                {errors.LASTNAME && <p>{errors.LASTNAME.message}</p>}
            </div>
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
          <div className="div">
          <label htmlFor="dropdown">Select Your Year: </label>
      <select id="dropdown" value={selectedOption} onChange={handleChange} {...register("YEAR")}>
        <option value="FY">FY</option>
        <option value="SY">SY</option>
        <option value="TY">TY</option>
      </select>
          </div>
          <div className="div">
            <label htmlFor="dropdown2">Select Your Stream: </label>
            <select id="dropdown2" value={selectedStream} onChange={handleStream} {...register("STREAM")} >
              <option value="IT">IT</option>
              <option value="IT Hons">IT Hons</option>
              <option value="CS">CS</option>
              <option value="CS Hons">CS Hons</option>
              <option value="BBA">BBA</option>
              <option value="BBA Hons">BBA Hons</option>
              <option value="BCA">BCA</option>
            </select>
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
            <input
              type="password"
            //   onChange={(event) => getPassword(event)}
              className="textbox"
              placeholder="Confirm Your Password.:"
              {...register("CONFIRMPASSWORD")}
            />
            {errors.CONFIRMPASSWORD && <p>{errors.CONFIRMPASSWORD.message}</p>}
          </div>
          <div>
            <input className="btn" type="submit" value="Register" />
          </div>
        </form>
      </div>
      <div>
        <button onClick = {navigateToLoginPage} className="btn">Login</button>
      </div>
    </div>

)};

export default RegisterPage;
