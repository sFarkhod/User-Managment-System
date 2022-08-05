import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import "./css/Register.css";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);

  const history = useHistory();

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    statusUser: "",
    password: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, statusUser, password } = inpval;

    const res = await fetch("http://localhost:8003/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        statusUser,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      history.push("/home");
      setUdata(data);
      console.log("data added");
    }
  };

  return (
    <>
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="button-for-registersss">
        <button className="btn btn-success"><NavLink className={"navlink-custom-for-add"} to="/">HOME</NavLink></button>
      </div>
      <div className="container custom-design-for-registersss">
        <form className="mt-4">
          <div className="row">
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                value={inpval.name}
                onChange={setdata}
                name="name"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                email
              </label>
              <input
                type="email"
                value={inpval.email}
                onChange={setdata}
                name="email"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                value={inpval.password}
                onChange={setdata}
                name="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputPassword1" class="form-label">
                Status
              </label>
              <input
                type="text"
                value={inpval.statusUser}
                onChange={setdata}
                name="statusUser"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" onClick={addinpdata} class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
