const filesToCache = ["/", "../views/product.ejs"];

const staticCacheName = "pages-cache-v1";

self.addEventListener("install", (event) => {
    console.log("Attempting to install service worker and cache static assets");
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    console.log("Fetch event for ", event.request.url);
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                if (response) {
                    console.log("Found ", event.request.url, " in cache");
                    return response;
                }
                console.log("Network request for ", event.request.url);
                return fetch(event.request);

                // TODO 4 - Add fetched files to the cache
            })
            .catch((error) => {
                // TODO 6 - Respond with custom offline page
            })
    );
});

self.addEventListener("push", (e) => {
    const data = e.data.json();
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: "Push notification from section.io", //the body of the push notification
            image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
            icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/", // icon
        }
    );
});
