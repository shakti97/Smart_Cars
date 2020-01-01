const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const driverSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  user_id: "string",
  rides: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true }
  ],
  status: {
    type: String,
    default: "Available"
  },
  current_location: {
    type: String,
    required: true
  }
});

const Driver = mongoose.model("driver", driverSchema);

function validateDriverSchema(driver) {
  const schema = Joi.object({
    user_id: Joi.string(),
    rides: Joi.array().items(Joi.object()),
    status: Joi.string().required(),
    current_location: Joi.string().required()
  });
  return schema.validate(driver);
}

exports.Driver = Driver;
exports.validateDriverSchema = validateDriverSchema;
