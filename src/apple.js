module.exports = function (board) {

    function Apple(worms) {
        this.color = 'white';
        this.eaten = false;
        this.coords = null;
        this.worms = worms;
        this.getNewCoordinates();
    };

    Apple.prototype.respawn = function () {
        if(this.eaten) this.getNewCoordinates();
        this.eaten = false;
    };

    Apple.prototype.wormAteMe = function () {
        this.eaten = true;
    };

    Apple.prototype.xBounds = board.meta().ticksX;

    Apple.prototype.yBounds = board.meta().ticksY;

    Apple.prototype.getNewCoordinates = function (worms) {
        this.coords = null;
        while(this.coords === null) {
            var found = true;
            var tmpCoords = this.generateCoords();

            this.worms.forEach(function (worm) {
                worm.getCoordinates().forEach(function (wormCoords) {
                    if(wormCoords.x === tmpCoords.x && wormCoords.y === tmpCoords.y) found = false;
                });
            });

            if(found) { this.coords = [tmpCoords] }
        }
    };

    Apple.prototype.generateCoords = function () {
        return {
            x: this.xBounds[Math.floor(Math.random() * (this.xBounds.length-1))],
            y: this.yBounds[Math.floor(Math.random() * (this.yBounds.length-1))]
        };
    };

    Apple.prototype.getCoordinates = function () {
        return this.coords;
    };

    Apple.prototype.getCoordinatesWithColor = function () {
        var obj = {};
        obj[this.color] = this.getCoordinates();
        return obj;
    };

    return Apple;

};
