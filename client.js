var d3 = require('d3');
var $ = require('jquery');
var game = require('./src/game')();
var board = require('./src/board-client')(d3);
var controller = require('./src/controller')($);
var Worm = require('./src/worm');
var Apple = require('./src/apple')(board);
var gameEvents = [];
var repaintEvents = [];
var apples = [];
var worms = [];

//create worm instance
var worm = new Worm(board);
worms.push(worm);

//create apple instance
//TODO: this should be interfaced
var apple = new Apple(worms);
apples.push(apple);

//register controller events for worms
controller.register(worms);

//paint board
board.paint();



//repaint events
repaintEvents.push({ instance: worm, method: 'getCoordinatesWithColor', attributes: null });
repaintEvents.push({ instance: apple, method: 'getCoordinatesWithColor', attributes: null });

var socket = io('/game');

socket.on('game', function (game) {
    // console.log(game);

    worm.coords = game[0].steelblue;
    apple.coords = game[1].white;

    //game events
    // gameEvents.push({ instance: apple, method: 'respawn', attributes: null });
    // gameEvents.push({ instance: worm, method: 'move', attributes: apples });
    // gameEvents.push({ instance: board, method: 'repaint', attributes: repaintEvents });
    board.repaint(repaintEvents);


});


/// controller
worms.forEach(function (worm) {
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                //worm.setDirection('left');
                socket.emit('directionz', 'left');
                break;
            case 38: // up
                //worm.setDirection('up');
                socket.emit('directionz', 'up');
                break;
            case 39: // right
                //worm.setDirection('right');
                socket.emit('directionz', 'right');
                break;
            case 40: // down
                //worm.setDirection('down');
                socket.emit('directionz', 'down');
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
});


//start game
//game.start(gameEvents);

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
