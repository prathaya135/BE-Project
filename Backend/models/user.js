const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: { 
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin:{
        type:Date,
        require:true,
        default:Date.now,
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    reminderMailTime: {
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
