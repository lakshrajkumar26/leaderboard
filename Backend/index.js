const express =require("express");
var app = express();
const userRouter = require("./routes/UserRouter");
const db = require("./Config/db.config");
const claimRouter = require("./routes/ClaimRouter");
const port = 3000;

app.use(express.json());

app.get("/health", (req,res)=>{
    res.send("server is healthy");
})
app.use("/api/users",userRouter);
app.use("/api",claimRouter);

app.listen(port, ()=>{
    console.log("server is running on ",port);
})