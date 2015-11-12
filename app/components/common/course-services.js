'use strict';

angular
    .module('App.Services')
    .factory('courseServices', courseServices);

function courseServices($q, $http) {

    function getCourse(nameofCourse) {
        var defer = $q.defer();
        var url = 'resources/courses/' + nameofCourse + '.json';
        $http.get(url).then
        // Success Callback from Json 
            (function (success) {
               var data = angular.fromJson(success);
               defer.resolve(data.data[0]);
            }, 
            // Error Callback from Json 
            function (error) {
                defer.reject('Sorry No Data To Show');
            });
        return defer.promise;
    }

    return {
        getCourse: getCourse
    };
}