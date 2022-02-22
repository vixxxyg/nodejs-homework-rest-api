const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    if (isNaN(page) || isNaN(limit)) {
      throw new createError(400, "Page or limit is not a number");
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
};

module.exports = getAll;
