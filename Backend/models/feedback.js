
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    category:{
        type:String,
        required:true,
    },
    importance:{
        type:String,
        required:true,
    },
    comment: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
