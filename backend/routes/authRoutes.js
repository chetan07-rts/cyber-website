const express = require('express');
const router = express.Router();
const { authUser, registerInitialAdmin } = require('../controllers/authController');

router.post('/login', authUser);
router.post('/register-initial', registerInitialAdmin);

module.exports = router;
