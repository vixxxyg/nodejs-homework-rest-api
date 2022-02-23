const express = require("express");
const ctrl = require("../../controllers/users/index");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrentUser);

router.get("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.get("/verify/:verificationToken", ctrl.verifyToken);

router.post("/verify", ctrl.verify);

module.exports = router;
