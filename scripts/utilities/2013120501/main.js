require.config({
    baseUrl: '.',

    paths: {
        'jquery': 'lib/jquery.min',
        'bootstrap': 'lib/bootstrap/js/bootstrap.min',
        'underscore': 'lib/underscore.min',
        'backbone': 'lib/backbone.min'
    },

    shim: {
        'backbone': ['underscore', 'jquery']
    }
});

require([
    'scripts/utilities/2013120501/app'
], function(App) {
    App.init();
});
