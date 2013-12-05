require.config({
    baseUrl: '.',

    paths: {
        'jquery': 'lib/jquery.min',
        'bootstrap': 'lib/bootstrap/js/bootstrap.min',
        'underscore': 'lib/underscore.min',
        'Backbone': 'lib/backbone.min',
        'prettify': 'lib/google-code-prettify/prettify'
    },

    shim: {
        'Backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery']
    }
});

require([
        'jquery', 
        'bootstrap', 
        'underscore', 
        'Backbone',
        'prettify'
    ], 
    function(
        $, 
        bootstrap,
        _, 
        Backbone,
        prettify) {
        'use strict';
        prettyPrint();
    }
); 
