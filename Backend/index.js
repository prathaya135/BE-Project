const mongoose = require('mongoose');
const express = require('express');
const cron = require('node-cron');
const { sendReminderMail } = require('./controllers/emailControllers');
const cors = require('cors');
const User = require('./models/user');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const DB = 'mongodb+srv://bprathamesh135:lgNpmFsGjQUraruN@cluster0.2vqlvpu.mongodb.net/SignVerification?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connection successful!');
}).catch((err) => {
    console.log('DB Not connected:', err.message);
});

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

cron.schedule('* * * * *', async () => {  
    const currentTime = new Date();
    const fiveHoursAgo = new Date(currentTime.getTime() -5*60*60 * 1000); // Subtract 5 hours

    try {
        const inactiveUsers = await User.find({ reminderMailTime: { $lt: fiveHoursAgo } });

        for (const user of inactiveUsers) {
            await sendReminderMail(user.email);
            console.log(`Sent reminder to ${user.email}`);
            const filter = { _id: user._id };
            const updateDoc = {
                $set: {
                    reminderMailTime: Date.now(),
                },
            };
            const result = await User.updateOne(filter, updateDoc);
            console.log(`Updated reminderMailTime for ${user.email}`);
        }
    } catch (error) {
        console.log('Error finding inactive users:', error);
    }
});


app.listen(PORT, () => {
    console.log(`Server Connection Successful on port ${PORT}`);
});
