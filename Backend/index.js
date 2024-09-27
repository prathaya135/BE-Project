const mongoose = require('mongoose');
const express = require('express');
const cron = require('node-cron');
const { sendReminderMail } = require('./controllers/emailControllers');
const cors = require('cors');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

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
    const oneMinuteAgo = new Date(currentTime.getTime() - 5*60*60 * 1000); 
    try {
        const inactiveUsers = await User.find({ lastLogin: { $lt: oneMinuteAgo } });
        inactiveUsers.forEach(user => {
            sendReminderMail(user.email);
            console.log(`Sent reminder to ${user.email}`);
        });
    } catch (error) {
        console.log('Error finding inactive users:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server Connection Successful on port ${PORT}`);
});
