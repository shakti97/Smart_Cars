const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const rightSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  routes: [String],
  status: {
    type: Boolean,
    default: true
  }
});

const Right = mongoose.model("right", rightSchema);

function validateSchema(right) {
  const schema = Joi.object({
    route: Joi.array()
      .items(Joi.string())
      .required(),
    status: Joi.boolean()
  });
  return schema.validate(right);
}

exports.validate = validateSchema;
exports.Right = Right;
