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
        .run(function($log, editableOptions, $rootScope, offlineService) {
            editableOptions.theme = 'bs3';
            $rootScope.fullscreen = false;
            makeHeadersShrinkable();

            Notification.requestPermission(function(permission) {
                offlineService.wakeServiceWorker();
            });
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
        $sceDelegateProvider.resourceUrlWhitelist(['**']);
    }

    function makeHeadersShrinkable() {
        var $document = $(document);
        var $body = $('body');
        $(window).scroll(function() {
            //console.log($(document).scrollTop());
            if ($document.scrollTop() > 180) {
                $body.addClass('shrink');
            } else {
                $body.removeClass('shrink');
            }
        });
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
