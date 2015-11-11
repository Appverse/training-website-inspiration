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
                    title: 'Setup Development Environement',
                    subtitle: 'Setup Environement',
                    description: 'Install and Setupt all needed Development Tools',
                    imgURL: 'http://placehold.it/650x350&text=SDLC',
                    videoURL: 'http://placehold.it/650x350&text=SDLC',
                    button: 'Start',
                    buttonLink: 'Setup'
                },
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
                },
                {
                    title: 'Form Validation and Filters',
                    subtitle: 'Exercise 3',
                    description: 'form directives and validation with ngMessages and filters',
                    imgURL: 'http://placehold.it/650x350&text=FormValidation',
                    button: 'Start',
                    buttonLink: 'step2'
                },
                {
                    title: 'Web app Exercise',
                    subtitle: 'Exercise 4',
                    description: 'Create web app that uses all previous concepts and Server Side Backend Connections',
                    imgURL: 'http://placehold.it/650x350&text=Application',
                    button: 'Start',
                    buttonLink: 'step2'
                },
                {
                    title: 'Internacionalization and Localization of your app',
                    subtitle: 'Exercise 5',
                    description: 'Use the i18n l10n stantards to localize and internationalize your web app',
                    imgURL: 'http://placehold.it/650x350&text=i18n',
                    button: 'Start',
                    buttonLink: 'step2'
                },
                {
                    title: 'Multidevice Application and Detection API',
                    subtitle: 'Exercise 6',
                    description: 'Buil conditional apps using the Detection API Features',
                    imgURL: 'http://placehold.it/650x350&text=Detection',
                    button: 'Start',
                    buttonLink: 'Detection'
                },
                {
                    title: 'Optional UI-Components - Angular-Charts/ChartsJS',
                    subtitle: 'Exercise 7',
                    description: 'Build dynamic charts with angular-charts directives on top of ChartsJS',
                    imgURL: 'http://placehold.it/650x350&text=Charts',
                    button: 'Start',
                    buttonLink: 'AngularCharts'
                },
            ];
        });



   
