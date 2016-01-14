'use strict';

angular
    .module('App.Services')
    .directive('jumbotron', jumbotron)
    .directive('breadcrumbs', breadcrumbs)
    .directive('videoControl', videoControl)
    .directive('courseContents', courseContents)
    .directive('courseChildren', courseChildren)
    .directive('documentationControl', documentationControl);

function breadcrumbs() {
    return {
        restrict: 'E',
        controller: ['$scope',
            function($scope) {
                if ($scope.course.path) {
                    $scope.breadcrumbs = getBreadcrumbs($scope.course.calculatePath());
                }

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
            }
        ],
        templateUrl: 'components/course/directives/breadcrumbs.html',
    };
}


function jumbotron() {
    return {
        restrict: 'E',
        templateUrl: 'components/course/directives/jumbotron.html',
    };
}

function videoControl() {
    return {
        restrict: 'E',
        scope: {
            video: '='
        },
        controller: ['$scope', 'videoControl',
            function($scope, videoControl) {
                $scope.jumpVideo = function(time, id) {
                    videoControl.goTo(time, id);
                };
            }
        ],

        templateUrl: 'components/course/directives/video-control.html',
    };
}

function courseContents() {
    return {
        restrict: 'E',
        scope: {
            course: '='
        },
        controller: ['$scope',
            function($scope) {
                $scope.pdfUrl = $scope.course.contents && $scope.course.contents.pdfUrl;
            }
        ],
        templateUrl: 'components/course/directives/course-contents.html',
    };
}

function courseChildren() {
    return {
        restrict: 'E',
        scope: {
            children: '='
        },
        controller: ['$scope', '$log', 'offlineService',
            function($scope, $log, offlineService) {
                $scope.getNumber = function(num) {
                    return new Array(num);
                };

                $scope.cacheCourse = function(index) {
                    var courseToCache = $scope.children[index];
                    courseToCache.downloading = true;
                    offlineService
                        .cacheResources(courseToCache.name, courseToCache.getResources())
                        .then(function(result) {
                            $log.info(result);
                            courseToCache.cached = true;
                            courseToCache.downloading = false;

                        });
                };
            }
        ],
        templateUrl: 'components/course/directives/course-children.html',
    };
}


function documentationControl() {
    return {
        restrict: 'E',
        scope: {
            documents: '='
        },
        templateUrl: 'components/course/directives/documentation-control.html',
    };
}
