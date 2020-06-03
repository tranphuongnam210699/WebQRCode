const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//connect Database
// const uri = process.env.MLAB_URL;
const uri = "mongodb://localhost:27017/StoreDB";
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// khai báo route api
const userRouter = require("./routes/users.route");
const productRouter = require("./routes/products.route");
const categoryRouter = require("./routes/category.route");
const producerRouter = require("./routes/NSX.route");
const billRouter = require("./routes/bill.route");
const cusRouter = require("./routes/customer.route");
const billDetailRouter = require("./routes/billDetail.route");

//khai báo URL api
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/producer", producerRouter);
app.use("/bill", billRouter);
app.use("/customer", cusRouter);
app.use("/billDetail", billDetailRouter);

// thông báo kết nối thành công database
mongoose.connection.once("open", () => {
    console.log("MongoDb is connected");
});

// thông báo kết nối thành công tới server
app.listen(port, () => {
    console.log(`server is running: ${port}`);
});
