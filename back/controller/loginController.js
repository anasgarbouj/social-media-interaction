
const jwt = require("jsonwebtoken");
const User = require("../model/users"); // Import your User model

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the stored password hash
    // You should use a library like bcrypt to store hashed passwords in your database
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in." });
  }
};

module.exports = { loginUser };