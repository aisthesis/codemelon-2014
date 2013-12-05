test( "Rectangle#contains() test", function() {
    // positive width and height
    var rectangle = new _c.draw.Rectangle({
            corner: new _c.draw.Point(0, 0),
            width: 100,
            height: 50
        }),
        outerPoints = [
            new _c.draw.Point(10, -1),
            new _c.draw.Point(101, -1),
            new _c.draw.Point(101, 21),
            new _c.draw.Point(101, 51),
            new _c.draw.Point(90, 51),
            new _c.draw.Point(-3, 51),
            new _c.draw.Point(-1, 10),
            new _c.draw.Point(-1, -1)
        ],
        innerPoints = [
            new _c.draw.Point(1, 1),
            new _c.draw.Point(99, 1),
            new _c.draw.Point(99, 49),
            new _c.draw.Point(1, 49),
            new _c.draw.Point(50, 25)
        ],
        i;
        
    for (i = 0; i < outerPoints.length; i++) {
        ok(!rectangle.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
            outerPoints[i].y + ") not contained (positive width, positive height)");
    }
    for (i = 0; i < innerPoints.length; i++) {
        ok(rectangle.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
            innerPoints[i].y + ") contained (positive width, positive height");
    }

    // positive width, negative height
    rectangle.height = -50;
    rectangle.corner = new _c.draw.Point(0, 50);
    for (i = 0; i < outerPoints.length; i++) {
        ok(!rectangle.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
            outerPoints[i].y + ") not contained (positive width, negative height)");
    }
    for (i = 0; i < innerPoints.length; i++) {
        ok(rectangle.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
            innerPoints[i].y + ") contained (positive width, negative height");
    }

    // negative width, negative height
    rectangle.width = -100;
    rectangle.corner = new _c.draw.Point(100, 50);
    for (i = 0; i < outerPoints.length; i++) {
        ok(!rectangle.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
            outerPoints[i].y + ") not contained (negative width, negative height)");
    }
    for (i = 0; i < innerPoints.length; i++) {
        ok(rectangle.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
            innerPoints[i].y + ") contained (negative width, negative height");
    }

    // negative width, positive height
    rectangle.height = 50;
    rectangle.corner = new _c.draw.Point(100, 0);
    for (i = 0; i < outerPoints.length; i++) {
        ok(!rectangle.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
            outerPoints[i].y + ") not contained (negative width, positive height)");
    }
    for (i = 0; i < innerPoints.length; i++) {
        ok(rectangle.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
            innerPoints[i].y + ") contained (negative width, positive height");
    }
});
