const express = require('express');
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path'); 

const router = express.Router();
const storage=multer.memoryStorage();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = path.join(__dirname, 'uploads');
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir);
//         }
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + file.originalname;
//         cb(null, uniqueSuffix);
//     }
// });


const upload = multer({ storage: storage });
router.post('/sign_in', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', userController.getMe);

module.exports = router;
