const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require('dotenv').config()

/**
 * Handles the registration of a new user.
 *
 * This function performs several key operations as part of the user registration process:
 * 1. Validates that the required information (email and password) is provided in the request.
 * 2. Checks if a user with the provided email already exists in the database to avoid duplicates.
 * 3. Hashes the user's password for secure storage in the database.
 * 4. Creates a new user record with the provided details and saves it to the database.
 * 5. Returns a success response if the user is registered successfully.
 *
 * If any of these steps fail, an appropriate error response is returned.
 *
 * @param {Object} req - The request object, containing user registration data.
 * @param {Object} res - The response object, used to send back the appropriate HTTP response.
 *
 * @returns {Promise<void>} - A promise that resolves to void. Responses are sent using the res object.
 */
async function register(req, res) {
  try {
    // Validates the presence of email and password in the request body.
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Checks for an existing user with the same email.
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).json({ msg: "Email already in use" });
    }

    // Hashes the password using bcrypt with a salt round of 12 for security.
    const hash = await bcrypt.hash(req.body.password, 12);

    // Constructs a new user object with the hashed password and other details.
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });

    // Saves the new user record to the database.
    await newUser.save();

    // Sends a 201 Created response upon successful registration.
    res.status(201).json({ msg: "Register successful" });
  } catch (error) {
    // Logs any errors encountered during the process.
    console.error(error);

    // Sends a 500 Internal Server Error response if an exception is caught.
    res.status(500).json({ msg: "Cannot register" });
  }
}

/**
 * Handles user login by verifying credentials and issuing a token.
 *
 * This function performs the login process by executing the following steps:
 * 1. Searches for a user in the database using the email provided in the request.
 * 2. If a user with the given email does not exist, it returns a 401 Unauthorized response indicating invalid credentials.
 * 3. Compares the provided password with the hashed password stored in the database.
 * 4. If the password comparison fails, it returns a 401 Unauthorized response indicating invalid credentials.
 * 5. If the password is valid, generates a JSON Web Token (JWT) for the user, which includes the user's ID and has an expiration time of 1 hour.
 * 6. Returns a 200 OK response along with the generated token if login is successful.
 *
 * In case of any errors during the process, logs the error and returns a 500 Internal Server Error response.
 *
 * @param {Object} req - The request object, containing the user's login credentials.
 * @param {Object} res - The response object, used to send back the appropriate HTTP response.
 *
 * @returns {Promise<void>} - A promise that resolves to void. Responses are sent using the res object.
 */
async function login(req, res) {
  try {
    // Searches for the user by email.
    const foundUser = await User.findOne({ email: req.body.email });

    // Checks if user exists.
    if (!foundUser) {
      return res.status(401).json({ msg: "Credentials not valid." });
    }

    // Compares provided password with stored hash.
    const resultCompare = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    // Checks password comparison result.
    if (!resultCompare) {
      return res.status(401).json({ msg: "Credentials not valid." });
    }

    // Generates a JWT for the user.
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    // Responds with the generated token.
    res.status(200).json({ msg: "ok", token: token });
  } catch (error) {
    // Logs and responds to any errors.
    console.error(error);
    res.status(500).json({ msg: "Error logging in." });
  }
}

module.exports = {
  register,
  login,
};
