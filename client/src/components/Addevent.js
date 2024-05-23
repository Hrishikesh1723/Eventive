import React, { useState, useEffect } from "react";
import Anavbar from "./Anavbar";
import axios from "axios";
import login from "../images/login.jpg";
import AddEvent from "../images/Addevent.png";
import { useNavigate } from "react-router-dom";
import { MdSubtitles } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { HiHome, HiOutlineStar } from "react-icons/hi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Footer from "./Footer";

const Addevent = () => {
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

  //Defining new event data.
  const [event, setEvent] = useState({
    title: "",
    detail: "",
    date: "",
    time: "",
    venue: "",
    image: "",
  });

  //Handling the inputs and setting them to new Event data.
  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setEvent({ ...event, [name]: value });
  };

  //Handling the inputs of image and setting it to new Event data.
  const handlePhoto = (e) => {
    setEvent({ ...event, image: e.target.files[0] });
  };

  //adding new event data to database.
  const postData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    try {
      formData.append("image", event.image);
      formData.append("title", event.title);
      formData.append("detail", event.detail);
      formData.append("date", event.date);
      formData.append("time", event.time);
      formData.append("venue", event.venue);

      const res = await axios.post("http://localhost:5000/addevent", formData);
      console.log(res);

      if (res.status === 422) {
        window.alert("Failed!");
        console.log("Failed!");
      } else {
        window.alert("Event added");
        console.log("Event added");
        navigate("/aevents");
      }
    } catch (error) {
      window.alert("Incomplete Details!");
    }
  };

  return (
    <>
      <Anavbar />
      <div className="containerBox">
        <div className="container-flaot1">
          <div>
            <div className="img5">
              <div className="img-container">
                <img src={login} atl="login img" className="login" />
              </div>
            </div>
            <div className="login-page">Add Event</div>
            <form method="POST">
              <div className="firstInput">
                <MdSubtitles size={25} />
                <input
                  type="text"
                  value={event.title}
                  placeholder="Title"
                  className="name"
                  onChange={handleInput}
                  name="title"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <BiMessageDetail size={25} />
                <textarea
                  type="text"
                  value={event.detail}
                  placeholder="Details"
                  className="textarea"
                  onChange={handleInput}
                  name="detail"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <BsCalendarDate size={25} />
                <input
                  type="date"
                  value={event.date}
                  placeholder="Date"
                  className="name"
                  onChange={handleInput}
                  name="date"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <BiTimeFive size={25} />
                <input
                  type="text"
                  value={event.time}
                  placeholder="Time"
                  className="name"
                  onChange={handleInput}
                  name="time"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <HiHome size={25} />
                <input
                  type="text"
                  value={event.venue}
                  placeholder="Venue"
                  className="name"
                  onChange={handleInput}
                  name="venue"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <MdOutlineAddPhotoAlternate size={25} />
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id="inputTag"
                    className="inputimg"
                    name="image"
                    onChange={handlePhoto}
                  />
              </div>
              <div className="padding1">
                <input
                  type="submit"
                  name="Addevent"
                  className="login-button"
                  onClick={postData}
                  value="Add Event"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="container-flaot3">
          <img src={AddEvent} alt="Login Image" className="Loginimg1" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Addevent;
