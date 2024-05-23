import React, { useState, useEffect } from "react";
import Anavbar from "./Anavbar";
import { useNavigate, useParams } from "react-router-dom";
import { MdSubtitles } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Footer from "./Footer";
import About1 from "../images/about1.png";

const Edit = () => {
  let navigate = useNavigate("");
  const [userData, setUserData] = useState("");
  const params = useParams("");

  useEffect(() => {
    console.log(params);
    getEventDetail();
  }, []);

  //Getting event details using id.
  const getEventDetail = async () => {
    console.log(params);
    let resp = await fetch(`/event/${params.id}`);
    resp = await resp.json();
    console.log(resp);
    setEvent({
      ...event,
      title: resp.title,
      detail: resp.detail,
      date: resp.date,
      time: resp.time,
      venue: resp.venue,
      image: resp.image,
    });
  };

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

  //Defining event data.
  const [event, setEvent] = useState({
    title: "",
    detail: "",
    date: "",
    time: "",
    venue: "",
  });

  //Handling the inputs and setting them to Event data.
  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setEvent({ ...event, [name]: value });
  };

  //sending data to backend with id to update data
  const updateData = async (e) => {
    e.preventDefault();

    const { title, detail, date, time, venue } = event;

    try {
      let resp = await fetch(`/event/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          detail,
          date,
          time,
          venue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      resp = await resp.json();
      window.alert("Event Updated successfully!");
      navigate("/aevents");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Anavbar />
      <div className="containerBox1">
        <div className="container2">
          <div className="imgcontainer">
            <img
              src={
                event.image !== undefined
                  ? `http://localhost:5000/images/${event.image}`
                  : { About1 }
              }
              className="eventImageEdit"
            />
          </div>
          <div className="editDetails">Title: {event.title}</div>
          <div className="editDetails">Date: {event.date}</div>
          <div className="editDetails">Time: {event.time}</div>
          <div className="editDetails">Venue: {event.venue}</div>
        </div>
        <div className="container1-flaot">
          <div>
            <div className="Update-page">Update Event</div>
            <form method="PUT">
              <div className="editInput">
                <MdSubtitles size={25} />
                <label classname="editLable">Title</label>
                <input
                  type="text"
                  value={event.title}
                  placeholder="Title"
                  className="name1 name2"
                  onChange={handleInput}
                  name="title"
                />
              </div>
              <div className="editInput">
                <BiMessageDetail size={25} />
                <label classname="editLable">Details</label>
                <textarea
                  type="text"
                  value={event.detail}
                  placeholder="Details"
                  className="name1 "
                  onChange={handleInput}
                  name="detail"
                />
              </div>
              <div className="editInput">
                <BsCalendarDate size={25} />
                <label>Date</label>
                <input
                  type="text"
                  value={event.date}
                  placeholder="Date"
                  className="name1 name3"
                  onChange={handleInput}
                  name="date"
                />
              </div>
              <div className="editInput">
                <BiTimeFive size={25} />
                <label classname="editLable">Time</label>
                <input
                  type="text"
                  value={event.time}
                  placeholder="Time"
                  className="name1 name3"
                  onChange={handleInput}
                  name="time"
                />
              </div>
              <div className="editInput">
                <HiHome size={25} />
                <label classname="editLable">Venue</label>
                <input
                  type="text"
                  value={event.venue}
                  placeholder="Venue"
                  className="name1 name4"
                  onChange={handleInput}
                  name="venue"
                />
              </div>
              <div className="padding2">
                <input
                  type="submit"
                  name="Edit"
                  className="login-button"
                  onClick={updateData}
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edit;
