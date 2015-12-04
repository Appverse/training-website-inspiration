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
                    })
                    .state('admin', {
                        url: '/admin',
                        templateUrl: 'components/admin/admin.html',
                        controller: 'adminController'
                    })
                    .state('admin.create', {
                        url: '/create',
                        templateUrl: 'components/admin/admin-create.html'
                    })
                    .state('admin.preview', {
                        url: '/preview',
                        templateUrl: 'components/course/course-view.html'
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
            .creatStubCurriculum(true)
            .then(courseService.listAll)
            .then(storeGlobalState)
            .then(stateService.createStatesFromCourses)
            .then(removeLoader)
            .catch(function(err) {
                if (err.status !== 409) {
                    $log.error(err);
                }
                // ignore pouchDB conflicts
                return $q.when(true);
            });

        function removeLoader() {
            $rootScope.loading = false;
            return $q.when(true);
        }

        function storeGlobalState(courses) {
            $rootScope.state = {};
            $rootScope.state.courses = courses;
            return $q.when(courses);
        }
    });
