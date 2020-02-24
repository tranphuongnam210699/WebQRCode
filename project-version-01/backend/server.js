const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//connect Database
const uri = process.env.URL;
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// khai báo route api
const exerciseRouter = require('./routes/exercises.route');
const userRouter = require('./routes/users.route');

//khai báo URL api
app.use('/api/exercises', exerciseRouter);
app.use('/api/users', userRouter);

// thông báo kết nối thành công database
mongoose.connection.once('open', () => {
    console.log('MongoDb is conected');
});

// thông báo kết nối thành công tới server
app.listen(port, () => {
    console.log(`server is running: ${port}`);
});
