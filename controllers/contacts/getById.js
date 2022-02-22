const createError = require("http-errors");
const { Contact } = require("../../models/contact");
const Mongoose = require("mongoose");

const getById = async (req, res, next) => {
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
};

module.exports = getById;
