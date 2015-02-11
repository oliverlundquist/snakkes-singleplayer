module.exports = function (d3) {
    var w = 400;
    var h = 400;
    var pw = 10;
    var ph = 10;
    var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
    var scaleX = d3.scale.linear().domain([0, w]).range([0, w]);
    var scaleY = d3.scale.linear().domain([0, h]).range([0, h]);
    var ticksX = scaleX.ticks(w/pw);
    var ticksY = scaleY.ticks(h/ph);

    function paint() {
        svg.append("g").attr("id", "board");

        ticksX.map(function (xTick) {
            ticksY.map(function (yTick) {
                d3.select("#board")
                    .append("rect")
                    .attr("x", xTick)
                    .attr("y", yTick)
                    .attr("width", pw)
                    .attr("height", ph)
                    .attr("class", "pixies")
                    .attr("fill", "black");
            });
        });
    };

    // var colors = [
    //     { white: [100100, 110110, 120120] },
    //     { blue: [8080, 9090] }
    // ];
    function repaint(colorMethods) {
        var colors = [];
        colorMethods.forEach(function (colorObj) {
            colors.push(colorObj.instance[colorObj.method](colorObj.attributes));
        });

        d3.selectAll('#board .pixies').each(function () {
            var _this = d3.select(this);
            var x = parseInt(_this.attr('x'), 10);
            var y = parseInt(_this.attr('y'), 10);
            var fill = "black";
            var i = 0;

            //check if we should color the current pixel
            colors.forEach(function (color) {
                var colorname = Object.keys(color)[0];
                color[colorname].forEach(function (colorCoords) {
                    if(colorCoords.x === x && colorCoords.y === y) fill = colorname;
                    i++;
                });
            });

            _this.attr('fill', fill);
        });
    };

    function meta() {
        return { x: pw, y: ph, boundsX: ticksX[ticksX.length-2], boundsY: ticksY[ticksY.length-2] };
    };

    return {
        paint: paint,
        repaint: repaint,
        meta: meta
    };
};
