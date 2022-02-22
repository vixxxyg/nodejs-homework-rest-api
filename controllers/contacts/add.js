const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const add = async (req, res, next) => {
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
};

module.exports = add;
