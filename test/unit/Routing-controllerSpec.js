'use strict';

describe("Unit: Testing Routing", function () {

    beforeEach(angular.mock.module('App.Controllers'));

    it('should have a properly working Routing controller', angular.mock.inject(function ($rootScope, $controller) {

        var scope = $rootScope.$new();
        $controller('RoutingController', {
            $scope: scope
        });

        expect(scope.name).toEqual('Routing');
    }));

});
