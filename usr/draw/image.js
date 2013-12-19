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

/** @namespace */
var _c = _c || {};

(function(_c) {
    'use strict';

    /** @namespace */
    _c.draw = _c.draw || {};

    /**
     * Creates a new _c.draw.Image
     * @constructor
     * @member {Image} image - native JavaScript Image object wrapped
     * by this class
     * @member {string} image.src - path to image
     * @member {function} image.onload - callback called when the
     * image has finished loading
     * @member {_c.draw.Point} corner - point on the canvas at which
     * the top left corner of the image will be drawn
     * @member {number} height - height to which the image will be scaled
     * @member {number} width - width to which the image will be scaled
     * @member {boolean} loaded - whether the image has
     * finished loading.
     *
     * Inherited from _c.draw.Drawable:
     * @member {function} draw - draws the image into the given context
     * @member {function} contains - specifies whether a given point
     * is contained in the rectangle where the image is placed.
     */
    _c.draw.Image = _c.draw.Drawable.extend({

        /**
         * @constructs _c.draw.Image
         * @param {object} params
         * @param {string} params.src - path to image assuming that a canonical
         * path to an images folder has been set. The path to the images
         * folder should not be included in this parameter but should
         * be the value of _c.path.images
         * @param {function} [params.onload] - action to take when the image
         * has finished loading.
         * @param {_c.draw.Point} params.corner - point on the canvas at which
         * the top left corner of the image will be drawn
         * @param {number} params.height - height to which the image will be scaled
         * @param {number} params.width - width to which the image will be scaled
         */
        init: function(params) {
            var _this = this,
                _onload = function(event) { _this.loaded = true; };

            if (params.onload) {
                _onload = function(event) {
                    _this.loaded = true;
                    params.onload.call(_this.image, event);
                };
            }
            this.image = new Image();
            // required
            this.image.src = _c.path.images + params.src;
            this.image.onload = _onload;
            // a rectangle is too heavyweight 
            this.corner = params.corner;
            this.width = params.width;
            this.height = params.height;
            this.loaded = false;
        },

        draw: function(context) {
            context.drawImage(this.image, 
                this.corner.x, this.corner.y, 
                this.width, this.height);
        },

        contains: function(point) {
            if (point.x < this.corner.x || 
                this.corner.x + this.width < point.x) { return false; }
            if (point.y < this.corner.y || 
                this.corner.y + this.height < point.y) { return false; }
            return true;
        }
    });
})(_c);
