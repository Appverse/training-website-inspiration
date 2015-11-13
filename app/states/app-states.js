//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrangesite navigation     //
// using ui-router.                             //
//////////////////////////////////////////////////
'use strict';

angular.module('webApp')
    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider , $locationProvider) {
                $urlRouterProvider.deferIntercept();
                $locationProvider.html5Mode({enabled: false});
                window.$stateProviderRef = $stateProvider; 
                $urlRouterProvider.otherwise('/home'); 
                // We must configure states using $stateProvider.
                $stateProvider
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