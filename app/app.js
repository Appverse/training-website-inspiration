(function () {
  'use strict';
  angular.module('App.Services', []);
  angular.module('App.Controllers', []);
  angular.module('webApp', [
    'appverse.translate',
    'appverse.serverPush',
    'appverse.security',
    'appverse.rest',
    'appverse.performance',
    'appverse.logging',
    'appverse.detection',
    'appverse.cache',
    'ngAnimate',
    'ui.bootstrap',
    'angularRipple',
    'ui.select',
    'ngSanitize',
    'rzModule',
    'rt.resize',
    'chart.js',
    'xeditable',
    'ngGrid',
    'appverse.router',
    'App.Controllers',
    'App.Services',
    'appverse',
    'pdf',

  ])
  .run(function (editableOptions, $q, $rootScope, $http, $urlRouter ) {
    editableOptions.theme = 'bs3';
    $rootScope.fullscreen = false;
    
    // Getting The Urls from External JSON
    $http.get('resources/states.json')
      .success(function(response){
       var data = angular.fromJson(response); 
        angular.forEach(data, function (value, key) {
          var state = {
            'url': value.url,
            'templateUrl': value.templateUrl,
            'controller': value.controller,
            'resolve': {
              'courseData': function (courseServices) {
                var stateName = Object.getOwnPropertyNames(this.includes);
                return courseServices.getCourse(stateName[1].toLowerCase());
              }
            }
          };
          window.$stateProviderRef.state(value.name, state);
      });
        $urlRouter.sync();
        $urlRouter.listen();
    });
 });
    //Appverse Configs
    AppInit.setConfig({
      environment: {
        'REST_CONFIG': {
          'BaseUrl': '/api',
          'RequestSuffix': ''
        },
        'SERVERPUSH_CONFIG': { 'BaseUrl': 'http://127.0.0.1:3000' }
      },
      appverseMobile: {},
      mobileBrowser: {}
    });
    
    
    
  } ());
/*


app.run(['$q', '$rootScope','$http', '$urlRouter',
  function ($q, $rootScope, $http, $urlRouter) 
  {
    $http
      .get("myJson.json")
      .success(function(data)
      {
        angular.forEach(data, function (value, key) 
        { 
          var state = {
            "url": value.url,
            "parent" : value.parent,
            "abstract": value.abstract,
            "views": {}
          };
          
          angular.forEach(value.views, function (view) 
          {
            state.views[view.name] = {
              templateUrl : view.templateUrl,
            };
          });

          $stateProviderRef.state(value.name, state);
        });
        // Configures $urlRouter's listener *after* your custom listener
        
        $urlRouter.sync();
        $urlRouter.listen();
      });
}]);
*/