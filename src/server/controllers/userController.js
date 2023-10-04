//Incomplete still 
const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs'); // For password hashing

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input data (you can add more validation as needed)
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data (you can add more validation as needed)
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If authentication is successful, generate and send a JWT token

    // Example: Generate and send a JWT token
    const token = generateToken(user); // Implement your token generation logic
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // You can access the authenticated user's data from the request object
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    // You can access the authenticated user's data from the request object
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { username, email } = req.body;

    // Validate and update user profile data as needed

    // Example: Update username and email
    user.username = username;
    user.email = email;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Logout user (optional)
exports.logoutUser = (req, res) => {
  // Implement logout logic (e.g., destroy the user's session or JWT token)
  // Depending on your authentication mechanism
  // Redirect or send a success message
};