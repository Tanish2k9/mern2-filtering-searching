const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();


///DB CONNEcTIoN
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("db connected")})
.catch((err)=>{console.log(err)})



//MIDDLEWARE
app.use(cors());


//ROUTES
app.get("/",(req,res)=>{
    res.send("hi");
})
app.use("/api/v1/user",userRouter);




//SERVER
const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})