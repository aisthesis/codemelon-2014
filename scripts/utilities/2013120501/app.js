/**
 * Main application module for password generator
 *
 * Copyright (C) 2014 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Author Marshall Farrier
 * Since 2014-05-17
 */

define([
    'scripts/utilities/2013120501/views/app-view'
], function(
    AppView) {
    var init = function() {
        var appView = new AppView({
            el: '#app'
        });
    };

    return {
        init: init
    };
});
