const createError = require("http-errors");
const Joi = require("joi");
const { User, schemas } = require("../../models/user");
const sendMail = require("../../helpers");

const verify = async (req, res, next) => {
  try {
    const { error } = schemas.verify.validate(req.body);
    if (error) {
      throw createError(400, "missing required field email");
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Confirm your email",
      html: `
      <a target="_blank"
      href="http://localhost:3000/api/users/${user.verificationToken}">Нажмите, чтобы подтвердить свой имейл</a>
      `,
    };
    await sendMail(mail);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
