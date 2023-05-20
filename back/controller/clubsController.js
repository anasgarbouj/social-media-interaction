const Club = require("../model/club");

const createClub = async (req, res) => {
  const { name, description } = req.body;
  const admin = req.user._id; // Assuming you have a middleware that attaches the authenticated user to req.user

  const newClub = new Club({ admin, name, description });

  try {
    await newClub.save();
    res.status(201).json({ success: true, message: "Club created", data: newClub });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create club" });
  }
};

// Implement other club-related endpoints here

module.exports = { createClub };