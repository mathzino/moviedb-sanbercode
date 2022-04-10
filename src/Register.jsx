import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

const Register = () => {
  let history = useHistory();
  const [input, setInput] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`https://backendexample.sanbersy.com/api/register`, {
        name: input.name,
        email: input.email,
        password: input.password,
      })
      .then((res) => {
        console.log(res);
        history.push("/login");
      });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <h1 style={{ fontSize: "40px", margin: "10px auto", textAlign: "center" }}>Register Page</h1>
        <div className="list-form" style={{ margin: "0 auto", width: "50%", padding: "50px" }}>
          <form onSubmit={handleSubmit}>
            <label>user name: </label>
            <input type="text" name="name" onChange={handleChange} value={input.name} />
            <br />
            <label>email: </label>
            <br />
            <input type="text" name="email" onChange={handleChange} value={input.email} />
            <br />
            <label>Password: </label>
            <input type="password" name="password" onChange={handleChange} value={input.password} />
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
