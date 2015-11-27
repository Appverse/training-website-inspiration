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
        destroy: destroy,
        getDB: getDB
    };

    return service;

    //// Public functions

    function destroy() {
        trainingDB.destroy();
    }

    function getDB() {
        if (!trainingDB) {
            return createDB();
        } else {
            return returnDB();
        }
    }
    //// Private functions

    function createDB() {
        trainingDB = pouchDB('training');
        return addViews()
            //.then(replicate)
            .then(returnDB);
    }

    function returnDB() {
        return $q.when(trainingDB);
    }

    function replicate() {
        return trainingDB.replicate.to('http://localhost:5984/training').$promise;
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
