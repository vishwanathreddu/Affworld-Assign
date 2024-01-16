// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const config = require("../utils/config");

// // Register a new user
// const register = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if the username is already taken
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       username,
//       password: hashedPassword,
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Login user
// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ username });

//     // Check if the user exists
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Check if the password is correct
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ token, userId: user._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Example: Password recovery using JWT token
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Fetch user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate a reset token (this should be sent to the user via email)
//     const resetToken = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
//       expiresIn: "15m", // Token expires in 15 minutes
//     });

//     // Save the reset token to the user in the database
//     user.resetToken = resetToken;
//     await user.save();

//     res.json({ message: "Password reset token generated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Example: Reset password using the reset token
// const resetPassword = async (req, res) => {
//   try {
//     const { resetToken, newPassword } = req.body;

//     // Decode the reset token
//     const decodedToken = jwt.verify(resetToken, config.JWT_SECRET);

//     // Find the user by decoded token
//     const user = await User.findById(decodedToken.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update the user's password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.resetToken = null; // Clear the reset token after password reset
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   register,
//   login,
//   forgotPassword,
//   resetPassword,
// };

// import userModel from "../models/User";
const userModel = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// import { comparePassword, hashPassword } from "../helpers/authHelper.js";
const comparePassword = require("../helpers/authHelper");
const hashPassword = require("../helpers/authHelper");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validations
    if (!name) {
      return res.send({ message: "Username is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });

    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login",
      });
    }

    //register user
    const hashedPassword = await bcrypt.hash(password, 10);

    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registrstion",
      error,
    });
  }
};

//post login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    console.log("password", password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

module.exports = { registerController, loginController };
