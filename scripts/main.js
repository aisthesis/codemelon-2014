require.config({
    baseUrl: '.',

    paths: {
        'jquery': 'lib/jquery.min',
        'bootstrap': 'lib/bootstrap/js/bootstrap.min',
        'underscore': 'lib/underscore.min',
        'Backbone': 'lib/backbone.min',
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
        'Backbone'
    ], 
    function(
        $, 
        bootstrap,
        _, 
        Backbone) {
        'use strict';
    }
); 
