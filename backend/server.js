// mongodb+srv://fazilch05:fazil6126@cluster0.syvtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

mongoose.connect('mongodb+srv://fazilch05:fazil6126@cluster0.kjdok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api', userRoutes);
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server is running on port 5000');
});
