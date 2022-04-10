import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
  let history = useHistory();
  const { loginStatus, setLoginStatus } = useContext(UserContext);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    let typeOfInput = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: typeOfInput });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://backendexample.sanbersy.com/api/user-login", {
        email: input.email,
        password: input.password,
      })
      .then((res) => {
        console.log(res);
        var user = res.data.user;
        var token = res.data.token;
        Cookies.set("user", user.name, { expires: 1 });
        Cookies.set("email", user.email, { expires: 1 });
        Cookies.set("password", user.password, { expires: 1 });
        Cookies.set("token", token, { expires: 1 });
        setLoginStatus(true);
        history.push("/");
        console.log(loginStatus);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className="container-login">
          <div className="image-login"></div>
          <div className="form-login" style={{ width: "50%" }}>
            <h1 style={{ fontSize: "40px", margin: "10px 20px" }}>Log In Page</h1>
            <form style={{ width: "80%", margin: "auto" }} onSubmit={handleSubmit} className="list-form">
              <label>Email : </label>
              <br />
              <input type="text" name="email" value={input.email} onChange={handleChange} />
              <br />
              <label>Password : </label>
              <br />
              <input type="password" name="password" value={input.password} onChange={handleChange} />
              <br />
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
