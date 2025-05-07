// backend/routes/api/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Please provide a first name."),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
  check("role")
  .exists({ checkFalsy: true })
  .withMessage("Role must be assigned")
  .isIn(["admin", "employee", "client"])
  .withMessage("Role must be either 'admin', 'employee', or 'client'"),

];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username, role} = req.body;

  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword,
    role
  });

  
  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    role: user.role
  };

  await setTokenCookie(res, safeUser);

  return res.status(201).json({
    user: safeUser,
  });
});

//get all users
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll()
    return res.json({
      Users: allUsers
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return res.status(500).json({message: "Internal Server Error"})
  }
})

module.exports = router;
