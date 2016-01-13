/* globals self caches */

self.addEventListener('install', function(event) {
    return self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    clients.claim();
    event.waitUntil(
        showNotification('Service worker activated')
    )
});

self.addEventListener('message', function(event) {
    switch (event.data.command) {
        case 'add':
            showNotification('Making "' + event.data.key + '" available offline.\nCaching ' + event.data.resources.length + ' resources');
            caches
                .open(event.data.key)
                .then(function(cache) {
                    // Begins the process of fetching them.
                    // The coast is only clear when all the resources are ready.
                    return cache.addAll(event.data.resources.map(function(resource) {
                        return new Request(resource, {
                            mode: 'no-cors'
                        });
                    }));
                })
                .then(function() {
                    event.ports[0].postMessage({
                        error: null
                    });
                });
            break;
    }
});


/*    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                console.log(
                    '[fetch] Returning from ServiceWorker cache: ',
                    event.request.url
                );
                return response;
            }
            console.log('[fetch] Returning from server: ', event.request.url);
            return event.request.mode === 'navigate' ?
                fetch(event.request) : fetch(event.request, {mode: 'no-cors'});
        }));
});*/



function showNotification(message) {
    var title = 'Training App';
    var notificationOptions = {
        body: message,
        icon: 'styles/css/theme/images/logo.png',
        tag: 'simple-push-demo-notification'
    };
    if (self.registration.showNotification && self.Notification.permission === 'granted') {
        return self.registration.showNotification(title, notificationOptions);
    }
}
