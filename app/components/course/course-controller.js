'use strict';

angular.module('App.Controllers')

.controller('courseController',
    function($log, $scope, course, children) {
        var vm = this;
        $scope.course = course;
        $scope.children = children;
    });
