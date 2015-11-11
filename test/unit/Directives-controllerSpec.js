'use strict';

describe("Unit: Testing Directives", function () {

    beforeEach(angular.mock.module('App.Controllers'));

    it('should have a properly working Directives controller', angular.mock.inject(function ($rootScope, $controller) {

        var scope = $rootScope.$new();
        $controller('DirectivesController', {
            $scope: scope
        });

        expect(scope.name).toEqual('Directives');
    }));

});
