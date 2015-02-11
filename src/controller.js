module.exports = function ($) {

    function register(worms) {
        worms.forEach(function (worm) {
            $(document).keydown(function(e) {
                switch(e.which) {
                    case 37: // left
                        worm.setDirection('left');
                        break;
                    case 38: // up
                        worm.setDirection('up');
                        break;
                    case 39: // right
                        worm.setDirection('right');
                        break;
                    case 40: // down
                        worm.setDirection('down');
                        break;

                    default: return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            });
        });
    };

    return {
        register: register
    };

};
