'use strict';

angular
        .module('App.Services')
        .directive('videoControl', videoControl)
        .directive('documentationControl', documentationControl);

function videoControl() {
        return {
                restrict: 'E',
                templateUrl: 'components/common/video-control.html',
        };
}


function documentationControl() {
        return {
                restrict: 'E',
                templateUrl: 'components/common/documentation-control.html',
        };
}