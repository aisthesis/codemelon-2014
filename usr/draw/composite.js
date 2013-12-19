/**
 * Composite of multiple related drawables.
 * A drawable should extend this class if its
 * individual components need to re-use the same
 * points or vectors
 *
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies:
 * extend.js
 * drawable.js
 * point.js
 */

/** @namespace */
var _c = _c || {};

(function(_c) {
    "use strict";

    /** @namespace */
    _c.draw = _c.draw || {};

    /**
     * Creates a new _c.draw.Composite
     * @constructor 
     * @member {Object.<string, _c.draw.Drawable>} drawables - collection of named drawables
     * @member {string[]} keys - array containing the name of each drawable.
     * This array determines the order in which draw operations will be
     * performed. Only drawables whose names appear in this array
     * will be drawn by the default Composite#draw() method.
     * @member {Object.<string, _c.draw.Point>} [points] - collection of points
     * that may be re-used in several distinct drawables. The center of a circle might,
     * for example, also represent the corner of a rectangle.
     * @member {Object.<string, _c.draw.Vector>} [vectors] - collection of vectors
     *
     * Inherited from _c.draw.Drawable:
     * @member {function} draw
     * @member {function} [contains]
     */
    _c.draw.Composite = _c.draw.Drawable.extend({

        /**
         * @constructs _c.draw.Composite
         * @param {object} params
         * @param {Object.<string, _c.draw.Drawable>} params.drawables - collection of named drawables
         * @param {string[]} params.keys - array containing the name of each drawable.
         * This array determines the order in which draw operations will be
         * performed. Only drawables whose names appear in this array
         * will be drawn by the default Composite#draw() method.
         * @param {Object.<string, _c.draw.Point>} [params.points] - collection of points
         * that may be re-used in several distinct drawables. The center of a circle might,
         * for example, also represent the corner of a rectangle.
         * @param {Object.<string, _c.draw.Vector>} [params.vectors] - collection of vectors
         * @param {Object.<string, *>} [params.config] - allows the drawable to include miscellaneous
         * configuration parameters.
         * @param {Object.<string, function>} [params.draw] - modifies the default draw behavior
         * of calling the draw() method of each drawable in the order specified by the keys array.
         * @param {function} [params.draw.before] - action to be taken before the default draw
         * method is called
         * @param {function} [params.draw.after] - action to be taken after the default draw method
         * is called
         * @param {function} [params.draw.main] - overrides the default draw method and obviates
         * params.draw.before and params.draw.after. That is, if params.draw.main is provided, it
         * must include the entire draw method.
         * @param {function} [params.finish] - called (using <code>this</code> as 'this argument') after 
         * all components have been initially constructed. Used to set up pointers between
         * components, which presupposes that the components have been initialized.
         * For example, a drawable circle might want to use a named point as its center so that the
         * same point can also be used as endpoint of a line.
         */
        /**
         * @method params.beforeDraw
         * // similarly for params.afterDraw and params.draw
         * @param {object} context - context into which the drawable will be drawn
         */
        init: function(params) {
            var _this = this,
                _draw = params.draw || {},
                _beforeDraw = _draw.before || function(context) {},
                _afterDraw = _draw.after || function(context) {};

            this.drawables = params.drawables;
            this.keys = params.keys;
            this.points = params.points || {};
            this.vectors = params.vectors || {};
            this.config = params.config || {};
            if (_draw.main) {
                this.draw = function(context) {
                    return _draw.main.call(this, context);
                }
            }
            else {
                this.draw = function(context) {
                    _beforeDraw.call(this, context);
                    this.keys.forEach(function(key) {
                        _this.drawables[key].draw(context);
                    });
                    _afterDraw.call(this, context);
                }
            }
            if (params.finish) {
                params.finish.call(this);
            }
        }
    });
})(_c);
