/* global PouchDB */
'use strict';
angular
    .module('App.Services')
    .factory('devService', devService);

function devService($log, $q, $http, $window, dbService, courseService, Course) {

    //// Interface
    var service = {
        creatStubCurriculum: creatStubCurriculum
    };

    init();

    return service;

    //// Public functions

    function init() {
        PouchDB.debug.enable('*');
        $window.addEventListener('beforeunload', function() {
            new PouchDB('training').destroy();
        }, false);
    }

    function creatStubCurriculum(fromLocal) {
        var promise = dbService.getDB(fromLocal);
        if (fromLocal) {
            promise = promise.then(createAreas)
                .then(createUnits)
                .then(createCourses);
        }
        return promise;
    }

    //// Private functions

    function createCoursesFromJSON(response) {
        var data = angular.fromJson(response.data);
        var promises = _.map(data, courseService.createCourse);
        return $q.all(promises);
    }

    function createAreas() {
        $log.debug('creating areas');
        return $http.get('resources/config/areas.json').then(createCoursesFromJSON);
    }

    function createUnits() {
        $log.debug('creating units');
        return $http.get('resources/config/units.json').then(createCoursesFromJSON);
    }

    function createCourses() {
        $log.debug('creating courses');
        return $http.get('resources/config/courses.json').then(createCoursesFromJSON);
    }

}
