const mongoose = require("mongoose");

//Defining event datatypes
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  venue: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  imageUrl:{
    type: String,
  },
  registeredUsers: [
    {
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
    },
  ],
});

// adding user details who have registered for the event
eventSchema.methods.addUserDetail = async function (name, email) {
  try {
    this.registeredUsers = this.registeredUsers.concat({ name, email });
    await this.save();
    return this.registeredUsers;
  } catch (error) {
    console.log(error);
  }
};

const Event = mongoose.model("EVENT", eventSchema);

module.exports = Event;
