require.config({
    baseUrl: 'build/app',

    paths: {
        angular: '../vendor/angular/angular'
    },

    shim: {
        'angular': {
            exports: 'angular'
        }
    }
});

require(['app']);