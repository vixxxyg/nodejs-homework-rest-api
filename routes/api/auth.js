const express = require("express");
require("dotenv").config();

const ctrl = require("../../controllers/auth/index");
const router = express.Router();

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

module.exports = router;
