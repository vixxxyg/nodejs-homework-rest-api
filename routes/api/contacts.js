const express = require("express");
const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/contacts/index");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, ctrl.getById);

router.post("/", authenticate, ctrl.add);

router.put("/:id", authenticate, ctrl.updateById);

router.patch("/:id/favorite", authenticate, ctrl.updateStatus);

router.delete("/:id", authenticate, ctrl.removeById);

module.exports = router;
