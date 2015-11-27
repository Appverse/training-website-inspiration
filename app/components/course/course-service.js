'use strict';
/*jshint camelcase: false */
/* global emit */
angular
    .module('App.Services')
    .factory('courseService', courseService);

function courseService($log, $q, dbService, Course) {

    //// Interface
    var service = {
        getCourse: getCourse,
        listChildren: listChildren,
        listAll: listAll,
        createCourse: createCourse,
        updateCourse: updateCourse
    };

    var trainingDB;

    return service;

    //// Public functions

    function listAll() {
        return dbService.getDB()
            .then(function(trainingDB) {
                return trainingDB.query('courses/all', {
                    include_docs: true
                });
            }).catch(function(err) {
                console.log(err);
                return $q.reject('Couldn\'t fetch child courses');
            })
            .then(function(result) {
                return $q.when(buildFromFetch(result));
            });
    }

    function listChildren(courseOrCourseName) {
        var parent;
        return resolveCourse(courseOrCourseName)
            .then(function(course) {
                parent = course;
                var parentPath = course && course.calculatePath(true) || '';
                return dbService.getDB().then(function(trainingDB) {
                    return trainingDB.query('courses/children', {
                        startkey: [parentPath],
                        endkey: [parentPath, {}],
                        include_docs: true
                    });
                });
            })
           /* .catch(function(err) {
                console.log(err);
                return $q.reject('Couldn\'t fetch child courses');
            })*/
            .then(function(result) {
                return $q.when(buildFromFetch(result, parent));
            });

        function resolveCourse(courseOrCourseName) {
            if (_.isString(courseOrCourseName)) {
                return getCourse(courseOrCourseName);
            } else {
                return $q.when(courseOrCourseName);
            }
        }
    }

    function updateCourse(course) {
        var courseForDB = generateCourseData(course);
        return dbService.getDB()
            .then(function(trainingDB) {
                return trainingDB.put(courseForDB);
            })
            .catch(function(err) {
                if (err.status !== 409) {
                    $log.error('Couldn\'t create/update course', err);
                } else {
                    $log.warn('conflict while creating/updating course: ' + courseForDB.name, err);
                    return $q.when({id: courseForDB._id});
                }
            })
            .then(function(result) {
                return getCourse(result.id);
            });
    }

    function getCourse(nameofCourse) {
        return dbService.getDB()
            .then(function(trainingDB) {
                return trainingDB.get(nameofCourse);
            })
            .catch(function(err) {
                if (err.status !== 409) {
                    $log.error('Couldn\'t fetch course:' + nameofCourse, err);
                    // ignore if doc already exists
                }
                return $q.when(true);
            })
            .then(function(result) {
                return buildFromFetch(result);
            });
    }

    function createCourse(course) {
        return getParent(course)
            .then(function(parent) {
                return updateCourse(new Course(course.name, parent, course.metadata, course.contents));
            });
    }

    function getParent(course) {
        var fetchParent = Boolean(course && course.parent && !course.parent.name);
        return fetchParent ? getCourse(course.parent) : $q.when(course.parent);
    }

    /// private functions

    function generateCourseData(course) {
        var now = new Date();
        var courseToSave = {
            '_id': course.name,
            '_rev': course['_rev'],
            type: 'course',
            name: course.name,
            created: now.toISOString(),
            version: course.version ? course.version + 1 : 1,
            active: _.isBoolean(course.active) ? course.active : true,
            metadata: course.metadata,
            contents: course.contents,
            path: course.calculatePath(),
            order: course.order
        };

        return courseToSave;
    }

    function buildFromFetch(fetchResults, parent) {
        var result;
        if (fetchResults.rows) {
            result = [];
            for (var i = fetchResults.rows.length - 1; i >= 0; i--) {
                result.push(buildCourse(fetchResults.rows[i].doc, parent));
            }
        } else {
            result = buildCourse(fetchResults, parent);
        }

        return $q.when(result);

        function buildCourse(data, parent) {
            var course = new Course(null, parent);
            angular.extend(course, data);
            course['_attachments'] = {};
            course['_attachments'][data.version] = {
                'content_type': 'application/json',
                'data': new Blob([data])
            };

            return course;
        }

    }
}
