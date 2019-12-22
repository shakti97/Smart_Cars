const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const rideSchema = new mongoose.Schema({
  source: {
    type: String,
    required
  },
  destination: {
    type: String,
    required
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required
  },
  expected_bill: {
    type: Number
  },
  actual_bill: {
    type: Number
  },
  status: {
    type: String,
    required
  }
});

const Ride = mongoose.model("ride", rideSchema);

function validateRide(ride) {
  const schema = Joi.object({
    source: Joi.string().required(),
    destination: Joi.string().required(),
    customer: Joi.ObjectId().required(),
    driver: Joi.ObjectId().required(),
    status: Joi.string().required()
  });
  return schema.validate(ride);
}

exports.Ride = Ride;
exports.validate = validateRide;
