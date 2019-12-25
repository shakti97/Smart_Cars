const { Car, validate } = require("../../models/Car");
const router = require("express").Router();

router.get("/", async (req, res) => {
  //check for authentication and add middleware
  try {
    const car = await Car.find()
      .populate("seller")
      .populate("buyer");
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

router.get("/:id", async (req, res) => {
  //check for authentication and add middleware
  try {
    const car = await Car.find({
      _id: req.params.id
    })
      .populate("seller")
      .populate("buyer");
    res.status(200).json(car);
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
  let car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404).send("The car with the given id is not found");
    return;
  }
  const {
    name,
    model,
    yearUsed,
    seller,
    buyer,
    condition,
    description
  } = req.body;
  const updateCar = {
    name,
    model,
    yearUsed,
    seller,
    buyer,
    condition,
    description
  };
  try {
    const car = await Car.findOneAndUpdate(req.params.id, updatedCar);
    res.status(200).json({
      message: "Car Successfully Updated"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  //check for authentication and add middleware
  const car = await Car.findByIdAndRemove(req.params.id);
  if (!car)
    return res.status(404).send("The Car with the given ID was not found.");
  res.status(200).send(car);
});

router.post("/", async (req, res) => {
  //check for authentication and add middleware
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const {
    name,
    model,
    yearUsed,
    seller,
    buyer,
    condition,
    description
  } = req.body;
  const car = new Car({
    name,
    model,
    yearUsed,
    seller,
    buyer,
    condition,
    description
  });

  await car.save();

  res.status(200).json(car);
});

module.exports = router;
