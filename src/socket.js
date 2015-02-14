module.exports = function (io, worm, apple) {

    var socket = io.of('/game');

    socket.on('connection', function (conn) {
        conn.on('directionz', function (direction) {
            worm.setDirection(direction);
        });
    });

    function send() {
        socket.emit('game', [
            worm.getCoordinatesWithColor(),
            apple.getCoordinatesWithColor()
        ]);
    };

    return {
        send: send
    };

};
