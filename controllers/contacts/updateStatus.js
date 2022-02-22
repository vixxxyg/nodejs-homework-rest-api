const createError = require("http-errors");
const { Contact, schemas } = require("../../models/contact");
const Mongoose = require("mongoose");

const updateStatus = async (req, res, next) => {
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
};

module.exports = updateStatus;
