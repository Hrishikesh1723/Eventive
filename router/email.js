require("dotenv").config();
const router = require("express").Router();
const path = require("path");
const nodemailer = require("nodemailer");

const Event = require("../moduls/eventSchema");
 
//connection details to mail servies.
const transport = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.SMTP_TO_EMAIL,
    pass: process.env.SMTP_TO_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    //if error happened code ends here
    console.error(error);
  } else {
    //this means success
    console.log("Ready to send mail!");
  }
});

//sending email to each user using id.
router.post("/sendEmail/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  Event.findById(eventId, (err, reqEvent) => {
    reqEvent.registeredUsers?.forEach((user) => {
      const mail = {
        from: process.env.SMTP_FROM_EMAIL,
        to: user.email,
        subject: req.body.subject,
        text: `
              Dear ${user.name},
        
              ${req.body.message}
              
              from:
              Eventive!
              regards`,
      };
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            status: "fail",
          });
        } else {
          res.json({
            status: "success",
          });
        }
      });
    });
  });
});

//sending email
router.post("/sendemail", (req, res, next) => {
  const mail = {
    from: process.env.SMTP_FROM_EMAIL,
    to: req.body.toemail,
    subject: req.body.subject,
    text: `
      Dear ${req.body.uname},

      ${req.body.message}
      
      from:
      ${req.body.name}
      regards`,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

//Sending email for registered event
router.post("/sendEventemail", (req, res, next) => {
  const mail = {
    from: process.env.SMTP_FROM_EMAIL,
    to: req.body.toemail,
    subject: req.body.subject,
    text: `
      Dear ${req.body.uname},

      ${req.body.message}
      
      from:
      ${req.body.name}
      regards`,

    html: `
    <h2>Dear ${req.body.uname},</h2>
    <br/>
    <br/>
    <img src="cid:uniq-${req.body.image}" style="width:400px; height:600px"/>
    <br/>
    <br/>
    <br/>
    <br/>
    <h4>${req.body.message}</h4>
    <br/>
    <br/>
    <h3>${req.body.title}</h3>
    <h5>${req.body.edetail}</h5>
    <h4>Date: ${req.body.edate}</h4>
    <h4>Time: ${req.body.etime}</h4> 
    <h4>Venue: ${req.body.evenue}</h4>
    <br/>
    <br/>
    <h4>${req.body.msg1}</h4>
    <h4>${req.body.msg2}.&#129321;&#129321;</h4>
    <h4>from:</h4>
    <h4>${req.body.name}!</h4>
    <h4>regards</h4> 
    </p>
    `,
    attachments: [
      {
        filename: req.body.image,
        path: "../server/images/" + req.body.image,
        cid: "uniq-" + req.body.image,
      },
    ],
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
  return
});

module.exports = router;
