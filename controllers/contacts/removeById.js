const createError = require("http-errors");
const { Contact } = require("../../models/contact");
const Mongoose = require("mongoose");

const removeById = async (req, res, next) => {
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
};

module.exports = removeById;
