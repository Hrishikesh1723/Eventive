const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/connection");
const User = require("../moduls/userSchema");
const Event = require("../moduls/eventSchema");

router.use(cookieParser());

// main page
router.get(`/`, (req, res) => {
  res.send(`Hello World! xyz`);
});

// registration
router.post("/register", async (req, res) => {
  console.log(req)
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Please enter full detail!" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already exist" });
    } else if (password != cpassword) {
      return res.status(400).json({ error: " Password did not match" });
    } else {
      const user = new User({
        name,
        email: email.toLowerCase(),
        password,
        cpassword,
      });
 
      await user.save();

      res.status(201).json({ message: "Resgistration successfull!" });
    }
  } catch (err) {
    console.log(err);
  }
  return
});

// login
router.post("/login", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: " Please fill data!" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const passwordMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!passwordMatch) {
        res.status(400).json({ message: "Invalid Credentials!" });
      } else {
        res.status(200).json({ message: "Login Successfull!" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials!" });
    }
  } catch (err) {
    console.log(err);
  }
  return
});

// profile Page
router.get(`/about`, authenticate, (req, res) => {
  res.send(req.rootUser);
});
// User Home Page
router.get(`/userhome`, authenticate, (req, res) => {
  res.send(req.rootUser);
});
// User Event Page
router.get(`/uevents`, authenticate, (req, res) => {
  res.send(req.rootUser);
});
// User registerd event Page
router.get(`/myevent`, authenticate, (req, res) => {
  res.send(req.rootUser);
});
// logout
router.get(`/logout`, (req, res) => {
  console.log("User logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});
// User registerd event Page
router.post(`/registerevent`, authenticate, async (req, res) => {
  try {
    const { title, detail, date, time, venue, image, uname, uemail } = req.body;

    if (
      !title ||
      !detail ||
      !date ||
      !time ||
      !venue ||
      !uname ||
      !uemail ||
      !image
    ) {
      return res.json({ error: "Empty Data!" });
    }

    const userEvent = await User.findOne({ _id: req.userID });

    //checking that if event already exist.
    const userEvent1 = await User.findOne({ _id: req.userID }, {
      events:{
         $elemMatch:{title: title }}})

    if(userEvent1.events?.length ===  0){

      const eventInfo = await Event.findOne({ title: title });

      if (eventInfo) {
        const addUD = await eventInfo.addUserDetail(uname, uemail);

        await eventInfo.save();

        res.status(200).json({ message: "User details added!" });
      } else {
        res.status(400).json({ message: "User details not added!" });
      }

      if (userEvent) {
        const addEve = await userEvent.addEvents(
          title,
          detail,
          date,
          time,
          venue,
          image
        );
  
        await userEvent.save();
  
        res.status(200).json({ message: "Event registered" });
      } else {
        res.status(400).json({ message: "Event not registered" });
      }
    }else{
      res.status(401).json({ message: "Event already registered" });
    }
    
  } catch (error) {
    console.log(error);
  }
  return
});

module.exports = router;
