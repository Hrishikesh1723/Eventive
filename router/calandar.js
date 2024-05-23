require("dotenv").config();
const { google } = require("googleapis");

const Credentials = JSON.parse(process.env.CREDENTIALS);
const CalendarId = process.env.CALENDAR_ID;

const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  Credentials.client_email,
  null,
  Credentials.private_key,
  SCOPES
);

const TIMEOFFSET = "+5:30";
