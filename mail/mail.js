const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "badar.masood@devsinc.com",
    pass: "aupntbulvfxknouh",
  },
});

const mailOptions = {
  from: "badar.masood@devsinc.com",
  to: "dpu76765@omeie.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

module.exports = {
  transporter,
  mailOptions,
};
