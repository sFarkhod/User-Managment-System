import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { NavLink } from "react-router-dom";
import { adddata, deldata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  const history = useHistory();

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);

  const { updata, setUPdata } = useContext(updatedata);

  const { dltdata, setDLTdata } = useContext(deldata);

  const [error, setError] = useState("");

  const [isCheckUser, setCheckUser] = useState([]);

  const getdata = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8003/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        setUserdata(data);
        console.log("get data");
      }
    } catch (error) {
      console.log(error.message);
      history.replace("/error");
      // setError(error)
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  const blockuser = async (id) => {
    const userStatus = "block";

    const res3 = await fetch(`http://localhost:8003/block/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userStatus,
      }),
    });

    const blockeddata = await res3.json();
    console.log(blockeddata);
  };

  const freeuser = async (id) => {
    const freeStatus = "acitve";

    const res4 = await fetch(`http://localhost:8003/free/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        freeStatus,
      }),
    });

    const freeUserData = await res4.json();
    console.log(freeUserData);
  };

  const handleSelect = (e) => {
    const { name, checked, value } = e.target;

    if (name === "allSelect") {
      let tempUser = getuserdata.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUserdata(tempUser);
    } else {
      let tempUser = getuserdata.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUserdata(tempUser);
    }

    if (checked) {
      setCheckUser([...isCheckUser, value]);
    } else {
      setCheckUser(isCheckUser.filter((e) => e !== value));
    }
  };

  const alldelete = async (e) => {
    console.log(isCheckUser);

    const res8 = await fetch("http://localhost:8003/deleteall/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCheckUser,
      }),
    });

    const deleteAll = await res8.json();
    console.log(deleteAll);
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

      {udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show custom-div-for-users"
            role="alert"
          >
            <strong>{udata.name}</strong> added succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show custom-div-for-users"
            role="alert"
          >
            <strong>{updata.name}</strong> updated succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show custom-div-for-users"
            role="alert"
          >
            <strong>{dltdata.name}</strong> deleted succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container custom-div-for-users">
          <div className="mt-2">
            <button
              className="btn btn-danger button-delete-all"
              onClick={(e) => alldelete(e)}
            >
              DELETE
            </button>
          </div>
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add data
            </NavLink>
          </div>

          <table class="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">
                  <input
                    type="checkbox"
                    name="allSelect"
                    checked={
                      getuserdata.filter((user) => user?.isChecked !== true)
                        .length < 1
                    }
                    onChange={(e) => handleSelect(e)}
                    value={getuserdata.map((user) => {
                      return user._id;
                    })}
                  />
                </th>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">LastLogin</th>
                <th scope="col">RegisterTime</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {console.log(getuserdata)}
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          name={element.name}
                          checked={element?.isChecked || false}
                          value={element._id}
                          onChange={(e) => handleSelect(e)}
                        />
                      </td>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.statusUser}</td>
                      <td>{element.lastLogin}</td>
                      <td>{element.registrationTime}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          {" "}
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          {" "}
                          <button className="btn btn-primary">
                            <CreateIcon />
                          </button>
                        </NavLink>

                        <button
                          className="btn btn-danger"
                          onClick={() => blockuser(element._id)}
                        >
                          BLOCK
                        </button>

                        <button
                          className="btn btn-success"
                          onClick={() => freeuser(element._id)}
                        >
                          <GppGoodIcon />
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element._id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
