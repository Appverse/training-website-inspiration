'use strict';

angular.module('App.Controllers')

    .controller('homeController',
        function ($log, $scope) {
            $log.debug('homeController loading');

            $scope.jumbo = {
                title: 'Training',
                subtitle: 'Appverse HTML5 Training Contents'
            };

            $scope.episodes = [
                {
                    title: 'Using the Appverse HTML5 Generator ',
                    subtitle: 'Get Started with Dev Tools',
                    description: 'Install Yeoman Grunt and Bower and run the generator',
                    imgURL: 'http://placehold.it/650x350&text=Tools',
                    button: 'Start',
                    buttonLink: 'Generator'
                },
                {
                    title: 'Built in Directives and MVC and concepts',
                    subtitle: 'Exercise 1',
                    description: 'Overview all built in directives and exercises about all related concepts',
                    imgURL: 'http://placehold.it/650x350&text=Directives',
                    button: 'Start',
                    buttonLink: 'Directives'
                },
                {
                    title: 'Routing , States Views',
                    subtitle: 'Exercise 2',
                    description: 'ui.route and ui-view concepts and exercises with resolve and factories and $q',
                    imgURL: 'http://placehold.it/650x350&text=Routing',
                    button: 'Start',
                    buttonLink: 'Routing'
                }

            ];
        });
