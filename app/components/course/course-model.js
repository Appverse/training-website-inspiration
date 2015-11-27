'use strict';
/*jshint camelcase: false */
/* global emit */
angular
    .module('App.Services')
    .factory('Course', CourseModel);

function CourseModel() {
    function Course(name, parent, metadata, contents) {
        this.name = name;
        this.parent = parent;
        this.metadata = metadata;
        this.contents = contents;
    }
    // Methods
    Course.prototype.calculatePath = function calculatePath(includeSelf) {
        var course = this;
        var path = '';
        if (course) {
            if (course.path) {
                path += course.path;
            } else if (course.parent) {
                path += course.parent.calculatePath() + course.parent.name + '.';
            }

            if (includeSelf) {
                path += course.name + '.';
            }
        }
        return path;
    };

    return Course;
}
