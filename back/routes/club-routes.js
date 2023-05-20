const express = require("express");
const { createClub } = require("../controller/clubsController");
const AuthMiddleware = require("../middlewares/authMiddleware"); // Assuming you have an authentication middleware

const router = express.Router();

router.post("/", AuthMiddleware, createClub);

// Add routes for other club-related endpoints here

module.exports = router;