'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        socket.on('reminders', function(data) {
            console.log('socket page: ', data);
            var eventTime = new Date(data.date).getTime() / 1000;
            var now = (new Date().getTime()) / 1000;
            var diff = Math.abs(now - eventTime);
            var send_time = diff - 60;
            console.log('timeout: ', send_time);
            setTimeout(function() {
                socket.broadcast.emit('remind', {
                    id: data._id,
                    body: 'click here to see event details',
                    icon: 'http://i.imgur.com/am171kR.png'
                });
            }, send_time * 1000);
        });
    });

    return io;

};
