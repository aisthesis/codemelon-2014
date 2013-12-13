/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Handles image drawing for use in sprites
 *
 * Dependencies:
 * extend.js
 * point.js
 */

var _c = _c || {};

(function(_c) {
    'use strict';

    _c.draw = _c.draw || {};
    _c.draw.Image = _c.Base.extend({
        init: function(params) {
            this.image = new Image();
            // required
            this.image.src = _c.path.images + params.src;
            this.image.onload = params.onload || function(event) {};
            this.corner = params.corner;
            this.width = params.width;
            this.height = params.height;
        },

        draw: function(context) {
            context.drawImage(this.image, 
                this.corner.x, this.corner.y, 
                this.width, this.height);
        },

        contains: function(point) {
            if (point.x < this.corner.x || 
                this.corner.x + this.absWidth() < point.x) { return false; }
            if (point.y < this.corner.y || 
                this.corner.y + this.absHeight() < point.y) { return false; }
            return true;
        }
    });
})(_c);
