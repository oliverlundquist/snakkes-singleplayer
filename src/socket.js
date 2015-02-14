module.exports = function (io, worm, apple) {

    var socket = io.of('/game');

    function send() {
        socket.emit('game', [
            worm.getCoordinatesWithColor(),
            apple.getCoordinatesWithColor()
        ]);
    };

};
