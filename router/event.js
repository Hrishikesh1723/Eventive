const express = require("express");
const router2 = express.Router();

require("../db/connection");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Event = require("../moduls/eventSchema");

//stroge to image file in backend
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

//getting image file
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

// Adding event
router2.post("/addevent", upload.single("image"), async (req, res) => {
  const { title, detail, date, time, venue } = req.body;
  const image = req.file.filename;

  if (!title || !detail || !date || !time || !venue) {
    return res.status(422).json({ error: "Please enter full detail!" });
  }

  try {
    const eventExist = await Event.findOne({ title: title });

    if (eventExist) {
      return res.status(422).json({ error: "Event title Already exist" });
    } else {
      const event = new Event({ title, detail, date, time, venue, image });

      await event.save();

      res.status(201).json({ message: "event added" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router2;
