var _c = _c || {};
_c.path = _c.path || {};
_c.path.usr = 'usr/';

require.config({
    baseUrl: '.',

    paths: {
        'jquery': 'lib/jquery.min',
        'bootstrap': 'lib/bootstrap/js/bootstrap.min',
        'underscore': 'lib/underscore.min',
        'Backbone': 'lib/backbone.min',
        'utils': 'usr/utils/main',
        'radioGroupView': 'scripts/utilities/2013120501/views/radio-group-view',
        'appView': 'scripts/utilities/2013120501/views/app-view'
    },

    shim: {
        'Backbone': ['underscore', 'jquery'],
        'bootstrap': ['jquery'],
        'radioGroupView': ['Backbone'],
        'appView': ['Backbone', 'radioGroupView']
    }
});

require([
        'jquery', 
        'bootstrap', 
        'underscore', 
        'Backbone',
        'utils',
        'radioGroupView',
        'appView'
    ], 
    function(
        $, 
        bootstrap,
        _, 
        Backbone,
        utils,
        radioGroupView,
        appView
        ) {
        'use strict';
        _c.app = _c.app || {};
        _c.app.appView = new _c.AppView({
            el: '#app'
        });
    }
); 
