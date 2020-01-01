const { Business, validate } = require("../../../models/Accounts/Business");
const router = require("express").Router();

router.get("/", async (req, res) => {
  //check for authentication and add middleware
  //get all business details
});

router.get("/:id", async (req, res) => {
  //check for authentication and add middleware
  //find business details by Id
});

router.put("/:id", async (req, res) => {
  //check for authentication and add middleware
  const { error } = validateUserSchema(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("The User with the given id is not found");
      return;
    }
    const { name, email, password, status } = req.body;
    const updateUser = {
      name,
      email,
      password,
      status
    };
    const user = await User.findOneAndUpdate(req.params.id, updateUser);
    res.status(200).json({
      message: "User Successfully Updated",
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/updateUser/:id", async (req, res) => {
  const { error } = validateUserDetailSchema(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  //check for authentication and add middleware
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("The User with the given id is not found");
      return;
    }
    const { mobile_number, age, address } = req.body;
    const updateUser = {
      mobile_number,
      age,
      address
    };
    const user = await User.findOneAndUpdate(req.params.id, updateUser);
    res.status(200).json({
      message: "User Successfully Updated",
      data: user
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  //check for authentication and add middleware
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("The User with the given ID was not found.");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  //check for authentication and add middleware
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
