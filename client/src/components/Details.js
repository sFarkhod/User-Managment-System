import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useParams, useHistory } from "react-router-dom";
import './css/Details.css'

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams("");
  console.log(id);

  const history = useHistory();

  const getdata = async () => {
    const res = await fetch(`http://localhost:8003/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      history.push("/");
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

      <div className="container mt-6 custom-div-for-users div-center-for-details">
        <h1 style={{ fontWeight: 400 }}>
          Welcome to User Management System by sFarkhod
        </h1>

        <Card sx={{ maxWidth: 700 }}>
          <CardContent>
            <div className="add_btn">
              <NavLink to={`/edit/${getuserdata._id}`}>
                {" "}
                <button className="btn btn-primary mx-2">
                  <CreateIcon />
                </button>
              </NavLink>
              <button
                className="btn btn-danger"
                onClick={() => deleteuser(getuserdata._id)}
              >
                <DeleteOutlineIcon />
              </button>
            </div>
            <div className="row">
              <div className="left_view col-lg-6 col-md-6 col-12">
                <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                <h3 className="mt-3">
                  Name: <span>{getuserdata.name}</span>
                </h3>
                <h3 className="mt-3">
                  Last Login Time: <span>{getuserdata.lastLogin}</span>
                </h3>
                <p className="mt-3">
                  <MailOutlineIcon />
                  Email: <span>{getuserdata.email}</span>
                </p>
                <p className="mt-3">
                  <WorkIcon />
                  Status: <span>{getuserdata.statusUser}</span>
                </p>
              </div>
              <div className="right_view  col-lg-6 col-md-6 col-12">
                <p className="mt-5">
                  <PhoneAndroidIcon />
                  Registration Time:{" "}
                  <span> {getuserdata.registrationTime}</span>
                </p>
                {/* <p className="mt-3"><LocationOnIcon />location: <span>{getuserdata.add}</span></p>
                            <p className="mt-3">Description: <span>{getuserdata.desc}</span></p> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Details;
