require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');

const app = express();

const PORT = process.env.PORT || 8000;
const SOCKET_PORT = process.env.SOCKET_PORT || 8001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const io = new Server({
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());

const emailToSocketMapping = new Map();
const socketToEmailmapping = new Map();

io.on('connection', (socket) => {
  console.log('New Connection');

  socket.on('join-room', (data) => {
    const { roomId, emailId } = data;
    console.log('User', emailId, 'joined room', roomId);

    emailToSocketMapping.set(emailId, socket.id);
    socketToEmailmapping.set(socket.id, emailId);

    socket.join(roomId);
    socket.emit('joined-room', { roomId });
    socket.broadcast.to(roomId).emit('user-joined', { emailId });
  });

  socket.on('call-user', (data) => {
    const { emailId, offer } = data;
    const fromEmail = socketToEmailmapping.get(socket.id);
    const socketId = emailToSocketMapping.get(emailId);

    socket.to(socketId).emit('incomming-call', { from: fromEmail, offer });
  });

  socket.on('call-accepted', (data) => {
    const { emailId, ans } = data;
    const socketId = emailToSocketMapping.get(emailId);

    socket.to(socketId).emit('call-accepted', { ans });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.listen(SOCKET_PORT);
