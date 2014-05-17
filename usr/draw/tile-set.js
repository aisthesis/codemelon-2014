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

define([
    'usr/extend',
    'usr/draw/drawable'
], function(
    Extend,
    Drawable) {
    'use strict';

    /**
     * Cell definition object
     * @typedef {Object} Cell
     * @property {_c.draw.Point} corner
     * @property {number} width
     * @property {number} height
     */
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
     * @member {Cell[]} cells - describes the individual cells contained
     * in the image
     * @member {number} index - index of current cell
     * @member {function} advance - advances the current cell, reverting
     * back to 0 when all cells have been traversed.
     * @member {boolean} loaded - whether the image has
     * finished loading.
     *
     * Inherited from _c.draw.Drawable:
     * @member {function} draw - draws the current frame onto the canvas
     * @member {function} contains - specifies whether the rectangle into which
     * the current image is drawn contains a particular point.
     */
    var TileSet = Drawable.extend({

        /**
         * @constructs _c.draw.TileSet
         * @param {object} params
         * @param {string} params.src - path to image assuming that a canonical
         * path to an images folder has been set. The path to the images
         * folder should not be included in this parameter but should
         * be the value of _c.path.images
         * @param {_c.draw.Point} params.corner
         * @param {Cell[]} cells - describes the individual cells contained
         * in the image
         * @param {function} [params.onload] - callback to be invoked
         * when the image loads
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
            this.corner = params.corner;
            this.cells = params.cells;
            this.index = 0;
            this.loaded = false;
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

    return TileSet;
});
