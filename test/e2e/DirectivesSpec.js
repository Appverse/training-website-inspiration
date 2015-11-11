/*jshint node:true */
'use strict';

describe('E2E: Testing Directives view', function () {

    beforeAll(function () {
        browser.setLocation('Directives');
    });

    it('should have a working Directives route', function () {
        expect(browser.getLocationAbsUrl()).toBe('/Directives');
    });

    it ('should have a div with Directives', function () {
       expect(element(by.binding('name')).getText()).toBe('Name: Directives');
    });
});
