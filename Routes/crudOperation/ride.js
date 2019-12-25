const { Ride, validate } = require("../../models/Ride");
const router = require("express").Router();

router.get("/", async (req, res) => {
  //check for authentication and add middleware
  try {
    const ride = await Ride.find();
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

router.get("/:id", async (req, res) => {
  //check for authentication and add middleware
  try {
    const ride = await Ride.find({
      _id: req.params.id
    });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  //check for authentication and add middleware
  try {
    let ride = await Ride.findById(req.params.id);
    if (!ride) {
      res.status(404).send("The Ride with the given id is not found");
      return;
    }
    const { source, destination, customer, driver, status } = req.body;
    const updateRide = {
      source,
      destination,
      customer,
      driver,
      status
    };
    const ride = await Ride.findOneAndUpdate(req.params.id, updateRide);
    res.status(200).json({
      message: "Ride Successfully Updated",
      data: ride
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  //check for authentication and add middleware
  const ride = await Ride.findByIdAndRemove(req.params.id);
  if (!ride)
    return res.status(404).send("The Ride with the given ID was not found.");
  res.status(200).send(ride);
});

router.post("/", async (req, res) => {
  //check for authentication and add middleware
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const { source, destination, customer, driver, status } = req.body;
    const ride = new Ride({
      source,
      destination,
      customer,
      driver,
      status
    });

    await ride.save();

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
