import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Anavbar from "./Anavbar";
import Footer from "./Footer";
import user from "../images/usericon.jpg"

const Registereduser = () => {
  let navigate = useNavigate("");
  const [userData, setUserData] = useState("");
  const params = useParams("");
  const [event, setEvent] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(params);
    getEventDetail();
  }, []);

  //Getting event details by id.
  const getEventDetail = async () => {
    console.log(params);
    let resp = await fetch(`/event/${params.id}`);
    resp = await resp.json();
    console.log(resp);
    setUsers(resp.registeredUsers);
    setEvent({
      ...event,
      title: resp.title,
      detail: resp.detail,
      date: resp.date,
      time: resp.time,
      venue: resp.venue,
      id: params.id,
    });
  };

  // Getting data of current admin and authenticating the admin.
  const callUserData = async () => {
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
    callUserData();
  }, []);

  //sendemail to all registered user.
  const sendEmail = async (e) => {
    e.preventDefault();
    const res = await fetch(`/sendEmail/${event.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject:content.subject,
        message:content.message
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Mail Failed!");
      console.log("Mail Failed!");
    } else {
      window.alert("Mail successful!");
      console.log("Mail successful!");
    }
  };
  
  //defind data for email
  const [content, setContent] = useState({
    subject: "",
    message: "",
  });

  //setting data for email to send
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setContent({ ...content, [name]: value });
  };

  //display registered user data  individually.
  const Record = (props) => (
    <div className="containerU">
    <div className='eventImgU'>
      <div >
        <img src={user} className='eventImageU' />
      </div>
    </div>
      <div className='ruserMain'>
        <div className="info">Name: {props.record.name}</div>
        <div className="info">Email: {props.record.email}</div>
      </div>
      <hr />
    </div>
  );

  return ( 
    <>
      <Anavbar />
    <div className="titleHead">
    Registered User
    </div>
      {users && users.length? (
      <div>
        {users?.map((eve) => (
          <Record record={eve} key={eve._id} />
        ))}
      </div>
      ):<div className="alternativeBlock">
          No Rgistration for this event yet!
        </div>}
      <div className="bg-color-g">
      <div className="message">
       <p>&#8594; Message to all registered Users: </p>
      </div>
      <div className="sendEmailBox">  
        <div className="sendEmailBox1">
          <div className="titleHead1">
            Email
          </div>
      <form method="POST">
        <div className="Subjectcont">
        <label className="sublabel">
          Subject: 
        </label>
        <input
          type="text"
          className="subjectBox"
          placeholder="Subject"
          name="subject"
          autocomplete="off"
          value={content.subject}
          onChange={handleInputs}
        />
        </div>
        
        <div className="Msgjectcont">
        <label className="msglabel">
          Message: 
        </label>
        <div >
        <textarea
          type="text"
          placeholder="message to registered users..."
          className="messageBox"
          name="message"
          autocomplete="off"
          value={content.message}
          onChange={handleInputs}
        />
        </div>
        </div>
        <div>
        <input
          type="submit"
          name="SignUp"
          className="button-2 padding-left"
          onClick={sendEmail}
          value="SEND MAIL"
        />
        </div>
      </form>
      </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default Registereduser;
