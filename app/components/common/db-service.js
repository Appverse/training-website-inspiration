/* global emit*/
'use strict';
angular
    .module('App.Services')
    .factory('dbService', dbService);

function dbService($log, pouchDB, $window, $q) {

    //// Statics
    var trainingDB;

    //// Interface
    var service = {
        getDB: getDB
    };

    return service;

    //// Public functions

    function getDB(localOnly) {
        if (!trainingDB) {
            return createDB(localOnly);
        } else {
            return returnDB();
        }
    }
    //// Private functions

    function createDB(localOnly) {
        if (localOnly) {
            return createLocalDB()
                .then(addViews)
                .then(returnDB);
        } else {
            return createLocalDB()
                .then(replicate)
                .then(returnDB);
        }

    }

    function createLocalDB() {
        trainingDB = pouchDB('training');
        return returnDB();
    }

    function returnDB() {
        return $q.when(trainingDB);
    }

    function replicate() {
        return trainingDB.replicate.from('http://localhost:5984/training').$promise;
    }

    function addViews() {
        var ddoc = {
            _id: '_design/courses',
            views: {
                all: {
                    map: function mapFun(doc) {
                        if (doc.type === 'course') {
                            emit(doc.type);
                        }
                    }.toString()
                },
                children: {
                    map: function mapFun(doc) {
                        if (doc.type === 'course') {
                            emit([doc.path, doc.order, doc.created]);
                        }
                    }.toString()
                }
            }
        };
        // save the design doc
        return trainingDB.put(ddoc)
            .catch(function(err) {
                if (err.status !== 409) {
                    $log.error(err);
                    // ignore if doc already exists
                }
                return $q.when(true);
            });
    }



}
