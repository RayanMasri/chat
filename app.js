const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// var users = [];

io.on('connection', (socket) => {
    socket.on('chat.message', (object) => {
        io.emit(
            'chat.message',
            Object.assign({}, object, {
                id: socket.id,
            })
        );
    });
    // socket.on('login', (username) => {
    // console.log(`'${username}' joined (${socket.id})`);

    // users.push({
    //     name: username,
    //     id: socket.id,
    // });

    // socket.broadcast.emit('chat.message', users);
    // });
    // socket.on('disconnect', () => {
    // console.log(`'undefined' left ${socket.id}`);

    // users = users.filter((user) => user.id != socket.id);

    // socket.broadcast.emit('chat.update', users);
    // });
});

http.listen(process.env.PORT || 3000, () => {
    console.log(`listening on *:${process.env.PORT || 3000}`);
});
