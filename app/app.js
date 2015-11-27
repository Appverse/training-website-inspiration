(function() {
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
        'pdf',
        'pouchdb',
        'hc.marked'
    ]).config(['markedProvider', '$sceDelegateProvider',
        function(markedProvider, $sceDelegateProvider) {
            configureURLWhitelist($sceDelegateProvider);
            configureMarkdown(markedProvider);
        }
    ])
        .run(function(editableOptions, $rootScope) {
            editableOptions.theme = 'bs3';
            $rootScope.fullscreen = false;
        });
    //Appverse Configs
    AppInit.setConfig({
        environment: {
            'REST_CONFIG': {
                'BaseUrl': '/api',
                'RequestSuffix': ''
            },
            'SERVERPUSH_CONFIG': {
                'BaseUrl': 'http://127.0.0.1:3000'
            }
        },
        appverseMobile: {},
        mobileBrowser: {}
    });

    function configureURLWhitelist($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'https://*.gftlabs.com/**'
        ]);
    }

    function configureMarkdown(markedProvider) {
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            highlight: function(code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code, true).value;
                } else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });
    }
}());
