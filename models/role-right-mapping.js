const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const roleRightMapping = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  roleId: {
    type: String
  },
  routeId: {
    type: String
  }
});

const RoleRightMapping = mongoose.model("roleRightMapping", roleRightMapping);

function validateRoleRight(roleRightMapping) {
  const schema = Joi.object({
    roleId: Joi.string().required(),
    routeId: Joi.string().required()
  });
  return schema.validate(roleRightMapping);
}

exports.RoleRightMapping = RoleRightMapping;
exports.validateRoleRight = validateRoleRight;
