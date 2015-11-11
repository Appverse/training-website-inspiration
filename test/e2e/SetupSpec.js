/*jshint node:true */
'use strict';

describe('E2E: Testing Setup view', function () {

    beforeAll(function () {
        browser.setLocation('Setup');
    });

    it('should have a working Setup route', function () {
        expect(browser.getLocationAbsUrl()).toBe('/Setup');
    });

    it ('should have a div with Setup', function () {
       expect(element(by.binding('name')).getText()).toBe('Name: Setup');
    });
});
