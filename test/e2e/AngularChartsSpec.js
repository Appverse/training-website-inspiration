/*jshint node:true */
'use strict';

describe('E2E: Testing AngularCharts view', function () {

    beforeAll(function () {
        browser.setLocation('AngularCharts');
    });

    it('should have a working AngularCharts route', function () {
        expect(browser.getLocationAbsUrl()).toBe('/AngularCharts');
    });

    it ('should have a div with AngularCharts', function () {
       expect(element(by.binding('name')).getText()).toBe('Name: AngularCharts');
    });
});
