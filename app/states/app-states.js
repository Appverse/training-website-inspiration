//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrangesite navigation     //
// using ui-router.                             //
//////////////////////////////////////////////////
'use strict';

angular.module('webApp')
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                ///////////////////////////////
                // 1-Redirects and Otherwise //
                ///////////////////////////////

                // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
                $urlRouterProvider

                // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                // Here we are just setting up some convenience urls.
                //                .when('/t?id', '/topics/:id')
                //                    .when('/t/:id', '/topics/:id')


                // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                    .otherwise('/home');


                //////////////////////////
                // 2-State Configurations
                // Several states hav been configured:
                // home
                // tasks
                //
                //////////////////////////

                // We must configure states using $stateProvider.
                $stateProvider.state('AngularCharts', {url: '/AngularCharts',templateUrl: 'components/AngularCharts/AngularCharts.html',controller: 'AngularChartsController'}).state('Detection', {url: '/Detection',templateUrl: 'components/Detection/Detection.html',controller: 'DetectionController'})

                    .state('Routing', {
                        url: '/Routing',
                        templateUrl: 'components/Routing/Routing.html',
                        controller: 'RoutingController'
                    }).state('Directives', {
                        url: '/Directives',
                        templateUrl: 'components/Directives/Directives.html',
                        controller: 'DirectivesController'
                    }).state('Setup', {
                        url: '/Setup',
                        templateUrl: 'components/Setup/Setup.html',
                        controller: 'SetupController'
                    })

                    .state('Generator', {
                        url: '/Generator',
                        templateUrl: 'components/Generator/Generator.html',
                        controller: 'GeneratorController'
                    })


                    .state('home', {
                        // Use a url of '/' to set a states as the 'index'.
                        url: '/home',
                        templateUrl: 'components/home/home.html',
                        controller: 'homeController'

                    })

                    .state('theme', {
                        // Use a url of '/' to set a states as the 'index'.
                        url: '/theme',
                        templateUrl: 'components/theme/theme.html'

                    })

                    .state('components', {
                        // Use a url of '/' to set a states as the 'index'.
                        url: '/components',
                        templateUrl: 'components/components/components.html',
                        controller: 'ComponentsController'
                    })

                    .state('charts', {
                        // Use a url of '/' to set a states as the 'index'.
                        url: '/charts',
                        templateUrl: 'components/charts/charts.html',
                        controller: 'ChartsController'
                    })
                ;
            }
        ]);


