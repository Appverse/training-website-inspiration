'use strict';

describe("Unit: Testing Detection", function () {

    beforeEach(angular.mock.module('App.Controllers'));

    it('should have a properly working Detection controller', angular.mock.inject(function ($rootScope, $controller) {

        var scope = $rootScope.$new();
        $controller('DetectionController', {
            $scope: scope
        });

        expect(scope.name).toEqual('Detection');
    }));

});
