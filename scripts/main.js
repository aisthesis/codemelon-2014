require.config({
    baseUrl: '.',

    paths: {
        'jquery': 'lib/jquery-2.0.3.min',
        'bootstrap': 'lib/bootstrap-3.0.0/js/bootstrap.min',
        'underscore': 'lib/underscore-1.5.2.min',
        'Backbone': 'lib/backbone-1.1.0.min',
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
