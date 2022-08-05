import React from "react";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "../components/css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  async function loginUser(event) {
    event.preventDefault();

    const responce = await fetch("http://localhost:8003/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await responce.json();

    if (data) {
      if (data.message) {
        setError(data.message);
      } else {
        localStorage.setItem("token", data);
        alert("Login Successful");
        window.location.href = "/home";
      }
    }

    console.log(data);

  }



  return (
    <div>
      <section className="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div class="row gx-lg-5 align-items-center mb-5">
            <div class="col-lg-6 mb-5 mr-10 mb-lg-0 custom-z-index">
              <div class="custom-height">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  class="img-fluid"
                  alt="Phone image"
                />
              </div>
            </div>

            <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                class="position-absolute rounded-circle shadow-5-strong custom-shape"
              ></div>
              <div
                id="radius-shape-2"
                class="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div class="card-body px-4 py-5 px-md-5">
                  {error ? (
                    <>
                      <div>
                        <h6 className="custom-error-login">{error}</h6>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={loginUser}>
                      <div class="form-outline mb-4">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Email"
                          class="form-control custom-control form-control-lg"
                          id="form1Example13"
                        />

                        <label class="form-label" for="form1Example13">
                          Email address
                        </label>  
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          class="form-control form-control-lg custom-control"
                          id="form1Example23"
                        />
                        <label class="form-label" for="form1Example23">
                          Password
                        </label>
                      </div>

                      <div class="d-flex justify-content-around align-items-center mb-4">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="form1Example3"
                          />
                          <label
                            class="form-check-label custom-space"
                            for="form1Example3"
                          >
                            {" "}
                            Remember me{" "}
                          </label>
                        </div>
                        <a className="rightGo" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary btn-lg btn-block custom-btn-login"
                      >
                        Log In
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
