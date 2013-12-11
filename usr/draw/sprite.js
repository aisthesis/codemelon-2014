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
            // TODO make _c.draw.Box similar or identical to Rectangle
            this.box = params.box;
            this.velocity = params.velocity;
            this.visible = params.visible || true;
            this.animating = !!params.animating;
            // behaviors are functions, not objects (no need for separate execute())
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
