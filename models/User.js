const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  age: Number,
  address: String,
  mobile_Number: Number,
  status: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("user", userSchema);

function validateUserSchema(user) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .max(255)
      .min(3),
    email: Joi.email()
      .required()
      .max(255),
    password: Joi.password()
      .required()
      .max(255)
      .min(8)
  });
  return schema.validate(user);
}

function validateUserDetailSchema(userDetails) {
  const schema = Joi.object({
    mobile_number: Joi.number()
      .max(10)
      .min(10),
    age: Joi.number(),
    address: Joi.string()
  });
  return schema.validate(userDetails);
}

exports.validateUserSchema = validateUserDetailSchema;
exports.validateUserDetailSchema = validateUserDetailSchema;
exports.User = User;
