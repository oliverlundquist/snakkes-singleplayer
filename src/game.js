module.exports = function () {
    var fps = (1000/30); //30fps
    var timer = null;

    function start(events) {
        if ( ! timer) {
            timer = setInterval(function () {
                events.forEach(function (event) {
                    event.instance[event.method](event.attributes);
                });
            }, fps);
        }
    };

    function stop() {
        clearInterval(timer);
    };

    return {
        start: start,
        stop: stop
    };

};
