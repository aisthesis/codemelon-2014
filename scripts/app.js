/**
 * Main application module
 * Source: 
 * Cf. http://backbonetutorials.com/organizing-backbone-using-modules/
 *
 * Author Marshall Farrier
 * Since 2014-05-16
 */

define([
    // path alias configured in main.js
    'jquery',     // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone',    // lib/backbone/backbone
    'bootstrap',
    'prettify'

], function($, _, Backbone, Bootstrap, Prettify){
    var initialize = function() {
        prettyPrint();
    };

    return {
        initialize: initialize
    };
});
