var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));

// var d3 = require('d3');
// var $ = require('jquery');
var game = require('./game')();
var board = require('./board')(d3);
// var controller = require('./controller')($);
var Worm = require('./worm');
var Apple = require('./apple')(board);
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
