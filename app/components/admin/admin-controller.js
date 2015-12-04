'use strict';

angular.module('App.Controllers')

.controller('adminController',
    function($log, $q, $timeout, $state, $scope, $rootScope, courseService, Course) {

        $scope.course = new Course();
        $scope.courseKeyIsConstrained = true;
        $scope.parents = listParents();

        $scope.gridOptions = {
            rowHeight: 60,
            headerRowHeight: 48,
            data: 'course.contents.partials',
            filterOptions: {},
            enableRowSelection: false,
            showFooter: true,
            columnDefs: [{
                field: 'index',
                displayName: '#',
                width: 40
            }, {
                field: 'name',
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text editable-text="row.entity[col.field]">{{row.entity[col.field]}}</span></div>'
            }, {
                displayName: '',
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><button ng-click="deleteUser(row.entity)" class="btn btn-xs btn-danger glyphicon glyphicon-trash"></button></span></div>',
                sortable: false,
                width: 80
            }],
            footerTemplate: '<div id="holder" class="well text-center">Drop files here to upload partials</div>'
        };

        $scope.sliderOptions = {
            floor: 0,
            ceil: 450
        };

        $scope.addCourse = function() {

        };

        $scope.updateCourseName = function() {
            if ($scope.courseKeyIsConstrained) {
                $scope.course.name = $scope.course.metadata.title;
            }
        };

        $scope.toggleKeyConstraint = function() {
            $scope.courseKeyIsConstrained = !$scope.courseKeyIsConstrained;
            $scope.updateCourseName();
        };

        function listParents() {
            var parents = $rootScope.state.courses
                .map(function(course) {
                    return course.calculatePath(true);
                })
                .sort()
                .map(function(path) {
                    return {
                        id: path,
                        description: pettifyPath(path)
                    };
                });
            return parents;

            function pettifyPath(path) {
                return path.substring(0, path.length - 1).replace(/\./g, ' -> ');
            }
        }


        var $courseFrom = $('#courseForm');
        $courseFrom.on('dragover', '#holder', function() {
            this.className = 'well ';
            return false;
        });
        $courseFrom.on('dragend', '#holder', function() {
            this.className = 'well ';
            return false;
        });

        $courseFrom.on('drop', '#holder', function(e) {
            e = e.originalEvent;
            var partials = [],
                promises = [],
                files = e.dataTransfer.files;
            document.body.style.cursor = 'wait';
            this.className = 'well ';
            e.preventDefault();
            $scope.course.contents = $scope.course.contents || {};
            $scope.course.contents.partials = $scope.course.contents.partials || [];
            var file;
            for (var i = 0; i < files.length; i++) {
                file = files[i];
                console.log(files[i].name + '.type: ' + file.type);
                if (!file.type && !file.name.match(/.*md$/)) {
                    continue;
                } else if (file.type && !file.type.match(/^text\/.*/)) {
                    continue;
                }
                promises.push(processFile(file));
            }

            function processFile(file) {
                var deferred = $q.defer();
                var name = file.name;
                var reader = new FileReader();
                reader.onload = function(e) {
                    partials.push({
                        index: partials.length,
                        name: file.name,
                        path: e.target.result
                    });
                    deferred.resolve();
                };
                reader.readAsDataURL(file);
                return deferred.promise;
            }
            $q.all(promises).then(function() {
                $timeout(function() {
                    $scope.course.contents.partials = $scope.course.contents.partials.concat(partials);
                    document.body.style.cursor = '';
                }, 0);
            });
            return false;
        });

        $scope.temp = {
            newDocumentName: '',
            newDocumentURL: ''
        };

        $scope.addDocument = function() {
            if ($scope.temp.newDocumentName && $scope.temp.newDocumentURL) {
                $scope.course.contents = $scope.course.contents || {};
                $scope.course.contents.documentation = $scope.course.contents.documentation || [];
                $scope.course.contents.documentation.push({
                    name: $scope.temp.newDocumentName,
                    url: $scope.temp.newDocumentURL
                });
                $scope.temp.newDocumentName = '';
                $scope.temp.newDocumentURL = '';
            }
        };

        $scope.removeDocument = function(index) {
            $scope.course.contents.documentation.splice(index);
        };


        $scope.addPartial = function() {
            if ($scope.temp.newPartialName && $scope.temp.newPartialURL) {
                $scope.course.contents = $scope.course.contents || {};
                $scope.course.contents.partials = $scope.course.contents.partials || [];
                $scope.course.contents.partials.push({
                    name: $scope.temp.newPartialName,
                    url: $scope.temp.newPartialURL
                });
                $scope.temp.newPartialName = '';
                $scope.temp.newPartialURL = '';
            }
        };

        $scope.removePartial = function(index) {
            $scope.course.contents.partials.splice(index);
        };

        $scope.preview = function (){
            $state.go('admin.preview');
        };

    });
