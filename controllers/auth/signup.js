const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { User, schemas } = require("../../models/user");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendMail = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new createError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email, { protocol: "http" });
    const verificationToken = v4();
    await User.create({
      email,
      password: hashPassword,
      verificationToken,
      avatarURL,
    });
    const mail = {
      to: email,
      subject: "Confirm your email",
      html: `
      <a target="_blank"
      href="http://localhost:3000/api/users/${verificationToken}">Нажмите, чтобы подтвердить свой имейл</a>
      `,
    };
    await sendMail(mail);
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
