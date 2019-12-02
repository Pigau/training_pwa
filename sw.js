
let cacheManager = {

    appCacheKey: 'static-assets-v4',
    dynamicCacheKey: 'dynamic-assets-v2',
    fallbackPage: null,
    cacheSizeLimit: 20,

    init: function (assets, fallbackPage) {
        this.fallbackPage = fallbackPage;
        return caches.open(this.appCacheKey).then(
            cache => cache.addAll(assets)
        );
    },

    clean: function () {
        caches.keys().then(
            keys => {
                let oldCacheKeys = keys.filter(key => key !== this.appCacheKey && key !== this.dynamicCacheKey);
                return Promise.all(oldCacheKeys.map(key => caches.delete(key)));
            }
        );
    },

    get: function (request) {
        return caches.match(request)
            .then(
                result => result || fetch(request).then(this.saveDynamicCache.bind(this))
            )
            .catch(() => request.url.indexOf('.html') > -1 ? caches.match(this.fallbackPage) : null);
    },

    saveDynamicCache: function (response) {
        let data = response.clone();
        caches.open(this.dynamicCacheKey).then(
            cache => cache.put(data.url, data)
        );
        this.limitCacheSize();
        return response;
    },

    limitCacheSize: function () {
        caches.open(this.dynamicCacheKey).then(cache => {
            cache.keys().then(keys => {
                if (keys.length > this.cacheSizeLimit) {
                    cache.delete(keys[0]).then(this.limitCacheSize.bind(this));
                }
            })
        });
    }
};

let myServiceWorker = {

    cacheManager: cacheManager,
    assetsToCache: [
        '/',
        '/index.html',
        '/pages/fallback.html',
        '/js/app.js',
        '/js/ui.js',
        '/js/materialize.min.js',
        '/css/styles.css',
        '/css/materialize.min.css',
        '/img/dish.png',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
    ],

    init: function (swObject) {
        ['install', 'activate', 'fetch'].forEach(
            eventName => swObject.addEventListener(eventName, this[eventName].bind(this))
        );
    },

    install: function (event) {
        event.waitUntil(this.cacheManager.init(this.assetsToCache, '/pages/fallback.html'));
    },

    activate: function (event) {
        event.waitUntil(this.cacheManager.clean());
    },

    fetch: function (event) {
        event.respondWith(this.cacheManager.get(event.request));
    }
};

myServiceWorker.init(self);
