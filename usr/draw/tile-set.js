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
    _c.draw.TileSet = _c.Base.extend({
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
