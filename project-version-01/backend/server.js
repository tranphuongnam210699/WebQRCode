const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//connect Database
const uri = process.env.MLAB_URL;
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
const userRouter = require('./routes/users.route');
const productRouter = require('./routes/products.route');
const imageRouter = require('./routes/image.route');

//khai báo URL api
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/image', imageRouter);

// thông báo kết nối thành công database
mongoose.connection.once('open', () => {
    console.log('MongoDb is conected');
});

// thông báo kết nối thành công tới server
app.listen(port, () => {
    console.log(`server is running: ${port}`);
});
