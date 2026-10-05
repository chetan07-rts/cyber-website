const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register a new admin (initial setup)
// @route   POST /api/auth/register-initial
// @access  Public (should be disabled after first run)
const registerInitialAdmin = async (req, res) => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, INITIAL_ADMIN_SETUP_KEY } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !INITIAL_ADMIN_SETUP_KEY) {
      return res.status(503).json({ message: 'Initial admin setup is not configured' });
    }

    if (req.get('x-initial-admin-key') !== INITIAL_ADMIN_SETUP_KEY) {
      return res.status(401).json({ message: 'Invalid setup key' });
    }

    const adminExists = await User.findOne({ isAdmin: true });
    
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already initialized' });
    }

    const admin = await User.create({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      isAdmin: true,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
        isAdmin: admin.isAdmin,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { authUser, registerInitialAdmin };
