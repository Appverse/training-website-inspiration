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
                // tasks'ProteoExercise
                //
                //////////////////////////

                // We must configure states using $stateProvider.
                $stateProvider

                    .state('Directives', {
                        url: '/Directives',
                        templateUrl: 'components/Directives/Directives.html',
                        controller: 'commonController',
                        resolve: {
                            'courseData': function (courseServices) {
                                var stateName = Object.getOwnPropertyNames(this.includes);
                                return courseServices.getCourse(stateName[1].toLowerCase());
                            }
                        }
                    })


                    .state('Routing', {
                        url: '/Routing',
                        templateUrl: 'components/Routing/Routing.html',
                        controller: 'commonController',
                        resolve: {
                            'courseData': function (courseServices) {
                                var stateName = Object.getOwnPropertyNames(this.includes);
                                return courseServices.getCourse(stateName[1].toLowerCase());
                            }
                        }
                    })


                    .state('Generator', {
                        url: '/Generator',
                        templateUrl: 'components/Generator/Generator.html',
                        controller: 'commonController',
                        resolve: {
                            'courseData': function (courseServices) {
                                var stateName = Object.getOwnPropertyNames(this.includes);
                                return courseServices.getCourse(stateName[1].toLowerCase());
                            }
                        }
                    })


                    .state('home', {
                        url: '/home',
                        templateUrl: 'components/home/home.html',
                        controller: 'homeController',
                        resolve: {
                            'courseData': function (courseServices) {
                                var stateName = Object.getOwnPropertyNames(this.includes);
                                return courseServices.getCourse(stateName[1].toLowerCase());
                            }
                        }
                    });


            }
        ]);