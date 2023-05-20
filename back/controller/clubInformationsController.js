const users = require("../model/clubInformations");
const Users = require("../model/clubInformations");


//--------------------------------getuser------------//
const getAllUser = async (req, res) => {
  try {
    const users = await Users.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ success: true, message:"success" ,data:users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, message:"failed" });
  }
};
//------------------createuser-----------------------------------------//
 const createUser = async (req, res) => {
    const {
      fullName,
      email,
      password,
      dateCreation,
      establishment,
      category,
      country,
      workFiled,
      canJoin,
      description,
    } = req.body;
  
    const newUser = new Users({
      fullName,
      email,
      password,
      dateCreation,
      establishment,
      category,
      country,
      workFiled,
      canJoin,
      description,
    });
  
    try {
      await newUser.save();
      res.status(201).json({ success: true, message:"success" ,data:users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message:"failed" ,err});
    }
  };
  
  //---------------update user-------------------------------//
  const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;
  
    try {
      const user = await Users.findByIdAndUpdate(userId, updates, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ success: true, message:"success" ,data:users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message:"failed" });
    }
  };

  //--------------------delete---------------------------------//
  const deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await Users.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ success: true, message:"success" ,data:users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message:"failed" });
    }
  };

  


module.exports = { getAllUser ,createUser,updateUser,deleteUser};