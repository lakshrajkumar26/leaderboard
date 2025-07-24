const express =require("express");
const http = require("http");
const {initializeSocket} = require("./Config/socketIo.config");
var app = express();
const userRouter = require("./routes/UserRouter");
const db = require("./Config/db.config");
const claimRouter = require("./routes/ClaimRouter");
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require('path');

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ["http://localhost:5173$"];

app.use(cors({
  origin: 'http://localhost:5173',
}));

//server.io initialised 
const server = http.createServer(app);
initializeSocket(server);
 //now to  leaderboard

app.use(express.json());

app.get("/health", (req,res)=>{
    res.send("server is healthy");
})
app.use("/api",userRouter);
app.use("/api",claimRouter);


// // Fallback: send index.html for any non-API route
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(frontendDistPath, 'index.html'));
// });

// app.listen(port, ()=>{
//     console.log("server is running on ",port);
// })

server.listen(port , ()=>{
    console.log(`server running on http://localhost:${port}`);
})
