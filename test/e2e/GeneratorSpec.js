/*jshint node:true */
'use strict';

describe('E2E: Testing Generator view', function () {

    beforeAll(function () {
        browser.setLocation('Generator');
    });

    it('should have a working Generator route', function () {
        expect(browser.getLocationAbsUrl()).toBe('/Generator');
    });

    it ('should have a div with Generator', function () {
       expect(element(by.binding('name')).getText()).toBe('Name: Generator');
    });
});
