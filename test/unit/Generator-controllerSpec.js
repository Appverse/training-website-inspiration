'use strict';

describe("Unit: Testing Generator", function () {

    beforeEach(angular.mock.module('App.Controllers'));

    it('should have a properly working Generator controller', angular.mock.inject(function ($rootScope, $controller) {

        var scope = $rootScope.$new();
        $controller('GeneratorController', {
            $scope: scope
        });

        expect(scope.name).toEqual('Generator');
    }));

});
