const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "freddelan59450@gmail.com",
    pass: "eaglhzhgubozfubj",
  },
});

module.exports = transporter;
