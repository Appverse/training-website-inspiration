/* global emit*/
'use strict';
angular
    .module('App.Services')
    .factory('offlineService', offlineService);

function offlineService($log, $q) {

    //// Interface
    var service = {
        wakeServiceWorker: wakeServiceWorker,
        cacheResources: cacheResources
    };

    return service;

    //// Public functions

    function wakeServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Set up a listener for messages posted from the service worker.
            // The service worker is set to post a message to all its clients once it's run its activation
            // handler and taken control of the page, so you should see this message event fire once.
            // You can force it to fire again by visiting this page in an Incognito window.
            navigator.serviceWorker.addEventListener('message', function(event) {
                $log.debug(event);
            });

            navigator.serviceWorker.register('service-worker.js')
            // Wait until the service worker is active.
            .then(navigator.serviceWorker.ready)
            // ...and then show the interface for the commands once it's ready.
            .catch(function(error) {
                // Something went wrong during registration. The service-worker.js file
                // might be unavailable or contain a syntax error.
                $log.debug(error);
            });
        } else {
            $log.warn('Service workers are not supported in the current browser.');
        }
    }

    /*function cacheResources(key, resources) {
        var promises = _.map(resources, function(resource) {
            return sendMessage({
                command: 'add',
                key: key,
                url: resource
            });
        });
        return $q.all(promises);
    }*/

    function cacheResources(key, resources) {
        return sendMessage({
            command: 'add',
            key: key,
            resources: resources
        });
    }

    function sendMessage(message) {
        $log.debug('sending message', message);
        // This wraps the message posting/response in a promise, which will resolve if the response doesn't
        // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
        // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
        // a convenient wrapper.
        return $q(function(resolve, reject) {
            var messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = function(event) {
                if (event.data.error) {
                    reject(event.data.error);
                } else {
                    resolve(event.data);
                }
            };

            // This sends the message data as well as transferring messageChannel.port2 to the service worker.
            // The service worker can then use the transferred port to reply via postMessage(), which
            // will in turn trigger the onmessage handler on messageChannel.port1.
            // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
            navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
        });
    }
}
