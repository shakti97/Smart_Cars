const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const carSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required
  },
  model: {
    type: String,
    required
  },
  yearUsed: {
    type: Number,
    required
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required
  },
  condition: {
    type: String,
    required
  },
  description: {
    type: String,
    required
  }
});

const Car = mongoose.model("car", carSchema);

function validateCar(car) {
  const schema = Joi.object({
    name: Joi.string().required(),
    model: Joi.string().required(),
    yearUsed: Joi.number().required(),
    seller: Joi.ObjectId().required(),
    buyer: Joi.ObjectId().required(),
    condition: Joi.string().required(),
    description: Joi.string().required()
  });
  return schema.validate(car);
}

exports.Car = Car;
exports.validate = validateCar;
