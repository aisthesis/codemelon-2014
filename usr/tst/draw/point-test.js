(function() {
    var p1 = new _c.draw.Point(0, 0),
        p2 = new _c.draw.Point(30, -40),
        v1 = new _c.draw.Vector(-17, 23),
        v2 = new _c.draw.Vector(15, 80),
        distance = p1.distanceTo(p2),
        p3,
        v3;

    module("Point tests");
    
    test("Point#distanceTo(point)", function() {
        ok(approxEq(distance, 50), "correct distance between points");
    });
    
    test("Point#offset(vector)", function() {
        p3 = p1.offset(v1);
        ok(approxEq(p3.x, -17), "correct x value");
        ok(approxEq(p3.y, 23), "correct y value");
    });
    
    test("Point#offset(vector, point)", function() {
        var p = p2.offset(v2, p3);

        ok(approxEq(p3.x, 45), "point argument has correct x value");
        ok(approxEq(p3.y, 40), "point argument has correct y value");
        ok(approxEq(p.x, 45), "return value has correct x value");
        ok(approxEq(p.y, 40), "return value has correct y value");
    });
    
    test("Point#move(vector)", function() {
        p1.move(v2);
        ok(approxEq(p1.x, 15), "moved point has correct x coordinate");
        ok(approxEq(p1.y, 80), "moved point has correct y coordinate");
    });

    function approxEq(a, b) {
        approxEq.epsilon = approxEq.epsilon || 0.01;
        return Math.abs(a - b) < approxEq.epsilon;
    };
})();
