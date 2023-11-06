const express = require("express");
const { connection } = require("./config/connection.js");
const {userRoute} = require("./routes/user.route.js");
const {courseRoute} = require("./routes/course.route.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/",userRoute);
app.use("/course",courseRoute);

app.listen(8080,async ()=>{
    try {
        await connection;
        console.log("database connected");
        console.log("server is running on port 8080");
    } catch (error) {
        console.log("server has error",error);
    }

})