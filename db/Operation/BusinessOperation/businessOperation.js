const { Business } = require("../../../models/Accounts/Business");

const businessOperation = {
  findAllBusinessDetails(req, res) {
    try {
        const business = await Business.find();
        res.status(200).json(business);
      } catch (error) {
        res.status(500).json(error);
      }
      return;
  },
  findBusinessById(req,res){
    try {
        const business = await Business.findById(req.params.id);    //this should be the business id
        res.status(200).json(business);
      } catch (error) {
        res.status(500).json(error);
      }
  },
  findUserBusinessDetails(req,res){
    try {
        const business = await Business.find({
          user_id: req.params.id            //this should be the user id
        });
        res.status(200).json(business);
      } catch (error) {
        res.status(500).json(error);
      }
  },
  //Refactor it to update car sold and car buyed array
//   updateBusinessDetailsById(){
//     try {
//         let business = await Business.findById(req.params.id);
//         if (!business) {
//           res.status(404).send("The Business with the given id is not found");
//           return;
//         }
//         //Get Car Id
//         let car_id;
//         const updateUser = { $push: {"car_sold": {
//             _id: car_id,
//         }}};
//         const user = await User.findOneAndUpdate(req.params.id, updateUser);
//         res.status(200).json({
//           message: "User Successfully Updated",
//           data: user
//         });
//       } catch (error) {
//         res.status(500).json(error);
//       }
//   },
//   updateUserBusinessDetails(req,res){
//     try {
//         let business = await Business.findById(req.params.id);
//         if (!user) {
//           res.status(404).send("The User with the given id is not found");
//           return;
//         }
//         const { name, email, password, status } = req.body;
//         const updateUser = {
//           name,
//           email,
//           password,
//           status
//         };
//         const user = await User.findOneAndUpdate(req.params.id, updateUser);
//         res.status(200).json({
//           message: "User Successfully Updated",
//           data: user
//         });
//       } catch (error) {
//         res.status(500).json(error);
//       }
//   }
};

