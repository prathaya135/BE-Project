const mongoose=require('mongoose');
const express = require('express');
const app = express();
const cors=require('cors');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
const DB = 'mongodb+srv://bprathamesh135:lgNpmFsGjQUraruN@cluster0.2vqlvpu.mongodb.net/SignVerification?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('DB Connection successful!');
}).catch((err)=>{
    console.log('DB Not connected',err.message);
})

const userRoutes=require('./routes/userRoutes');
app.use('/',userRoutes);

app.listen(PORT, () => {
    console.log(`Server Connection Successful on port ${PORT}`);
});
