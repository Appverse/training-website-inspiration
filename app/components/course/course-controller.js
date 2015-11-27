'use strict';

angular.module('App.Controllers')

.controller('courseController',
    function($log, $scope, course, children) {
        var vm = this;
        $scope.course = course;
        $scope.pdfUrl = course.contents && course.contents.pdfUrl;
        if (course.path) {
            $scope.breadcrumbs = getBreadcrumbs(course.path);
        }
        $scope.children = children;
        $scope.getNumber = function(num) {
            return new Array(num);
        };

        function getBreadcrumbs(path) {
            var dotIndex;
            var result = [];
            path = path.substring(0, path.length - 1);
            while (path) {
                dotIndex = path.lastIndexOf('.');
                result.unshift({
                    state: path,
                    name: path.substring(path.lastIndexOf('.', dotIndex) + 1)
                });
                path = path.substring(0, dotIndex);
            }
            return result;
        }
    });
