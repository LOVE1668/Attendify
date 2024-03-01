import "./RegisterPage.css";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterPage = () => {

    const schema = Yup.object().shape({
    NAME: Yup.string().required(),
    MIDDLENAME: Yup.string().required(),
    LASTNAME: Yup.string().required(),
    ID: Yup.number().required().positive().integer(),
    EMAIL: Yup.string().email().required(),
    PASSWORD: Yup.string().required().min(8).max(12),
    CONFIRMPASSWORD: Yup.string().oneOf([Yup.ref("PASSWORD"), null]).required(),
    })

const {register, handleSubmit, formState: {errors}} = useForm({
    resolver:yupResolver(schema)
})
const onSubmit = (data) => {
    console.log(data)
    console.log("Registered Succesfully")
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
        <button className="btn">Register</button>
      </div>
    </div>

)};

export default RegisterPage;
