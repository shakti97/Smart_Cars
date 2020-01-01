const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  user_id: "string",
  rides: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true }
  ],
  offers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Offer", required: true }
  ],
  current_location: {
    type: String,
    required: true
  }
});

const Customer = mongoose.model("customer", customerSchema);

function validateCustomerSchema(customer) {
  const schema = Joi.object({
    user_id: Joi.string(),
    rides: Joi.array().items(Joi.object()),
    offers: Joi.array().items(Joi.object()),
    current_location: Joi.string().required()
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomerSchema = validateCustomerSchema;
