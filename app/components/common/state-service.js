'use strict';
angular
    .module('App.Services')
    .factory('stateService', stateService);

function stateService($q, $window, $urlRouter, $state, $rootScope) {

    //// Interface
    var service = {
        createStatesFromCourses: createStatesFromCourses
    };

    return service;

    //// Public functions

    function createStatesFromCourses(courses) {
        $rootScope.areas = [];
        angular.forEach(courses, function(course) {
            var stateName = course.path + course.name;
            console.warn('course -> state', stateName);
            if (!$state.get(stateName)) {
                var state = {
                    'url': '/' + course.name,
                    views: {
                        '@': {
                            'templateUrl': 'components/course/course-view.html',
                            'controller': 'courseController'
                        }
                    },
                    'resolve': {
                        'course': function($state, courseService) {
                            var courseName = getCourseNameFromPath($state.next.name);
                            return courseService.getCourse(courseName);
                        },
                        'children': function($state, courseService) {
                            var courseName = getCourseNameFromPath($state.next.name);
                            return courseService.listChildren(courseName);
                        }
                    }
                };
                $window.$stateProviderRef.state(stateName, state);
                if (!course.path) {
                    $rootScope.areas.push(course);
                }
            }
        });
        $urlRouter.sync();
        $urlRouter.listen();
        return $q.when(courses);
    }

    //// Private functions

    function getCourseNameFromPath(path) {
        return path.substring(path.lastIndexOf('.') + 1, path.length);
    }

}
