/**
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Handles tile sets (sprite sheets) for use in sprites
 *
 * Dependencies:
 * extend.js
 * point.js
 */

var _c = _c || {};

(function(_c) {
    'use strict';

    _c.draw = _c.draw || {};

    /**
     * Creates a new _c.draw.TileSet
     * @constructor
     * @member {_c.draw.Image} image - native JavaScript Image object 
     * whose cells describe an animation sequence.
     * @member {string} image.src - path to image
     * @member {function} image.onload - callback called when the image
     * has finished loading.
     * @member {_c.draw.Point} corner - corner to which the current cell
     * will be drawn.
     * @member {{corner: _c.draw.Point, width: number, height: number}[]} cells -
     * describes individual cells within this.image
     * @member {number} index - index of current cell
     * @member {function} advance - advances the current cell, reverting
     * back to 0 when all cells have been traversed.
     * @member {function} draw - draws the current frame onto the canvas
     * @member {function} contains - specifies whether the rectangle into which
     * the current image is drawn contains a particular point.
     */
    _c.draw.TileSet = _c.Base.extend({

        /**
         * @constructs _c.draw.TileSet
         * @param {object} params
         * @param {string} params.src - path to image assuming that a canonical
         * path to an images folder has been set. The path to the images
         * folder should not be included in this parameter but should
         * be the value of _c.path.images
         * @param {_c.draw.Point} corner
         * @param {{corner: _c.draw.Point, width: number, height: number}[]} cells -
         * describes individual cells within this.image
         * @param {function} [params.onload] - callback to be invoked
         * when the image loads
         */
        init: function(params) {
            this.image = new Image();
            // required
            this.image.src = _c.path.images + params.src;
            this.image.onload = params.onload || 
                this.image.onload ||
                function(event) {};
            this.corner = params.corner;
            this.cells = params.cells;
            this.index = 0;
        },
        
        advance: function() {
            this.index = (this.index + 1) % this.cells.length;
        },

        draw: function(context) {
            var cell = this.cells[this.index];

            context.drawImage(this.image,
                cell.corner.x, cell.corner.y, cell.width, cell.height,
                this.corner.x, this.corner.y, 
                cell.width, cell.height);
        },

        contains: function(point) {
            var cell = this.cells[this.index];

            if (point.x < this.corner.x || 
                this.corner.x + cell.width < point.x) { return false; }
            if (point.y < this.corner.y || 
                this.corner.y + cell.height < point.y) { return false; }
            return true;
        }
    });
})(_c);
