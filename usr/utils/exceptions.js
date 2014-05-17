/**
 * Copyright (c) 2014 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Specific exception types
 */

define(function() {
    'use strict';

    var Exceptions = {};

    Exceptions.NoSuchElement = function(msg) {
        this.message = msg;
    };

    Exceptions.NoSuchElement.prototype = new Error();
    
    return Exceptions;
});
