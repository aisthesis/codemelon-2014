test( "Circle#contains() test", function() {
    var circle = new _c.draw.Circle({
            center: new _c.draw.Point(0, 0),
            radius: 100
        }),
        outerPoints = [
            new _c.draw.Point(-71, -71),
            new _c.draw.Point(71, -71),
            new _c.draw.Point(71, 71),
            new _c.draw.Point(-71, 71),
            new _c.draw.Point(101, 0),
            new _c.draw.Point(0, 101),
            new _c.draw.Point(-101, 0),
            new _c.draw.Point(0, -101)
        ],
        innerPoints = [
            new _c.draw.Point(-70, -70),
            new _c.draw.Point(70, -70),
            new _c.draw.Point(70, 70),
            new _c.draw.Point(-70, 70),
            new _c.draw.Point(99.9, 0),
            new _c.draw.Point(0, 99.9),
            new _c.draw.Point(-99.9, 0),
            new _c.draw.Point(0, -99.9)
        ],
        i;

    for (i = 0; i < outerPoints.length; i++) {
        ok(!circle.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
            outerPoints[i].y + ") not contained");
    }
    for (i = 0; i < innerPoints.length; i++) {
        ok(circle.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
            innerPoints[i].y + ") contained");
    }
});
