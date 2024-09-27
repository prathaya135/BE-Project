const Feedback=require('../models/feedback');

const createFeedBack = async (req, res) => {
    try {
        const newFeedBack = await Feedback.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                feedback: newFeedBack,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

module.exports={createFeedBack};