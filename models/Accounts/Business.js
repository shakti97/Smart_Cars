const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const businessSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  user_id: "string", //We can normalize here
  car_sold: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }
  ],
  car_buyed: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }
  ]
});

const Business = mongoose.model("business", businessSchema);

function validateBusinessSchema(business) {
  const schema = Joi.object({
    user_id: Joi.string,
    car_sold: Joi.array().items(Joi.object()),
    car_buyed: Joi.array().items(Joi.object())
  });
  return schema.validate(business);
}

exports.Business = Business;
exports.validate = validateBusinessSchema;
