const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = 'your_secret_key';

exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Get the token
        }
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to get access.',
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer exists.',
            });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid token. Please log in again!',
        });
    }
};
