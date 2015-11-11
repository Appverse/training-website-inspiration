(function () {
    'use strict';
    angular.module('App.Services', []);
    angular.module('App.Controllers', []);
    angular.module('webApp', [
        'appverse.translate',
        'appverse.serverPush',
        'appverse.security',
        'appverse.rest',
        'appverse.performance',
        'appverse.logging',
        'appverse.detection',
        'appverse.cache',
        'ngAnimate',
        'ui.bootstrap',
        'angularRipple',
        'ui.select',
        'ngSanitize',
        'rzModule',
        'rt.resize',
        'chart.js',
        'xeditable',
        'ngGrid',
        'appverse.router',
        'App.Controllers',
        'App.Services',
        'appverse',
        'pdf'
    ]).run(function ($log, editableOptions, $rootScope) {
        $log.debug('testAlphaApp run');
        editableOptions.theme = 'bs3';
        $rootScope.fullscreen = false;
    });
    AppInit.setConfig({
        environment: {
            'REST_CONFIG': {
                'BaseUrl': '/api',
                'RequestSuffix': ''
            },
            'SERVERPUSH_CONFIG': { 'BaseUrl': 'http://127.0.0.1:3000' }
        },
        appverseMobile: {},
        mobileBrowser: {}
    });
}());
