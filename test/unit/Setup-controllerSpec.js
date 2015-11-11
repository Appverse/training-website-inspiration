'use strict';

describe("Unit: Testing Setup", function () {

    beforeEach(angular.mock.module('App.Controllers'));

    it('should have a properly working Setup controller', angular.mock.inject(function ($rootScope, $controller) {

        var scope = $rootScope.$new();
        $controller('SetupController', {
            $scope: scope
        });

        expect(scope.name).toEqual('Setup');
    }));

});
