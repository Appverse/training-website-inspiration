/*jshint node:true */
'use strict';

describe('E2E: Testing Routing view', function () {

    beforeAll(function () {
        browser.setLocation('Routing');
    });

    it('should have a working Routing route', function () {
        expect(browser.getLocationAbsUrl()).toBe('/Routing');
    });

    it ('should have a div with Routing', function () {
       expect(element(by.binding('name')).getText()).toBe('Name: Routing');
    });
});
