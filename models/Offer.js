const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const offerSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  terms_and_condition: {
    type: String,
    required: true
  },
  validation_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Offer = mongoose.model("offer", offerSchema);

function validateOffer(offer) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    terms_and_condition: Joi.string().required(),
    validation_date: Joi.date().required(),
    status: Joi.string().required()
  });
  return schema.validate(offer);
}

exports.Offer = Offer;
exports.validateOffer = validateOffer;
