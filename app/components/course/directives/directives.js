'use strict';

angular
    .module('App.Services')
    .directive('jumbotron', jumbotron)
    .directive('breadcrumbs', breadcrumbs)
    .directive('videoControl', videoControl)
    .directive('courseContents', courseContents)
    .directive('documentationControl', documentationControl);

function breadcrumbs() {
    return {
        restrict: 'E',
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
        templateUrl: 'components/course/directives/course-contents.html',
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
