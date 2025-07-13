const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const { validateEditCheck } = require("../utiles/validation.js");
const bcrypt = require("bcrypt");

// Handle preflight OPTIONS requests for profile routes
profileRouter.options("/profile/edit", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://maitri-app-frontend.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Cookie");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(204).end();
});

profileRouter.options("/profile/editpassword", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://maitri-app-frontend.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Cookie");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(204).end();
});

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  // console.log("Request body:", req.body); // Log request data
  try {
    if (!validateEditCheck(req)) {
      throw new Error("Edit check not valid");
    }
    const logedInUser = req.user;

    Object.keys(req.body).forEach((k) => {
      if (req.body[k] !== undefined) {
        logedInUser[k] = req.body[k];
      }
    });
    const user = await logedInUser.save();
    console.log("Updated user in DB:", user);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
profileRouter.patch("/profile/editpassword", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const logedInUser = req.user;
    const matchPassword = await bcrypt.compare(
      currentPassword,
      logedInUser.password
    );
    if (!matchPassword) throw new Error("Current Password is wrong");
    const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

    logedInUser.password = encryptedNewPassword;
    await logedInUser.save();
    res.send(`${logedInUser.firstName} Password updated successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = profileRouter;
