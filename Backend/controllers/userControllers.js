const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendConfirmationEmail = require('../services/emailService');

const JWT_SECRET = 'SignHelpers125436';

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '3d',
    });
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ name, email, password: hashedPassword });

        await sendConfirmationEmail(email, newUser._id);

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password',
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password',
            });
        }

        if (user.isConfirmed===false) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email is Not Confirmed',
            });
        }

        const token = createToken(user._id);
        
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { lastLogin: new Date() },  
            { new: true, upsert: true } 
        );

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user:updatedUser
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

const getMe = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                name: user.name,
                email: user.email,
                isConfirmed: user.isConfirmed 
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error',
            error: error.message,
        });
    }
};

const confirmEmail = async (req, res) => {
    try {
        const { token, userId } = req.query;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isConfirmed = true;
        await user.save();

        res.status(200).json({ message: 'Email confirmed successfully' });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error',
            error: error.message,
        });
    }
};

module.exports = { createUser, loginUser, getMe, confirmEmail };
