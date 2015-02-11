function Worm(board) {
    this.grow = false;
    this.color = 'steelblue';
    this.xSize = board.meta().x;
    this.ySize = board.meta().y;
    this.xBounds = board.meta().boundsX;
    this.yBounds = board.meta().boundsY;
    this.coords = [{x: 200, y: 200}, {x: 210, y: 200}, {x: 220, y: 200}, {x: 230, y: 200}];
    this.direction = 'right';
}

Worm.prototype.move = function () {

    //can move?
    var lastCoordinate = this.coords[this.coords.length-1];
    var nextCoordinate = this.nextCoordinate( lastCoordinate.x, lastCoordinate.y );

    if (lastCoordinate.x !== nextCoordinate.x || lastCoordinate.y !== nextCoordinate.y)
    {
        this.coords.push(nextCoordinate);
        this.coords.splice(0, 1);
    }
};

Worm.prototype.getCoordinates = function () {
    return this.coords;
};

Worm.prototype.getCoordinatesWithColor = function () {
    var obj = {};
    obj[this.color] = this.getCoordinates();
    return obj;
};

Worm.prototype.nextCoordinate = function (currentX, currentY) {
    var nextCoordinate = { x: currentX, y: currentY };
    switch(this.direction) {
        case 'left':
            if(nextCoordinate.x > 0) nextCoordinate.x -= this.xSize;
            break;
        case 'up':
            if(nextCoordinate.y > 0) nextCoordinate.y -= this.ySize;
            break;
        case 'right':
            if(nextCoordinate.x < this.xBounds) nextCoordinate.x += this.xSize;
            break;
        case 'down':
            if(nextCoordinate.y < this.yBounds) nextCoordinate.y += this.ySize;
            break;
    }
    return nextCoordinate;
};

Worm.prototype.setDirection = function (direction) {
    this.direction = direction;
};

module.exports = Worm;
