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
    Course.prototype.calculatePath = function (includeSelf) {
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

    Course.prototype.getResources = function () {
        var course = this;
        var resources = [];
        resources.push(course.metadata.imgURL);
        if (course.contents) {
            if (course.contents.video && course.contents.video.videoUrl) {
                resources.push(course.contents.video.videoUrl);
            }
            if (course.contents.pdfUrl) {
                resources.push(course.contents.pdfUrl);
            }
            if (course.contents.partials) {
                for (var i = course.contents.partials.length - 1; i >= 0; i--) {
                    resources.push(course.contents.partials[i].path);
                }
            }
        }
        return resources;
    };

    return Course;
}
