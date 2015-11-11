'use strict';

angular
        .module('App.Services')
        .directive('jumboCommon', jumboCommon);

function jumboCommon() {
        return {
                restrict: 'E',
                templateUrl: 'components/common/jumbotron.html',
        };
}