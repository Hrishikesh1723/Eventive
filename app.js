const express = require("express");
const router2 = express.Router();
require("./db/connection");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Event = require("../moduls/eventSchema");
const DataParser = require("datauri/parser.js")
const cloudinary = require('cloudinary')
const path = require("path")

//stroge to image file in backend
const storage = multer.memoryStorage();

const parser = new DataParser();

const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

let upload = multer({ storage });

// Adding event
router2.post("/addevent", upload.single("image"), async (req, res) => {
  const { title, detail, date, time, venue } = req.body;
  const file = formatImage(req.file);
  const response = await cloudinary.v2.uploader.upload(file);
  const image = response.secure_url;
  const imageUrl = response.public_id;

  if (!title || !detail || !date || !time || !venue) {
    return res.status(422).json({ error: "Please enter full detail!" });
  }

  try {
    const eventExist = await Event.findOne({ title: title });

    if (eventExist) {
      return res.status(422).json({ error: "Event title Already exist" });
    } else {
      const event = new Event({ title, detail, date, time, venue, image, imageUrl });

      await event.save();

      res.status(201).json({ message: "event added" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router2;
