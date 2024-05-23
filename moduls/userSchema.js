const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Defining user datatypes
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cpassword: {
    type: String,
    require: true,
  },
  events: [
    {
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
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

// adding registred events
userSchema.methods.addEvents = async function (
  title,
  detail,
  date,
  time,
  venue,
  image
) {
  try {
    this.events = this.events.concat({
      title,
      detail,
      date,
      time,
      venue,
      image,
    });
    await this.save();
    return this.events;
  } catch (error) {
    console.log(error);
  }
};

// securing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// generating Auth token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
