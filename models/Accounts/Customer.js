const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  rides: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true }
  ],
  offers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Offer", required: true }
  ],
  current_Location: {
    type: String,
    required: true
  }
});

const Customer = mongoose.model("customer", customerSchema);

function validateCustomerSchema(customer) {
  const schema = Joi.object({
    rides: Joi.array().items(Joi.object()),
    offers: Joi.array().items(Joi.object()),
    current_Location: Joi.string().required()
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomerSchema = validateCustomerSchema;
