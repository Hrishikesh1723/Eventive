const express = require("express");
const jwt = require("jsonwebtoken");
const router3 = express.Router();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const adminAuthenticate = require("../middleware/adminAuthantication");

require("../db/connection");
const Admin = require("../moduls/adminSchema");

router3.use(cookieParser());

// registration
router3.post("/addadmin", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please enter full detail!" });
  }

  try {
    const admin = new Admin({ name, email, password });

    await admin.save();

    res.status(201).json({ message: "admin added" });
  } catch (err) {
    console.log(err);
  }
  return
});

// login
router3.post("/admin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: " Please fill data!" });
    }

    const adminLogin = await Admin.findOne({ email: email });

    if (adminLogin) {
      const passwordMatch = await bcrypt.compare(password, adminLogin.password);

      token = await adminLogin.generateAuthToken();

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
// Add Admin page
router3.get(`/addadmin`, adminAuthenticate, (req, res) => {
  res.send(req.rootAdmin);
});
// Admin Home Page
router3.get(`/adminhome`, adminAuthenticate, (req, res) => {
  res.send(req.rootAdmin);
});
// Admin Event Page
router3.get(`/aevents`, adminAuthenticate, (req, res) => {
  res.send(req.rootAdmin);
});
// Add Event Page
router3.get(`/addevent`, adminAuthenticate, (req, res) => {
  res.send(req.rootAdmin);
});

// Registered user list
router3.get(`/myuser`, adminAuthenticate, (req, res) => {
  res.send(req.rootAdmin);
});

// logout
router3.get(`/logout`, (req, res) => {
  console.log("Admin logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("Admin logout");
});

module.exports = router3;
