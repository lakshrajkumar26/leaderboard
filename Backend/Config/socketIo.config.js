const http = require("http");
const {Server} = require("socket.io");

let io;  //glocal
function initializeSocket(server) {
    //for understanding
    // console.log( "insider",server)
    // const outer = Server()
    // console.log("outer",outer);

    io = new Server (server, {
        cors : {
            origin : "*",
        },
    });

  io.on( "connection" , (socket) => {
    console.log("New client connected");

    socket.on("disconnect",()=>{
        console.log("Client disconnected");
    })

  })
}

 function getIo() {
    if(!io){
        throw new Error("Socket.io not initialized");
    }
    return io;
 }

 module.exports = {initializeSocket,getIo};

