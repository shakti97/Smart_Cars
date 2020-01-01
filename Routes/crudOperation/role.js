const { Role, validate } = require("../../models/Role");
const router = require("express").Router();

router.get("/", async (req, res) => {
  //check for authentication and add middleware
  try {
    const role = await Role.find();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json(error);
  }
  return;
});

router.get("/:id", async (req, res) => {
  //check for authentication and add middleware
  try {
    const role = await Role.find({
      _id: req.params.id
    });
    res.status(200).json(role);
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
    let role = await Role.findById(req.params.id);
    if (!role) {
      res.status(404).send("The Role with the given id is not found");
      return;
    }
    const { name, status } = req.body;
    const updateRole = {
      name,
      status
    };
    const role = await Role.findOneAndUpdate(req.params.id, updateRole);
    res.status(200).json({
      message: "Role Successfully Updated",
      data: role
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  //check for authentication and add middleware
  const role = await Role.findByIdAndRemove(req.params.id);
  if (!role)
    return res.status(404).send("The Role with the given ID was not found.");
  res.status(200).send(role);
});

router.post("/", async (req, res) => {
  //check for authentication and add middleware
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const { name, status } = req.body;
    const role = new Role({
      name,
      status
    });

    await role.save();

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
