var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));

var d3 = require('d3');
var $ = require('jquery');
var game = require('./src/game')();
var board = require('./src/board')(d3);
// var controller = require('./src/controller')($);
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

var socketHandler = require('./src/socket')(io, worm, apple);


// var socket2 = io.of('/game');
// socket2.on('directionz', function (msg) {
//     console.log('msg');
// });

//register controller events for worms
// controller.register(worms);

//paint board
// board.paint();

//repaint events
// repaintEvents.push({ instance: worm, method: 'getCoordinatesWithColor', attributes: null });
// repaintEvents.push({ instance: apple, method: 'getCoordinatesWithColor', attributes: null });

//game events
gameEvents.push({ instance: apple, method: 'respawn', attributes: null });
gameEvents.push({ instance: worm, method: 'move', attributes: apples });
// gameEvents.push({ instance: board, method: 'repaint', attributes: repaintEvents });
gameEvents.push({ instance: socketHandler, method: 'send', attributes: null });


//start game
game.start(gameEvents);

/// controller
// worms.forEach(function (worm) {
//     $(document).keydown(function(e) {
//         switch(e.which) {
//             case 37: // left
//                 worm.setDirection('left');
//                 break;
//             case 38: // up
//                 worm.setDirection('up');
//                 break;
//             case 39: // right
//                 worm.setDirection('right');
//                 break;
//             case 40: // down
//                 worm.setDirection('down');
//                 break;

//             default: return; // exit this handler for other keys
//         }
//         e.preventDefault(); // prevent the default action (scroll / move caret)
//     });
// });



http.listen(80, function(){
  console.log('listening on *:80');
});
