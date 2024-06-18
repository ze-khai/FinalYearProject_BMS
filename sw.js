/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// const CACHE_NAME = "v3";

// // list of files
// const URLS_TO_CACHE = [
//     "/static/images/favicon.ico",
//     "/static/lib/bootstrap/img/off.png",
//     "/static/lib/bootstrap/img/on.png",
//     "/static/html/help/lib/css/style.css",
//     "/static/lib/templates/login/account.js",
// ];

// self.addEventListener("install", function (event) {
//     console.log("[Service Worker] install");
//     event.waitUntil(
//         caches
//             .open(CACHE_NAME)
//             .then(function (cache) {
//                 console.log("[Service Worker] Caching app shell");
//                 return cache.addAll(URLS_TO_CACHE);
//             })
//             .then(function () {
//                 self.skipWaiting();
//             })
//     );
// });

// self.addEventListener("activate", function (event) {
//     console.log("[ServiceWorker] Activate");
//     e.waitUntil(
//         caches.keys().then(function (keyList) {
//             return Promise.all(
//                 keyList.map(function (key) {
//                     if (key !== CACHE_NAME) {
//                         console.log("[ServiceWorker] Removing old cache", key);
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );
//     return self.clients.claim();
// });

// self.addEventListener("fetch", (e) => {
//     console.log("service worker : fetching");
//     e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
// });

// TODO 2.6 - Handle the notificationclose event
self.addEventListener("notificationclose", (event) => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;

    console.log("Closed notification: " + primaryKey);
});

// TODO 2.7 - Handle the notificationclick event

// TODO 2.8 - change the code to open a custom page
self.addEventListener("notificationclick", (event) => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action;
    if (action === "close") {
        notification.close();
    } else {
        //clients.openWindow("/analytics");
        notification.close();
    }

    // TODO 5.3 - close all notifications when one is clicked
});

// clients.openWindow('https://google.com');

// TODO 3.1 - add push event listener

self.addEventListener("push", (event) => {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = "Default body";
    }

    const options = {
        body: body,
        icon: "img/notification-flat.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
        actions: [
            { action: "explore", title: "Go to the site" },
            { action: "close", title: "Close the notification" },
        ],
    };

    event.waitUntil(self.registration.showNotification("Push Notification", options));
});
