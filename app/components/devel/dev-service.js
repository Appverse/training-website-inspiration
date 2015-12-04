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
            console.log('destroying DB');
            dbService.destroy();
        });
    }

    function creatStubCurriculum(fromLocal) {
        if (fromLocal) {
            return dbService.getDB(fromLocal)
                .then(createAreas)
                .then(createUnits)
                .then(createCourses);
        } else {
            return dbService.getDB(false);
        }
    }

    //// Private functions

    function createCoursesFromJSON(response) {
        var data = angular.fromJson(response.data);
        var promises = _.map(data, courseService.createCourse);
        return $q.all(promises);
    }

    function createAreas() {
        $log.debug('creating areas');
        return $http.get('components/devel/areas.json').then(createCoursesFromJSON);
    }

    function createUnits() {
        $log.debug('creating units');
        return $http.get('components/devel/units.json').then(createCoursesFromJSON);
    }

    function createCourses() {
        $log.debug('creating courses');
        return $http.get('components/devel/courses.json').then(createCoursesFromJSON);
    }

}
