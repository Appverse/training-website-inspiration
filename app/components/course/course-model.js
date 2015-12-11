'use strict';
/*jshint camelcase: false */
/* global emit */
angular
    .module('App.Services')
    .factory('Course', CourseModel);

function CourseModel() {
    function Course(name, parent, metadata, contents) {
        this.name = name;
        this.active = true;
        this.parent = parent;
        this.metadata = metadata;
        this.contents = contents;
    }
    // Methods
    Course.prototype.calculatePath = function(includeSelf) {
        var course = this;
        var path = '';
        if (course) {
            if (course.path) {
                path += course.path;
            } else if (course.parent) {
                if (course.parent instanceof Course) {
                    path += course.parent.calculatePath() + course.parent.name + '.';
                } else {
                    path += course.parent;
                }
            }

            if (includeSelf) {
                path += course.name + '.';
            }
        }
        return path;
    };

    Course.prototype.calculateStatePath = function() {
        var course = this;
        var path = course.calculatePath(true);
        var statePath = path.substring(0, path.lastIndexOf('.'));
        return statePath;
    };

    Course.prototype.getResources = function() {
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
                    resources.push(course.contents.partials[i].url);
                }
            }
        }
        return resources;
    };

    return Course;
}
