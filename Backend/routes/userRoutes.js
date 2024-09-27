const express = require('express');
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const feedbackControllers=require('../controllers/feedbackControllers');
const router = express.Router();


router.post('/sign_in', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me',authMiddleware,userController.getMe);
router.get('/confirm-email',userController.confirmEmail);
router.post('/feedback',authMiddleware,feedbackControllers.createFeedBack);

module.exports = router;
