'use strict';

describe("Unit: Testing AngularCharts", function () {

    beforeEach(angular.mock.module('App.Controllers'));

    it('should have a properly working AngularCharts controller', angular.mock.inject(function ($rootScope, $controller) {

        var scope = $rootScope.$new();
        $controller('AngularChartsController', {
            $scope: scope
        });

        expect(scope.name).toEqual('AngularCharts');
    }));

});
