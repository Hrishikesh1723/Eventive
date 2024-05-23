import React, { useState, useEffect } from "react";
import Unavbar from "./Unavbar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import About1 from "../images/about1.png";

const Myevent = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState("");

  // Getting data of current user and authenticating the user.
  const callUserData = async () => {
    try {
      const res = await fetch("/myevent", {
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

  //remove registered event
  const deleteEve = async (id, title) => {
    console.log(userData._id);
    if (window.confirm("Do you really want to delete the event")) {
      const res = await fetch(`/userevent/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData._id,
          email: userData.email,
          title: title, 
        }),
      });

      if (res === 400) {
        console.log(res);
      } else {
        console.log(res);
      }
    }
    window.location.reload(true);
  };

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
          onClick={() => deleteEve(props.record._id,props.record.title)}
        >
          Remove
        </button>
      </div>
      <hr />
    </div>
  );
  useEffect(() => {
    callUserData();
  }, []);
  return (
    <>
      <Unavbar />
      <div className="titleHead">Event list</div>
      {userData.events && userData.events.length? (
      <div className="eventsMain">
        {userData.events?.reverse().map((eve) => (
          <Record record={eve} key={eve._id} />
        ))}
      </div>
      ):<div className="alternativeBlock">
          You have not registered any event yet!
        </div>}
      <Footer />
    </>
  );
};

export default Myevent;
