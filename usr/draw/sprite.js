/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 * Cf. Core HTML5 Canvas, pp. 395ff.
 *
 * Dependencies:
 * extend.js
 */
/** @namespace */
var _c = _c || {};

(function(_c) {
    "use strict";

    /** @namespace */
    _c.draw = _c.draw || {};
    /** @constructor */
    _c.draw.Sprite = _c.Base.extend({
        init: function(params) {
            // There is no need to wrap this, just make it a function
            this.paint = params.paint || function(context) {};
            // shape, image, etc.
            this.drawable = params.drawable;
            // leaving out the book's box since the drawable should handle location
            this.velocity = params.velocity;
            this.visible = params.visible || true;
            // defaults to false
            this.animating = !!params.animating;
            // behaviors are functions, not objects, so no need for separate behavior.execute()
            this.behaviors = params.behaviors || [];
        },

        update: function(context, time) {
            var _this = this;

            this.behaviors.forEach(function(behavior) {
                // allows natural use of 'this' inside behavior function
                // a behavior thus only takes context and time as arguments
                behavior.call(_this, context, time);
            });
        }
    });
})(_c);
