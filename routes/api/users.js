const express = require("express");
const createError = require("http-errors");

const { User } = require("../../models/user");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/current", authenticate, async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    user: {
      email,
      subscription,
    },
  });
});

router.get("/logout", authenticate, async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
});

module.exports = router;
