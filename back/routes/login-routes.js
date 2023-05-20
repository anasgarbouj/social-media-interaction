const express = require("express");
const { loginUser } = require("../controllers/loginController");
const router = express.Router();

router.post("/", loginUser);

module.exports = router;