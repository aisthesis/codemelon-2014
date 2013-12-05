test( "regular polygon test contains(point)", function() {
    var polygon = new _c.draw.RegularPolygon({
            center: new _c.draw.Point(0, 0),
            radius: 100,
            sides: 5
        }),
        outerPoints = [
            new _c.draw.Point(-75, -75),
            new _c.draw.Point(75, -75),
            new _c.draw.Point(75, 75),
            new _c.draw.Point(-75, 75)
        ],
        // inner radius is 80.9
        innerPoints = [
            new _c.draw.Point(-56, -56),
            new _c.draw.Point(-56, 56),
            new _c.draw.Point(56, 56),
            new _c.draw.Point(56, -56)
        ],
        outerPointEasyCases = outerPoints.length,
        innerPointEasyCases = innerPoints.length,
        angleDiff = 0.1,
        middleDistance = 90,
        i,
        angle;

    angle = 0;
    for (i = 0; i < polygon.sides; i++) {
        outerPoints.push(new _c.draw.Point(middleDistance * Math.cos(angle  + Math.PI / polygon.sides - angleDiff), 
            middleDistance * Math.sin(angle  + Math.PI / polygon.sides - angleDiff)));
        outerPoints.push(new _c.draw.Point(middleDistance * Math.cos(angle  + Math.PI / polygon.sides + angleDiff), 
            middleDistance * Math.sin(angle  + Math.PI / polygon.sides + angleDiff)));
        innerPoints.push(new _c.draw.Point(middleDistance * Math.cos(angle - angleDiff), 
            middleDistance * Math.sin(angle - angleDiff)));
        innerPoints.push(new _c.draw.Point(middleDistance * Math.cos(angle + angleDiff), 
            middleDistance * Math.sin(angle + angleDiff)));
        angle += Math.PI * 2 / polygon.sides;
    }

    for (i = 0; i < outerPoints.length; i++) {
        ok(!polygon.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
            outerPoints[i].y + ") not contained");
    }
    for (i = 0; i < innerPoints.length; i++) {
        ok(polygon.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
            innerPoints[i].y + ") contained");
    }

    // now rotate the polygon by PI / polygon.sides to get opposite results for the middleDistance cases
    polygon.angle = Math.PI / polygon.sides;
    for (i = outerPointEasyCases; i < outerPoints.length; i++) {
        ok(polygon.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
            outerPoints[i].y + ") contained");
    }
    for (i = innerPointEasyCases; i < innerPoints.length; i++) {
        ok(!polygon.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
            innerPoints[i].y + ") not contained");
    }
});
