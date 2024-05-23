import React, { useState, useEffect } from "react";
import Anavbar from "./Anavbar";
import login from "../images/login.jpg";
import Addadmin from "../images/Addadmin.png";
import { BiLock } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const AddAdmin = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState();

  // Getting data of current admin and authenticating the admin.
  const adminData = async () => {
    try {
      const res = await fetch("/adminhome", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/admin");
    }
  };

  useEffect(() => {
    adminData();
  }, []);

  //Defining new admin data.
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Handling the inputs and setting them to new admin data.
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setAdmin({ ...admin, [name]: value });
  };

  //adding new admin data to database.
  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password } = admin;

    const res = await fetch("/addadmin", {
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

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Registration Failed!");
      console.log("Registration Failed!");
    } else {
      window.alert("Registration successful!");
      console.log("Registration successful!");
      navigate("/adminhome");
    }
  };
  return (
    <>
      <Anavbar />
      <div className="containerBox">
        <div className="container-flaot">
          <div>
            <div className="img5">
              <div className="img-container">
                <img src={login} atl="login img" className="login" />
              </div>
            </div>
            <div className="login-page">Add Admin</div>
            <form method="POST">
              <div className="firstInput">
                <FiUser size={25} />
                <input
                  type="text"
                  placeholder="Username"
                  className="name"
                  name="name"
                  autocomplete="off"
                  value={admin.name}
                  onChange={handleInputs}
                />
              </div>
              <div className="secondInput">
                <MdOutlineMail size={25} />
                <input
                  type="text"
                  placeholder="Email"
                  className="name"
                  name="email"
                  autocomplete="off"
                  value={admin.email}
                  onChange={handleInputs}
                />
              </div>
              <div className="secondInput">
                <BiLock size={25} />
                <input
                  type="password"
                  placeholder="Password"
                  className="name"
                  name="password"
                  autocomplete="off"
                  value={admin.password}
                  onChange={handleInputs}
                />
              </div>
              <div className="padding1">
                <input
                  type="submit"
                  name="SignUp"
                  className="login-button"
                  onClick={postData}
                  value="Add Admin"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="container-flaot3">
          <img src={Addadmin} alt="Login Image" className="Loginimg" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddAdmin;
