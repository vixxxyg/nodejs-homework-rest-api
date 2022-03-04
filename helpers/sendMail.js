const nodemailer = require("nodemailer");
require("dotenv").config();

const { PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "viktoriiahilenko@meta.ua",
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (data) => {
  try {
    const newEmail = {
      ...data,
      from: "viktoriiahilenko@meta.ua",
    };
    await transporter.sendMail(newEmail);
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
