require("../db/connection");
const Event = require("../moduls/eventSchema");
const User = require("../moduls/userSchema");

//updating the existing event.
updateEvent = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Event.findOne({ _id: req.params.id }, (err, event) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Event not found!",
      });
    }
    event.title = body.title;
    event.detail = body.detail;
    event.date = body.date;
    event.time = body.time;
    event.venue = body.venue;
    event
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: event._id,
          message: "Event updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Event not updated!",
        });
      });
  });
};

//deleting the existing event.
deleteEvent = async (req, res) => {
  await Event.findOneAndDelete({ _id: req.params.id }, (err, event) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!event) {
      return res.status(404).json({ success: false, error: `Event not found` });
    }

    return res.status(200).json({ success: true, data: event });
  }).catch((err) => console.log(err));
};

//removing event from user registration.
deleteUserEvent = async (req, res) => {
  console.log(req.body);
  await User.findByIdAndUpdate(
    { _id: req.body.id },
    { $pull: { events: { _id: req.params.id } } },
    { safe: true, multi: false }
  );
  await Event.findOneAndUpdate(
    { title: req.body.title },
    { $pull: { registeredUsers: { email: req.body.email } } },
    { safe: true, multi: false }
  );
  return res.status(200).json({ message: "event Deleted Successfully" });
};

//getting event by id.
getEventById = async (req, res) => {
  await Event.findOne({ _id: req.params.id }, (err, event) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!event) {
      return res.status(404).json({ success: false, error: `Event not found` });
    }
    return res.status(200).json(event);
  }).catch((err) => console.log(err));
};

//getting all events in database.
getEvents = async (req, res) => {
  await Event.find({}, (err, events) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!events.length) {
      return res.status(404).json({ success: false, error: `Event not found` });
    }
    return res
      .status(200)
      .json({ success: true, size: events.length, data: events });
  }).catch((err) => console.log(err));
};

module.exports = {
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById,
  deleteUserEvent,
};
