import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../components/css/RegisterUser.css";

export default function RegisterUser() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    const responce = await fetch("http://localhost:8003/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await responce.json();

    console.log(data);
    console.log(data.status);

    if(data) {
      setError(data.message)
    }

    if (data.status === "ok") {
      history.push("/login");
    }
  }

  return (
    <div>
      <section className="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div class="row gx-lg-5 align-items-center mb-5">
            <div class="col-lg-6 mb-5 mb-lg-0 custom-z-index">
              <h1 class="my-5 display-5 fw-bold ls-tight">
                sFarkhod <br />
                <span>User Management System</span>
              </h1>
              <p class="mb-4 opacity-70">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
              </p>
            </div>

            <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                class="position-absolute rounded-circle shadow-5-strong"
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
                        <h6 className="custom-error">{error}</h6>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {/* forms started here */}
                  <form onSubmit={registerUser}>
                    <div class="row">
                      <div class="mb-4">
                        <div class="form-outline">
                          <input
                            id="form3Example1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                          />
                          <label class="form-label" for="form3Example1">
                            First name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="form3Example3"
                        className="form-control"
                      />
                      <label class="form-label" for="form3Example3">
                        Email address
                      </label>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        id="form3Example4"
                      />
                      <label class="form-label" for="form3Example4">
                        Password
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4 custom-btn"
                    >
                      Sign up
                    </button>

                    <div class="text-center">
                      <p>or sign up with:</p>
                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-facebook-f"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-google"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-twitter"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-github"></i>
                      </button>

                      <div class="text-center text-lg-start pt-2 custom-center">
                        <p class="small fw-bold mt-2 pt-1 mb-0">
                          Already have an account?{" "}
                          <a
                            href="http://localhost:3000/login"
                            class="link-danger"
                          >
                            Login
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
