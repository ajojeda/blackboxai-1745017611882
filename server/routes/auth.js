const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginRateLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginRateLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;
