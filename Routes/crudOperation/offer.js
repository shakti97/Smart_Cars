const { Offer, validateOffer } = require("../../models/Offer");
const router = require("express").Router();

router.get("/", async (req, res) => {
  //check for authentication and add middleware
  try {
    const offer = await Offer.find();
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

router.get("/:id", async (req, res) => {
  //check for authentication and add middleware
  try {
    const offer = await Offer.find({
      _id: req.params.id
    });
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateOffer(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  //check for authentication and add middleware
  let offer = await Offer.findById(req.params.id);
  if (!offer) {
    res.status(404).send("The offer with the given id is not found");
    return;
  }
  const {
    name,
    description,
    terms_and_condition,
    validation_date,
    status
  } = req.body;
  const updateOffer = {
    name,
    description,
    terms_and_condition,
    validation_date,
    status
  };
  try {
    const offer = await Offer.findOneAndUpdate(req.params.id, updateOffer);
    res.status(200).json({
      message: "Offer Successfully Updated"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  //check for authentication and add middleware
  const offer = await Offer.findByIdAndRemove(req.params.id);
  if (!offer)
    return res.status(404).send("The Offer with the given ID was not found.");
  res.status(200).send(offer);
});

router.post("/", async (req, res) => {
  //check for authentication and add middleware
  const { error } = validateOffer(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const {
    name,
    description,
    terms_and_condition,
    validation_date,
    status
  } = req.body;
  const offer = new Offer({
    name,
    description,
    terms_and_condition,
    validation_date,
    status
  });

  await offer.save();

  res.status(200).json(offer);
});

module.exports = router;
