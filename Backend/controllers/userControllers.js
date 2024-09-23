const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        const token = createToken(user._id);

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
const getMe = (req, res) => {
    const user = req.user; 

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
};

module.exports = { createUser, loginUser, getMe };
