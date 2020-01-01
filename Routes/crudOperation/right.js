const { Right, validate } = require("../../models/Right");
const router = require("express").Router();

router.get("/", async (req, res) => {
  //check for authentication and add middleware
  try {
    const right = await Right.find();
    res.status(200).json(right);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

router.get("/:id", async (req, res) => {
  //check for authentication and add middleware
  try {
    const right = await Right.find({
      _id: req.params.id
    });
    res.status(200).json(right);
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
    let right = await Right.findById(req.params.id);
    if (!right) {
      res.status(404).send("The Right with the given id is not found");
      return;
    }
    const { routes, status } = req.body;
    const updateRight = {
      routes,
      status
    };
    const right = await Right.findOneAndUpdate(req.params.id, updateRight);
    res.status(200).json({
      message: "Right Successfully Updated",
      data: right
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  //check for authentication and add middleware
  const right = await Right.findByIdAndRemove(req.params.id);
  if (!right)
    return res.status(404).send("The Right with the given ID was not found.");
  res.status(200).send(right);
});

router.post("/", async (req, res) => {
  //check for authentication and add middleware
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const { routes, status } = req.body;
    const right = new Right({
      routes,
      status
    });

    await right.save();

    res.status(200).json(right);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
