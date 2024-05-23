import React, { useEffect, useState } from "react";
import Unavbar from "./Unavbar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import About1 from "../images/about1.png";
import Footer from "./Footer";

const Uevent = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState("");

  // Getting data of current user and authenticating the user.
  const callUserData = async () => {
    try {
      const res = await fetch("/uevents", {
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
      navigate("/login");
    }
  };

  useEffect(() => {
    callUserData();
  }, []);
  const [events, setEvents] = useState([]);

  //Getting data of all events in the database.
  const callEventsData = async () => {
    try {
      const res = await fetch("/events", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const events = await res.json();
      console.log(events.data);
      setEvents(events.data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callEventsData();
  }, []);

  // sending data of registerd event
  const registerdEvent = async (title, detail, date, time, venue, image) => {
    const res = await fetch("/registerevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        detail,
        date,
        time,
        venue,
        image,
        uname: userData.name,
        uemail: userData.email,
      }),
    });
    console.log(res.status);
    if (res.status === 401) {
      alert("Event already registered!");
    } else {
      console.log(detail);
      //Send data ofregistered event to backend for sending confirmation mail.
      const resp = await fetch("/sendEventemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toemail: userData.email,
          uname: userData.name,
          subject: `${title} Registration successful!`,
          title: title,
          edetail: detail,
          edate: date,
          etime: time,
          evenue: venue,
          message: `You Have register For Event`,
          name: "Eventive",
          image: image,
          msg1: `Thankyou For Registration`,
          msg2: `We are Excited to see you there`,
        }),
      });

      const data = await res.json();

      if (!data) {
        console.log("event not register");
      } else {
        alert("Event registered");
      }
    }
  };

  //display events individually.
  const Record = (props) => (
    <div className="containerE">
      <div className="eventImg">
        <div>
          <img
            src={
              props.record.image !== undefined
                ? `http://localhost:5000/images/${props.record.image}`
                : { About1 }
            }
            className="eventImage"
          />
        </div>
      </div>
      <div className="eventMain">
        <div className="Title">{props.record.title}</div>
        <div className="details">{props.record.detail}</div>
        <div className="info">Date: {props.record.date}</div>
        <div className="info">Time: {props.record.time}</div>
        <div className="info">Venue: {props.record.venue}</div>
        <button
          className="button-3"
          onClick={() =>
            registerdEvent(
              props.record.title,
              props.record.detail,
              props.record.date,
              props.record.time,
              props.record.venue,
              props.record.image
            )
          }
        >
          Register
        </button>
      </div>
      <hr />
    </div>
  );
  return (
    <>
      <Unavbar />
      <div className="titleHead">Event list</div>
      {events && events.length? (
      <div className="eventsMain">
        {events.reverse().map((eve) => (
          <Record record={eve} key={eve._id} />
        ))}
      </div>
      ):<div className="alternativeBlock">
          No upcoming events!
        </div>}
      <Footer />
    </>
  );
};

export default Uevent;
