const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const roleSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  }
});

const Role = mongoose.model("role", roleSchema);

function validateRole(role) {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.boolean()
  });
  return schema.validate(role);
}

exports.Role = Role;
exports.validateRole = validateRole;
