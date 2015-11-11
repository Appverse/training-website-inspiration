/*jshint node:true */
'use strict';

describe('E2E: Testing Detection view', function () {

    beforeAll(function () {
        browser.setLocation('Detection');
    });

    it('should have a working Detection route', function () {
        expect(browser.getLocationAbsUrl()).toBe('/Detection');
    });

    it ('should have a div with Detection', function () {
       expect(element(by.binding('name')).getText()).toBe('Name: Detection');
    });
});
