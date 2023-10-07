const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const tokenManager = require('../middleware/tokenManager.js');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input data (you can add more validation as needed)
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User with this email already exists. Please log in.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Congratulations, you registered successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error (line 30)' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    // Validate user input (e.g., username, email, password)
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      return res
        .status(400)
        .json({ message: 'Username or email and password are required.' });
    }

    // Check if the username or email exists in the database
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username, email, or password.' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username, email, or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION, // Set token expiration time
    });

    // Send the token to the client
    res.status(200).json({ token });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    // Get the JWT token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Check if the token is revoked
    if (tokenManager.isTokenRevoked(token)) {
      return res.status(401).json({ error: 'Token revoked. Please log in again.' });
    }

    // Revoke the token (add it to the revoked tokens list)
    tokenManager.revokeToken(token);

    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

