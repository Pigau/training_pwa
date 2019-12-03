/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "01369b27f60560bf9a7cd8685a73ce8c"
  },
  {
    "url": "pages/fallback.html",
    "revision": "862161e51d47e925ac9e54af72b6801c"
  },
  {
    "url": "js/app.js",
    "revision": "405d50c9d3c020cbf42231230872f742"
  },
  {
    "url": "js/db.js",
    "revision": "1a01d0ea795d60cde33e2b54d02f0509"
  },
  {
    "url": "js/materialize.min.js",
    "revision": "87d84bf8b4cc051c16092d27b1a7d9b3"
  },
  {
    "url": "js/messaging.js",
    "revision": "355b4ff43b23e307f30d398256248026"
  },
  {
    "url": "js/ui.js",
    "revision": "486df25f7e96aff5a10dc43305037334"
  },
  {
    "url": "css/materialize.min.css",
    "revision": "ec1df3ba49973dcb9ff212f052d39483"
  },
  {
    "url": "css/styles.css",
    "revision": "81a9e9fe698b2a7ca7a8ebeded54575d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(.*.(js|jpg|png|html)$)|(.*gstatic.com.*)|(.*fonts.googleapis.com.*)/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"test-dynamic-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 20, purgeOnQuotaError: false })] }), 'GET');
