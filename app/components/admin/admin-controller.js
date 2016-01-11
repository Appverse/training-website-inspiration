'use strict';

angular.module('App.Controllers')

.controller('adminController',
    function($log, $q, $timeout, $state, $scope, $rootScope, courseService, Course) {

        var inPreviewMode = false;
        $scope.course = new Course();
        $scope.children = [$scope.course];
        $scope.courseKeyIsConstrained = true;
        $scope.paths = listPaths();

        $scope.$on('$stateChangeSuccess', setupDropZone);

        $scope.create = function() {
            courseService.createCourse($scope.course);
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

        function listPaths() {
            var paths = $rootScope.state.courses
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
            return paths;

            function pettifyPath(path) {
                return path.substring(0, path.length - 1).replace(/\./g, ' -> ');
            }
        }

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
                    url: $scope.temp.newPartialURL,
                    markdown: $scope.temp.newPartialIsMarkdown
                });
                $scope.temp.newPartialName = '';
                $scope.temp.newPartialURL = '';
                $scope.temp.newPartialIsMarkdown = false;
            }
        };

        $scope.removePartial = function(index) {
            $scope.course.contents.partials.splice(index, 1);
        };

        $scope.togglePreview = function() {
            if (inPreviewMode) {
                $state.go('admin.create');
            } else {
                $state.go('admin.preview');
            }

            inPreviewMode = !inPreviewMode;
        };


        function setupDropZone() {
            var $courseFrom = $('#adminContainer');

            $courseFrom.on('click', '#drop-zone', function() {
                $(this).siblings('#drop-zone-input').click();
            });

            $courseFrom.on('dragover', '#drop-zone', function() {
                this.className = 'well ';
                return false;
            });

            $courseFrom.on('dragend', '#drop-zone', function() {
                this.className = 'well ';
                return false;
            });

            $courseFrom.on('drop', '#drop-zone', function(e) {
                e = e.originalEvent;
                document.body.style.cursor = 'wait';
                processFiles(e.dataTransfer.files);
                this.className = 'well ';
                e.preventDefault();
                return false;
            });

            $courseFrom.on('change', '#drop-zone-input', function(event) {
                processFiles(this.files);
            });

            function processFiles(files) {
                var partials = [],
                    promises = [];
                $scope.course.contents = $scope.course.contents || {};
                $scope.course.contents.partials = $scope.course.contents.partials || [];
                var file;
                var isMarkdown = false;
                for (var i = 0; i < files.length; i++) {
                    file = files[i];
                    console.log(files[i].name + '.type: ' + file.type);
                    if (!file.type && !file.name.match(/.*md$/)) {
                        continue;
                    } else

                    if (file.type && !file.type.match(/^text\/.*/)) {
                        continue;
                    } else if (!file.type) {
                        if (file.name.match(/.*md$/)) {
                            isMarkdown = true;
                        } else {
                            continue;
                        }
                    }

                    promises.push(addFile(partials, file, isMarkdown));
                    isMarkdown = false;
                }

                $q.all(promises).then(function() {
                    $timeout(function() {
                        $scope.course.contents.partials = $scope.course.contents.partials.concat(partials);
                        document.body.style.cursor = '';
                    }, 0);
                });
            }


            function addFile(partials, file, isMarkdown) {
                var deferred = $q.defer();
                var name = file.name;
                var reader = new FileReader();
                reader.onload = function(e) {
                    partials.push({
                        index: partials.length,
                        name: file.name.substring(0, file.name.lastIndexOf('.')),
                        url: e.target.result,
                        markdown: isMarkdown,
                        embedded: true
                    });
                    deferred.resolve();
                };
                reader.readAsDataURL(file);
                return deferred.promise;
            }
        }


    });
