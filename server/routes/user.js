const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');
const requirePermission = require('../middleware/requirePermission');

// All user routes require authentication and permission to manage users
router.use(authenticateJWT);
router.use(requirePermission('User Management', 'Edit'));

router.get('/', userController.listUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
