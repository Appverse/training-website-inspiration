'use strict';

angular.module('App.Controllers')

    .controller('homeController',
        function ($log, $scope , courseData) {
            $log.debug('homeController loading');

              $scope.jumbo =  {
                title : courseData.jumbo.title,
                subtitle: courseData.jumbo.subtitle
            };

            $scope.episodes = courseData.content;
        });
