var d3 = require('d3');
var $ = require('jquery');
var game = require('./game')();
var board = require('./board')(d3);
var controller = require('./controller')($);
var Worm = require('./worm');
var apple = require('./apple');
var gameEvents = [];
var repaintEvents = [];
var controllerEvents = [];

//create worm instance
var worm = new Worm(board);

//register controller events for worms
controller.register([worm]);

//paint board
board.paint();

//repaint events
repaintEvents.push({ instance: worm, method: 'getCoordinatesWithColor', attributes: null });

//game events
gameEvents.push({ instance: worm, method: 'move', attributes: null });
gameEvents.push({ instance: board, method: 'repaint', attributes: repaintEvents });

//start game
game.start(gameEvents);
