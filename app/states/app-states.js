//////////////////////////////////////////////////
// The main module configuration section shows  //
// how to define when (redirects) and otherwise //
// (invalid urls) to arrangesite navigation     //
// using ui-router.                             //
//////////////////////////////////////////////////
'use strict';

angular.module('webApp')
    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide',
            function($stateProvider, $urlRouterProvider, $locationProvider, $provide) {
                $urlRouterProvider.deferIntercept();
                $locationProvider.html5Mode({
                    enabled: false
                });
                window.$stateProviderRef = $stateProvider;
                $urlRouterProvider.otherwise('/home');
                // We must configure states using $stateProvider.
                $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'components/course/course-view.html',
                        controller: 'courseController',
                        resolve: {
                            course: function($q) {
                                return $q.when({
                                    metadata: {
                                        title: 'training',
                                        subtitle: 'Welcome to training website inspiration'
                                    }
                                });
                            },
                            children: function($q, $rootScope, courseService) {
                                return courseService.listChildren();
                            }
                        }
                    });

                //Add a $state.next property so state resolvers can know what is being loaded
                $provide.decorator('$state', function($delegate, $rootScope) {
                    $rootScope.$on('$stateChangeStart', function(event, state, params) {
                        $delegate.next = state;
                    });
                    return $delegate;
                });
            }
        ])
    .run(function($log, $q, $rootScope, courseService, devService, stateService) {
        $rootScope.loading = true;

        devService
            .creatStubCurriculum()
            .then(courseService.listAll)
            .then(stateService.createStatesFromCourses)
            .then(removeLoader)
            .catch(function(err) {
                if (err.status !== 409) {
                    $log.error(err);
                    // ignore if doc already exists
                }
                return $q.when(true);
            });

        function removeLoader() {
            $rootScope.loading = false;
            return $q.when(true);
        }
    });
