require.config({
    baseUrl: '.',

    paths: {
        'jquery': 'lib/jquery.min',
        'bootstrap': 'lib/bootstrap/js/bootstrap.min',
        'underscore': 'lib/underscore.min',
        'backbone': 'lib/backbone.min',
        'prettify': 'lib/google-code-prettify/prettify'
    },

    shim: {
        'backbone': ['underscore', 'jquery']
    }
});

require([
        'scripts/app'
    ], 
    function(App) {
        App.initialize();
    }
); 
