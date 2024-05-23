import React from "react";
import Navbar from "./Navbar";
import About from "../images/about.png";
import About1 from "../images/about1.png";
import Footer from "./Footer";
import Event1 from "../images/E2.jpg";
import Event2 from "../images/E4.jpg";
import Event3 from "../images/E9.jpg";

const home = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="bgcolor-1">
        <div className="img-bg">Eventive</div>
        <div className="main-container">
          <div className="sub-container1">
            <div className="eventive-container1">Eventive</div>
            <div className="eventive-container2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
              sapiente, aliquid culpa illo accusamus veritatis sint. Beatae
              adipisci magni iusto quis saepe harum, amet ab perferendis illum.
              Deserunt et non delectus, enim illo dignissimos accusamus.
            </div>
            <img src={About} alt="about image" className="aboutimg" />
          </div>
          <div className="sub-container2">
            <img src={About1} alt="about image" className="evntimg" />
            <div className="about-container1">About US</div>
            <div className="about-container2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
              sapiente, aliquid culpa illo accusamus veritatis sint. Beatae
              adipisci magni iusto quis saepe harum, amet ab perferendis illum.
              Deserunt et non delectus, enim illo dignissimos accusamus.
            </div>
          </div>
        </div>
        <div className="bgpic">
          <div className="about-container3">Events</div>
          <div className="eventDisplay">
            <div className="eventDisplay-cont1">
              <div className="event-card">
                <div>
                  <img src={Event1} alt="event-1" className="eventDisplayimg" />
                </div>
                <div className="eventDetails">
                  Title: Event 1
                  <br />
                  <br />
                  Detail:
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  facilis, sunt distinctio mollitia velit omnis totam quas
                  molestiae ipsum
                </div>
              </div>
              <div>
                <div>
                  <img src={Event2} alt="event-2" className="eventDisplayimg" />
                </div>
                <div className="eventDetails">
                  Title: Event 2
                  <br />
                  <br />
                  Detail:
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  facilis, sunt distinctio mollitia velit omnis totam quas
                  molestiae ipsum
                </div>
              </div>
              <div className="event-card">
                <div>
                  <img src={Event3} alt="event-3" className="eventDisplayimg" />
                </div>
                <div className="eventDetails">
                  Title: Event 3
                  <br />
                  <br />
                  Detail:
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  facilis, sunt distinctio mollitia velit omnis totam quas
                  molestiae ipsum
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default home;
