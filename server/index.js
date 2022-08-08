const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
require('dotenv').config(); 

const PORT = process.env.PORT;
const Domains  = ["https://rudy-chatapp.netlify.app", "https://rudy-chatapp.netlify.app/"]

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {

    cors:{
        origin: Domains,
        methods:["GET","POST"]
    }
});

io.on("connection", (socket)=>{
    console.log(`User Connected ${socket.id}`);

    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    });

    socket.on('send_message', (data)=>{
        socket.to(data.room).emit('received_message', data);
    })

    socket.on("disconnect", ()=>{
        console.log('User Disconnected', socket.id)
    });

    
});

server.listen( PORT || 8080, ()=>{
    console.log(`Server running on port: ${PORT}`)
});

