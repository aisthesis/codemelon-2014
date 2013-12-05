/**
 * Dependencies:
 * extend.js
 * point.js
 */

var _c = _c || {};

(function(_c) {
    "use strict";

    _c.draw = _c.draw || {};
    /**
     * Convert window coordinates to canvas coordinates. Providing
     * the optional point parameter improves performance if the
     * desired point already exists.
     * @param {Object} canvas - canvas relative to which coordinates
     * are to be determined
     * @param {Number} x - window x coordinate
     * @param {Number} y - window y coordinate
     * @param {Point} [point] - point in which to store result
     * @returns {Point}
     */
    _c.draw.windowToCanvas = function(canvas, x, y, point) {
        var bbox = canvas.getBoundingClientRect();

        if (point) {
            point.x = x - bbox.left;
            point.y = y - bbox.top;
            return point;
        }
        return new _c.draw.Point(x - bbox.left, y - bbox.top);
    },

    /**
     * Returns a vector specifying the offset of the given
     * event from the given point on the given canvas.
     * @param {Object} canvas - canvas on which offset is to be determined
     * @param {Point} orig - point relative to which the offset is to be
     * measured
     * @param {Object} event - event whose position relative to the original
     * point is to be determined
     * @param {Point} [loc] - point that will be modified to show
     * the location of the event relative to the canvas. Re-using this point 
     * will improve performance if the function is called repeatedly, such as
     * on any mousemove event.
     * @param {Vector} [offset] - optional vector in which to store the result
     * @returns {Vector}
     */
    _c.draw.getOffset = function(canvas, orig, event, loc, offset) {
        var loc; 

        if (loc) {
            _c.draw.windowToCanvas(canvas, event.clientX, event.clientY, loc);
        }
        else {
            loc = _c.draw.windowToCanvas(canvas, event.clientX, event.clientY);
        }
        if (offset) {
            offset.x = loc.x - orig.x;
            offset.y = loc.y - orig.y;
            return offset;
        }
        return new _c.draw.Vector(loc.x - orig.x, loc.y - orig.y);
    }
})(_c);
