import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Anavbar from "./Anavbar";
import Footer from "./Footer";
import About1 from "../images/about1.png";

function Aevents() {
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

  //delete an event from the data base using id.
  const deleteEve = async (id) => {
    if (window.confirm("Do you really want to delete the event")) {
      const res = await fetch(`/event/${id}`, { method: "DELETE" });
      if (res === 400) {
        console.log(res);
      } else {
        console.log(res);
      }
      callEventsData();
    }
  };

  useEffect(() => {
    adminData();
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

  //display events individually.
  const Record = (props) => (
    <div className="containerE">
      <div className="eventImg">
        <div>
        {props.record.image !== undefined ? (
          <img src={props.record.image} alt="event" className="eventImage" />
        ) : (
          <img src={About1} alt="event" className="eventImage" />
        )}
        </div>
      </div>
      <div className="eventMain">
        <div className="Title">{props.record.title}</div>
        <div className="details">{props.record.detail}</div>
        <div className="info">Date: {props.record.date}</div>
        <div className="info">Time: {props.record.time}</div>
        <div className="info">Venue: {props.record.venue}</div>
        <button
          className="button-1"
          onClick={() => deleteEve(props.record._id)}
        >
          Delete
        </button>
        <Link to={`/edit/${props.record._id}`} className="button-2">
          Edit
        </Link>
        <Link to={`/registrations/${props.record._id}`} className="button-3">
          Registration
        </Link>
      </div>
      <hr />
    </div>
  );
  return (
    <>
      <Anavbar />
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
}

export default Aevents;
