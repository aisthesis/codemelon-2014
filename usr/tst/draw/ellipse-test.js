(function() {
    module("Ellipse tests");

    test( "Ellipse#contains() test: circular ellipse", function() {
        var ellipse = new _c.draw.Ellipse({
                center: new _c.draw.Point(700, 1200),
                radius: 100,
                stretch: 1
            }),
            outerPoints = [
                new _c.draw.Point(801, 1200),
                new _c.draw.Point(771, 1129),
                new _c.draw.Point(700, 1099),
                new _c.draw.Point(629, 1129),
                new _c.draw.Point(599, 1200),
                new _c.draw.Point(629, 1271),
                new _c.draw.Point(700, 1301),
                new _c.draw.Point(771, 1271)
            ],
            innerPoints = [
                new _c.draw.Point(799, 1200),
                new _c.draw.Point(770, 1130),
                new _c.draw.Point(700, 1101),
                new _c.draw.Point(630, 1130),
                new _c.draw.Point(601, 1200),
                new _c.draw.Point(630, 1270),
                new _c.draw.Point(700, 1299),
                new _c.draw.Point(770, 1270)
            ],
            i;

        for (i = 0; i < outerPoints.length; i++) {
            ok(!ellipse.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
                outerPoints[i].y + ") not contained");
        }
        for (i = 0; i < innerPoints.length; i++) {
            ok(ellipse.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
                innerPoints[i].y + ") contained");
        }
    });

    test( "Ellipse#contains() test: stretched but not rotated", function() {
        var ellipse = new _c.draw.Ellipse({
                center: new _c.draw.Point(700, 1200),
                radius: 100,
                stretch: 2
            }),
            outerPoints = [
                new _c.draw.Point(901, 1200),
                new _c.draw.Point(842, 1129),
                new _c.draw.Point(700, 1099),
                new _c.draw.Point(558, 1129),
                new _c.draw.Point(499, 1200),
                new _c.draw.Point(558, 1271),
                new _c.draw.Point(700, 1301),
                new _c.draw.Point(842, 1271)
            ],
            innerPoints = [
                new _c.draw.Point(700, 1200),
                new _c.draw.Point(899, 1200),
                new _c.draw.Point(840, 1130),
                new _c.draw.Point(700, 1101),
                new _c.draw.Point(560, 1130),
                new _c.draw.Point(501, 1200),
                new _c.draw.Point(560, 1270),
                new _c.draw.Point(700, 1299),
                new _c.draw.Point(840, 1270)
            ],
            i;

        for (i = 0; i < outerPoints.length; i++) {
            ok(!ellipse.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
                outerPoints[i].y + ") not contained");
        }
        for (i = 0; i < innerPoints.length; i++) {
            ok(ellipse.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
                innerPoints[i].y + ") contained");
        }
    });

    test( "Ellipse#contains() test: stretched and rotated 45 degrees", function() {
        var ellipse = new _c.draw.Ellipse({
                center: new _c.draw.Point(700, 1200),
                radius: 100,
                stretch: 2,
                angle: Math.PI / 4
            }),
            outerPoints = [
                new _c.draw.Point(850, 1200),
                new _c.draw.Point(780, 1120),
                new _c.draw.Point(700, 1050),
                new _c.draw.Point(558, 1058),
                new _c.draw.Point(550, 1200),
                new _c.draw.Point(620, 1280),
                new _c.draw.Point(700, 1350),
                new _c.draw.Point(842, 1342)
            ],
            innerPoints = [
                // center
                new _c.draw.Point(700, 1200),
                // points contained in unstretched circle
                new _c.draw.Point(799, 1200),
                new _c.draw.Point(770, 1130),
                new _c.draw.Point(700, 1101),
                new _c.draw.Point(630, 1130),
                new _c.draw.Point(601, 1200),
                new _c.draw.Point(630, 1270),
                new _c.draw.Point(700, 1299),
                new _c.draw.Point(770, 1270),
                // outside circle but in ellipse
                new _c.draw.Point(820, 1200),
                new _c.draw.Point(700, 1080),
                new _c.draw.Point(560, 1060),
                new _c.draw.Point(580, 1200),
                new _c.draw.Point(700, 1320),
                new _c.draw.Point(840, 1340)
            ],
            i;

        for (i = 0; i < outerPoints.length; i++) {
            ok(!ellipse.contains(outerPoints[i]), "point (" + outerPoints[i].x + ", " + 
                outerPoints[i].y + ") not contained");
        }
        for (i = 0; i < innerPoints.length; i++) {
            ok(ellipse.contains(innerPoints[i]), "point (" + innerPoints[i].x + ", " + 
                innerPoints[i].y + ") contained");
        }
    });
})();
