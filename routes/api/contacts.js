const express = require("express");
const createError = require("http-errors");
const Mongoose = require("mongoose");

const { Contact, schemas } = require("../../models/contact");
const { authenticate } = require("../../middlewares");
const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    if (isNaN(page) || isNaN(limit)) {
      throw new CreateError(400, "Page or limit is not a number");
    }
    const skip = (page - 1) * limit;
    const { _id } = req.user;
    const result = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      throw new createError(400, "invalid ID");
    }
    const result = await Contact.find({ owner: _id, _id: id });
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, "missing required name field");
    }
    const { _id } = req.user;
    const data = { ...req.body, owner: _id };
    const result = await Contact.create(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, "missing fields");
    }
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      throw new createError(400, "invalid ID");
    }

    const { _id } = req.user;
    const result = await Contact.findOneAndUpdate(
      { owner: _id, _id: id },
      req.body,
      { new: true }
    );
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.updateFavorite.validate(req.body);
    if (error) {
      throw new createError(400, "missing field favorite");
    }
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      throw new createError(400, "invalid ID");
    }
    const { _id } = req.user;

    const result = await Contact.findOneAndUpdate(
      { owner: _id, _id: id },
      req.body,
      { new: true }
    );
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      throw new createError(400, "invalid ID");
    }

    const { _id } = req.user;
    const result = await Contact.findByIdAndDelete({ owner: _id, _id: id });
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
