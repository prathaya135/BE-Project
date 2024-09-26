const express = require('express');
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/sign_in', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me',authMiddleware,userController.getMe);

module.exports = router;
